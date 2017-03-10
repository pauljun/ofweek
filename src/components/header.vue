<template>
  <header>
  	<!--ofweek直播-->
	<a v-show="!isProject" href="javascript:window.history.back()"></a>
	
	<!--专题-->
	<a v-show="isProject" class="back" href="http://live.ofweek.com/wap"></a>
	<h1 v-html=room.name></h1>
<!--	<span id="shareBtn"></span>-->
  </header>
</template>

<script>
export default {
	props:{
		room:{
			type:Object
		},
		isProject:{
			type:Number
		}
	},
	ready:function(){
		
	}
}
</script>

<style scoped>
	header{height: .96rem;line-height: .96rem;background: #c60000;color: #fff;position: absolute;font-size: .34rem;z-index: 10;left: 0;top: 0;width: 100%;}
	header a{display: block;width: .52rem;height: .46rem;position: absolute;left: .12rem;top: .2rem;background-image: url(../assets/home.png);background-size: cover;}
	header a.back{background-image: url(../assets/back.png);width: .26rem;height: .49rem;left: .2rem;top: .24rem;}
	header h1{font-size: .34rem;margin:0 .72rem;font-weight: normal;overflow: hidden;text-overflow: ellipsis;height: 100%;white-space:nowrap;}
	span{position: absolute;right: .2rem;top: .24rem;display: block;background: url(../assets/share@1x.png);background-size: 100% 100%;width: .46rem;height: .42rem;}
</style>
