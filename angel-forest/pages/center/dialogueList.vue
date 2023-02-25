<template>
	<view>
		<u-navbar :is-back="false" title="聊天列表"></u-navbar>
		<!-- <u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar> -->
		<view v-for="(item, index) in contactsList" :key="index" @click="navToDetailPage(item)" style="margin-top: 20rpx;">
			<!-- 消息组件 -->
			<view style="margin-left: 25rpx;">
				<image :src="item.image" style="width: 125rpx;height: 125rpx;border-radius: 50%;" mode="aspectFill">
				</image>
			</view>
			<view style="font-weight:bold;margin-top: -130rpx;margin-left: 170rpx;">
				<text>{{item.contactsName}}</text>
			</view>
			<view style="margin-top: -45rpx;margin-left: 560rpx;">
				<text style="color: #515151;">{{item.time}}</text>
			</view>
			<view style="margin-top: 30rpx;margin-left: 170rpx;">
				<text style="color: #515151;">{{item.news}}</text>
			</view>
			<view style="margin-top: -50rpx;margin-left: 680rpx;width:20rpx;height:35rpx">
				<u-badge numberType="overflow" shape="circle" max="99" :count="item.unreadCount" type="error"
					:absolute="false" :showZero="false"></u-badge>
			</view>
			<!-- 分割线 -->
			<view style="margin-top: 60rpx;">
				<u-divider lineColor="#7A9BFD"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contactsList: []
			}
		},
		onLoad() {
			this.contactsListFun();
		},
		onUnload() {
			// 移除监听事件  
			// uni.$off('findIndexHouseList');
		},
		onShow(){
			// 检测升级
			// this.checkUpdate();
			// 流量统计
			//this.appSysFlowInfo()
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
		    this.loadStatus = 'loading';
		    // 获取数据
			this.contactsListFun()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 获取数据
			this.contactsListFun(1);
			// 关闭刷新
			uni.stopPullDownRefresh();
		},
		methods: {
			navToDetailPage(item){
				console.log("item",item)
			},
			contactsListFun(){
				this.$u.get('/im/contactsList', {
					pageNum: 1,
					pageSize: 10,
					userId:'123'
				}).then(result => {
					console.log('result',result);
					this.contactsList = result.rows;
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

