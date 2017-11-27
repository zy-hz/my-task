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
    showTopTips: false,

    folders: {},

    taskPeriod: {
      createDate: '0000-00-00',
      deliverDate: '0000-00-00',
    },

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

      // 设置文件夹对于的作业日期
      thePage.setData({ taskPeriod: getTaskPeriod4Folder(folders[0]) });

      common.showSuccess();
    },

    fail() {
      common.showModel('获取设置失败');
      console.log('获取设置失败');
    }
  });
}

// 获得指定文件夹的作业期间
function getTaskPeriod4Folder(folder) {
  var dt1 = new Date();
  var dt2 = util.DateAddDay(dt1, 1);
  return {
    createDate: util.formatDate(dt1, '-'),
    deliverDate: util.formatDate(dt2, '-'),
  };
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
  var taskPeriod;
  for (var i = 0, len = folders.length; i < len; ++i) {
    folders[i].checked = folders[i].id == e.detail.value;

    if (folders[i].checked) taskPeriod = getTaskPeriod4Folder(folders[i]);
  }

  this.setData({ folders, taskPeriod });
};

function bindDateChange(e) {
  var taskPeriod = this.data.taskPeriod;
  taskPeriod[e.target.id] = e.detail.value;

  if (e.target.id == "createDate") {
    var dt1 = new Date(e.detail.value);
    var dt2 = util.DateAddDay(dt1, 1);
    taskPeriod.deliverDate = util.formatDate(dt2, '-');
  }
  this.setData({ taskPeriod });
}
