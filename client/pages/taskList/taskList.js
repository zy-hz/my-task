// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    courses: {},
    folders: {},
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
  var thePage = this;

  showBusy('正在登录');

  // 页面载入前必须清除seesion，强制qcloud重新登录
  qcloud.clearSession();

  // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
  qcloud.login({
    success(result) {
      init(thePage);
    },

    fail(error) {
      showModel('登录失败', error);
      console.log('登录失败', error);
    }
  });

}


// 初始化
function init(thePage) {
  showBusy("获取数据");
  wetask.init({

    afterGetFolder(folders) {
      thePage.setData({ currentFolder: folders[0], folders: folders });
    },

    afterGetCourse(courses) {
      thePage.setData({ courses: courses });
    },

    success() {
      showSuccess();
    },

    fail(error) {
      showModel('初始化失败', error);
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

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = function (text) {
  if (text == null || text == '') {
    wx.hideToast();
  } else {
    wx.showToast({
      title: text,
      icon: 'success'
    });

  }
};

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

function goToTaskDetail() {
  wx.navigateTo({
    url: '/pages/taskDetail/taskDetail',
  })
}