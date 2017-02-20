import {getString} from './common'
export const chatSize = 20		//初始化历史记录显示条数
export const picSize = 10       //初次加载图文列表显示条数

export default function(){
    //发送登录信息
    let url = getString('0100',userLogin)
    webSocket.send(url)

    // 获取房间基本信息
    let roomMes = getString('0300')
    webSocket.send(roomMes)

    //获取客服列表
    let userUrl = getString('0301')
    webSocket.send(userUrl)

    //获取群聊历史记录
    let historyUrl = getString('0201',{"start":0,"size":chatSize})
    webSocket.send(historyUrl)

    //获取房间图文列表
    let picUrl = getString('0340',{"start":0,"size":picSize})
    webSocket.send(picUrl)

    //用户在线列表
    let onlineUrl = getString('0120')
    //console.log(onlineUrl)
    //webSocket.send(onlineUrl)

    //获取联系人信息
    let aboutUrl = getString('0304')
    webSocket.send(aboutUrl)
}