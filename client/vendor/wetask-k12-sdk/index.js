var dbVisitor = require('./lib/dbVisitor');

var exports = module.exports = {
  getTaskBlock: dbVisitor.getTaskBlock , 
  addNewTaskItem: dbVisitor.addNewTaskItem ,
};