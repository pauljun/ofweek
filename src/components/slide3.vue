<template>
    <div>
    	<ul>
    		<li v-for="i in arr">
    			<a :href="i.url">
    				<img :src="i.coverImgUrl" alt="">
    				<p v-if="i.type==1" v-html=i.name></p>
    				<p v-if="i.type==2" v-html=i.company></p>
    			</a>
    			<span v-if="i.status == 2" class="s1">直播中</span>
<!--
    			<span v-if="i.status == 0" class="s1">预告</span>
    			<span v-if="i.status == 4" class="s1">结束</span>
-->
    		</li>
    	</ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
				arr:[]
            }
        },
		mounted:function(){
			let that = this
			$.post('http://live.ofweek.com/api/room/listInfoInLive',{
				roomId:userLogin.roomId
			},function(res){
				that.arr = res.data
			},"json")
		}
    }
</script>

<style scoped="">
	div{padding: 0 0 0 0;background: #f3f4f8;height: 100%;}
	div:after{content: '';clear: both;display: block;height: 0;}
	ul{height: 100%;overflow-y: auto;padding-left: .24rem;padding-top: .3rem;}
	li{margin-bottom: .3rem;float: left;padding-right: .24rem;text-align: center;width: 50%;position: relative;}
	a{display: block;}
	p{color: #666;font-size: .28rem;line-height: .48rem;background: #fff;height: .48rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	img{max-width: 100%;height: 2rem;}
	span{display: block;position: absolute;left: -.06rem;top: 0;width: 1.2rem;height: .3rem;line-height: .3rem;text-align: center;color: #fff;background-size: 100% 100%;font-size: .24rem;}
	span.s1{background-image: url(../assets/tlt.png);}
</style>