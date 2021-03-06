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
var eventObj;

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

  };

  obj.onLoad = onLoad;
  obj.onUnload = function (event) {
    onfire.un('change_item_detail');
  };


  obj.onEditTaskItems = onEditTaskItems;
  obj.onBack = onBack;
  obj.doAddNewTaskItem = doAddNewTaskItem;
  obj.onRemoveTaskItem = onRemoveTaskItem;
  obj.onTapItem = onTapItem;

  // 工具栏面板事件
  obj.onChangeEditMode = function (event) { changeEditMode(this) };

  return obj;
}

/**
 * 页面载入事件
 */
function onLoad(options) {
  const { BlockId, IsNewBlock } = options;
  var thePage = this;
  thatPage = this;

  // 当添加新作业块消息被传递时，做具体的事
  eventObj = createEventObject();

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

      // 开始编辑作业块
      onfire.fire('begin_edit_block', TaskBlock.id);

      // 如果至少有一个作业项，启动折叠模式
      if (TaskItems.length > 0) {
        changeEditMode(thePage);
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

  common.showLoading();

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

      common.hideLoading();
    },

    fail(error) {
      common.showModel('添加作业项失败', error);
      console.log('添加作业项失败', error);
    }

  });

}

// 开始批量编辑
function onBack(event){
  wx.navigateBack();
}

// 编辑作业项事件,显示删除按钮
function onEditTaskItems(event) {
  const { itemid, courseid } = event.currentTarget.dataset;
  if (itemid < 0 || courseid < 0) return;

  // 没有启动编辑模式
  if (this.data.EnableEditMode == false) return;

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
  common.showLoading()
  wetask.deleteTaskItem({
    ItemId: itemid,
    BlockId: thePage.data.TaskBlock.id,

    success() {
      op_TaskItems(thePage, itemid, function (idx) {
        // 从作业数组中删除
        thePage.data.TaskItems.splice(idx, 1);
      });

      // 作业项目按照课程排序
      var item4Course = groupItemByCourse(thePage.data.TaskItems, thePage.data.Courses);
      thePage.setData({ Item4Course: item4Course });

      common.hideLoading();
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

// 创建事件对象
// 作业项的内容发生改变
function createEventObject() {
  return onfire.on('change_item_detail', function (data) {

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
}

//
// 工具面板事件
//
function changeEditMode(thePage) {
  // 检查动画过程是否完成
  var animationDone = thePage.data.animationDone;
  if (animationDone == false) return;

  // 标记为动画过程开始，防止其他点击事件进入
  thePage.data.animationDone = false;

  var mode = thePage.data.EnableEditMode;
  if (mode == null) mode = true; // 表示当前编辑模式为开启状态

  var item4Course = thePage.data.Item4Course;

  for (var i = 0; i < item4Course.length; i++) {
    var course = item4Course[i];
    if (course.ItemCount == 0) {
      // 设置课程的折叠
      course.FolderCourseAction = mode;
    }
    else {
      var folderAction = createFolderAction(mode, 42);
      course.FolderInputAction = folderAction.export();
    }
  }

  thePage.setData({ Item4Course: item4Course, EnableEditMode: !mode });

  setTimeout(function () {
    // 标记动画完成
    thePage.data.animationDone = true;

    // 清除动画
    for (var i = 0; i < item4Course.length; i++) {
      var course = item4Course[i];
      if (course.ItemCount > 0) {
        course.FolderInputAction = {};
      }
    }
    // 不用通知界面刷新
    thePage.data.Item4Course = item4Course;

  }, 1000);
}

function createFolderAction(mode, ty) {
  var anim = wx.createAnimation({
    duration: 400,
  });

  if (mode) {
    anim.height(ty).opacity(0).step().height(0).step();
  }
  else {
    anim.height(ty).step().opacity(1).step();
  }
  return anim;
}
