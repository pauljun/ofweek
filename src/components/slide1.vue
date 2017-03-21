<template>
<div class="living">
	<div class="rq"><span></span>{{val}}</div>
	<div class="ul-list">
		<ul>
			<li v-for="i in room">
				<h3>
					<span class="fl"></span>
					{{i.createDate}}
				</h3>
				<article v-html=i.content>
				</article>
			</li>
		</ul>
		<div class="no_more" v-if="nomore">暂无图文消息，精彩内容敬请期待！</div>

		<div class="more">加载中</div>
	</div>
</div>
</template>

<script>
import {getString} from '../js/common'
export default {
	data (){
		return {
			num:10
		}
	},
	props:{
		room:{
			type:Array
		},
		nomore:{
			type:Boolean
		},
		val:{
			type:Number
		}
	},
	mounted:function(){
		let $this = this
		//滚动加载图文直播
		$(".ul-list").scroll(function(){
			if($(".more").html() == "没有更多了" || $(".more").html() == "加载中")
				return ;
			var top = $(this).scrollTop();
			var Height = $(this).height();
			var ul = $(this).find("ul").height();
			
			if(top + Height > ul){
				$(".more").show().html("加载中")
				let url = getString('0340',{"start":$this.num,"size":10})
				webSocket.send(url)
				$this.num += 10
			}
		})
	}
}
</script>

<style>
.living{height: 100%;word-break: break-all;position: relative;overflow: hidden;padding-bottom: 1rem;}
.living	.ul-list{overflow-y:auto;height: 100%;}
.living ul{padding:.6rem .3rem .3rem .3rem;}
.living span.fl{display: block;width: .24rem;height: .24rem;background:#fff url(../assets/time.png);background-size: 100% 100%;margin-left: -.34rem;margin-top: 0;position: relative;z-index: 5;float: left;}
.living h3{color: #9d9d9d;font-size: .24rem;font-weight: normal;}
.living article{line-height: .45rem;color: #000;margin-top: .12rem;}
.living li{padding-left: .2rem;padding-bottom: .3rem;border-left: 1px solid #dfdfdf;}
.living li:last-child{padding-bottom: 0;}
.living img{max-width: 100%;display: block;margin: .08rem 0;}
.more{text-align: center;line-height: .56rem;color: #666;display: none;}
.no_more{text-align: center;}
.rq{position: absolute;height: .6rem;line-height: .6rem;background: #fff;color: #c60000;width: 100%;z-index: 8;left: 0;top: 0;}
.rq span{display: block;width: .32rem;height: .3rem;background: url(../assets/hot.png) no-repeat;background-size: 100% 100%;vertical-align: middle;float: left;margin: .12rem .04rem 0 .2rem;}
</style>
