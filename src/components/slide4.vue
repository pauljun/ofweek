<template>
	<div class="content">
		<h3>
			新品速评<span></span>
		</h3>
		<ul class="list1">
			<li v-for="i in newArr1">
				<a :href="i.htmlpath">
					<img :src="images+i.pictureurls" alt="">
					<p v-html=i.sub_title></p>
				</a>
			</li>
		</ul>
		<ul class="list2">
			<li v-for="i in newArr2">
				<a class="icon" :href="i.htmlpath">
					<img :src="images+i.pictureMiddlePath" alt="">
				</a>
				<div>
					<a :href="i.htmlpath" v-html=i.sub_title></a>
				</div>
			</li>
		</ul>
		<!--<div class="load">加载更多</div>-->
		<h3>
			热点资讯<span></span>
		</h3>
		<ul class="list1 list3">
			<li v-for="i in hotArr1">
				<a :href="i.htmlpath">
					<img :src="images+i.pictureMiddlePath" alt="">
					<p v-html=i.sub_title></p>
				</a>
			</li>
		</ul>
		<ul class="news">
			<li v-for="i in hotArr2">
				<a :href="i.htmlpath" v-html=i.sub_title>AWE2015三星展馆直击 从大白电到吸尘</a>
			</li>
		</ul>
		<ul class="news">
			<li>
				<a href="">AWE2015三星展馆直击 从大白电到吸尘</a>
			</li>
			<li>
				<a href="">打造4K互联网生态链! 乐视TV展台直击</a>
			</li>
			<li>
				<a href="">净离子群技术 夏普多款冰箱空净亮相</a>
			</li>
			<li>
				<a href="">国内首款8K电视 夏普重磅TV新品齐登场</a>
			</li>
		</ul>
		<div class="bd1">
			<h3>展商采访<span></span></h3>
			<ul class="list1 list4">
				<li v-for="i in expoArr">
					<img :src="images+i.pictureMiddlePath" alt="">
					<h5 v-html=i.sub_title></h5>
				</li>
			</ul>
		</div>
		<h3>现场图集<span></span></h3>
		<div class="onfocus">
			<ul>
				<li v-show="active == key" v-for="(val,key) in imgArr">
					<a :href="val.keywords"><img :src="images + val.uploadFile" alt=""></a>
					<p v-html="val.title"></p>
				</li>
			</ul>
			<div class="navBar">
				<span v-for="(val,key) in imgArr" :class="active == key ? 'active' : ''" @click="change(key)"></span>
			</div>
		</div>
	</div>
</template>

<script>
//新品速递
const newUrl  = "http://www.ofweek.com/live/topic.do?method=getNewsListAjax&smallclass=3&type=231&withpic="

//热点资讯
const hotUrl  = "http://www.ofweek.com/live/topic.do?method=getHotNewsListAjax&smallclass=3&type=232&num=4&isflag="

//展商采访
const expoUrl = "http://www.ofweek.com/live/topic.do?method=getNewsListAjax&smallclass=1&type=233&withpic=2"

//图集管理
const imgUrl  = "http://www.ofweek.com/live/topic.do?method=getPicGroupAjax&smallclass=3"
	
    export default {
        data () {
            return {
				active:0,
				images:'http://images.ofweek.com/Upload/News/',
				newArr1:[],
				newArr2:[],
				hotArr1:[],
				hotArr2:[],
				expoArr:[],
				imgArr:[]
            }
        },
		methods:{
			change:function(index){
				this.active = index
			}
		},
		mounted:function(){
			let that = this
			
			$.getJSON(newUrl+1,function(res){
				that.newArr1 = res
			})
			
			$.getJSON(newUrl+2,function(res){
				that.newArr2 = res
			})

			$.getJSON(hotUrl+0,function(res){
				that.hotArr1 = res
			})
			
			$.getJSON(hotUrl+1,function(res){
				that.hotArr2 = res
			})
			
			$.getJSON(expoUrl,function(res){
				that.expoArr = res
			})

			$.getJSON(imgUrl,function(res){
				that.imgArr = res
			})
			
			setInterval(function(){
				that.active++
				if(that.active >= 3)
					that.active = 0
			},3000)
		}
    }
</script>

<style scoped="">
.content{padding: .24rem 0;height: 100%;overflow-y: auto;}
h3{font-size: .32rem;border-left: .06rem solid #c60000;line-height: .32rem;height: .32rem;color: #666;font-weight: normal;padding-left: .06rem;margin-bottom: .2rem;margin-left: .24rem;margin-right: .24rem;position: relative;overflow: hidden;}
h3 span{display: block;position: absolute;width: 100%;border-top: .02rem solid #dcdcdc;top: .14rem;left: 1.4rem;}
ul{padding-left: .24rem;}
ul:after{content: "";clear: both;display: block;height: 0;}
.list1 li{float: left;width: 50%;padding-right: .24rem;margin-bottom: .44rem;}
.list1 li p{font-size: .28rem;height: .28rem;line-height: .28rem;border-left: .04rem solid #c60000;padding-left: .1rem;margin-top: .14rem;color: #666;}
img{width: 100%;}
.list2{padding-right: .24rem}
.list2 li{position: relative;min-height: 1.6rem;padding-left: 2.8rem;margin-bottom: .3rem;}
.list2 a.icon{display: block;width: 2.6rem;height: 1.6rem;position: absolute;left: 0;top: 0;overflow: hidden;}
.list2 a.icon img{width: 100%;height: 100%;}
.list2 div>a{color: #666;font-size: .3rem;line-height: .36rem;}
.load{margin-right: .24rem;height: .52rem;line-height: .52rem;text-align: center;color: #5685bd;background: #f3f3f3;margin-bottom: .3rem;margin-left: .24rem}
.list3 li p{border-left: 0;}
h5{font-weight: normal;font-size: .28rem;color: #333;margin: 0;line-height: .36rem;margin: .08rem 0;}
.list4 li{margin-bottom: 0;}
.list4{margin-bottom: .2rem;}

.news{border-top: .02rem solid #dcdcdc;margin-right: .24rem;padding: .1rem 0;margin-left: .24rem;}
.news a{font-size: .28rem;color: #666;line-height: .52rem;}
.bd1{border-top: .04rem solid #e5e5e5;border-bottom: .04rem solid #e5e5e5;padding-top: .2rem;margin-bottom: .3rem}
.onfocus{margin-right: .24rem;overflow: hidden;}
.onfocus img{width: 100%;}
.onfocus p{color: #333;text-align: center;font-size: .28rem;margin: .18rem 0;}
.navBar{background: #d5d5d5;width: 1.62rem;height: .36rem;margin: 0 auto;border-radius: .08rem;text-align: center;line-height: .36rem;}
.navBar span{display: inline-block;*display:inline;*zoom:1;background: #737373;border-radius: 50%;width: .22rem;height: .22rem;margin:  0 .08rem}
.navBar span.active{background: #ee8600;}
</style>