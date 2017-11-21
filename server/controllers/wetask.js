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
  var userId = verifyResult == "" ? ctx.state.$wxInfo.userinfo.openId : "devtest";

  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body;

  // 获得命令执行的参数
  var pms = explain_query(ctx.query);
  pms.uid = userId;

  // 获得查询结果
  var result = execute_query(pms, execute_select);

  var res = await taskdb("wetask_course");
  ctx.body = res;
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

/**
 * 解释查询参数
 */
function explain_query(query) {
  var tables = query.table.split(',');
  return {
    tables: tables,
    id: query.id
  };
}

/**
 * 执行查询获得结果
 */
function execute_query(pms, executor) {
  var resultGroup = new Array();

  var tables = pms.tables;
  tables.forEach(element => {
    var obj = new Object();
    obj[element] = executor("wetask_" + element, pms);
    resultGroup.push(obj);
  });

  return resultGroup;
}

/**
 * 执行select命令
 */
function execute_select(table, opts) {
  const { uid, id } = opts;
  return await taskdb(table).where({ uid });
}

module.exports = {
  get
}