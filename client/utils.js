// 时间格式转换 yyyy/mm/dd
function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份         
    "d+": date.getDate(), //日         
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
    "H+": date.getHours(), //小时         
    "m+": date.getMinutes(), //分         
    "s+": date.getSeconds(), //秒         
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
    "S": date.getMilliseconds() //毫秒         
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
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
  formatDate: formatDate,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  typeOf: Type,
  isEmpty: isEmpty,
  getDay_zh: getDay_zh,
}
