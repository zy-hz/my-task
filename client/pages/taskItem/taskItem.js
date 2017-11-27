// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    courses: {},
    folders: {},
    blocks: {},

    currentFolder: {},
    taskBlock: {},
    addNewTaskPromotion: "",  // 添加作业的提示文字，为空的时候，可以出现提示 “添加作业”
  };

  obj.onLoad = onLoad;

  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.goToTaskDetail = goToTaskDetail;

  return obj;
}

/**
 * 页面载入事件
 */
function onLoad(options) {
  options.thePage = this;
  common.showBusy("载入作业");

  wetask.getTaskItems({
    BlockId: options.BlockId,

    success(result) {
      const { items } = result.data;

      common.showSuccess();
    },

    fail(error) {
      common.showModel('初始化失败', error);
      console.log('初始化失败', error);
    }
  });
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