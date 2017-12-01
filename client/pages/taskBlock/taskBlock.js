// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 注册事件
var onfire = require('../../vendor/wetask-k12-sdk/lib/onfire.js');

// 用户保存当前页面引用
var thatPage;

// 当添加新作业块消息被传递时，做具体的事
var eventObj = onfire.on('add_new_block', function (taskBlock) {
  // 判断是否为作业块对象
  if (taskBlock == null || taskBlock.BlockName == null || thatPage == null) return;

  var blockGroup = thatPage.data.blocks;
  blockGroup.unshift(taskBlock);

  thatPage.setData({ blocks: blockGroup });
});

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    blocks: {},
    courses: {},
    folders: {},

    taskBlock: {},
  };

  obj.onLoad = onLoad;
  obj.onUnload = function (event) {
    onfire.un('add_new_block');
    onfire.un(eventObj);
   };

  obj.doAddTaskBlock = doAddTaskBlock;

  return obj;
}

/**
 * 页面载入事件
 */
function onLoad(options) {
  options.thePage = this;
  thatPage = this;

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
      common.showModel('获取设置失败');
      console.log('获取设置失败');
    }
  })

}

// 登录过程
function doLogin(options) {

  common.showBusy('正在登录');

  // 页面载入前必须清除seesion，强制qcloud重新登录
  qcloud.clearSession();
  // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
  qcloud.login({
    success(result) {
      init(options.thePage);
    },

    fail(error) {
      common.showModel('登录失败', error);
      console.log('登录失败', error);
    }
  });
}

// 初始化
function init(thePage) {
  common.showBusy("获取数据");
  wetask.init({

    success(result) {
      const { folders, blocks, courses } = result.data;

      thePage.setData({ folders: folders });
      thePage.setData({ courses: courses });
      thePage.setData({ blocks: blocks });

      common.showSuccess();
    },

    fail(error) {
      common.showModel('初始化失败', error);
      console.log('初始化失败', error);
    }
  });
}

// 添加一个作业块
function doAddTaskBlock(options) {
  wx.navigateTo({
    url: '/pages/createBlock/createBlock',
  })
}
