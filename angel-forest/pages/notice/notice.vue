<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="tabList" :current="current" @change="change" :is-scroll="false" swiperWidth="750" bar-width="120"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="tabSwiper" v-for="(res, index) in list[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="bell" :size="35" color="#2979ff"></u-icon>
										<view class="title">{{ res.title }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.date }}</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.content }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="tabSwiper" v-for="(res, index) in  list[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="bell" :size="35" color="#2979ff"></u-icon>
										<view class="title">{{ res.title }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.date }}</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.content }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="loadmore">
							<u-divider half-width="200" bg-color="#f3f4f6" margin-top="30" margin-bottom="30">{{loadmoreText}}</u-divider>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [[], []],
			dataList: [
				{
					id: 1,
					title: '?????????????????????',
					date: '2019-02-26 14:13:23',
					content: '?????????????????????????????????????????????'
				},
				{
					id: 2,
					title: '?????????????????????',
					date: '2021-4-15 16:13:23',
					content: '????????????????????????????????????'
				}
			],
			tabList: [{name: '??????'},{name: '??????'}],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			loadmoreText: '??????????????????'
		};
	},
	onLoad() {
		this.getList(0);
		this.getList(1);
	},
	methods: {
		reachBottom() {
			this.loadmoreText = '?????????...'
			setTimeout(() => {
				this.getList(this.current);
				this.loadmoreText = '??????????????????'
			}, 3200);
		},
		// ????????????
		getList(idx) {
			this.list[idx].push(this.dataList[0]);
			this.list[idx].push(this.dataList[1]);
		},
		// tab?????????
		change(index) {
			this.swiperCurrent = index;
			this.getList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>
<style lang="scss" scoped>
.tabSwiper {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.title {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-tips-color;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
		}
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
