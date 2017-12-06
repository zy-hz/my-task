// pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuthorized: false
  },

  // 点击用户授权
  doGetUserInfo: function (options) {
    if (options.detail.userInfo != null) {
      wx.reLaunch({
        url: '/pages/taskBlock/taskBlock',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '授权',
    })
    var thePage = this;
   
    wx.getSetting({
      success(res) {
        var isAuth = res.authSetting['scope.userInfo'];
        thePage.setData({ hasAuthorized: isAuth });
      }
    })
  },

})