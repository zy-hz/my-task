// pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuthorized: false,
    NoticeTitle: "嗨，",
    NoticeContent: "我们在产品中需要用到您在微信上的公开信息，比如：昵称和头像。请前往授权。",
  },

  // 点击用户授权
  doGetUserInfo: function (options) {
    if (options.detail.userInfo != null) {
      wx.reLaunch({
        url: '/pages/taskBlock/taskBlock',
      })
    }
    else {
      this.setData({
        NoticeTitle: "亲，",
        NoticeContent: "您可以点击取消按钮，前往产品的体验版本。如果您觉得有必要，可以回来给我们授权。",
      });
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