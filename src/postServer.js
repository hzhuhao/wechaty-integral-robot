
const fs = require('fs');

// node-request请求模块包
const request = require("request")
// 请求参数解码
const urlencode = require("urlencode")
// 配置文件
const config = require("../config/config")
// 机器人名字
const name = config.name
// 管理群组列表
const roomList = config.room.roomList

const integral = require('./integral');

async function roomMsg(bot, msg) {
  const room = await msg.room()
  const from = msg.from() ? msg.from().name() : null
  const fromId = msg.from().id
  const toUser = msg.to()
  const text = msg.text()
  console.log('群聊', room.id)
  console.log(`from: ${from}`)
  console.log(`fromId: ${fromId}`)
  console.log(`toUser: ${toUser}`)
  console.log(`text: ${text}`)
  console.log(`isRoom: ${msg.room()}`)
  console.log("=============================")
  integral.addScore(bot, msg)
}


async function personMsg(bot, msg) {
  // 回复信息是关键字 “加群”
  if (await isAddRoom(msg)) return

  // 回复信息是所管理的群聊名
  if (await isRoomName(bot, msg)) return

  // 请求机器人聊天接口
  console.log('问机器人：', msg.text())
  let res = await requestRobot(msg.text())
  // 返回聊天接口内容
  console.log('问机器人say：', res)
  await msg.say(res)
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
  console.log(info)
  return new Promise((resolve, reject) => {
    info = info.trim();
    let url = `http://api.tianapi.com/txapi/robot/index?key=${config.TXAPIKEY}&question=${urlencode(info)}`
    console.log('地址', url)
    request(
      url
      , (error, response, body) => {
        console.log(error)
        if (!error && response.statusCode == 200) {
          try {
            let res = JSON.parse(body)
            if (res.msg == 'success') {
              let send = res.newslist[0].reply
              /* 去掉天行api里的br标签 */
              let sendArr = send.split('<br/>');
              console.log('去掉', sendArr)
              let result = ``;
              sendArr.forEach(value => {
                console.log('每一次', value)
                result = result + value + `\n`;
              })
              /* 去掉天行api里的br标签 */

              result = result.replace(/{robotname}/g, config.name);

              resolve(result)
            } else {
              if (res.code == 1010) {
                resolve("没事别老艾特我，我还以为爱情来了")
              } else {
                resolve("你在说什么，我听不懂")
              }
            }
          } catch (error) {
            console.log('天行机器人返回出错了', body);
            resolve("你在说什么，我听不懂")
          }

        } else {
          resolve("你在说什么，我脑子有点短路诶！")
        }
      })
  })
}


/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
  // 关键字 加群 处理
  if (msg.text() == "加群") {
    let roomListName = Object.keys(roomList)
    let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`
    roomListName.map(v => {
      info += "【" + v + "】" + "\n"
    })
    msg.say(info)
    return true
  }
  return false
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
  // 回复信息为管理的群聊名
  if (Object.keys(roomList).some(v => v == msg.text())) {
    // 通过群聊id获取到该群聊实例
    const room = await bot.Room.find({ id: roomList[msg.text()] })

    // 判断是否在房间中 在-提示并结束
    if (await room.has(msg.from())) {
      await msg.say("您已经在房间中了")
      return true
    }

    // 发送群邀请
    await room.add(msg.from())
    await msg.say("已发送群邀请")
    return true
  }
  return false
}
module.exports = {
  roomMsg,
  personMsg
}


