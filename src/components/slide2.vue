<template>
    <div class="slide2" id="mes">
    	<div class="content">
			<ul>
				<li v-for="i in chathistory">
					<a class="userIcon">
						<img v-if="i.author.userType==3 && i.author.isKefu" src="../assets/tx_online.png" alt="">
                        <img v-if="i.author.userType==4 && i.author.isKefu" src="../assets/tx_service.png">
                        
                        <img v-if="!i.author.isKefu" src="../assets/tx0.png" alt="">
					</a>
					<article>
						<h2>
							<a v-if="i.author.userType==3 && i.author.isKefu">【主播】{{i.author.name}}</a>
							<a v-if="i.author.userType==4 && i.author.isKefu">【客服】{{i.author.name}}</a>
							<a v-if="!i.author.isKefu">{{i.author.name}}</a>
							<span>{{i.chatTime}}</span>
						</h2>
						<p v-html=i.content></p>
					</article>
				</li>
			</ul>
			<div class="slideMore">加载更多</div>
		</div>
    </div>
</template>

<script>
import {getString} from '../js/common'
export default {
    data (){
        return{
			num:20,
        }
    },
    props:{
		chathistory:{
			type:Array
		}
    },
    mounted:function(){
		let $this = this
		//滚动加载图文直播
		$(".content").scroll(function(){
			if($(".slideMore").html() == "没有更多了" || $(".slideMore").html() == "加载中")
				return ;
			var top = $(this).scrollTop();
			var Height = $(this).height();
			var ul = this.scrollHeight;
			if(top + Height > (ul - 2)){
				$(".slideMore").show().html("加载中")
				let url = getString('0201',{"start":$this.num,"size":20})
				webSocket.send(url)
				$this.num += 20
			}
		})
    }
}
</script>
<style scoped>
	.slide2{height: 100%;position: relative;
    padding-bottom: .98rem;}
	.content{overflow-y: auto;height: 100%;}
	.slide2 ul li{padding: .2rem .24rem .3rem;position: relative;}
	article{padding-left: .76rem;word-break: break-all;}
	h2{font-size: .24rem;color: #9d9d9d;font-weight: normal;padding: .12rem 0;}
	h2 a{color: #5685bd;}
	p img{width: .64rem;}
	h2 span{float: right;}
	.userIcon{width: .6rem;height: .6rem;position: absolute;left: .24rem;top: .2rem;border-radius: 50%;overflow: hidden;}
	.userIcon img{width: 100%;}
	article p{font-size: .26rem;line-height: .36rem;}
	footer{position: absolute;z-index: 30;width: 100%;height: .98rem;background: #dbdbdb;left: 0;bottom: 0;}
	.slideMore{text-align: center;color: #666;line-height: .6rem;display: none;}
</style>

