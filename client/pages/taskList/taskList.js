// pages/taskList/taskList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goToIndex: function (e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})