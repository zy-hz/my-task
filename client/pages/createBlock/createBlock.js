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

    folders: [
      { name: '回家作业', value: '0', checked: true },
      { name: '其他作业', value: '1' },
    ],

    date: "2016-09-01",

  };

  obj.showTopTips = showTopTips;
  obj.folderChange = folderChange;
  obj.bindDateChange = bindDateChange;

  obj.onLoad = onLoad;
  return obj;
}

// 页面载入
function onLoad(e) {
  var thePage = this;
  common.showBusy("预备数据");

  wetask.getTaskFolders({

    success(result) {
      const { folders } = result.data;

      // 设置第一个文件夹为默认选择的文件夹
      folders[0].checked = true;
      thePage.setData({ folders });
      common.showSuccess();
    },

    fail() {
      common.showModel('获取设置失败');
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

function folderChange(e) {

  var folders = this.data.folders;
  for (var i = 0, len = folders.length; i < len; ++i) {
    folders[i].checked = folders[i].value == e.detail.value;
  }

  this.setData({
    folders: folders
  });
};

function bindDateChange(e) {
  this.setData({
    date: e.detail.value
  })
}
