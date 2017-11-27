var dbVisitor = require('./lib/dbVisitor');

var exports = module.exports = {
  init: dbVisitor.init,
  get: dbVisitor.get,
  getTaskBlock: dbVisitor.getTaskBlock , 
  getTaskFolderWithDetail: dbVisitor.getTaskFolderWithDetail,
  addNewTaskItem: dbVisitor.addNewTaskItem ,
};