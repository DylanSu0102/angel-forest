<template>
	<view>
		<u-navbar :is-back="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="u-p-30" style="font-size:35rpx"  ><!-- @click="location" -->
					首页
				</view>
				<u-search placeholder="" v-model="keyword" input-align="center"  :show-action="false" :clearabled="true"
:disabled="true" style="width: 565rpx;" @click="search"></u-search>
<view class="u-p-30"  @click="login">
					登录
				</view>
			</view>
		</u-navbar>
		<!-- 轮播图 -->
		<view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>
		<!-- 内容 -->
		<view>
			<!-- 一级 -->
			<u-tabs :list="list" :is-scroll="false" height="120" active-color="#a4c8ff" inactive-color="#606266" show-bar :current="current" @change="change"></u-tabs>
			<block v-if="current === 0">
				<!-- 二级 -->
				<view class="pa" >
					<u-subsection :list="secondlist" height="200" mode="subsection" :current="secondcurNow" bgColor="#ff9900" @change="sectionChange"></u-subsection>
				</view>	
				<!-- 三级 -->	
				<view class="thirdCon pa" v-if="secondcurNow === 0">
					<u-subsection :list="thirdlist" :current="thirdcurNow" buttonColor="#a4c8ff" active-color="#ffffff"  bgColor="#ffffff" @change="thirdChange"></u-subsection>
				</view>
			</block>
			
			<block>
				<block v-if="current === 1">
					<u-image :showLoading="true" :src="noImg" width="100%" height="280px"></u-image>
				</block>
				<block v-else>
					<u-cell-group>
						<u-cell-item :title="lookMoreName" value="查看更多" @click="navRewardMore(0)"></u-cell-item>
					</u-cell-group>
					<block v-for="(lista, page_index) in nowList" :key="page_index">
						<list :list="lista"></list>
					</block>
				</block>
			</block>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="huntingListFun"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import store from "../../store";
	import list from '@/components/list/list.vue' 
	export default {
		components: {
		  list
		},
		data() {
			return {
				noImg: '../../static/img/temp/comingOnline.png',
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				swiperList: [
					{
						image: '/static/img/index/swiper/u84.png',
					    title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: '/static/img/index/swiper/u88.png',
					    title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: '/static/img/index/swiper/u92.png',
					    title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: '/static/img/index/swiper/u96.png',
					    title: '身无彩凤双飞翼，心有灵犀一点通'
					},
                ],
				noticeList: [
					'邀请好友送大礼',
					'新人福利领不完',
				],
				// tab标签
				list: [{
					name: '赏金森林',
					index: 0,
				}, {
					name: '月老森林',
					index: 1,
				}, {
					name: '孵化森林',
					index: 2,
				}],
				current: 0,
				secondlist: [
					{
						name: '赏金窗',
						index: 0,
					}, 
					{
						name: '猎金窗',
						index: 1,
					}
				],
				secondcurNow: 0,
				thirdlist: [
					{
						name: '公司赏金',
						index: 0,
					}, 
					{
						name: '个人赏金',
						index: 1,
					}
				],
				thirdcurNow: 0,
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode'),
				nowList: [],
				huntingList: [],
				hatchList: [],
				rewardList: [],
				rewardListTwo: [],
				lookMoreName: '公司赏金',
			}
		},
		onLoad() {
			console.log('store.state.token',this.$store.state.token)
			this.rewardListFun(0)
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
			this.huntingListFun()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 获取数据
			this.huntingListFun(1);
			// 关闭刷新
			uni.stopPullDownRefresh();
		},
		methods: {
			login(){
				this.$u.route({
					url: 'pages/login/login',
				})
			},
			change(index) {
				this.current = index;
				console.log('index',index)
				let lookMore = ''
				if(index === 0 && this.secondcurNow === 0 ){
					if(this.thirdcurNow === 0){
						lookMore = '公司赏金'
					}else{
						lookMore = '个人赏金'
					}
					this.rewardListFun(this.thirdcurNow);
				} else if(index === 0 && this.secondcurNow === 1 ){
					lookMore = '猎金窗'
					this.huntingListFun();
				} else if(index === 1){
					lookMore = ''
				}else if(index === 2){
					lookMore = '孵化森林'
					this.hatchListFun();
				}
				this.lookMoreName = lookMore
			},
			location(){
				this.$u.route({
					url: 'pages/location/location',
				})
			},
			sectionChange(index) {
				this.secondcurNow = index;
				if(index){
					this.lookMoreName = '猎金窗'
					this.huntingListFun();
				}else{
					if(this.thirdcurNow === 0){
						this.lookMoreName = '公司赏金'
					}else{
						this.lookMoreName = '个人赏金'
					}
				}
			},
			thirdChange(index) {
				this.thirdcurNow = index;
				if(index){
					this.lookMoreName = '个人赏金'
					this.rewardListFun(1);
				}else{
					this.lookMoreName = '公司赏金'
					this.rewardListFun(0);
				}
			},
			search(){
				this.$u.route({
					url: 'pages/search/search',
				})
			},
			notice(){
				this.$u.route({
					url: 'pages/notice/notice'
				})
			},
			huntingListFun(){
				if(this.huntingList.length > 0 ){
					this.nowList = this.huntingList;
				} else {
					this.$u.post('/hunting/list', {
						pageNum: 1,
						pageSize: 10,
					}).then(result => {
						// console.log('result',result);
						this.huntingList = result.rows;
						this.nowList = result.rows;
					})
				}
			},
			hatchListFun(){
				let pageNum = 1;
				let pageSize = 10;
				if(this.hatchList.length > 0 ){
					this.nowList = this.hatchList;
				} else {
					this.$u.post(`/hatch/list?pageNum=${pageNum}&pageSize=${pageSize}`, {
						pageNum: 1,
						pageSize: 10,
					}).then(result => {
						this.hatchList = result.rows;
						this.nowList = result.rows;
					})
				}
			},
			rewardListFunAll(type){
				let pageNum = 1;
				let pageSize = 10;
				this.$u.post(`/reward/list?pageNum=${pageNum}&pageSize=${pageSize}`, {
					type: type,
				}).then(result => {
					// console.log('result',result);
					// result.rows.map(function(m){m.workType = _this.workType[m.workType]});
					if(type){
						this.rewardListTwo = result.rows;
						this.nowList = result.rows;
					} else {
						this.rewardList = result.rows;
						this.nowList = result.rows;
					}
				})
			},
			rewardListFun(type){
				let _this = this;
				if(type){
					if(this.rewardListTwo.length > 0 ){
						this.nowList = this.rewardListTwo;
					} else {
						this.rewardListFunAll(type)
					}
				}else{
					if(this.rewardList.length > 0 ){
						this.nowList = this.rewardList;
					} else {
						this.rewardListFunAll(type)
					}
				}
				
			},
			checkUpdate(){
				uni.getSystemInfo({
					success:(res) => {
						//检测当前平台，如果是安卓则启动安卓更新  
						if(res.platform=="android"){  
							console.log('is android');
						}
					}  
				})
			},
			clickSearch() {
			    this.$u.route('/pages/search/search');
			},
			clickImage(houseId) {
				this.$u.route({
					url: '/pages/detail/detail',
					params: {
						houseId: houseId
					}
				})
			},
			clickNav(type){
				if(type === "1"){
					this.$u.route('/pages/search/searchList');
				}
				if(type === "2"){
					// 判断Token是否有效
					let lifeData = uni.getStorageSync('lifeData');
					let token = lifeData.vuex_token
					if(!token){
						// 没有token 则跳转到登录
						return uni.reLaunch({
							url:'../login/login'
						})
					}else{
						this.$u.route('/pages/detail/preHouse');
					}
				}
			},
			code(){
				this.$mytip.toast('请咨询作者')
			},
			appSysFlowInfo(){
				let url = "web/appSysFlowInfo";
				this.$u.post(url,{
					uvCode:this.uvCode,
				}).then(code => {
					this.uvCode = code
				});
			},
			navRewardMore(typeId) {	// 跳转到赏金更多页面
			    this.$u.route({
					url:'/pages/more/rewardMore',
					params: {
						type: typeId
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pa{
		margin-top: 15rpx;
	}
	.thirdCon{
		padding: 10rpx 100rpx;
		background-color: #ffffff;
		
	}
	
	
	.nomore {
		background-color: $u-bg-color;
	}
	.search{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: $u-bg-color;
		}
	}
	.rowClass{
		border-radius: 8px;
		background-color: rgb(255, 255, 255);
		margin-top: 10rpx;
	}
	.hoverClass{
		background-color: #E4E7ED;
	}
	.tabName{
		font-size: 28rpx;
		color: $u-main-color;
	}
	.demo-warter {
	    border-radius: 8px;
	    margin-top: 3px;
	    background-color: #ffffff;
	    padding: 3px;
	    position: relative;
	}
	.u-close {
	    position: absolute;
	    top: 20rpx;
	    right: 20rpx;
	}
	.item-cover {
	    font-size: 55rpx;
	    color: $u-type-warning;
	}
	.item-title {
	    font-size: 28rpx;
	    color: $u-main-color;
	    font-weight: bold;
		padding-top: 5rpx;
		padding-left: 10rpx;
	}
	.item-price {
	    font-weight: normal;
	    font-size: 32rpx;
	    color: $u-type-warning;
	}
	.item-desc {
	    font-weight: normal;
	    font-size: 26rpx;
	    color: $u-tips-color;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
	}
	.item-tag {
	    font-size: 24rpx;
	    color: $u-tips-color;
	    margin-top: 3px;
	}
	.buttom {
		.loginType {
			font-size: 14px;
			position: fixed;
			right: 30rpx;
			bottom: 300rpx;
			width: 60px;
			height: 60px;
			padding: 4px;
			cursor: pointer;
			background: #FFF;
			text-align: center;
			line-height: 60px;
			border-radius: 100%;
			-webkit-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
			box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
		}
	}
</style>
