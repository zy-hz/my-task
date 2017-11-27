// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    courses: {},
    taskBlock: {},
    taskItems: {},
    item4Course: {},
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
  common.showBusy("载入作业");

  wetask.getTaskItems({
    BlockId: options.BlockId,

    success(result) {
      const { taskBlock, taskItems, courses } = result.data;
      thePage.setData({ taskBlock, taskItems, courses });

      // 作业项目按照课程排序
      var item4Course = groupItemByCourse(taskItems);
      item4Course = addNotUsedCourse(item4Course, courses);

      thePage.setData({ item4Course });
      common.showSuccess();
    },

    fail(error) {
      common.showModel('初始化失败', error);
      console.log('初始化失败', error);
    }
  });
}

// 作业条目按照课程分组
function groupItemByCourse(taskItems) {
  taskItems = taskItems.sort(function (a, b) { return a.course_id < b.course_id; });

  var curCourse = {};
  var curItems = new Array();
  var itemGroup = new Array();

  for (var i = 0; i < taskItems.length; i++) {
    var it = taskItems[i];
    if (curCourse.name != it.CourseName) {
      if (curCourse.name != null) {
        itemGroup.push({ courseName: curCourse.name, courseId: curCourse.id, taskItems: curItems });
      }

      curCourse = { name: it.CourseName, id: course_id };
      curItem = new Array();
    }

    curItem.push(it);
  }

  if (curCourse.name != null) itemGroup.push({ courseName: curCourse.name, courseId: curCourse.id, taskItems: curItems });
  return itemGroup;
}

// 添加没有使用过的课程
function addNotUsedCourse(itemGroup, courses) {
  courses.forEach(function (element) {
    var cname = element.CourseName;
    if (itemGroup.findIndex(function (it) { return it.CourseName == cname; }) < 0) {
      itemGroup.push({ courseName: cname, courseId: element.id });
    }
  });

  return itemGroup;
}

// 添加一个新作业条目
function doAddNewTaskItem(event) {
  if (event.detail.value == "") return;
  var taskBlock = wetask.addNewTaskItem(this.data.taskBlock, event.detail.value, event.target.dataset.course);

  this.setData({ taskBlock });
  this.setData({ addNewTaskPromotion: "" });
}

function goToTaskDetail() {
  wx.navigateTo({
    url: '/pages/taskDetail/taskDetail',
  })
}