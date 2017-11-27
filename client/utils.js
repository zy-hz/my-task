// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}

// 两位数自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 两位数以内的数字自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 计算变化多少天后的日期
function DateAddDay(d, days) {
  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {
  var d = new Date(d);
  return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
  var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
  return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

function isEmpty(obj) {
  for (var i in obj) return false;
  return true;
}

// 获得中文的星期
function getDay_zh(obj) {
  var week = obj.getDay();
  if (week == 1) return "星期一";
  if (week == 2) return "星期二";
  if (week == 3) return "星期三";
  if (week == 4) return "星期四";
  if (week == 5) return "星期五";
  if (week == 6) return "星期六";
  return "星期天";
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  typeOf: Type,
  addZero: formatNumber,
  isEmpty: isEmpty,
  getDay_zh: getDay_zh,
}
