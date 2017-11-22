
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

// 在作业块中查找课程
function findCouseById(taskBlock, courseId) {
  var idx = taskBlock.courses.findIndex( obj => obj.id == courseId );
  if (idx < 0) return null;
  return idx < 0 ? null : taskBlock.courses[idx];
};


module.exports = {
  TaskFolder: TaskFolder,
  TaskBlock: TaskBlock,
  Course: Course,
  TaskItem: TaskItem,
  findCouseById: findCouseById,
};