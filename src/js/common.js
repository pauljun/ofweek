export const lookUrl = "http://live.ofweek.com/static/web/wap/live/assets/"
export const look = ['调皮','憨笑','呲牙','偷笑','大兵','色','惊恐','疑问','晕','惊讶','再见','玫瑰','抱拳','握手','OK','强','胜利','咖啡']
//表情过滤正则
export const rex = /\[(.+?)\]/g

//表情地址
export const lookStr = {
	'[调皮]':'smile',	
	'[憨笑]':'biggrin',
	'[呲牙]':'lol',
	'[偷笑]':'titter',
	'[大兵]':'db',
	'[色]':'se',
	'[惊恐]':'jk',
	'[疑问]':'yiw',
	'[晕]':'yun',
	'[惊讶]':'shocked',
	'[再见]':'zj',
	'[玫瑰]':'mg',
	'[抱拳]':'bq',
	'[握手]':'handshake',
	'[OK]':'OK',
	'[强]':'qiang',
	'[胜利]':'victory',
	'[咖啡]':'kf'
}
// 获取时间戳
export function newDate(){
	return new Date().getTime()
}

// 表情过滤
export function lookimg(value){
	let val = value.replace(rex,function(d){
		var str = d.replace(/[\[\]]/g,'');
		if($.inArray(str,look) != -1)
        	return '<img src="http://live.ofweek.com/static/web/wap/live/assets/'+lookStr[d]+'.png" >'
		else 
			return d
	})
    return val
}

// 时间戳转换为时间
export function dataTime(value,num = 0){
    var time = new Date(value)
//	var time = value
    var mon = time.getMonth()+1
    let y = time.getFullYear()
    let t = mon >= 10 ? mon : '0' + mon
    let d = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
    let h = time.getHours() >= 10  ? time.getHours() : '0' + time.getHours()
    let m = time.getMinutes() >= 10  ? time.getMinutes() : '0' + time.getMinutes()
    let s = time.getSeconds() >= 10  ? time.getSeconds() : '0' + time.getSeconds()

	if(num == 0)
    	var fomart = y+'-'+t+'-'+d+' '+h+':'+m+':'+s
	else
		var fomart = h+':'+m+':'+s+' '+y+'-'+t+'-'+d
    return fomart
}

// 返回请求string
export function getString(msgNo,obj){
	switch (msgNo) {
		case '0100': 			//login
			let url = '1'+msgNo+'{"timestamp":'+newDate()
			+',"body":{"loginType":'+obj.loginType
			+',"userId":'+obj.userId+',"roomId":'+obj.roomId
			+',"nonce":"'+obj.nonce
			+'","mode":'+obj.mode
			+',"ak":"'+obj.ak+'"},"msgId":""}'
			return url
			break;
        //获取房间基本信息
		case '0300': 			
			let url1 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
			return url1
			break;
        //群聊发送
        case '0200':         
            let url2 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.val+'"},"msgId":""}'
            return url2
            break;
        //获取群聊历史消息
        case '0201':
            let url3 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":"'+obj.start+'","size":"'+obj.size+'"},"msgId":""}'
            return url3
            break
        //房间图文列表
        case '0340':
            let url4 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":'+obj.start+',"size":'+obj.size+'},"msgId":""}'
            return url4
            break
        //获取ppt详情
        case '0321':
            let url5 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"id":"'+obj.id+'"},"msgId":""}'
            return url5
            break          
        //查看视频信息
        case '0331':
            let url6 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url6
            break
        //观众登记
        case '0105':
            let url7 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url7
            break
        //在线用户列表
        case '0120':
            let url8 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url8
            break
        //获取客服列表
        case '0301':
            let url9 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url9
            break
        //获取联系人联系方式
        case '0304':
            let url10 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url10
            break
	}
}

