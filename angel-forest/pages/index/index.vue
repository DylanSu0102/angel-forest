<template>
	<view>
		<u-navbar :is-back="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="u-p-30"  @click="location">
					首页
				</view>
				<u-search placeholder="" v-model="keyword" input-align="center"  :show-action="false" :clearabled="true"
:disabled="true" style="width: 565rpx;" @click="search"></u-search>
<view class="u-p-30"  @click="login">
					登录
				</view>
			</view>
		</u-navbar>
		<view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>
		<view>
			<u-tabs :list="list" :is-scroll="false" height="120" active-color="#a4c8ff" inactive-color="#606266" show-bar :current="current" @change="change"></u-tabs>
			<view class="pa">
				<u-subsection :list="secondlist" height="200" mode="subsection" :current="secondcurNow" bgColor="#ff9900" @change="sectionChange"></u-subsection>
			</view>	
			<view class="thirdCon pa">
				<u-subsection :list="thirdlist" :current="thirdcurNow" buttonColor="#a4c8ff" active-color="#ffffff"  bgColor="#ffffff" @change="thirdChange"></u-subsection>
			</view>
			<block v-for="(page,page_index) in 5" :key="page_index">
				<list></list>
			</block>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="findHouseList"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		<u-no-network></u-no-network>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="60" name="server-man" color="#999" @click="server"></u-icon></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import list from '@/components/list/list.vue' 
	export default {
		components: {
		  list
		},
		data() {
			return {
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				houseList: [],
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
					name: '赏金森林'
				}, {
					name: '月老森林'
				}, {
					name: '孵化森林'
				}],
				current: 0,
				secondlist: [
					{
						name: '赏金窗'
					}, 
					{
						name: '猎金窗'
					}
				],
				secondcurNow: 0,
				thirdlist: [
					{
						name: '公司赏金'
					}, 
					{
						name: '个人赏金'
					}
				],
				thirdcurNow: 0,
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode')
			}
		},
		onLoad() {
			uni.$on('findIndexHouseList', (obj) => {
				// 获取数据
				this.findHouseList(1);
			})
			// 获取数据
			this.findHouseList();
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('findIndexHouseList');
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
			this.findHouseList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 获取数据
			this.findHouseList(1);
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
			},
			location(){
				this.$u.route({
					url: 'pages/location/location',
				})
			},
			sectionChange(index) {
				this.secondcurNow = index;
			},
			thirdChange(index) {
				this.thirdcurNow = index;
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
			findHouseList(type = 0) {
				if(type == 1){
					this.pageNum = 1
					this.flowList = []
					this.$refs.uWaterfall.clear();
				}
				let url = "/api/houseApi/findHouseRoomList";
				this.$u.get(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					orderByColumn: 'update_time,create_time',
					isAsc: 'desc'
				}).then(result => {
					const data = result.rows;
					if(this.pageNum>1 && data.length < this.pageSize){
						return this.loadStatus = 'nomore';
					}
					this.houseList = data;
					for (let i = 0; i < this.houseList.length; i++) {
					    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					    let item = this.houseList[i]
						item.image = item.faceUrl
						if(item.type == 0){
							item.type = '整租'
						}else if(item.type == 1){
							item.type = '合租'
						}
						if(item.roomType == 1){
							item.roomType = '主卧'
						}else if(item.roomType == 2){
							item.roomType = '次卧'
						}else{
							item.roomType = '未知'
						}
						
						if(this.$u.test.isEmpty(item.houseNum)){
							item.houseNum = ''
						}
						if(this.$u.test.isEmpty(item.houseHall)){
							item.houseHall = ''
						}
						if(this.$u.test.isEmpty(item.toiletNum)){
							item.toiletNum = ''
						}
						if(this.$u.test.isEmpty(item.floor)){
							item.floor = ''
						}else{
							item.floor = item.floor + '层'
						}
					    this.flowList.push(item);
					}
					++ this.pageNum 
					this.loadStatus = 'loadmore';
				});
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
			server(){
				window.open ('https://sourcebyte.cn')
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
