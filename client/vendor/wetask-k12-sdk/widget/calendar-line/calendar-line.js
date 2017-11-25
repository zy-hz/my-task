var utils = require('../../lib/utils.js');


// 日历组件部分
// ----------------------------
function init(thePage) {
  var d = new Date();
  var month = utils.addZero(d.getMonth() + 1),
    day = utils.addZero(d.getDate());
  for (var i = -3; i <= 3; i++) {
    updateDate(thePage, utils.DateAddDay(d, i * 7));
  }
  thePage.setData({
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
function updateDate(thePage, _date, atBefore) {
  var week = calculateDate(_date);
  if (atBefore) {
    thePage.setData({
      dateList: [week].concat(thePage.data.dateList),
    });
  } else {
    thePage.setData({
      dateList: thePage.data.dateList.concat(week),
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
function getDateStr(arg) {
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


module.exports = {
  init
}