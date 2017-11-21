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
async function enumscheme(ctx, next) {
  // 检查签名，确认是微信发出的请求
  const { signature, timestamp, nonce } = ctx.query
  if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body

  var res = await taskdb("wetask_folder").first()
  
  ctx.body = 'success'
}

module.exports = {
  enumscheme
}