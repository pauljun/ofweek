<template>
    <div>
    	<ul>
    		<li v-for="i in arr">
    			<a :href="i.url">
    				<img :src="i.coverImgUrl" alt="">
    				<p v-html=i.company></p>
    			</a>
    			<span v-if="i.status == 2" class="s1">直播中</span>
    			<span v-if="i.status == 0" class="s1">预告</span>
    			<span v-if="i.status == 4" class="s1">结束</span>
    		</li>
    	</ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
				arr:[{"company":"深圳市互联港湾网络技术有限公司0901","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2325,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2325&mode=2"},{"company":"ibm_0416","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2298,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2298&mode=2"},{"company":"互联网络科技有限公司","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2269,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2269&mode=2"},{"company":"测试公司-lena-qin","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2265,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2265&mode=2"},{"company":"Lena-test","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2240,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2240&mode=2"},{"company":"qfx公司测试（0414）","coverImgUrl":"http://expo.ofweek.com/upload/null","endTime":"2016-07-22 17:00","id":2237,"name":"","startTime":"2016-07-20 09:00","status":0,"type":"2","url":"http://expo.ofweek.com/index/booth/enter.xhtml?boothId=2237&mode=2"}]
            }
        },
		mounted:function(){
			let that = this
			$.post('http://live.ofweek.com/api/room/listInfoInLive',{
				roomId:3
			},function(res){
				that.arr = res.data
			})
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
	img{width: 100%;height: 2rem;}
	span{display: block;position: absolute;left: -.06rem;top: 0;width: 1.2rem;height: .3rem;line-height: .3rem;text-align: center;color: #fff;background-size: 100% 100%;font-size: .24rem;}
	span.s1{background-image: url(../assets/tlt.png);}
</style>