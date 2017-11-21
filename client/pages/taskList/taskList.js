// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    courses: wetask.enumCourses(),
    folders: wetask.enumFolders(),
    taskBlock: wetask.getTaskBlock(),
    addNewTaskPromotion: "",  // 添加作业的提示文字，为空的时候，可以出现提示 “添加作业”
  };

  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.goToTaskDetail = goToTaskDetail;
  return obj;
}

// 添加一个新作业条目
function doAddNewTaskItem(event) {
  if (event.detail.value == "") return;
  var taskBlock = wetask.addNewTaskItem(this.data.taskBlock, event.detail.value, event.target.dataset.course);

  this.setData({ taskBlock });
  this.setData({ addNewTaskPromotion: "" });

  this.timer = setInterval((function () {
    console.log("aaa");
  }).bind(this), 1000);

}


function goToTaskDetail() {
  wx.navigateTo({
    url: '/pages/taskDetail/taskDetail',
  })
}