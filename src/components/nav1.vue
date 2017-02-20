<template>
    <div class="nav1">
    	<span :class="active == 0?'active':''" @click="clk(0)"><em>查看回顾</em></span>
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
	.nav1{display: flex;display: -webkit-flex;height: .66rem;line-height: .66rem;color: #000;position: absolute;width: 100%;top: 5.01rem;left: 0;z-index: 10;border-bottom: 1px solid #ccc;}
	.nav1 span{display: block;flex: 1;text-align: center;position: relative;height: 100%;}
	.nav1 span.active{color: #c60000;}
	.nav1 em{font-style: normal;}
	.nav1 span.active em{border-bottom: .05rem solid #c60000;height: 100%;display: inline-block;}
</style>