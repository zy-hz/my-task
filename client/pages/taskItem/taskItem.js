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
      var item4Course = groupItemByCourse(taskItems, courses);

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
function groupItemByCourse(taskItems, courses) {
  taskItems = taskItems.sort(function (a, b) { return a.course_id > b.course_id; });
  var item4Course = new Array();

  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    course.taskItems = getTaskItemsByCourse(taskItems, course);
    course.itemCount = Array.isArray(course.taskItems) ? course.taskItems.length : 0 ;
    item4Course.push(course);
  }

  return item4Course;
}

// 获得一个课程的作业项
// taskItems 按照course_id,升序排序
function getTaskItemsByCourse(taskItems, course) {
  var start = taskItems.findIndex(function (a) { return a.course_id == course.id; });
  var end = taskItems.findIndex(function (a) { return a.course_id > course.id; });

  if (start < 0 ) return {};
  if (end < 0) end = taskItems.length;

  return taskItems.slice(start, end)
}

// 添加一个新作业条目
function doAddNewTaskItem(event) {
  if (event.detail.value == "") return;
  var thePage = this;

  wetask.addNewTaskItem({
    CourseId: event.target.id,
    BlockId: thePage.data.taskBlock.id,
    FolderId: thePage.data.taskBlock.folder_id,
    ItemTitle: event.detail.value,

    success(result) {
      const { itemId } = result.data;

      thePage.setData({ addNewTaskPromotion: "" });
      common.showSuccess();
    },

    fail(error) {
      common.showModel('添加作业项失败', error);
      console.log('添加作业项失败', error);
    }

  });

}

function goToTaskDetail() {
  wx.navigateTo({
    url: '/pages/taskDetail/taskDetail',
  })
}