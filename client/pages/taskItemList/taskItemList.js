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
  obj.onEditTaskItems = onEditTaskItems;
  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.onRemoveTaskItem = onRemoveTaskItem;

  obj.onTapItem = onTapItem;

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
  taskItems.sort(function (a, b) { return a.course_id - b.course_id; });
  var item4Course = new Array();

  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    course.taskItems = getTaskItemsByCourse(taskItems, course);
    course.taskItems.forEach(x => x.canRemove = false);
    course.itemCount = course.taskItems.length;
    item4Course.push(course);
  }

  return item4Course;
}

// 获得一个课程的作业项
// taskItems 按照course_id,升序排序
function getTaskItemsByCourse(taskItems, course) {
  var start = taskItems.findIndex(function (a) { return a.course_id == course.id; });
  var end = taskItems.findIndex(function (a) { return a.course_id > course.id; });

  if (start < 0) return new Array();
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
      const { taskItem } = result.data;
      taskItem.canRemove = false;

      var item4Course = insertItem4Group(thePage.data.item4Course, taskItem);
      thePage.setData({ item4Course, addNewTaskPromotion: "" });
      common.showSuccess();
    },

    fail(error) {
      common.showModel('添加作业项失败', error);
      console.log('添加作业项失败', error);
    }

  });

}

// 插入到视图列表
function insertItem4Group(item4Course, taskItem) {
  var courseIndex = item4Course.findIndex(function (x) { return x.id == taskItem.course_id; });
  if (courseIndex < 0) {
    common.showModel("没有发现对于对应的课程&{taskItem.CourseName}", error);
  }
  else {
    item4Course[courseIndex].taskItems.push(taskItem);
    item4Course[courseIndex].itemCount++;
  }

  return item4Course;
}

// 编辑作业项事件
function onEditTaskItems(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  op_Item4CourseGroup(this, itemid, courseid, function (itemIndex, course) {
    var item = course.taskItems[itemIndex];
    item.canRemove = !item.canRemove;
  });
}

// 删除作业项
function onRemoveTaskItem(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  var thePage = this;

  wetask.deleteTaskItem({
    ItemId: itemid,

    success() {
      op_Item4CourseGroup(thePage, itemid, courseid, function (itemIndex, course) {
        // 从数组中删除
        course.taskItems.splice(itemIndex, 1);
      });

      common.showSuccess();
    },

    fail(error) {
      common.showModel('删除作业项失败', error);
      console.log('删除作业项失败', error);
    }
  });

}

// 操作作业项数据集
function op_Item4CourseGroup(thePage, itemid, courseid, callback) {
  var itemGroup = thePage.data.item4Course;
  var courseIndex = itemGroup.findIndex(function (x) { return x.id == courseid; });

  if (courseIndex < 0) return;
  var course = itemGroup[courseIndex];

  var itemIndex = course.taskItems.findIndex(function (x) { return x.id == itemid; });
  if (itemIndex < 0) return;

  callback(itemIndex, course);

  thePage.setData({ item4Course: itemGroup });
}

// 点击作业项目，有两种操作，如果是remove状态，则是取消remove;否则是进入细节
function onTapItem(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  op_Item4CourseGroup(this, itemid, courseid, function (itemIndex, course) {
    var item = course.taskItems[itemIndex];
    if (item.canRemove) {
      // 取消删除状态
      item.canRemove = false;
    } else {
      //  导航到作业项细节页面
      var url = `/pages/taskItemDetail/taskItemDetail?ItemId=${item.id}`;
      wx.navigateTo({ url });
    }

  });

}