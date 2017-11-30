/*
*   数据访问接口
*/
var task = require('./task');
var qcloud = require('../../wafer2-client-sdk/index');
var config = require('../../../config.js');

var TaskFolder = task.TaskFolder;
var TaskBlock = task.TaskBlock;
var Course = task.Course;
var TaskItem = task.TaskItem;

/**
 * @method
 * 初始化，组合多个请求
 *
 * @param {Object} options 函数配置
 * @param {Function} options.success(response) 登录成功后的回调函数 const { folders, blocks, courses } = response.data
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function init(options) {
  // 在服务器上初始化该用户
  qcloud.request({
    login: true,
    url: `${config.service.host}/weapp/wetask/init`,
    success: options.success,
    fail: options.fail
  }
  );
}

/**
 * @method
 * 获得作业文件夹列表，包括文件夹的详细信息
 *
 * @param {Object} options 函数配置
 * @param {Function} options.success(result) 登录成功后的回调函数 const { folders } = result.data
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function getTaskFolders(options) {
  qcloud.request({
    login: true,
    url: `${config.service.host}/weapp/wetask/gettaskfolders`,
    success: options.success,
    fail: options.fail
  }
  );
}

/**
 * @method
 * 添加一份新作业
 *
 * @param {Object} options 函数配置
 * @param {Function} options.FolderId 作业文件夹编号
 * @param {Function} options.BlockName 作业名称
 * @param {Function} options.CreateDate 创建日期
 * @param {Function} options.DeliverDate 发布日期
 * @param {Function} options.success(result) 登录成功后的回调函数 const { BlockId , IsNewBlock} = result.data
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function addNewTaskBlock(options) {

  // 处理作业名称中文字符
  var blockName = encodeURI(options.BlockName);

  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/addnewtaskblock?FolderId=${options.FolderId}&BlockName=${blockName}&CreateDate=${options.CreateDate}&DeliverDate=${options.DeliverDate}`;

  qcloud.request(options);
}

/**
 * @method
 * 获得作业条目
 *
 * @param {Object} options 函数配置
 * @param {Function} options.BlockId 作业块编号
 * @param {Function} options.success(result) 登录成功后的回调函数 const { TaskBlock, TaskItems, Courses } = result.data;
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function getTaskItems(options) {
  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/gettaskitems?BlockId=${options.BlockId}`;

  qcloud.request(options);
}


/**
 * @method
 * 添加一个新作业项
 *
 * @param {Object} options 函数配置
 * @param {Function} options.FolderId 文件夹编号
 * @param {Function} options.BlockId 作业块编号
 * @param {Function} options.CourseId 作业块编号
 * @param {Function} options.ItemTitle 作业项名称
 * @param {Function} options.success(result) 登录成功后的回调函数 const { itemId } = result.data;
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function addNewTaskItem(options) {

  // 作业项的中文
  var ItemTitle = encodeURI(options.ItemTitle);

  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/addnewtaskitem?FolderId=${options.FolderId}&BlockId=${options.BlockId}&CourseId=${options.CourseId}&ItemTitle=${ItemTitle}`;

  qcloud.request(options);
}

/**
 * @method
 * 删除一个作业项
 *
 * @param {Object} options 函数配置
 * @param {Function} options.ItemId 作业项编号
 * @param {Function} options.success() 登录成功后的回调函数 
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function deleteTaskItem(options) {
  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/deletetaskitem?ItemId=${options.ItemId}`;

  qcloud.request(options);

}

/**
 * @method
 * 查找一个作业项
 *
 * @param {Object} options 函数配置
 * @param {Function} options.ItemId 作业项编号
 * @param {Function} options.success(result) 登录成功后的回调函数 ,result.data = taskItem
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function findTaskItem(options) {
  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/findtaskitem?ItemId=${options.ItemId}`;

  qcloud.request(options);
}

/**
 * @method
 * 记录一个作业项的时间
 *
 * @param {Object} options 函数配置
 * @param {Function} options.ItemId 作业项编号
 * @param {Function} options.CurrentTime 当前时间
 * @param {Function} options.TimeType 时间类型
 * @param {Function} options.success(result) 登录成功后的回调函数 ,result.data = 保留
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function recordItemTime(options) {
  var CurrentTime = encodeURI(options.CurrentTime);
  options.login = true;
  options.url = `${config.service.host}/weapp/wetask/recorditemtime?ItemId=${options.ItemId}&CurrentTime=${CurrentTime}&TimeType=${options.TimeType}`;

  qcloud.request(options);
}

/**
 * @method
 * 从服务器获得指定对象数据
 *
 * @param {Object} options 函数配置
 * @param {Function} options.target 对象目标
 * @param {Function} options.success(objects) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
function get(options) {
  var url = `${config.service.host}/weapp/wetask/get?table=${options.target}`;
  qcloud.request({
    login: true,
    url: url,
    success: function (response) { options.success(response.data) },
    fail: options.fail
  }
  );
}

/**
 * @method
 * 获取一份作业
 *
 * @param {string} folderId 作业所在文件夹的编号，如果为空表示最后一次读取的文件
 */
var getTaskBlock = function getTaskBlock(folderId) {
  //return null;
  return mockCreateTaskBlock();
};



/***
 * @method
 * 创建一份测试回家作业
 */
function mockCreateTaskBlock() {
  var folder = new TaskFolder(123, "测试文件夹");
  var block = new TaskBlock(1, "周四作业", folder.id, folder.name);

  var course1 = new Course(1, "大屏");
  course1.taskItems.push(new TaskItem(1, "code 122"));
  course1.taskItems.push(new TaskItem(3, "测试 122"));

  var course2 = new Course(2, "平台");
  course2.taskItems.push(new TaskItem(21, "政府 111"));
  course2.taskItems.push(new TaskItem(23, "粮油 222"));
  course2.taskItems.push(new TaskItem(25, "电商 333 电商 333 电商 333 电商 333 电商 333 电商 333"));


  var course3 = new Course(3, "服务器");
  course3.taskItems.push(new TaskItem(31, "服务器 A"));
  course3.taskItems.push(new TaskItem(33, "服务器 B"));
  course3.taskItems.push(new TaskItem(35, "服务器 C"));

  var course4 = new Course(4, "外网脚本");
  var course5 = new Course(5, "内网脚本");

  block.courses.push(course1);
  block.courses.push(course2);
  block.courses.push(course3);

  return block;
}

function mockCreateTaskBlock_home() {
  var folder = new TaskFolder(123, "回家作业");
  var block = new TaskBlock(1, "周四作业", folder.id, folder.name);

  var course1 = new Course(1, "语文");
  course1.taskItems.push(new TaskItem(1, "code 122"));
  course1.taskItems.push(new TaskItem(3, "测试 122"));

  var course2 = new Course(2, "数学");
  course2.taskItems.push(new TaskItem(21, "政府 111"));
  course2.taskItems.push(new TaskItem(23, "粮油 222"));
  course2.taskItems.push(new TaskItem(25, "电商 333 电商 333 电商 333 电商 333 电商 333 电商 333"));


  var course3 = new Course(3, "英语");
  course3.taskItems.push(new TaskItem(31, "服务器 A"));
  course3.taskItems.push(new TaskItem(33, "服务器 B"));
  course3.taskItems.push(new TaskItem(35, "服务器 C"));


  block.courses.push(course1);
  block.courses.push(course2);
  block.courses.push(course3);

  return block;
}

module.exports = {
  init: init,
  get: get,
  getTaskBlock: getTaskBlock,
  getTaskFolders: getTaskFolders,
  addNewTaskBlock: addNewTaskBlock,
  getTaskItems: getTaskItems,
  addNewTaskItem: addNewTaskItem,
  deleteTaskItem: deleteTaskItem,
  findTaskItem: findTaskItem,
  recordItemTime: recordItemTime,
};