<template>
    <div class="pop" v-show="loginShow">
    	<div class="content">
    		<span @click="close">&times;</span>
    		<div class="notice"></div>
    		<p>提示</p>
    		<div>您还没有登录，无法进行操作</div>
    		<div>
    			<a :href="loginUrl">登录</a>
    			<a :href="registerUrl">注册</a>
    		</div>
    	</div>
    </div>
</template>

<script>
    export default {
		data (){
			return {
				loginUrl:'http://live.ofweek.com/wap/login?callback='+location.href,
				registerUrl:'http://www.ofweek.com/3g/registerUser3g.do?callback='+location.href
			}	
		},
		props:{
			loginShow:{
				type:Boolean
			}	
		},
		methods:{
			close:function(){
				this.$parent.loginShow = false
			}
		}
    }
</script>

<style scoped="">
	.pop{position: absolute;z-index: 12;width: 100%;height: 100%;left: 0;top: 0;background: rgba(0,0,0,.7)}
	.content{position: absolute;width: 6rem;background: #fff;z-index: 14px;left: 50%;bottom: .4rem;margin-left: -3rem;text-align: center;padding: .2rem 0 .3rem 0;}
	.notice{width: 1.12rem;height: .98rem;margin: 0 auto;background: url(../assets/notice.png) no-repeat;background-size: cover;}
	p{color: #c60000;margin: .2rem 0;}
	a{display: inline-block;width: 1.5rem;height: .5rem;line-height: .5rem;background: #c60000;color: #fff;font-size: .28rem;border-radius: .04rem;margin-top: .2rem;}
	span{position: absolute;z-index: 2;right: .16rem;top: .0rem;font-size: .8rem;color: #666;line-height: .8rem;}
</style>