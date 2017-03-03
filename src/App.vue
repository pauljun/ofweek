<template>
  <div id="app">
   	<loader v-if="ismodel == 10" :notice=notice></loader>
    <my-header :room="roomMes"></my-header>
    <my-video :review-url=reviewUrl :room="room" :model="ismodel" :is-video="isVideo" :hlsdownstream="hlsdownstream" :pptimg="pptimg" :vodvideo="vodvideo" :registered="registered" :hlsimg="hlsimg" :vodliving=vodliving></my-video>
    <my-nav v-if="isProject==1" v-on:change="changeNav" :active="active"></my-nav>
    <my-nav1 v-if="isProject==0" v-on:change="changeNav" :active="active" :model="roomStatus"></my-nav1>
	<section>
		<swiper :options="swiperOption" ref="mySwiperA">
		  <swiper-slide>
		  	<slide1 :room="roomlist" :nomore=nomore :val=val></slide1>
		  </swiper-slide>
		  <swiper-slide>
			<slide2 :chathistory=chathistory></slide2>
		  </swiper-slide>
		  <swiper-slide v-if="isProject==1">
			<slide3></slide3>
		  </swiper-slide>
		  <swiper-slide v-if="isProject==1">
			<slide4></slide4>
		  </swiper-slide>
		  <swiper-slide v-if="isProject==0">
			<slide5 :room="roomMes" :contact="contact" :contact-show="contactShow"></slide5>
		  </swiper-slide>
		</swiper>
	</section>  
	<my-footer :active="active" :loginType=loginType :ishadmeans="ishadmeans"></my-footer>
	
	<login :loginShow=loginShow></login>
	<ishadmean v-show=hasShow></ishadmean>
  </div>
</template>

<script>
import myHeader from './components/header'
import myVideo from	'./components/video'
import myNav from './components/nav'
import myNav1 from './components/nav1'
import slide1 from './components/slide1'
import slide2 from './components/slide2'
import slide3 from './components/slide3'
import slide4 from './components/slide4'
import slide5 from './components/slide5'
import myFooter from './components/footer'
import login from './components/login'
import ishadmean from './components/ishadmean'
import loader from './components/loading'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import {socket} from './js/socket'
import {getString,dataTime,date,lookimg} from './js/common'
import send from './js/send'

export default {
	name: 'app',
	components: {
		myHeader,
		myVideo,
		myNav,
		myNav1,
		slide1,
		slide2,
		slide3,
		slide4,
		slide5,
		swiper,
		swiperSlide,
		myFooter,
		login,
		ishadmean,
		loader
	},
	data (){
		return {
			swiperOption: {
				notNextTick: true,
				pagination : '.swiper-pagination',
				paginationClickable :true,
				cancelable:false,
				debugger: true
			},
			//切换默认参数
			active:0,
			loginShow:false,			//登录弹窗是否显示
            chatShow:true,              //输入框滑动显示隐藏
            roomMes:new Object(),       //房间信息
            room:new Object(),          //直播开始时间
            ismodel:10,                 //播放模式 
                                        //0:视频直播
                                        //1:直播未开始，进行直播预告
                                        //2:图文直播
                                        //3:直播切换
                                        //4:直播结束
                                        //5:ppt直播
                                        //6:查看回顾
                                        //7直播即将开始，请耐心等待
										//8视频直播
                                        //10:loading

            hlsdownstream:'',           //视频直播地址
            chathistory:new Array(),    //历史聊天记录
            roomlist:new Array(),       //房间图文列表

            pptimg:'',                  //当前ppt直播封面图
            vodvideo:'',                //vod视频url
            count:0,                    //房间当前在线人数
            hlsimg:'',                  //视频直播封面图
            val:0,                         //人气
            loginType:userLogin.loginType, //1：正常模式，2：游客模式
            registered:false,            //用户是否已登记
            ishadmeans:false,            //用户是否完善资料
			hasShow:false,
            isVideo:0,                    //是否有视频
            isblack:false,                      //黑名单
            reason:'',                       //拉黑理由
            watchMode:0,                     //0：视频/ppt直播 1：纯图文直播
            contact:new Object(),            //联系方式
            contactShow:0,                   //是否显示联系方式
            vodvideoarr:new Array(),         //录播列表
            employee:false,                  //是否为本房间雇员
            kefuList:new Array(),               //客服列表          
            showcount:false,
			slide1Num:0,
			slide2Num:0,
			isProject:0,
			notice:'',
			nomore:false,
			vodliving:"",
			val:0,							//人气值
			reviewUrl:"",					//回顾图
			roomStatus:0,					//房间状态
		}
	},
	mounted:function(){		
        let pptpage,prefix,pptdetail
        let status      //房间状态
        let vodNum = 0
		let that = this
		let $this = this
		this.swiper.onTransitionStart = function(){
			that.active = that.swiper.activeIndex
		}

        //录播循环
		window.myFunction = function() {
            vodNum++
            if(vodNum == $this.vodvideoarr.length){
                vodNum = 0
                $this.ismodel = 4
            }
            $this.vodvideo = $this.vodvideoarr[vodNum]
        }		

        // 连接socket
        var linkinit = function(){
            if(window.WebSocket){
                window.webSocket = socket()

                webSocket.onerror = function(e){
                    console.log('连接失败，正在重连...')
                    linkinit()
                    return 
				}
                webSocket.onopen = function(e){
					console.log(e)
                    console.log('连接成功')
                    //发送信息请求
                    send()
                };
                webSocket.onmessage = function(d){
                    let str = d.data;
                    let num = str.slice(0,5);
                    let data = str.substr(5);
                    data = eval('(' + data + ')')
                    console.log(num)
                    console.log(data)
                    switch(num) {
                        //用户身份登录成功
                        case '20100':
                            //黑名单用户
                            if(data.status == 500)
                            {
                                if(data.message == '黑名单用户'){
                                    alert('您已被加入黑名单')
                                }else
                                    alert(data.message)
                                location.href = 'http://live.ofweek.com/wap/'
                            }else{
								$this.notice = data.message
							}

                            //房间在线人数
                            $this.count = data.body.onlineCount
                            $this.val = data.body.presentCount
                            //用户是否已登记
                            if($this.loginType == 1){
                                $this.registered = data.body.user.registered
                            }
                            //是否为本房间雇员
                            $this.employee = data.body.user.employee
                            //判断用户是否完善资料
                            if(userLogin.loginType == 1){   //用户已登录
                                if(!data.body.user.name || !data.body.user.company){
                                    $this.ishadmeans = true
                                }
                            }
                            break
                        //获取房间基本信息
                        case '20300':
							var start = data.body.startTime
							$this.isProject = data.body.isProject
                            $this.roomMes = data.body
							$this.roomMes.startTime =  dataTime($this.roomMes.startTime)
							$this.roomMes.endTime =  dataTime($this.roomMes.endTime)
                            //获取房间信息,判断开始时间是否有效
                            var now = new Date();
                            var chaTime = now
                            
                            var startDate = new Date(start)
                            //var time = dataTime(start)
                            var tol = (start - now)/1000
                            tol = parseInt(tol)

                            $this.contactShow = data.body.contactShow
                            status = data.body.status
							$this.roomStatus = status

                            $this.watchMode = data.body.watchMode
							$this.reviewUrl = data.body.reviewUrl
                            if($this.ismodel == 10){
                                //直播结束
                                if(status == 4){       
                                    // $this.chatShow = false
                                    $this.ismodel = 4
                                    //获取视频信息
                                    let videourl = getString('0331')
                                    webSocket.send(videourl)
                                    return
                                //如果直播时间未到,显示直播预告
                                }else if(status == 0){
                                    if(tol > 0) 
                                        $this.ismodel = 1
                                    else{            //倒计时结束，直播即将开始
                                        $this.ismodel = 7
                                    }
                                }else if(status == 2){
                                    $this.ismodel = 7
                                    $this.showcount = true
                                }
                            }

                            //倒计时
                            function timeUpdate(){
                                now = new Date();
                    
                                tol = (startDate - now)/1000;
                                tol = parseInt(tol);

                                if($this.ismodel != 1)  //如果不在直播预告状态
                                    return                                

                                if(tol <= 0){
                                    $this.ismodel = 7
                                    return
                                }
								
                                var day=Math.floor(tol/(60*60*24)); 
                                var hour=Math.floor((tol-day*24*60*60)/3600); 
                                var minute=Math.floor((tol-day*24*60*60-hour*3600)/60);
                                var second=Math.floor(tol-day*24*60*60-hour*3600-minute*60); 

                                $(".notice .d .fl").text(parseInt(day/10));
                                $(".notice .d .fr").text(day%10);
                                $(".notice .h .fl").text(parseInt(hour/10));
                                $(".notice .h .fr").text(hour%10);
                                $(".notice .m .fl").text(parseInt(minute/10));
                                $(".notice .m .fr").text(minute%10);
                                $(".notice .s .fl").text(parseInt(second/10));
                                $(".notice .s .fr").text(second%10);
                            }
                            if($this.ismodel == 1)
                                setInterval(timeUpdate,1000)
                            //倒计时结束

                            break;
                        case '20301':
                            $this.kefuList = data.body
                            break
                        //群聊消息发送成功
                        case '20200':
                            break;
                        //获取历史聊天
                        case  '20201':
							let time2 = 1200
							if($this.slide2Num == 0)
								time2 = 0
							$this.slide2Num++
							setTimeout(function(){
								let arrUser = data.body
								$(".slideMore").html("加载更多")
								if(arrUser.length < 20){
									$(".slideMore").html("没有更多了")
								}
								
								$.each(arrUser,function(index){
									this.author.isKefu = false
									var userId = this.author.userId
									this.chatTime = dataTime(this.chatTime)
									this.content = lookimg(this.content)
									for(let m = 0;m < $this.kefuList.length;m++){
										if(userId == $this.kefuList[m].userId){
											//如果是客服
											arrUser[index].author.isKefu = true
										}
									}
									
								})
								$this.chathistory = $this.chathistory.concat(arrUser)
							},time2)
                                
                            break
                        //获取房间视频信息
                        case '20331':
                            for(let i = 0;i < data.body.length ; i ++){
                                if(data.body[i].bPlayUrl != undefined)                     
                                    $this.vodvideoarr.push(data.body[i].bPlayUrl)
                            }

                            if($this.vodvideoarr.length > 0)
                                $this.isVideo = 1
                            else
                                $this.isVideo = 2

                            $this.vodvideo = $this.vodvideoarr[0]       
                            break
                        //获取ppt列表
                        case '20320':
                            break
                        //获取房间图文列表
                        case '20340':
							let time = 1200
							if($this.slide1Num == 0)
								time = 0
							$this.slide1Num++
							setTimeout(function(){
								let arr = data.body
								if(arr.length == 0)
									$this.nomore = true
								$(".more").html("加载更多")
								if(arr.length < 10)
									$(".more").html("没有更多了")
								for(var i in arr){
									arr[i].content = arr[i].content.replace(/\r\n/g,"<br />")
									arr[i].updateDate = dataTime(arr[i].updateDate,1)
								}
								$this.roomlist = $this.roomlist.concat(data.body)
								//$this.isLoad = 1
							},time)
                            break
                        //获取ppt详情
                        case '20321':
                            pptdetail = data.body.pages
                            prefix = data.body.prefix
                            $this.pptimg = prefix+pptdetail[pptpage].url
                            break
                        //观众登记
                        case '20105':
                            $this.registered = true
                            break

                        //广播消息
                        //房间人数变化
                        case '21002':
                            $this.count = data.body.count
                            break
                        //用户进入房间
                        case '21100':
                            break
                        //用户退出房间
                        case '21101':
                            break
                        //用户群聊通知
                        case '21200':
                            let arrVal = data.body
							arrVal.author.isKefu = false
							arrVal.content = lookimg(arrVal.content)
                            for(let m = 0;m < $this.kefuList.length;m++){
                                if(arrVal.author.userId == $this.kefuList[m].userId){
                                    //如果是客服
                                    arrVal.author.isKefu = true
                                }
                            }
							arrVal.chatTime = dataTime(arrVal.chatTime )
                            $this.chathistory.unshift(arrVal)
                            break
                        //发布/修改图文通知
                        case '21341':
							$this.nomore = false
							let arrbody = data.body
                            let ishas = 0
                            let picId = data.body.id
							arrbody.updateDate = dataTime(arrbody.updateDate,1)
                            $.each($this.roomlist,function(index){
                                if(this.id == picId){
                                    ishas = 1
                                    $this.roomlist.splice(index,1,arrbody)
                                }
                            })                    
                            //如果不是修改
                            if(ishas != 1)
                                $this.roomlist.unshift(arrbody)
                            break
                        //开启直播
                        case '21800':
                            //开启语音聊天
                            $this.chatShow = true
                            if(data.body.type == "live" || data.body.type=="camera_live"){
                                //普通直播
                                $this.ismodel = 0
                                $this.hlsdownstream = data.body.hlsDownstream    
                                //$this.hlsimg = data.body                            
                            }else if(data.body.type == "ppt_live"){                          
                                //ppt直播
                                $this.ismodel = 5

                                //获取pptId
                                let pptId = data.body.pptId

                                pptpage = data.body.page - 1

                                // 发送ppt详情请求
                                let pptUrl = getString('0321',{"id":pptId})
                                webSocket.send(pptUrl)
                            }
                            break
                        //关闭直播
                        case '21801':
                            console.log('切换中')
                            $this.ismodel = 3
                            break
                        //ppt翻页
                        case '21810':
                            pptpage = data.body.page - 1
                            $this.pptimg = prefix+pptdetail[pptpage].url
                            break
                        //vod 直播开始通知
                        case '21820':
							$this.ismodel = 8
							$this.vodliving = data.body.vodName
                            break
                        //vod 直播结束通知
                        case '21821':
							$this.ismodel = 3
                            break
                        //房间状态改变通知
                        case '21300':
							$this.roomStatus = data.body.status
                            //结束房间直播
                            if(data.body.status == 4){
                                $this.ismodel = 4
                                // $this.chatShow = false
                                //获取视频信息
                                let videourl = getString('0331')
                                webSocket.send(videourl)
                            }

                            if(data.body.status == 2){
                                $this.showcount = true
                            }else{
                                $this.showcount = false
                            }
                            break
                        //删除图文通知
                        case '21342':
                            //$.each($this.roomlist,function(index){
							for (let i in $this.roomlist){
                                if($this.roomlist[i].id == data.body.id){
                                    $this.roomlist.splice(i,1)
                                }
                            }
                            break
                        //用户被拉黑
                        case '21110':
                                console.log('您已被拉黑')
                                $this.isblack = true
                                $this.reason = data.body.reason
                            break	
                        //获取联系人方式
                        case '20304':
                            $this.contact = data.body
                            break
                        //房间人气
                        case '21001':
                            $this.val = data.body.count
                            break
                    }
                }
            }
        } 
        linkinit()		
	},
	computed:{
		swiper() {
			return this.$refs.mySwiperA.swiper
		}
	},
	methods:{
		changeNav:function(index){
			this.swiper.slideTo(index)
		}
	}
}
</script>

<style>
@charset "UTF-8";
html,body{height: 100%;overflow: hidden;}
html{font-size: 50px;}
@media screen and (min-width: 320px) {
	html{font-size: 45px;}   
} 
@media screen and (min-width: 360px) {
	html{font-size: 50px;}   
} 
body{font-family: SimHei;font-size: .28rem;background: #fff;margin: 0 auto;max-width: 720px;position: relative;}
img{border: none;vertical-align: middle;}
li{list-style: none}
a{text-decoration: none;}
html,section,div,p,h2,h3,h4,img,ul,li{margin: 0;padding:0;}
*{tap-highlight-color: rgba(255,255,255,0);
ms-tap-highlight-color: rgba(255,255,255,0);-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;-webkit-appearance: none;-webkit-text-size-adjust: none;
/*-webkit-user-select: none;*/-webkit-touch-callout:none; -webkit-overflow-scrolling:touch;-webkit-tap-highlight-color: rgba(0,0,0,0);outline: 0;}
#app {height: 100%;width: 100%;}
section{height: 100%;padding-top: 5.67rem;}
.slide2 article img{width: .64rem;}
.swiper-slide,.swiper-container,.swiper-wrapper{height: 100% !important;}
</style>
