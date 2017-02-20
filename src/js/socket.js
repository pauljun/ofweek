let num = -1;
export const port = ['80','9081'];
export const socketUrl = 'ws://nio.ofweek.com:'
export function socket() {
	num ++;
	if(num >= port.length)
		num = 0;
   	return new WebSocket(socketUrl+port[num]);
}
export function ioOnerror(obj){
	return obj.onopen
}
export function ioSend(obj){
	return obj.send
}
export function isMes(obj){
	return obj.onmessage
}