var dbVisitor = require('./lib/dbVisitor');

var exports = module.exports = {
  enumCourses: dbVisitor.enumCourses,
  enumFolders: dbVisitor.enumFolders,
  getTaskBlock: dbVisitor.getTaskBlock , 
  addNewTaskItem: dbVisitor.addNewTaskItem ,
};