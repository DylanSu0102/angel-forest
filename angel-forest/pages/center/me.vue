<template>
	<view>
		<u-navbar :is-back="false" title="我的"></u-navbar>
		
		<view class="list">
			<view class="listTop">
				<view>
					<u-avatar :src="src" mode="circle" size="120"></u-avatar>
				</view>
				<view class="listTopRight">
					<view class="list_title">
						<text style="font-size:25rpx;font-weight:normal">张三</text>
					</view>
					<view class="list_phone">
						<text style="font-size:25rpx;color:#999999">18518575259</text>
					</view>
				</view>
				<view>
					<u-icon class="settings" name="setting-fill" color="#999999" size="40"></u-icon>
				</view>
			</view>
		</view>
		<u-row gutter="12" justify="center" class="myVipContent">
			<u-col span="5" class="myVip myVipIcon">
				<u-image width="60rpx" height="60rpx" src="../../static/myVip.png"></u-image>
				<text style="font-size:25rpx;font-weight:normal;color:#2979ff">天使VIP</text>
			</u-col>
			<u-col span="6" class="myVip myVipOpen">
				<text style="font-size:25rpx;font-weight:normal;color:#2979ff">立即开通</text>
			</u-col>
		</u-row>
		<u-cell-group>
			<u-cell-item icon="home" title="个人主页" :arrow="true"></u-cell-item>
			<u-cell-item icon="rmb-circle" title="我的资产" :arrow="true"></u-cell-item>
			<u-cell-item icon="bookmark" title="天使联盟" :arrow="true"></u-cell-item>
			<u-cell-item icon="checkmark-circle" title="我的发布" :arrow="true"></u-cell-item>
			<u-cell-item icon="car" title="分销中心" :arrow="true"></u-cell-item>
			<u-cell-item icon="star" title="我的收藏" :arrow="true"></u-cell-item>
			<u-cell-item icon="level" title="我的VIP" :arrow="true"></u-cell-item>
		</u-cell-group>
		<u-button class="exitLoginBtn" :ripple="true" ripple-bg-color="#b7ccf3" @click="exitLogin()" type="primary">退出账号</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarSrc: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			title: '素胚勾勒出青花，笔锋浓转淡',
			subTitle: '2020-05-15',
			thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
		};
	}
};
</script>

<style scoped lang="scss">
	.exitLoginBtn{
		margin-top: 40rpx;
		margin-bottom: 60rpx;
		width:680rpx;
	}
	.myVipContent{
		padding:10rpx 30rpx;
		background-color:#ffffff;
		margin:10rpx 0;
		height:130rpx;
		flex-wrap: nowrap!important;
		flex: 100%!important;
		.myVip{
			font-size: 20rpx;
			display: flex;
		}
		.myVipIcon{
			margin-left: 20rpx;
			width: 100%;
			align-content: space-between;
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
		}
		.myVipOpen{
			flex: inherit!important;
			justify-content: space-between!important;
			flex-flow: row-reverse;
		}
	}
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f2f2f2;
	}
	.list{
		padding: 30rpx 0rpx 20rpx;
		border-top: 1px solid #e4e4e4;
		background-color: #fff;
		.listTop{
			display: flex;
			padding: 0 60rpx;
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
				margin-left:30rpx;
				margin-top:20rpx;
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
			.list_phone{
				flex-direction: column-reverse;
				margin-left:25rpx;
				margin-top:-60rpx;
			}
			.settings{
				height: -webkit-fill-available;
			}
		}
	}
	
</style>