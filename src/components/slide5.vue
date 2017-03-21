<template>
    <div class="swiper-slide">
        <div class="item-three">
            <h2 v-html="room.name"></h2>
            <div class="mes_content">
                <div class="watch_top">
                    <div>
                        <span>举办公司：</span>
                        <p>{{room.company}}</p>
                    </div>
                    <div>
                        <span>举办时间：</span>
                        <p>{{room.startTime}} 至 {{room.endTime}}</p>
                    </div>
                    <div>
                        <span>直播内容：</span>
                        <p v-html="room.detail"></p>
                    </div>
                </div>
                <div class="contant_content" v-if="contactShow==0">
                    <div v-if="contact.name">
                        <span>联 系 人：</span>
                        <p>{{contact.name}}</p>
                    </div>
                    <div v-if="contact.mobilePhone">
                        <span>手机号码：</span>
                        <p>{{contact.mobilePhone}}</p>
                    </div>
                    <div v-if="contact.telephone">
                        <span>电话号码：</span>
                        <p>{{contact.telephone}}</p>
                    </div>
                    <div v-if="contact.department">
                        <span>部&#x3000;&#x3000;门：</span>
                        <p>{{contact.department}}</p>
                    </div>
                    <div v-if="contact.job">
                        <span>职&#x3000;&#x3000;位：</span>
                        <p>{{contact.job}}</p>
                    </div>
                    <div v-if="contact.address">
                        <span>地&#x3000;&#x3000;址：</span>
                        <p>{{contact.address}}</p>
                    </div>
                    <div v-if="contact.fax">
                        <span>传&#x3000;&#x3000;真：</span>
                        <p>{{contact.fax}}</p>
                    </div>
                    <div v-if="contact.email">
                        <span>邮&#x3000;&#x3000;箱：</span>
                        <p>{{contact.email}}</p>
                    </div>
                    <div v-if="contact.url">
                        <span>网&#x3000;&#x3000;址：</span>
                        <p>{{contact.url}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        room:{
            type:Object
        },
        contact:{
            type:Object
        },
        contactShow:{
            type:Number
        }
    }
}
</script>
<style scoped="">
	.item-three{height: 100%;overflow-y: auto;padding-bottom: 1.2rem;}
h2{padding: .35rem 0 .2rem;text-align: center;font-size: .3rem;color: #5685bd;background: #f3f3f3;}
.mes_content{margin-top: .2rem;}
.watch_top div,.contant_content div{position: relative;padding: 0 .24rem 0 1.6rem;margin-top: .12rem;line-height: .4rem;color: #000;}
.mes_content span {position: absolute;left: .24rem;top: 0;color: #888;}
.mes_content p {min-height: .4rem;}
</style>

