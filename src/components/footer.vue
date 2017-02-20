<template>
    <footer v-show="active==1">
    	<div class="smile" @click=smile></div>
    	<input type="text" placeholder="说点什么" v-model=val>
    	<span @click="sendMess()">发送</span>
    	
		<!--未登录-->
    	<div v-if="loginType == 2" class="login" @click="loginShow"></div>
    	<!--未完善资料-->
    	<div v-if="ishadmeans" class="ishadmeans" @click="hadMes"></div>
    	
    	<div class="look" v-show="show">
			<ul>
				<li v-for="(val,key) in lookArr" @click="lookBtn(key)">
					<img :src="url+val+'.png'" alt="">
				</li>
			</ul>
    	</div>
    </footer>
</template>

<script>
import {lookUrl,lookStr,getString} from '../js/common'
    export default {
		name:"footer",
        data () {
            return {
				lookArr:lookStr,
				url:lookUrl,
				show:false,
				val:""
            }
        },
        props: {
			active:{
				type:Number
			},
			loginType:{
				type:Number
			},
			ishadmeans:{
				type:Boolean
			}
        },
		mounted:function(){

		},
		methods:{
			smile:function(){
				this.show = !this.show
			},
			lookBtn:function(i){
				this.val += i
				this.show = !this.show
			},
			loginShow:function(){
				this.$parent.loginShow = true
			},
			sendMess:function(){
				let ival = this.val = this.val.replace(/(^\s+)|(\s+$)/g,"");
				if(!ival){
					alert('请输入聊天内容')
					return
				}else{
					let objChat = {}
					objChat.val = this.val
					let url = getString('0200',objChat)
					webSocket.send(url)
					this.val = ''
				}
			},
			//完善资料
			hadMes:function(){
				this.$parent.hasShow = true
			}
		}
    }
</script>

<style scoped="">
	footer{position: absolute;z-index: 10;width: 100%;height: .98rem;padding: .2rem 1.48rem 0 .24rem;background: #dbdbdb;left: 0;bottom: 0;}
	input{width: 100%;background: #fff;height: .6rem;padding: .2rem .3rem .2rem .8rem;border-radius: .08rem;border: 0 none;}
	span{position: absolute;display: block;width: 1.06rem;height: .6rem;background: #c60000;color: #fff;border-radius: .08rem;text-align: center;line-height: .6rem;right: .24rem;top: .2rem;font-size: .3rem;}
	.smile{position: absolute;width: .46rem;height: .35rem;border-right: .02rem solid #dcdcdc;background: url(../assets/smile.png) no-repeat left center;background-size: .35rem .35rem;left: .47rem;top: .32rem;}
	.look{position: absolute;z-index: 10;left: 0;width:100%;bottom: .98rem;background: #fff;border-top: .02rem solid #dcdcdc;padding: .2rem 0;}
	.look li{display: inline-block;*display:inline;*zoom:1;width: .8rem;height: .8rem;line-height: .8rem;text-align: center;}
	.login,.ishadmeans{position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 5;}
	img{width: .64rem;}
</style>