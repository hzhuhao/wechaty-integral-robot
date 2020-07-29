

module.exports = {
    token: "",  //申请的token
    
    servehost: "", // 接口服务地址
    
    name: "小助手",  // 机器人名字
    // 房间/群聊
    room: {
        // 管理群组列表
        roomList: {
            // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
            测试群: ""   //id可以把群二维码用草料二维码 解析一下就是id了
        },
        // 加入房间回复
        roomJoinReply: `\n 嗨，你好！
  
      我是群主欢迎加入水果群
      
      ❣️：温馨提示大家，群消息比较多可以设置群免打扰哦，需要就来看看。`
    },
    // 私人
    personal: {
        // 好友验证自动通过关键字
        addFriendKeywords: ["水果"],
        // 是否开启加群
        addRoom: true
    },
    TXAPIKEY: '',  //天行appid
    logFolder: './log/config.log'  //运行时部分数据存放的地址
}
