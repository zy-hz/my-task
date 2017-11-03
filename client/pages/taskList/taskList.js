// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = { taskBlock: wetask.getTaskBlock() };

  obj.doAddNewTaskItem = doAddNewTaskItem;

  return obj;
}

// 添加一个新作业条目
function doAddNewTaskItem(event) {
  if (event.detail == "") return;
  var taskBlock = wetask.addNewTaskItem(this.data.taskBlock, event.detail);
  this.setData({ taskBlock });
}
