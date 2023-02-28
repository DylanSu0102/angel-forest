<template>
  <view class="bd_sun">
    <view class="map" id="map">
      <view id="jzt"></view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      drow(){
        let div = document.getElementById("jzt"),
            h = 210,
            p = h / 7;
        for (let i = 0; i < h; i++) {
			console.log('p',p)
			console.log('i',i)
			console.log('h',h)
          let o = document.createElement("div");
          o.style.width = (h - i)+'px';
          o.style.height = (h - i)+'px';
          o.style.position = 'absolute';
          o.style.left = '0';
          o.style.top = '0';
          o.style.right = '0';
          o.style.bottom = '0';
          o.style.margin = 'auto';
          o.style.transform = 'translateZ('+i+'px)';
          let n = Math.round(Math.max(i+p/2,1)/p);
		  console.log('n===================',n)
          o.className = 'tc'+n;
          let to = document.createElement("div");
          to.className = 'to';
          div.append(o);
          o.append(to);
        }
        // var reg = 0;
        // setInterval(function ( ) {
        //   reg += 0.4;
        //   div.style.transform = 'perspective(800px) rotateY('+reg+'deg)';
        // },50)
        div.style.transform = 'perspective(999999px) rotateX(50deg) rotateY(54deg)';
        let map = document.getElementById("map");
        map.style.transform = 'rotate(296deg)';
      },
    },
    created: function() {
      this.$nextTick(function () {
        this.drow();
      })
    },
  }
</script>
<style scoped>
  .bd_sun{
    background: #034395;
  }
  .bd_sun /deep/ .map{
    height: 100%
  }
  .map{
	  margin-top: 300px;
  }
  #jzt{
    width: 210px;
    height: 210px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -100px 0 0 -100px;
    background: #00000000;
    transform-style: preserve-3d;
  }
  /deep/ .to{
    width: 400px;
    height: 400px;
    position: absolute;
    left: -6px;
    transform-origin: 0 0;
    transform: rotateY(89deg);
	/* background: transparent; */
    background: #00000030;
  }
  /deep/ .tc1{
    background: #fe3c32;
    overflow: hidden;
  }
  /deep/ .tc2{
    background: #ff9e4f;
    overflow: hidden;
  }
  /deep/ .tc3{
    background: #ffff33;
    overflow: hidden;
  }
  /deep/ .tc4{
    background: #33d77e;
    overflow: hidden;
  }
  /deep/ .tc5{
    background: #34ccfe;
    overflow: hidden;
  }
  /deep/ .tc6{
    background: #348bd8;
    overflow: hidden;
  }
  /deep/ .tc7{
    background: #664abb;
    overflow: hidden;
  }
</style>
