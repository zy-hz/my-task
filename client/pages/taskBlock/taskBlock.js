// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入日历
var calendar = require('../../vendor/wetask-k12-sdk/widget/calendar-line/calendar-line.js')

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    blocks: {},
    courses: {},
    folders: {},

    currentFolder: { FolderName: "正在载入作业列表..." },
    taskBlock: {},
    addNewTaskPromotion: "",  // 添加作业的提示文字，为空的时候，可以出现提示 “添加作业”

  };

  obj.onLoad = onLoad;

  obj.doAddTaskBlock = doAddTaskBlock;

  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.goToTaskDetail = goToTaskDetail;


  return obj;
}

/**
 * 页面载入事件
 */
function onLoad(options) {
  options.thePage = this;

  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          success() {
            // 用户已经同意小程序使用用户信息
            doLogin(options)
          },
          fail() {
            // 用户不同意使用小程序
            wx.navigateTo({ url: '/pages/introduce/introduce' });
          }
        })
      } else {
        // 已经授权了
        doLogin(options);
      }
    },

    fail() {
      showModel('获取设置失败');
      console.log('获取设置失败');
    }
  })

}

// 登录过程
function doLogin(options) {

  showBusy('正在登录');

  // 页面载入前必须清除seesion，强制qcloud重新登录
  qcloud.clearSession();
  // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
  qcloud.login({
    success(result) {
      init(options.thePage);
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

    success(result) {
      const { folders, blocks, courses } = result.data;

      thePage.setData({ currentFolder: folders[0], folders: folders });
      thePage.setData({ courses: courses });
      thePage.setData({ blocks: blocks });

      showSuccess();
    },

    fail(error) {
      showModel('初始化失败', error);
      console.log('初始化失败', error);
    }
  });
}

// 添加一个作业块
function doAddTaskBlock(options) {
  console.log(options);
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

