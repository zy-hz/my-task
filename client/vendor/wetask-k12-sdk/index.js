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
  findTaskItem: dbVisitor.findTaskItem,
  recordItemTime: dbVisitor.recordItemTime,
};