// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 引入工具脚本
var util = require('../../utils.js');

// 注册事件
var onfire = require("../../vendor/wetask-k12-sdk/lib/onfire.js");

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    TaskItem : {},

    DisplayTime: { Hour: "0", Minute: '00', Second: '00' },

    //  是否计时标记
    isRunning: false,
  };

  obj.onLoad = onLoad;
  obj.onStart = onStart;
  obj.onComplete = onComplete;

  return obj;
}

// 页面载入
function onLoad(options) {
  var thePage = this;
  var taskItem = util.getObjectFromOptions(options);

  if (taskItem == null){
    common.fail('没有作业项',null);
    return;
  }

  var DisplayTime = getDisplayTime(taskItem.SpendSecond);
  thePage.setData({ TaskItem: taskItem, DisplayTime });

}

// 事件：开始
function onStart(event) {
  var isRunning = this.data.isRunning;
  var timeType = isRunning ? "pause" : "start";
  var thePage = this;

  recordTime(this.data.TaskItem , timeType, function () {
    if (!isRunning) {
      thePage.timer = setInterval((function () {
        updateTimer(this)
      }).bind(thePage), 1000)
    } else {
      stopTimer(thePage)
    }

    thePage.setData({ isRunning: !isRunning });
  });
}

// 事件：完成
function onComplete(event) {
  var thePage = this;

  recordTime(this.data.TaskItem, "done", function () {
    stopTimer(thePage);
    wx.navigateBack();
  });
}

// 更新定时器
function updateTimer(thePage) {

  var taskItem = thePage.data.TaskItem;
  taskItem.SpendSecond = taskItem.SpendSecond + 1;

  var displayTime = getDisplayTime(taskItem.SpendSecond);
  thePage.setData({ TaskItem: taskItem, DisplayTime: displayTime });

}

// 停止定时器
function stopTimer(thePage) {
  // clear timer
  thePage.timer && clearInterval(thePage.timer);
}

// 记录时间到服务器
// timeType - 时间类型
// callback - 回调函数
function recordTime(taskItem, timeType, callback) {
  var dtString = util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

  wetask.recordItemTime({
    ItemId: taskItem.id,
    CurrentTime: dtString,
    TimeType: timeType,

    success(result) {
      callback();
      common.showSuccess();

      // 触发课程作业项信息变更事件
      onfire.fire('change_item_detail', { taskItem });
    },

    fail(error) {
      common.showModel('计时到服务器失败', error);
      console.log('计时到服务器失败');
    }

  });
}

// 时钟的显示
function getDisplayTime(sec) {
  var dt = new Date();
  var zone = dt.getTimezoneOffset();
  dt.setTime(sec * 1000 + zone * 60 * 1000);

  return {
    Hour: util.formatDate(dt, "H"),
    Minute: util.formatDate(dt, "mm"),
    Second: util.formatDate(dt, "ss")
  };
}