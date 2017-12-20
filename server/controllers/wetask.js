const configs = require('../config')
const taskdb = require('knex')({
  client: 'mysql',
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.pass,
    database: "wetask",
    charset: configs.mysql.char
  }
})

var SELECT_TASKBLOCK = ['wetask_block.id', 'wetask_block.BlockName', 'wetask_block.FolderId', 'wetask_folder.FolderName', 'wetask_block.CreateDate', 'wetask_block.DeliverDate', 'wetask_block.TaskItemCount', 'wetask_block.TaskItemCompletedCount', 'wetask_block.CourseCount', 'wetask_folder.AsBlockName', 'wetask_folder.FolderIcon', 'wetask_folder.DaysOnIcon'];

var SELECT_TASKITEM = ['wetask_item.id', 'wetask_item.FolderId', 'wetask_item.BlockId', 'wetask_item.CourseId', 'wetask_item.ItemTitle', 'wetask_course.CourseName', 'wetask_item.SpendSecond', 'wetask_item.IsCompleted', 'wetask_item.IsRunning', 'wetask_item.EnableRemove', 'wetask_item.LastDoTime'];

/**
 * 初始化一个用户
 */
async function init(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;

  // 检查文件夹是否初始化
  if (await getTargetCount("folder", uid) == 0) {
    var folders = createDefaultFolders(uid);
    await taskdb("wetask_folder").insert(folders);
  }
  var folders = await taskdb("wetask_folder").where({ uid });

  // 检查课程是否初始化
  if (await getTargetCount("course", uid) == 0) {
    var courses = createDefaultCourses(uid);
    await taskdb("wetask_course").insert(courses);
  }
  var courses = await taskdb("wetask_course").where({ uid });

  // 获得用户所有的作业块
  var blocks = await taskdb("wetask_block").where({ 'wetask_block.uid': uid }).select(SELECT_TASKBLOCK).leftJoin('wetask_folder', 'wetask_block.FolderId', 'wetask_folder.id').orderBy('wetask_block.CreateDate', 'desc');
  ctx.body = { folders, blocks, courses };
}

// 为用户构建默认数组
function createDefaultFolders(uid) {
  return [
    { FolderName: "回家作业", AsBlockName: 0, FolderIcon: "folder_1", DaysOnIcon: 1, uid: uid },
    { FolderName: "新东方", AsBlockName: 1, FolderIcon: "folder_2", DaysOnIcon: 1, uid: uid },
    { FolderName: "学而思", AsBlockName: 1, FolderIcon: "folder_2", DaysOnIcon: 1, uid: uid },
    { FolderName: "暑假作业", AsBlockName: 1, FolderIcon: "folder_3", DaysOnIcon: 0, uid: uid },
    { FolderName: "寒假作业", AsBlockName: 1, FolderIcon: "folder_4", DaysOnIcon: 0, uid: uid }
  ];
}

// 默认课目
function createDefaultCourses(uid) {
  return [
    { CourseName: "语文", uid: uid },
    { CourseName: "数学", uid: uid },
    { CourseName: "英语", uid: uid },
    { CourseName: "科学", uid: uid },
    { CourseName: "社会", uid: uid }
  ];
}

// 获得对象的数量
async function getTargetCount(target, uid) {
  var result = await taskdb("wetask_" + target).count('uid as cnt').where({ uid });
  return result[0].cnt;
}

/**
 * 获得用户的文件夹
 */
async function getTaskFolders(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;

  var folders = await taskdb("wetask_folder").where({ uid });
  ctx.body = { folders };
}

/**
 * 添加作业块
 */
async function addNewTaskBlock(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;

  const { FolderId, BlockName, CreateDate, DeliverDate } = ctx.query;
  var taskBlock = {
    FolderId,
    BlockName,
    CreateDate,
    DeliverDate,
    uid
  };

  // 查询是否存在相同作业：条件 FolderId和CreateDate相同
  var result = await taskdb("wetask_block").where({ FolderId, CreateDate }).select('id');
  var blockId = result == null || result.length == 0 ? 0 : result[0].id;

  // 是否为新作业
  var IsNewBlock = blockId > 0 ? false : true;

  if (blockId > 0) {
    // 存在该作业，启动更新流程
    await taskdb("wetask_block").where({ FolderId, CreateDate }).update(taskBlock);
  }
  else {
    // 不存在启动添加流程
    result = await taskdb("wetask_block").returning('id').insert(taskBlock);
    blockId = result[0];
  }
  ctx.body = { BlockId: blockId, IsNewBlock };
}

/**
 * 获取作业项
 */
async function getTaskItems(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { BlockId } = ctx.query;

  // 获得作业块对象
  var block = await taskdb("wetask_block").where('wetask_block.id', BlockId).select(SELECT_TASKBLOCK).leftJoin('wetask_folder', 'wetask_block.FolderId', 'wetask_folder.id');

  // 获得作业列表
  var taskItems = await taskdb("wetask_item").where({ BlockId, IsDeleted: 0 }).select(SELECT_TASKITEM).leftJoin('wetask_course', 'wetask_item.CourseId', 'wetask_course.id');

  // 获得这个用户的课程
  var courses = await taskdb("wetask_course").where({ uid });

  ctx.body = { TaskBlock: block[0], TaskItems: taskItems, Courses: courses };
}

/**
 * 添加作业项
 */
async function addNewTaskItem(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { FolderId, BlockId, CourseId, ItemTitle } = ctx.query;

  var item = {
    FolderId,
    BlockId,
    CourseId,
    ItemTitle,
    uid
  };

  var result = await taskdb("wetask_item").returning('id').insert(item);
  var taskItems = await taskdb("wetask_item").where('wetask_item.id', result[0]).select(SELECT_TASKITEM).leftJoin('wetask_course', 'wetask_item.CourseId', 'wetask_course.id');

  // 增加作业中的作业项数量
  await taskdb("wetask_block").where('id', BlockId).increment('TaskItemCount', 1);

  // 统计作业中的课程数量
  await tjCourseCountInTaskBlock(BlockId);

  ctx.body = { TaskItem: taskItems[0] };
}

/**
 * 删除作业项
 */
async function deleteTaskItem(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { ItemId, BlockId } = ctx.query;

  var result = await taskdb("wetask_item").where('id', ItemId).update({ IsDeleted: 1 }, 'id');

  // 删除作业中的作业项数量
  await taskdb("wetask_block").where('id', BlockId).decrement('TaskItemCount', 1);

  // 统计作业中的课程数量
  await tjCourseCountInTaskBlock(BlockId);

  ctx.body = { result };
}

/**
 * 查找作业项
 */
async function findTaskItem(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { ItemId } = ctx.query;

  // 获得作业列表
  var taskItems = await taskdb("wetask_item").where('wetask_item.id', ItemId).select(SELECT_TASKITEM).leftJoin('wetask_course', 'wetask_item.CourseId', 'wetask_course.id');
  ctx.body = { taskItems };
}

/**
 * 更新作业标题
 */
async function updateTaskItemTitle(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { ItemId, ItemTitle } = ctx.query;

  var result = await taskdb("wetask_item").where('id', ItemId).update({ ItemTitle });
  ctx.body = { result };
}

/**
 * 查找作业块
 */
async function findTaskBlock(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { BlockId } = ctx.query;

  // 获得作业列表
  var blocks = await taskdb("wetask_block").where({ 'wetask_block.id': BlockId }).select(SELECT_TASKBLOCK).leftJoin('wetask_folder', 'wetask_block.FolderId', 'wetask_folder.id');

  ctx.body = { TaskBlock: blocks[0] };
}

/**
 * 记录作业项的开始，暂停，完成时间（pause,start,done）
 */
async function recordItemTime(ctx, next) {
  // 用户必须登录
  if (verify_request(ctx) == -1) return;
  var uid = ctx.state.$wxInfo.userinfo.openId;
  const { ItemId, CurrentTime, TimeType } = ctx.query;

  //  记录这些操作的时间
  var recordTime = {
    ItemId,
    CurrentTime,
    TimeType,
    uid
  };
  var result = await taskdb("wetask_time").insert(recordTime).returning('id');

  // 计算用时
  var timeGroup = await taskdb("wetask_time").where({ ItemId }).select();
  var spendInfo = getTaskItemSpendInfo(timeGroup);
  await taskdb("wetask_item").where('id', ItemId).update(spendInfo).returning();

  // 获得作业项
  var taskItems = await taskdb("wetask_item").where('wetask_item.id', ItemId).select(SELECT_TASKITEM).leftJoin('wetask_course', 'wetask_item.CourseId', 'wetask_course.id');

  // 统计作业块
  var bid = taskItems[0].BlockId;
  await tjTaskItemIsCompletedCount(bid);

  ctx.body = { TaskItem: taskItems[0] };
}

// 计算用时，timeGroup 按照时间排序的数组
function getTaskItemSpendInfo(timeGroup) {
  var FirstDoTime;
  var LastDoTime;
  var SpendSecond = 0;
  var PauseSecond = 0;
  var PauseCount = 0;
  var IsCompleted = false;
  var IsRunning = false;

  for (var i = 0; i < timeGroup.length; i++) {
    var tm = timeGroup[i];

    if (FirstDoTime == null) FirstDoTime = tm.CurrentTime;
    if (i == timeGroup.length - 1) LastDoTime = tm.CurrentTime;

    if (tm.TimeType == "start") {
      IsCompleted = false;
      IsRunning = true;

      var nextIndex = i + 1;
      if (nextIndex < timeGroup.length) {
        // 计算工作时间
        SpendSecond = SpendSecond + getPassSecond(tm.CurrentTime, timeGroup[nextIndex].CurrentTime);
      }
    } else if (tm.TimeType == "pause") {
      IsCompleted = false;
      IsRunning = false;
      var nextIndex = i + 1;
      if (nextIndex < timeGroup.length) {
        // 计算工作时间
        PauseSecond = PauseSecond + getPassSecond(tm.CurrentTime, timeGroup[nextIndex].CurrentTime);
        PauseCount = PauseCount + 1;
      }

    } else {
      // 完成
      IsCompleted = true;
      IsRunning = false;
    }
  }

  return { FirstDoTime, LastDoTime, SpendSecond, PauseSecond, PauseCount, IsCompleted, IsRunning };
}

// 计算两个时间的差
function getPassSecond(tm1, tm2) {
  return (tm2.getTime() - tm1.getTime()) / 1000;
}

// 统计作业中的课程数量
async function tjCourseCountInTaskBlock(bid) {
  var result = await taskdb("wetask_item").where({ 'BlockId': bid, 'IsDeleted': false }).countDistinct('CourseId as CourseCount');
  var cnt = result[0].CourseCount;
  await taskdb("wetask_block").where('id', bid).update('CourseCount', cnt);
}

// 统计作业中的完成的作业项目数量
async function tjTaskItemIsCompletedCount(bid) {
  var result = await taskdb("wetask_item").where({ 'BlockId': bid, 'IsDeleted': false, 'IsCompleted': true }).count('IsCompleted as TaskItemCompletedCount');
  var cnt = result[0].TaskItemCompletedCount;
  await taskdb("wetask_block").where('id', bid).update('TaskItemCompletedCount', cnt);
}

/**
 * 响应 get 请求
 */
async function get(ctx, next) {

  var verifyResult = verify_request(ctx);

  // 用户是否登录
  var uid = verifyResult == -1 ? "devtest" : ctx.state.$wxInfo.userinfo.openId;

  // 获得命令执行的参数
  const { table, id } = ctx.query;

  // 获得查询结果
  var result = await taskdb("wetask_" + table).where({ uid });
  ctx.body = result;
}

/**
 * 验证请求
 */
function verify_request(ctx) {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  if (ctx.state.$wxInfo.loginState === 1) {
    // loginState 为 1，登录态校验成功
    ctx.state.data = ctx.state.$wxInfo.userinfo
  } else {
    ctx.state.code = -1
  }

  return ctx.state.code;
}

module.exports = {
  get,
  init,
  getTaskFolders,
  addNewTaskBlock,
  getTaskItems,
  addNewTaskItem,
  deleteTaskItem,
  findTaskItem,
  findTaskBlock,
  recordItemTime,
  updateTaskItemTitle,
}