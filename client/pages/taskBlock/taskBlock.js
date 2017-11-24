// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

var utils = require('../../vendor/wetask-k12-sdk/lib/utils.js');

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
    blocks: {},

    currentFolder: { FolderName: "正在载入作业列表..." },
    taskBlock: {},
    addNewTaskPromotion: "",  // 添加作业的提示文字，为空的时候，可以出现提示 “添加作业”

    dateList: [],   // 日历数据数组
    swiperCurrent: 0, // 日历轮播正处在哪个索引位置
    dateCurrent: new Date(),  // 正选择的当前日期
    dateCurrentStr: '', // 正选择日期的 id
    dateMonth: '1月',  // 正显示的月份
    dateListArray: ['日', '一', '二', '三', '四', '五', '六'],

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
  initDate();
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


// 日历组件部分
// ----------------------------
function initDate() {
  var d = new Date();
  var month = utils.addZero(d.getMonth() + 1),
    day = utils.addZero(d.getDate());
  for (var i = -3; i <= 3; i++) {
    updateDate(utils.DateAddDay(d, i * 7));
  }
  this.setData({
    swiperCurrent: 3,
    dateCurrent: d,
    dateCurrentStr: d.getFullYear() + '-' + month + '-' + day,
    dateMonth: month + '月',
  });
}

// 获取这周从周日到周六的日期
function calculateDate(_date) {
  var first = utils.FirstDayInThisWeek(_date);
  var d = {
    'month': first.getMonth() + 1,
    'days': [],
  };
  for (var i = 0; i < 7; i++) {
    var dd = utils.DateAddDay(first, i);
    var day = utils.addZero(dd.getDate()),
      month = utils.addZero(dd.getMonth() + 1);
    d.days.push({
      'day': day,
      'id': dd.getFullYear() + '-' + month + '-' + day,
    });
  }
  return d;
}

// 更新日期数组数据
function updateDate(_date, atBefore) {
  var week = calculateDate(_date);
  if (atBefore) {
    this.setData({
      dateList: [week].concat(this.data.dateList),
    });
  } else {
    this.setData({
      dateList: this.data.dateList.concat(week),
    });
  }
}

// 日历组件轮播切换
function dateSwiperChange(e) {
  var index = e.detail.current;
  var d = this.data.dateList[index];
  this.setData({
    swiperCurrent: index,
    dateMonth: d.month + '月',
  });
}

// 获得日期字符串
function getDateStr (arg) {
  if (utils.type(arg) == 'array') {
    return arr[0] + '-' + arr[1] + '-' + arr[2] + ' 00:00:00';
  } else if (utils.type(arg) == 'date') {
    return arg.getFullYear() + '-' + (arg.getMonth() + 1) + '-' + arg.getDate() + ' 00:00:00';
  } else if (utils.type(arg) == 'object') {
    return arg.year + '-' + arg.month + '-' + arg.day + ' 00:00:00';
  }
}

// 点击日历某日
function chooseDate(e) {
  var str = e.target.id;
  this.setData({ dateCurrentStr: str, });
}