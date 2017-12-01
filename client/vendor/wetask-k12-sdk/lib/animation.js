/**
 * @method
 * 初始化，组合多个请求
 *
 * @param {Object} options.Animation 动画对象
 * @param {Object} options.IsCollapsed 是否折叠
 * @param {Object} options.StepLength 折叠长度
 */
function getExpandAction(isExpand,steps) {

  var anim = wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
  });

  var ty = isExpand ? steps * -1 : 0 ;
  anim.translateY(ty).step();

  return anim.export();
}


module.exports = {
  getExpandAction: getExpandAction,
}
