/*
*   数据访问接口
*/

/**
 * @class
 * 作业文件夹
 *
 */
var TaskFolder = function TaskFolder(id, name) {
  this.id = id;
  this.name = name;
};

/**
 * @class
 * 一份作业 (容器)
 *
 */
var TaskBlock = function TaskBlock(id, name, folderId, folderName) {
  this.id = id;
  this.name = name;

  this.folderId = folderId;
  this.folderName = folderName;

  this.courses = new Array();
};

/**
 * @class
 * 课程
 *
 */
var Course = function Course(id, name) {
  this.id = id;
  this.name = name;

  this.taskItems = new Array();
};

/**
 * @class
 * 作业项
 *
 */
var TaskItem = function TaskItem(id, title, folderId, folderName, courseId, courseName, blockId, blockName) {
  this.id = id;
  this.title = title;

  this.folderId = folderId;
  this.folderName = folderName;

  this.courseId = courseId;
  this.courseName = courseName;

  this.blockId = blockId;
  this.blockName = blockName;
};

/**
 * @method
 * 获取一份作业
 *
 * @param {string} folderId 作业所在文件夹的编号，如果为空表示最后一次读取的文件
 */
var getTaskBlock = function getTaskBlock(folderId) {
  return mockCreateTaskBlock();
};

/***
 * @method
 * 创建一份测试回家作业
 */
function mockCreateTaskBlock() {
  var folder = new TaskFolder(123, "测试文件夹");
  var block = new TaskBlock(1, "周四作业", folder.id,folder.name);

  var course1 = new Course(1, "大屏");
  course1.taskItems.push(new TaskItem(1, "code 122"));
  course1.taskItems.push(new TaskItem(3, "测试 122"));

  var course2 = new Course(2, "平台");
  course2.taskItems.push(new TaskItem(11, "另外 111"));
  course2.taskItems.push(new TaskItem(33, "回家 222"));
  course2.taskItems.push(new TaskItem(55, "回家 333"));

  block.courses.push(course1);
  block.courses.push(course2);

  return block;
}

module.exports = {
  getTaskBlock: getTaskBlock,
};