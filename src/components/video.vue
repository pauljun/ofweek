<template>
    <nav class="myvedio">
        <!-- 视频直播 -->
        <div class="vedio" v-if="model==0">
            <video v-if="hlsdownstream" v-bind:src=hlsdownstream v-bind:poster="hlsimg" controls autoplay></video>
            <div v-if="!hlsdownstream" class="wait">
                当前为图文直播
            </div>
        </div>

        <!-- 直播预告 -->
        <div class="notice" v-if="model==1">
            <h4>开播倒计时</h4>
            <ul class="clearfix">
                <li class="d">
                    <span class="fl">{{room.dl}}</span>
                    <span class="fr">{{room.dr}}</span>
                    <p>天</p>
                </li>
                <li class="h">
                    <span class="fl">{{room.hl}}</span>
                    <span class="fr">{{room.hr}}</span>
                    <p>时</p>
                </li>
                <li class="m">
                    <span class="fl">{{room.ml}}</span>
                    <span class="fr">{{room.mr}}</span>
                    <p>分</p>
                </li>
                <li class="s">
                    <span class="fl">{{room.sl}}</span>
                    <span class="fr">{{room.sr}}</span>
                    <p>秒</p>
                </li>
            </ul>
            <a v-if="registered" class="start-notice bgGray" href="javascript:;">已预订</a>
            <span v-else class="start-notice no_btn" @click="book">预订</span>
            <p></p>
        </div>

        <!-- 直播结束 -->
        <div class="living_end" v-if="model==4">
			<img v-if="reviewUrl" :src=reviewUrl alt="">
            <h2 v-if="isVideo==2" class="look_notice">直播已结束，感谢收看。<br>敬请期待直播回顾</h2>
            <p v-if="isVideo==1" @click="lookvod">
            	<span></span>
            </p>
        </div>
        <!-- 时间到了直播未开始 -->
        <div class="wait" v-if="model==7 || model==3">
            直播即将开始，请耐心等待
        </div>

        <!-- ppt直播 -->
        <div class="ppt_living" v-if="model==5">
            <p>如果您听不到直播声音，建议用电脑观看PPT直播。</p>
            <img v-bind:src="pptimg" alt="">
        </div>
        
        <!-- 视频直播 -->
        <div class="vodlook" v-show="model==8">
            <video v-bind:src="vodliving"></video>
        </div>

        <!-- 查看回顾 -->
        <div class="vodlook" v-show="model==6">
            <video v-bind:src="vodvideo" controls id="myAudio" onended="myFunction()"></video>
        </div>

        <!-- 初始化加载 -->
        <div class="loading" v-if="model==10">
            <span class="rect1">正</span>
            <span class="rect2">在</span>
            <span class="rect3">加</span>
            <span class="rect4">载</span>
            <span class="rect5">中</span>...
        </div>
    </nav>
</template>

<script>
export default {
    props:{
        room:{
           type:Object
        },
        model:{
            type:Number
        },
        hlsdownstream:{
            type:String
        },
        pptimg:{
            type:String
        },
        vodvideo:{
            type:String
        },
        registered:{
            type:Boolean
        },
        hlsimg:{
            type:String
        },
        isVideo:{
            type:Number
        },
		vodliving:{
			type:String
		},
		reviewUrl:{
			type:String
		}
    },
    ready:function(){        

    },
    methods:{
        //查看回顾
        lookvod:function(){
            this.$parent.ismodel = 6
        },
        //预定
        book:function(){
            if(userLogin.loginType == 2){
				this.$parent.loginShow = true
                return
            }
            let url = getString('0105')
            webSocket.send(url)
        }
    }
}
</script>
<style>
.fl{float: left}
.fr{float: right;}
.myvedio{position: absolute;width: 100%;height: 4.05rem;top: .96rem;}
video,.video{width: 100%;height: 4.05rem;background: #000;}
.changeliving{background: #000000;height: 100%;color: #ffffff;font-size: .32rem;text-align: center;line-height: 4rem;}
.loading{background: #000000;height: 100%;color: #ffffff;font-size: .32rem;text-align: center;line-height: 4rem;}
.ppt_living{height: 100%;line-height: 4.05rem;text-align: center;position: relative}
.ppt_living p{position: absolute;top: 0;left: 0;width: 100%;height: .6rem;line-height: .6rem;background: rgba(0,0,0,.3);padding-left: .3rem;color: #FFFF00;text-align: left}
.ppt_living img{max-height: 100%;max-width: 100%;}
.living_end,.wait{text-align: center;font-size: .32rem;height: 100%;background: url(../assets/notice.jpg) no-repeat;background-size: 100% 100%;}
.wait{line-height: 4.05rem;color: #ffffff;}
.living_end{position: relative;background: url(http://live.ofweek.com/static/web/wap/live/static/img/default_preview.png) no-repeat center center;background-size: cover;}
.living_end img{width: 100%;height: 100%;}
.notice .bgGray{background: rgba(0,0,0,.2);}
.living_end p{position: absolute;width: 100%;height: 100%;left: 0;top: 0;z-index: 2;}
.living_end p span{display: block;position: absolute;left: 0;top: 0;z-index: 5;width: 100%;height: 100%;background:url(../assets/look.png) no-repeat center center;background-size: 1.5rem auto;}
.living_end h2{color: #ffffff;font-size: .36rem;font-weight: normal;line-height: .6rem;padding-top: 1rem;position: absolute;z-index: 2;width: 100%;padding: 0 .3rem;left: 0;top: 1rem;}
.notice{height: 100%;background: url(../assets/notice.jpg) no-repeat;background-size: 100% 100%;text-align: center;}
.notice h4{color: #fff;font-size: .28rem;font-weight: normal;padding:.6rem 0 .3rem 0;}
.notice ul{width: 6.26rem;margin: 0 auto;}
.notice ul li{float: left;width: 1.56rem;padding: 0 .15rem;}
.notice ul li span{display: block;width: .6rem;height: .77rem;background: url(../assets/timebg.png);background-size: 100% 100%;font-size: .6rem;line-height: .77rem;}
.notice ul li p{color: #fff;font-size: .24rem;margin-top: .8rem;}
.start-notice{display: block;width: 2.5rem;height: .7rem;line-height: .7rem;text-align: center;font-size: .3rem;background: #c60000;color: #fff;margin-top: .4rem;border-radius: .04rem;margin:.4rem auto 0 auto;}
.clearfix:after{clear: both;content: "";height: 0;display: block;}
</style>
