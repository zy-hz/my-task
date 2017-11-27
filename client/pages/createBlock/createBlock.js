Page({
  data: {
    showTopTips: false,

    radioItems: [
      { name: '回家作业', value: '0', checked: true },
      { name: '新东方', value: '1' },
      { name: '学而思', value: '2' },
      { name: '暑假作业', value: '3' },
      { name: '寒假作业', value: '4' }
    ],

    date: "2016-09-01",
    time: "12:01",

  },

  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  radioChange: function (e) {

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
});