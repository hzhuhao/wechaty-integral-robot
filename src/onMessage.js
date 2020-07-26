const postServer = require('./postServer');

// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(
      `from: ${msg.from() ? msg.from().name() : null}: ${
      msg.from() ? msg.from().id : null
      }`
    )
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log(`isRoom: ${msg.room()}`)
    console.log("=============================")
    // 判断此消息类型是否为文本

    // 判断消息类型来自群聊
    if (msg.room()) {
      // 获取群聊
      postServer.roomMsg(bot, msg)  //群聊消息的处理

    } else {  //私聊
      postServer.personMsg(bot, msg);  //私聊消息的处理
    }
  }
}


