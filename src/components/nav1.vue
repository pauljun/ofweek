<template>
    <div class="nav1">
		<span :class="active == 0?'active':''" v-if="model == 0" @click="clk(0)"><em>直播预告</em></span>
		<span :class="active == 0?'active':''" v-if="model == 2"  @click="clk(0)"><em>正在直播</em></span>
		<span :class="active == 0?'active':''" v-if="model == 4"  @click="clk(0)"><em>查看回顾</em></span>
		<span :class="active == 1?'active':''" @click="clk(1)"><em>互动区</em></span>
		<span :class="active == 2?'active':''" @click="clk(2)"><em>直播简介</em></span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
		props:{
			active:{
				type:Number
			},
			model:{
				type:Number
			}
		},
		methods:{
			clk:function(val){
				this.$emit("change",val)
			}
		}
    }
</script>

<style>
.nav1{height: .66rem;line-height: .66rem;color: #000;position: absolute;width: 100%;top: 5.01rem;left: 0;z-index: 10;border-bottom: 1px solid #ccc;}
.nav1 span{text-align: center;position: relative;height: 100%;float: left;width: 33.3%;}
.nav1 span.active{color: #c60000;}
.nav1 em{font-style: normal;}
.nav1 span.active em{border-bottom: .05rem solid #c60000;height: 100%;display: inline-block;}
</style>