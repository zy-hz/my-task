/*
*   数据访问接口
*/
var Task = require('./task');

var TaskFolder = Task.TaskFolder;
var TaskBlock = Task.TaskBlock;
var Course = Task.Course;
var TaskItem = Task.TaskItem;

/**
 * @method
 * 获取一份作业
 *
 * @param {string} folderId 作业所在文件夹的编号，如果为空表示最后一次读取的文件
 */
var getTaskBlock = function getTaskBlock(folderId) {
  return mockCreateTaskBlock();
};


/**
 * @method
 * 添加一个新作业
 *
 * @param {string} folderId 作业所在文件夹的编号，如果为空表示最后一次读取的文件
 */
var addNewTaskItem = function addNewTaskItem(taskBlock, taskItemName, courseId) {
  var course = Task.findCouseById(taskBlock, courseId);
  if (course != null)
    course.taskItems.push(new TaskItem(11, taskItemName));

  return taskBlock;
}

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
  course2.taskItems.push(new TaskItem(11, "政府 111"));
  course2.taskItems.push(new TaskItem(33, "粮油 222"));
  course2.taskItems.push(new TaskItem(55, "电商 333 电商 333 电商 333 电商 333 电商 333 电商 333"));


  var course3 = new Course(3, "服务器");
  course3.taskItems.push(new TaskItem(11, "服务器 A"));
  course3.taskItems.push(new TaskItem(33, "服务器 B"));
  course3.taskItems.push(new TaskItem(55, "服务器 C"));

  var course4 = new Course(4, "外网脚本");
  var course5 = new Course(5, "内网脚本");

  block.courses.push(course1);
  block.courses.push(course2);
  block.courses.push(course3);

  return block;
}

module.exports = {
  getTaskBlock: getTaskBlock,
  addNewTaskItem: addNewTaskItem,
};