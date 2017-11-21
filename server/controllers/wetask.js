const { message: { checkSignature } } = require('../qcloud')
const configs = require('../config')
const taskdb = require('knex')({
  client: 'mysql',
  connection: {
    host: configs.taskdb.host,
    port: configs.taskdb.port,
    user: configs.taskdb.user,
    password: configs.taskdb.pass,
    database: configs.taskdb.db,
    charset: configs.taskdb.char
  }
})

/**
 * 响应 enumscheme 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {

  var verifyResult = verify_request(ctx);

  // 用户是否登录
  var uid = verifyResult == "" ? ctx.state.$wxInfo.userinfo.openId : "devtest";

  // 获得命令执行的参数
  const { table, id } = ctx.query;

  // 获得查询结果
  var result = await taskdb("wetask_" + table).where({ uid });
  ctx.body = result;
}

/**
 * 验证请求
 */
function verify_request(ctx) {
  // 检查签名，确认是微信发出的请求
  const { signature, timestamp, nonce } = ctx.query;
  if (!checkSignature(signature, timestamp, nonce)) return 'ERR_WHEN_CHECK_SIGNATURE';
  if (ctx.state.$wxInfo.loginState != 1) return 'USER_HAS_NOT_LOGIN';

  return '';
}

module.exports = {
  get
}