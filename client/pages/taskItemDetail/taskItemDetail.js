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
    DisplayTime: {},
    SpendSecond: 0,
  };

  obj.onLoad = onLoad;
  return obj;
}

// 页面载入
function onLoad(options) {
  const { CourseName, ItemTitle, SpendSecond } = options;

  var DisplayTime = getDisplayTime(SpendSecond);
  this.setData({ CourseName, ItemTitle, SpendSecond, DisplayTime });
}

function getDisplayTime(sec) {
  var dt = new Date();
  var zone = dt.getTimezoneOffset();
  dt.setTime(sec * 1000 + zone * 60 * 1000);
  
  var Hour = dt.getHours() + "";
  var min = dt.getMinutes();
  
  return { hour: , minute: , second: dt.getSeconds() };
}