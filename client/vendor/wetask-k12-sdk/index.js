var dbVisitor = require('./lib/dbVisitor');

var exports = module.exports = {
  init: dbVisitor.init,
  get: dbVisitor.get,
  getTaskBlock: dbVisitor.getTaskBlock , 
  getTaskFolders: dbVisitor.getTaskFolders,
  addNewTaskBlock: dbVisitor.addNewTaskBlock,
  getTaskItems: dbVisitor.getTaskItems,
  addNewTaskItem: dbVisitor.addNewTaskItem ,
  deleteTaskItem: dbVisitor.deleteTaskItem,
  recordItemTime: dbVisitor.recordItemTime,
  findTaskItem: dbVisitor.findTaskItem,
  findTaskBlock: dbVisitor.findTaskBlock,
  updateTaskItemTitle: dbVisitor.updateTaskItemTitle,
};