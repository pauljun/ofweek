<template>
    <div class="nav">
    	<span :class="active == 0?'active':''" @click="clk(0)">图文直播</span>
    	<span :class="active == 1?'active':''" @click="clk(1)">互动区</span>
    	<span :class="active == 2?'active':''" @click="clk(2)">直播</span>
    	<span :class="active == 3?'active':''" @click="clk(3)">展会报道</span>
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

<style scoped="">
	.nav{height: .66rem;line-height: .66rem;background: #2d2c31;color: #fff;position: absolute;width: 100%;top: 5.01rem;left: 0;z-index: 10;}
	.nav span{display: block;text-align: center;position: relative;height: 100%;float: left;width:25%;}
	.nav span.active{background: #c60000;}
	.nav span.active:after{position: absolute;display: block;content: "";width: .16rem;height: .16rem;background: #c60000;top: .58rem;left: 50%;margin-left: -.08rem;transform: rotate(-45deg);-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg); -o-transform:rotate(-45deg);}
</style>