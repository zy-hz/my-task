/*
*   数据访问接口
*/
var TaskFolder = function TaskFolder(id, name) {
  this.id = id;
  this.name = name;
};

var TaskBlock = function TaskBlock(folder) {
  this.folder = folder;
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
  return new TaskBlock(new TaskFolder(123, "测试文件夹"));
}

module.exports = {
  getTaskBlock: getTaskBlock,
};