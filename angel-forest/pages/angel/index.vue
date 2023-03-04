<template>
  <view class="bd_sun">
    <view class="angelTop">
		<view class="angelTopList">
			<block v-for="(lista, page_index) in absArr" :key="page_index">
				<view class="line" :style="{height:210/absArr.length+'px'}">
					{{lista.name}}
				</view>
			</block>
		</view>
		<view class="map" id="map">
		  <view id="jzt"></view>
		</view>
	</view>
	<view class="angelBot">
		<view class="angelBotTit">
			微股东排名
		</view>
		<view class='angelBotTable'>
			<u-table border-color="#ffffff">
				<u-tr >
					<u-th></u-th>
					<u-th>学校</u-th>
					<u-th>班级</u-th>
					<u-th>年龄</u-th>
				</u-tr>
				<u-tr>
					<u-td>浙江大学</u-td>
					<u-td>浙江大学</u-td>
					<u-td>二年级</u-td>
					<u-td>22</u-td>
				</u-tr>
				<u-tr>
					<u-td>浙江大学</u-td>
					<u-td>清华大学</u-td>
					<u-td>05班</u-td>
					<u-td>20</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
		data:[
			{name:'红'},
			{name:'黄'},
			{name:'蓝'},
			{name:'绿'},
			{name:'青'},
			{name:'蓝'},
			{name:'紫'}
		],
		absArr:[]
      }
    },
    methods: {
      drow(){
        let div = document.getElementById("jzt"),
            h = 210,
            p = h / this.data.length;
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
		  console.log('n===================',i/n)
		  console.log('n12===================',i/n+1.5==p)
		  // console.log('n===================',(i+1))
		  
          o.className = 'tc'+n;
          let to = document.createElement("div");
          to.className = 'to';
		  let isabsArr;
		  if(this.data.length === 4) {
				isabsArr = i/n+1.5==p
		  }else {
				isabsArr = (n*p-3)==(i+3)
		  }
		  console.log('n===================',isabsArr)
		  if(isabsArr){
			  console.log('isabsArr',isabsArr)
			  o.style.background = 'transparent';
			  console.log('this.data[n].name',this.data[n-1].name);
			this.absArr.push({num:i,name:this.data[n-1].name})
			// let line = document.createElement("div");
			// line.className = 'line';
			// line.innerHTML  = this.data[n-1].name;
			// line.style.position = 'absolute';
			// line.style.left = '-80';
			// line.style.top = '0';
			// o.append(line);
		  }
          div.append(o);
          o.append(to);
		 //  if((n*p-3)==(i+3)){
			// o.append(line);
		 //  }
        }
        // var reg = 0;
        // setInterval(function ( ) {
        //   reg += 0.4;
        //   div.style.transform = 'perspective(800px) rotateY('+reg+'deg)';
        // },50)
        div.style.transform = 'perspective(999999px) rotateX(50deg) rotateY(54deg)';
		div.style.background= '#fff'
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
	page{
		background:#fff
	}
	.angelTop{
		background: #fff;
		height: 640rpx;
		border-top:25rpx solid #f5f5f5;
		position: relative;
	}
	.angelTopList{
		position: absolute;
		padding: 24px 20px
	}
	.angelBot{
		border-top:15rpx solid #f5f5f5;
	}
	.angelBotTit{
		padding-left:20rpx;
		background:#fff;
		line-height:90rpx;
		height:90rpx;
	}
	.angelBotTable{
		margin: 0 20rpx
	}
	.u-th{
		background:#fff!important;
	}
	.line{
		position: relative;
		height: 29px;
		width: 16%;
		line-height: 30px;
	}
	.line::before{
		position: absolute;
		content: '';
		width: 130px;
		background: #000;
		height: 1px;
		top: 15px;
		left: 18px;
	}
  .bd_sun /deep/ .map{
    height: 100%
  }
  .map{
	  padding-top: 900rpx;
  }
  #jzt{
    width: 420rpx;
    height: 420rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -200rpx 0 0 -200rpx;
    background: #00000000;
    transform-style: preserve-3d;
  }
  /deep/ .to{
    width: 800rpx;
    height: 800rpx;
    position: absolute;
    left: -12rpx;
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
