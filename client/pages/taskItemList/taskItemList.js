// 引入 wetask SDK
var wetask = require('../../vendor/wetask-k12-sdk/index');

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入通用脚本
var common = require('../../common.js');

// 引入工具脚本
var util = require('../../utils.js');

var anim = require('../../vendor/wetask-k12-sdk/lib/animation.js')

// 注册事件
var onfire = require("../../vendor/wetask-k12-sdk/lib/onfire.js");

// 用户保存当前页面引用
var thatPage;

// 当添加新作业块消息被传递时，做具体的事
var eventObj = onfire.on('change_item_detail', function (data) {

  // 判断是否为作业块对象
  if (thatPage == null || data == null) return;

  const { TaskItem } = data;
  if (TaskItem == null) return;

  // 更新作业项视图
  op_Item4CourseGroup(thatPage, TaskItem.id, TaskItem.CourseId, function (itemIndex, course) {

    // 显示用时
    TaskItem.DisplayTime = getTaskItemSpendDisplayTime(TaskItem.SpendSecond);
    course.TaskItems[itemIndex] = TaskItem;
  })

});

// 页面函数，传入一个object对象作为参数
Page(createPageObject());

// 创建页面对象
function createPageObject() {
  var obj = new Object();
  obj.data = {
    Courses: {},
    TaskBlock: {},
    TaskItems: {},
    Item4Course: {},
    AddNewTaskPromotion: "",  // 添加作业的提示文字，为空的时候，可以出现提示 “添加作业”

    // 工具页面展开
    IsExpand: true,
  };

  obj.onLoad = onLoad;
  obj.onUnload = function (event) {
    onfire.un('change_item_detail');
    onfire.un(eventObj);
  };

  obj.onTouchMove = onTouchMove;
  obj.onEditTaskItems = onEditTaskItems;
  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.onRemoveTaskItem = onRemoveTaskItem;

  obj.onTapItem = onTapItem;
  obj.onTapTopBar = onTapTopBar;

  return obj;
}

/**
 * 页面载入事件
 */
function onLoad(options) {
  const { BlockId, IsNewBlock } = options;
  var thePage = this;
  thatPage = this;

  common.showBusy("载入作业");

  wetask.getTaskItems({
    BlockId: BlockId,

    success(result) {
      const { TaskBlock, TaskItems, Courses } = result.data;

      wx.setNavigationBarTitle({
        title: `${TaskBlock.BlockName} ${TaskBlock.FolderName}`
      })

      // 作业项目按照课程排序
      var item4Course = groupItemByCourse(TaskItems, Courses);
      thePage.setData({ TaskBlock, TaskItems, Courses, Item4Course: item4Course });

      // 如果是新的作业块，触发新建作业块事件
      if (IsNewBlock) {
        onfire.fire('add_new_block', TaskBlock);
      }

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
  taskItems.sort(function (a, b) { return a.CourseId - b.CourseId; });
  var item4Course = new Array();

  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    course.SpendTime = 0;  // 课程花费的时间
    course.DoneItemCount = 0; // 完成的作业项数量

    course.TaskItems = getTaskItemsByCourse(taskItems, course);
    course.TaskItems.forEach(x => {
      // 显示用时
      x.DisplayTime = getTaskItemSpendDisplayTime(x.SpendSecond);

      // 合计课程用时
      course.SpendTime = course.SpendTime + x.SpendSecond;
      if (x.IsCompleted) course.DoneItemCount = course.DoneItemCount + 1;
    });

    course.SpendTimeDisplay = getTaskItemSpendDisplayTime(course.SpendTime);
    course.ItemCount = course.TaskItems.length;
    item4Course.push(course);
  }

  return item4Course;
}

// 获得一个课程的作业项
// taskItems 按照CourseId,升序排序
function getTaskItemsByCourse(taskItems, course) {
  var start = taskItems.findIndex(function (a) { return a.CourseId == course.id; });
  var end = taskItems.findIndex(function (a) { return a.CourseId > course.id; });

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
    BlockId: thePage.data.TaskBlock.id,
    FolderId: thePage.data.TaskBlock.FolderId,
    ItemTitle: event.detail.value,

    success(result) {
      const { TaskItem } = result.data;

      // 添加到作业列表
      var taskItems = thePage.data.TaskItems;
      var courses = thePage.data.Courses;
      taskItems.push(TaskItem);

      // 作业项目按照课程排序
      var item4Course = groupItemByCourse(taskItems, courses);
      thePage.setData({ TaskItems: taskItems, Item4Course: item4Course, AddNewTaskPromotion: "" });

      common.showSuccess();
    },

    fail(error) {
      common.showModel('添加作业项失败', error);
      console.log('添加作业项失败', error);
    }

  });

}

// 编辑作业项事件
function onEditTaskItems(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  op_Item4CourseGroup(this, itemid, courseid, function (itemIndex, course) {
    var item = course.TaskItems[itemIndex];
    item.EnableRemove = !item.EnableRemove;
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
        // 从课程视图数组中删除
        course.TaskItems.splice(itemIndex, 1);
      });

      op_TaskItems(thePage, itemid, function (idx) {
        // 从作业数组中删除
        thePage.data.TaskItems.splice(idx, 1);
      });

      common.showSuccess();
    },

    fail(error) {
      common.showModel('删除作业项失败', error);
      console.log('删除作业项失败', error);
    }
  });

}

// 操作作业项数据集 - 课程视图
function op_Item4CourseGroup(thePage, itemId, courseId, callback) {
  var itemGroup = thePage.data.Item4Course;
  var courseIndex = itemGroup.findIndex(function (x) { return x.id == courseId; });

  if (courseIndex < 0) return;
  var course = itemGroup[courseIndex];

  var itemIndex = course.TaskItems.findIndex(function (x) { return x.id == itemId; });
  if (itemIndex < 0) return;

  callback(itemIndex, course);

  thePage.setData({ Item4Course: itemGroup });
}

// 操作作业项数据集 - 原始数据集
function op_TaskItems(thePage, itemId, callback) {
  var taskItems = thePage.data.TaskItems;

  var idx = taskItems.findIndex(function (x) { return x.id == itemId; });
  if (idx < 0) return;

  callback(idx);
  thePage.setData({ TaskItems: taskItems });
}

// 点击作业项目，有两种操作，如果是remove状态，则是取消remove;否则是进入细节
function onTapItem(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  op_Item4CourseGroup(this, itemid, courseid, function (itemIndex, course) {
    var item = course.TaskItems[itemIndex];
    if (item.EnableRemove) {
      // 取消删除状态
      item.EnableRemove = false;
    } else {
      //  导航到作业项细节页面
      var url = util.buildUrlWithObjectParams("/pages/taskItemDetail/taskItemDetail", item);
      //var url = `/pages/taskItemDetail/taskItemDetail?ItemId=${item.id}`;
      wx.navigateTo({ url });
    }

  });

}

// 作业项的用时显示
function getTaskItemSpendDisplayTime(sec) {
  var dt = new Date();
  var zone = dt.getTimezoneOffset();
  dt.setTime(sec * 1000 + zone * 60 * 1000);

  return util.formatDate(dt, "H:mm");
}

//
// 动画
//

// 点击顶部栏目
function onTapTopBar(event) {
  var action = anim.getExpandAction(this.data.IsExpand, 120);
  this.setData({ ExpandAction: action, IsExpand: !this.data.IsExpand });
}

// 
function onTouchMove(event) {
  console.log(event);
}