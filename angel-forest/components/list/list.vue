<template>
	<view class="list">
		<view class="listTop">
			<view>
				<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
			</view>
			<view class="listTopRight">
				<view class="list_title">
					<text>{{list.name}}</text>
					<text class="onLine">在线沟通</text>
				</view>
				<view class="list_titleBot">
					<view>
						<u-icon :label="list.contactName" size="40" label-size="12" name="https://cdn.uviewui.com/uview/example/button.png"></u-icon>
					</view>
					<view>
						<u-icon :label="list.contactPhone" size="40" label-size="12" name="../../static/phone.png" @click="makeCall(list.contactPhone)">
						</u-icon>
					</view>
					<view>
						<u-icon :label="workType[list.workType]" size="40" label-size="12" :name="workTypeImgs[list.workType]"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-row gutter="16" class="listCenter">
			<u-col span="9" class="fenList fenListLeft">
				<view>曝光量：{{list.exposureQuantity}}</view>
				<view>浏览量：{{list.browseQuantity}}</view>
				<view>收藏量：{{list.collectionQuantity}}</view>
			</u-col>
			<u-col span="2" class="fenList fenListRight">
				<view>
					<u-icon name="star" size="30" label="收藏" label-size="10"></u-icon>
				</view>
				<!-- <view>
					<u-icon name="chat" size="30" label="评论" label-size="10"></u-icon>
				</view> -->
			</u-col>
		</u-row>
		<!-- <view class="commentOn">
			<view>王小帅是：本项目很不错有兴趣和你沟通下。</view>
			<view>王小帅是：本项目很不错有兴趣和你沟通下。</view>
		</view> -->
	</view>
</template>

<script>
	export default {
	  name: 'LikeFx',
	  data() {
	    return {
	      queue: {},
	      ctx: null,
	      timer: 0,
		  workType:['力工','技工','','其他'],
		  workTypeImgs:["../../static/ligong.png","../../static/jigong.png","","../../static/qita.png"]
	    }
	  },
	  props: {
	    list: Object,
	  },
	  mounted() {
		  console.log('list',this.list)
	  },
	  methods:{
		  makeCall(phoneCode){
		  	uni.makePhoneCall({ 
		  		phoneNumber: phoneCode
		  	});
		  }
	  }
	}
</script>

<style scoped lang="scss">
	.list{
		padding: 30rpx 0rpx 20rpx;
		border-top: 1px solid #e4e4e4;
		background-color: #fff;
		.listTop{
			display: flex;
			padding: 0 20rpx;
			.listImg{
				width: 130rpx!important;
				height: 124rpx!important;
			}
			.listTopRight{
				margin-left: 20rpx;
				width: 100%;
				align-content: space-between;
				display: flex;
				flex-wrap: wrap;
			}
			.list_title{
				width: 100%;
				font-size: 28rpx;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				.onLine{
					display: inline-block;
					font-size: 22rpx;
					background-color: #169bd5;
					color: #ffffff;
					padding: 0 10rpx;
					line-height: 36rpx;
					border-radius: 6rpx;
				}
			}
			.list_titleBot{
				width: 90%;
				display: flex;
				justify-content: space-between;
			}
		}
		.listCenter{
			padding: 0 20rpx;
		}
		.u-row{
			flex-wrap: nowrap!important;
			.u-col{
				 flex: 100%!important;
			}
			
			.fenList{
				font-size: 20rpx;
				display: flex;
				margin-top: 20rpx;
			}
			.fenListLeft{
				gap: 20rpx;
			}
			.fenListRight{
				flex: inherit!important;
				justify-content: space-between!important;
			}
		}
		.commentOn{
			margin-top: 20rpx;
			padding: 20rpx 40rpx;
			display: flex;
			background-color: rgba(242, 242, 242, 1);
			font-weight: 400;
			font-style: normal;
			font-size: 24rpx;
			color: rgb(102, 102, 102);
			flex-wrap: wrap;
			line-height: 50rpx;
			view{
				display: flex;
			}
		}
	}
</style>