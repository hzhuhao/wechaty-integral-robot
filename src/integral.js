const config = require("../config/config")
const { req } = require('./superagent');

/**
 * 解析响应数据
 * @param {*} content 内容
 */
function parseBody(content) {
    if (!content) return;
    return JSON.parse(content.text);
}

async function addScore(bot, msg) {
    const text = msg.text();
    const room = msg.room();
    const from = msg.from() ? msg.from().name() : null
    // 查找谁是群主
    const owner = room.owner()
    console.log("==============积分兑换start ===============")
    console.log('群主owner是：', owner.name())
    if (from.includes(owner.name())) {
        if (text.includes("@")) {
            if (text.includes("积分")) {
                const txtArr = text.split('积分');
                const user_name = txtArr[0].replace('@', "").trim();
                console.log('获得积分用户：', user_name)
                let option = {
                    method: 'GET',
                    url: config.servehost + '/wxuser/get',
                    params: {name:user_name}
                };
                //console.log(option)
                let res = await req(option);
                let content = parseBody(res);
                console.log('结果是：',content)

                let oldScore = parseInt(content.score);
                // 获取积分
                const score = parseInt(txtArr[1])
                console.log('获得积分：', score)

                let newScore = oldScore + score;
                
                content.score = newScore;
                let newData = content

                let option2 = {
                    method: 'POST',
                    url: config.servehost + '/wxuser/update',
                    params: newData
                };

                let res2 = await req(option2);
                let content2 = parseBody(res2);
                console.log('新结果是：',content2)
                const contactUser = await bot.Contact.find({ name: user_name })
                // 公布积分结果
                const scoreMsg = `恭喜成功获得${score}积分 \n 当前积分: ${newScore} \n 积分福利: 满30分送一份水果`
                console.log('获得详情：', scoreMsg)
                await room.say(scoreMsg, contactUser)
            }
        }
    }
    console.log("==============积分兑换end ===============")
}
module.exports = {
    addScore
}


