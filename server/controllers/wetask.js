const configs = require('../config')
const taskdb = require('knex')({
  client: 'mysql',
  connection: {
    host: configs.taskdb.host,
    port: configs.taskdb.port,
    user: configs.taskdb.user,
    password: configs.taskdb.pass,
    database: configs.taskdb.db,
    charset: configs.taskdb.char
  }
})

/**
 * 初始化一个用户
 */
async function init(ctx, next) {
  if (verify_request(ctx) == -1) return;

  // 用户是否登录
  var uid = ctx.state.$wxInfo.userinfo.openId;

  var folders = createDefaultFolders(uid);
  await taskdb("wetask_folder").insert(folders);

  var courses = createDefaultCourses(uid);
  await taskdb("wetask_course").insert(courses);
}

// 为用户构建默认数组
function createDefaultFolders(uid) {
  return { FolderName: "回家作业", uid: uid };
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
  init

}