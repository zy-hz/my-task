// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    showTopTips: false,

    radioItems: [
      { name: '回家作业', value: '0', checked: true },
      { name: '新东方', value: '1' },
      { name: '学而思', value: '2' },
      { name: '暑假作业', value: '3' },
      { name: '寒假作业', value: '4' }
    ],

    date: "2016-09-01",

  };

  obj.showTopTips = showTopTips;
  obj.radioChange = radioChange;
  obj.bindDateChange = bindDateChange;

  obj.onLoad = onLoad;
  return obj;
}

// 页面载入
function onLoad(e) {
  common.showBusy("预备数据");
  wetask.getTaskFolders({

    success(result) {

     },

    fail() {
      showModel('获取设置失败');
      console.log('获取设置失败');
    }
  });
}

// 以下是 界面事件处理
//
function showTopTips() {
  var that = this;
  this.setData({
    showTopTips: true
  });
  setTimeout(function () {
    that.setData({
      showTopTips: false
    });
  }, 3000);
}

function radioChange(e) {

  var radioItems = this.data.radioItems;
  for (var i = 0, len = radioItems.length; i < len; ++i) {
    radioItems[i].checked = radioItems[i].value == e.detail.value;
  }

  this.setData({
    radioItems: radioItems
  });
};

function bindDateChange(e) {
  this.setData({
    date: e.detail.value
  })
}
