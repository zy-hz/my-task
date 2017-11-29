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
    CourseName: '课程',
    ItemTitle: '载入作业项...',
    DisplayTime: { Hour: "0", Minute: '00', Second: '00' },
    SpendSecond: 0,

    //  是否计时标记
    isRunning: false,
  };

  obj.onLoad = onLoad;
  obj.onStart = onStart;
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
        const { CourseName, ItemTitle, SpendSecond } = taskItems[0];

        var DisplayTime = getDisplayTime(SpendSecond);
        thePage.setData({ CourseName, ItemTitle, SpendSecond, DisplayTime });

        common.showSuccess();
      }
    },

    fail(error) {
      common.showModel('获取设置失败', error);
      console.log('获取设置失败');
    }

  });

}

// 开始
function onStart(event) {

}

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