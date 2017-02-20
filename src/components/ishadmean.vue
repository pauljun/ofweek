<template>
    <!-- 资料未完善弹窗 -->
    <div class="pop">
		<div class="notice_content">
			<span class="notice_close" @click="closeHad">&times;</span>
			<img src="../assets/notice.png" alt="">
			<h4>提示</h4>
			<p>互动评论需先完善个人资料</p>    
			<div class="mean_content">
				<a class="no_btn" @click="closeHad">暂不完善</a>
				<a :href="callback" class="resgiter_btn">立即完善</a>            
			</div>  
		</div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            callback:'http://live.ofweek.com/wap/audience/update?callback='+window.location.href
        }
    },
    methods:{
		closeHad:function(){
			this.$parent.hasShow = false
		}
    },
    mounted:function(){

    }
}
</script>
<style scoped="">
.pop{position: absolute;z-index: 50;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3)}
	.notice_content{position: absolute;width: 6rem;background: #fff;bottom: .3rem;left: 50%;margin-left: -3rem;text-align: center;padding: .3rem 0;}
	h4{margin-top: .3rem;}
	.notice_content a{display: inline-block;*display: inline;zoom: 1;width: 1.5rem;height: .5rem;line-height: .5rem;background: #db0000;color: #ffffff;border-radius: .06rem;margin: 0 .3rem;}
	.notice_content a.no_btn{background: #d8d8d8;}
	.notice_close{position: absolute;right: .2rem;top: .12rem;font-size: .48rem;}
	p{margin: .2rem 0;}
</style>