<template>
	<view>
		<u-navbar :is-back="false" title="我的"></u-navbar>
		<u-card :show-head="false" :show-foot="false">
			<view class="" slot="body">
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="个人主页"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="我的资产"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="天使联盟"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="我的发布"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="分销中心"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="我的收藏"></u-icon>
				</view>
				<view class="u-body-item">
					<u-icon name="chat-fill" size="34" color="" label="我的VIP"></u-icon>
				</view>
			</view>
			<view class="" slot="foot"></view>
		</u-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '素胚勾勒出青花，笔锋浓转淡',
			subTitle: '2020-05-15',
			thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
		};
	}
};
</script>

<style scoped lang="scss">
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
		
</style>