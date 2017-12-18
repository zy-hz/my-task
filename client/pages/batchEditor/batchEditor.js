// 引入通用脚本
var common = require('../../common.js');

// 引入工具脚本
var util = require('../../utils.js');

// 注册事件
var onfire = require("../../vendor/wetask-k12-sdk/lib/onfire.js");

// 用户保存当前页面引用
var thatPage;
var eventObj;

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();

  obj.onLoad = onLoad;
  obj.onUnload = function (event) {
    onfire.un('task_items_changed');
  };

  obj.onBlur = onBlur;
  obj.onInput = onInput;

  obj.onNavigateBack = onNavigateBack;
  obj.onSave = onSave;

  return obj;
}

// 页面载入
function onLoad(options) {
  var item4Course = util.getObjectFromOptions(options);
  this.setData({ CourseText: convertCourse2Text(item4Course) });
  console.log(item4Course);
}

function onBlur(event) {
  console.log(event);
}

function onInput(event) {
  console.log(event.detail);
}

function onNavigateBack(event) {
  wx.navigateBack();
}

// 保存修改
function onSave(event) {
  var item4Course = convertText2Course(this.data.CourseText);

}

// 作业内容编辑
function convertCourse2Text(item4Course) {
  var result = new Array();

  for (var i = 0; i < item4Course.length; i++) {
    var course = item4Course[i];
    var txt = convertTaskItems2Text(course.TaskItems);
    if (txt == "") continue;
    txt = `${course.CourseName}\r\n${txt}`;
    result.push(txt);
  }

  return result.join('\r\n\r\n');
}

function convertTaskItems2Text(taskItems) {
  var result = new Array();
  for (var i = 0; i < taskItems.length; i++) {
    result.push(taskItems[i].ItemTitle);
  }
  return result.join('\r\n');
}

// 文本转换为课程
function convertText2Course(txt) {
  var ary = txt.split('\r\n\r\n');
  return ary.map(line => {
    return line;
  });
}