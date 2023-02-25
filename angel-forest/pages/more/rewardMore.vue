<template>
	<view>
		<u-navbar :is-back="true" :title="rewardTypeEnum[rewardTypeId]"></u-navbar>
		<!-- 内容 -->
		<view>
			<block>
				<block v-for="(lista,page_index) in rewardList" :key="page_index">
					<list :list="lista"></list>
				</block>
				<u-loadmore bg-color="rgb(240, 240, 240)" height="70rpx" :status="loadStatus" @loadmore="rewardListFun"></u-loadmore>
			</block>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		<u-no-network></u-no-network>
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
				noImg: '../../static/img/temp/comingOnline.png',
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				uvCode: uni.getStorageSync('uvCode'),
				rewardList:[],
				loadStatus: 'loadmore',
				rewardTypeEnum:['公司赏金','个人赏金'],
				rewardTypeId:""
			}
		},
		onLoad(options) {
			this.rewardListFun();
			this.rewardTypeId = options.type;
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
			rewardListFun(){
				let _this = this;
				this.$u.post('/reward/list', {
					pageNum: 1,
					pageSize: 10,
				}).then(result => {
					console.log('result',result);
					this.rewardList = result.rows;
					if(result.rows.length<=0){
						this.loadStatus = "";
					}
				})
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
		}
	}
</script>

<style lang="scss" scoped>
</style>
