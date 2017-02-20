export const lookUrl = "http://live.ofweek.com/static/web/wap/live/assets/"

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
	'[OK]':'hd',
	'[强]':'qiang',
	'[胜利]':'victory',
	'[咖啡]':'kf'
}
// 获取时间戳
export function newDate(){
	return new Date().getTime()
}