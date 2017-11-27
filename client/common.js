// 通用的脚本

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = function (text) {
  if (text == null || text == '') {
    wx.hideToast();
  } else {
    wx.showToast({
      title: text,
      icon: 'success'
    });
  }
};

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

module.exports = {
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
}