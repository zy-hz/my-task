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

  return obj;
}

// 页面载入
function onLoad(options){
  var item4Course = util.getObjectFromOptions(options);
  console.log(item4Course);
}

function onBlur(event){
  console.log(event);
}

function onInput(event){
  console.log(event.detail);
}