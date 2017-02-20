<template>
    <div class="onload">
        <div class="loader">
            <span>L</span>
            <span class="span2">O</span>
            <span class="span3">A</span>
            <span class="span4">D</span>
            <span class="span5">I</span>
            <span class="span6">N</span>
            <span class="span7">G</span>
        </div>
        <p>{{notice}}</p>
    </div>
</template>

<script>
export default {
	props:{
		notice:{
			type:String
		}
	}
}
</script>

<style>
.onload{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: #ffffff;z-index: 9999;text-align: center;}

@-moz-keyframes loading {
  0%, 100% {
    -moz-transform: scale(1) rotateZ(0deg);
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }

  26% {
    -moz-transform: scale(1.1) rotateZ(12deg);
    transform: scale(1.1) rotateZ(12deg);
    opacity: .2;
  }

  76% {
    -moz-transform: scale(0.8) rotateZ(-8deg);
    transform: scale(0.8) rotateZ(-8deg);
    opacity: .6;
  }
}
@-webkit-keyframes loading {
  0%, 100% {
    -webkit-transform: scale(1) rotateZ(0deg);
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }

  26% {
    -webkit-transform: scale(1.1) rotateZ(12deg);
    transform: scale(1.1) rotateZ(12deg);
    opacity: .2;
  }

  76% {
    -webkit-transform: scale(0.8) rotateZ(-8deg);
    transform: scale(0.8) rotateZ(-8deg);
    opacity: .6;
  }
}
@keyframes loading {
  0%, 100% {
    -moz-transform: scale(1) rotateZ(0deg);
    -ms-transform: scale(1) rotateZ(0deg);
    -webkit-transform: scale(1) rotateZ(0deg);
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }

  26% {
    -moz-transform: scale(1.1) rotateZ(12deg);
    -ms-transform: scale(1.1) rotateZ(12deg);
    -webkit-transform: scale(1.1) rotateZ(12deg);
    transform: scale(1.1) rotateZ(12deg);
    opacity: .2;
  }

  76% {
    -moz-transform: scale(0.8) rotateZ(-8deg);
    -ms-transform: scale(0.8) rotateZ(-8deg);
    -webkit-transform: scale(0.8) rotateZ(-8deg);
    transform: scale(0.8) rotateZ(-8deg);
    opacity: .6;
  }
}
.loader {
  overflow: hidden;
  font-size: 36px;
  width: 126px;
  margin: 0 auto;
  padding-top: 3rem
}
.loader span {
  -moz-animation: loading 1s linear infinite -0.8s;
  -webkit-animation: loading 1s linear infinite -0.8s;
  animation: loading 1s linear infinite -0.8s;
  float: left;
}
.loader .span2 {
  -moz-animation: loading 1s linear infinite -0.2s;
  -webkit-animation: loading 1s linear infinite -0.2s;
  animation: loading 1s linear infinite -0.2s;
}
.loader .span3 {
  -moz-animation: loading 1s linear infinite -0.5s;
  -webkit-animation: loading 1s linear infinite -0.5s;
  animation: loading 1s linear infinite -0.5s;
}
.loader .span4 {
  -moz-animation: loading 1s linear infinite -1.1s;
  -webkit-animation: loading 1s linear infinite -1.1s;
  animation: loading 1s linear infinite -1.1s;
}
.loader .span5 {
  -moz-animation: loading 1s linear infinite -0.36s;
  -webkit-animation: loading 1s linear infinite -0.36s;
  animation: loading 1s linear infinite -0.36s;
}
.loader .span6 {
  -moz-animation: loading 1s linear infinite -0.65s;
  -webkit-animation: loading 1s linear infinite -0.65s;
  animation: loading 1s linear infinite -0.65s;
}
.loader .span7 {
  -moz-animation: loading 1s linear infinite -0.93s;
  -webkit-animation: loading 1s linear infinite -0.93s;
  animation: loading 1s linear infinite -0.93s;
}
</style>