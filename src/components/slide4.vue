<template>
	<div class="app_content">
		<div v-show="show1">
			<h3>
				新品速评<span></span>
			</h3>
			<ul class="list1 hot_list">
				<li v-for="i in newArra">
					<a :href="i.htmlpath">
						<img :src="images+i.pictureurls" alt="">
					</a>
					<p v-html=i.subtitle></p>
				</li>
			</ul>
			
			<div :class="hot_list?'hot_list':''">
				<ul class="list2">
					<li v-for="m in newArrb">
						<a class="icon" :href="m.htmlpath">
							<img :src="images+m.pictureMiddlePath" alt="">
						</a>
						<div>
							<a :href="m.htmlpath" v-html=m.subtitle></a>
						</div>
					</li>
				</ul>
			</div>
			
			<div v-show="loadShow" class="load" @click="getMore">加载更多</div>
		</div>
		
		<div v-show="show2">
			<h3>
				热点资讯<span></span>
			</h3>
			<ul class="list1 list3">
				<li v-for="i in hotArra">
					<a :href="i.htmlpath">
						<img :src="images+i.pictureurls" alt="">
					</a>
					<p v-html=i.subtitle></p>
				</li>
			</ul>
			<ul class="news">
				<li v-for="i in hotArrb">
					<a :href="i.htmlpath" v-html=i.subtitle></a>
				</li>
			</ul>
		</div>
		
		<div class="bd1" v-show="show3">
			<h3>展商采访<span></span></h3>
			<ul class="list1 list4">
				<li v-for="i in expoArr">
					<a :href="i.htmlpath"><img :src="images+i.pictureMiddlePath" alt=""></a>
					<h5 v-html=i.subtitle></h5>
				</li>
			</ul>
		</div>
		
		<div v-show="show4">
			<h3>现场图集<span></span></h3>
			<div class="onfocus">
				<ul>
					<li v-show="active == key" v-for="(val,key) in imgArr">
						<a :href="val.keywords"><img :src="images1 + val.uploadFile" alt=""></a>
						<p v-html="val.title"></p>
					</li>
				</ul>
				<div class="navBar">
					<span v-for="(val,key) in imgArr" :class="active == key ? 'active' : ''" @click="change(key)"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>	
//新品速递
const newUrl  = "http://www.ofweek.com/live/topic.do?method=getNewsListAjax&type=231&withpic="

//热点资讯
const hotUrl  = "http://www.ofweek.com/live/topic.do?method=getHotNewsListAjax&type=232&isflag="

//展商采访
const expoUrl = "http://www.ofweek.com/live/topic.do?method=getNewsListAjax&type=233&withpic=2"

//图集管理
const imgUrl  = "http://www.ofweek.com/live/topic.do?method=getPicGroupAjax"

    export default {
        data () {
            return {
				active:0,
				images:'http://images.ofweek.com/Upload/News/',
				images1:"http://images.ofweek.com/Upload/livetopic/",
				newArra:[],
				newArrb:[],
				hotArra:[],
				hotArrb:[],
				expoArr:[],
				imgArr:[],
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				hot_list:true,
				loadShow:true,
				timeTotal:''
            }
        },
		methods:{
			change:function(index){
				this.active = index
				let that = this
				clearInterval(this.timeTotal)
				setTimeout(function(){
					that.timeTotal = setInterval(function(){
						that.active++
						if(that.active >= that.imgArr.length)
							that.active = 0
					},3000)
				},3000);
			},
			getMore:function(){
				this.hot_list = false
				this.loadShow = false
			}
		},
		mounted:function(){
			let that = this
			setTimeout(function(){
				$.ajax({
					url: newUrl+'1&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'jsonpCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.newArra = res
						if(res != "")
							that.show1 = true
					}
				});
			},400);
			
			setTimeout(function(){
				$.ajax({
					url: newUrl+'2&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'jsonpCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.newArrb = res
						if(res != "")
							that.show1 = true
					}
				});
			},800);
		
			setTimeout(function(){
				$.ajax({
					url: hotUrl+'0&num=4&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'jsonpCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.hotArra = res
						if(res != "")
							that.show2 = true
					}
				});
			},1200);	
			
			setTimeout(function(){
				$.ajax({
					url: hotUrl+'1&num=100&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'jsonpCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.hotArrb = res
						if(res != "")
							that.show2 = true
					}
				});
			},1600);	
			
			setTimeout(function(){
				$.ajax({
					url: expoUrl+'&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'viewCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.expoArr = res
						if(res.length > 0){
							that.show3 = true
						}
					}
				});
			},2000);

			setTimeout(function(){
				$.ajax({
					url: imgUrl+'&smallclass='+userLogin.roomId,
					type: 'GET',
					dataType: 'jsonp',
					jsonp: 'jsonpCallback',
					jsonpCallback: 'jsonpCallback',
					success: function(res) {
						that.imgArr = res
						if(res.length > 0){
							that.show4 = true
						}
					}
				});
			},2400);
			
			that.timeTotal = setInterval(function(){
				that.active++
				if(that.active >= that.imgArr.length)
					that.active = 0
			},3000)
		}
    }
</script>

<style>
.app_content{padding: .24rem 0 1.2rem 0;height: 100%;overflow-y: auto;}
.app_content h3{font-size: .32rem;border-left: .06rem solid #c60000;line-height: .32rem;height: .32rem;color: .app_content #666;font-weight: normal;padding-left: .06rem;margin-bottom: .2rem;margin-left: .24rem;margin-right: .24rem;position: relative;overflow: hidden;}
.app_content h3 span{display: block;position: absolute;width: 100%;border-top: .02rem solid #dcdcdc;top: .14rem;left: 1.4rem;}
.app_content ul{padding-left: .24rem;}
.app_content ul:after{content: "";clear: both;display: block;height: 0;}
.app_content .list1 li{float: left;width: 50%;padding-right: .24rem;margin-bottom: .44rem;}
.app_content .list1 li p{font-size: .28rem;height: .28rem;line-height: .28rem;border-left: .04rem solid #c60000;padding-left: .1rem;margin-top: .14rem;color: #666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.app_content .list1 li a{display: block;height: 1.6rem;line-height: 1.6rem;text-align: center;}
.app_content .list1 li a img{max-height: 100%;max-width: 100%;}
.app_content .list2{padding-right: .24rem}
.app_content .list2 li{position: relative;min-height: 1.6rem;padding-left: 2.8rem;margin-bottom: .3rem;}
.app_content .list2 a.icon{display: block;width: 2.6rem;height: 1.6rem;position: absolute;left: 0;top: 0;overflow: hidden;}
.app_content .list2 a.icon img{width: 100%;height: 100%;}
.app_content .list2 div>a{color: #666;font-size: .3rem;line-height: .36rem;}
.app_content .load{margin-right: .24rem;height: .52rem;line-height: .52rem;text-align: center;color: #5685bd;background: #f3f3f3;margin-bottom: .3rem;margin-left: .24rem}
.app_content .list3 li p{border-left: 0;}
.app_content h5{font-weight: normal;font-size: .28rem;color: #333;margin: 0;line-height: .36rem;margin: .08rem 0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.app_content .list4 li{margin-bottom: 0;}
.app_content .list4{margin-bottom: .2rem;}

.app_content .news{border-top: .02rem solid #dcdcdc;margin-right: .24rem;padding: .1rem 0;margin-left: .24rem;}
.app_content .news a{font-size: .28rem;color: #666;line-height: .52rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;}
.app_content .bd1{border-top: .04rem solid #e5e5e5;border-bottom: .04rem solid #e5e5e5;padding-top: .2rem;margin-bottom: .3rem}
.app_content .onfocus{margin-right: .24rem;overflow: hidden;}
.app_content .onfocus img{width: 100%;}
.app_content .onfocus p{color: #333;text-align: center;font-size: .28rem;margin: .18rem 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.app_content .navBar{background: #d5d5d5;width: 2rem;height: .36rem;margin: 0 auto;border-radius: .08rem;text-align: center;line-height: .36rem;}
.app_content .navBar span{display: inline-block;*display:inline;*zoom:1;background: #737373;border-radius: 50%;width: .22rem;height: .22rem;margin:  0 .08rem}
.app_content .navBar span.active{background: #ee8600;}
.hot_list li:nth-child(n+5){display: none;}
</style>