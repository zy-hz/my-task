// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 引入工具脚本
var util = require('../../utils.js');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    id: 0,
    CourseName: '课程',
    ItemTitle: '载入作业项...',
    DisplayTime: { Hour: "0", Minute: '00', Second: '00' },
    SpendSecond: 0,

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

  wetask.findTaskItem({
    ItemId: options.ItemId,

    success(result) {
      const { taskItems } = result.data;
      if (taskItems.length <= 0) {
        common.showModel('没有发现作业项', taskItems);
      } else {
        const { id, CourseName, ItemTitle, SpendSecond } = taskItems[0];

        var DisplayTime = getDisplayTime(SpendSecond);
        thePage.setData({ id, CourseName, ItemTitle, SpendSecond, DisplayTime });

        common.showSuccess();
      }
    },

    fail(error) {
      common.showModel('获取设置失败', error);
      console.log('获取设置失败');
    }

  });

}

// 事件：开始
function onStart(event) {
  var isRunning = this.data.isRunning;

  if (!isRunning) {
    this.timer = setInterval((function () {
      updateTimer(this)
    }).bind(this), 1000)
  } else {
    stopTimer(this)
  }

  this.setData({ isRunning: !isRunning });
}

// 事件：完成
function onComplete(event) {

  stopTimer(this);
  wx.navigateBack();
}

// 更新定时器
function updateTimer(thePage) {

  var SpendSecond = thePage.data.SpendSecond + 1;
  var DisplayTime = getDisplayTime(SpendSecond);
  thePage.setData({ SpendSecond, DisplayTime });

}

// 停止定时器
function stopTimer(thePage) {
  // clear timer
  thePage.timer && clearInterval(thePage.timer);
}

// 记录时间到服务器
// timeType - 时间类型
// 成功后的回调
function recordTime(itemId, timeType, callback) {
  var dtString = util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
  wetask.recordItemTime({
    ItemId: itemId,
    CurrentTime: dtString,

    success(result) {

      common.showSuccess();
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