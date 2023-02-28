<template>
	<view>
		<u-navbar :is-back="true" :title="rewardTypeEnum[rewardTypeId]"></u-navbar>
		<!-- <u-form-item @click="poptanqi" label="所在地区" labelWidth="70" borderBottom ref="item1"> -->
		<!-- <u-picker mode="region" v-model="addressShow" :area-code='["13", "1303", "130304"]'></u-picker> -->
		<view class="chDiv">
			<view class="choose">
				<view class="chooseList">
					<u-input class="intCl" type="select" :border="true" @click="addressFun" placeholder="选择地区"/>
					<u-picker v-model="addressShow" mode="region" @confirm="confirm"></u-picker>
				</view>
				<view class="chooseList">
					<u-input class="intCl" type="select" :border="true" @click="showData = true" placeholder="选择日期"/>
					<u-calendar v-model="showData" mode="range" @change="changeData"></u-calendar>
				</view>
				<view class="chooseList">
					<u-input class="intCl" type="select" :border="true" @click="showtrade = true" placeholder="选择行业"/>
					<u-action-sheet :list="actionSheetList" v-model="showtrade" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="formDiv">
				位置：{{form.address.province}}/{{form.address.city}}/{{form.address.area}}
			</view>
			<!-- <view class="formflex"> -->
			<view class="formDiv">
				日期：{{form.params.beginTime}}  —   {{form.params.endTime}}
			</view>
			<view class="formDiv">
				行业：{{form.typeName}}
			</view>
			<!-- </view> -->
		</view>
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
				form:{
					address: {},
					data: '',
					workType: '',
					workTypeeName: '',
					params:{
						beginTime:'',
						endTime: ''
					},
				},
				noImg: '../../static/img/temp/comingOnline.png',
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				uvCode: uni.getStorageSync('uvCode'),
				rewardList:[],
				loadStatus: 'loadmore',
				rewardTypeEnum:['公司赏金','个人赏金'],
				rewardTypeId:"",
				//要提交的表单信息
				userAddress: {},
				//三级联动组件展示框
				addressShow: false, //地址
				showData: false, //日期
				showtrade: false,//行业
				//省市区数据
				columns: [
					[],
					[],
					[]
				],
				actionSheetList: [
					{
						value:'0',
						text:'公司赏金发布'
					},
					{
						value:'1',
						text:'个人赏金发布'
					},
					{
						value:'2',
						text:'猎金发布'
					},
					{
						value:'3',
						text:'孵化项目发布'
					}
				],
			}
		},
		created() {
			// this.columns[0] = areaList;
			// this.columns[1] = areaList[0].cities;
			// this.columns[2] = areaList[0].cities[0].districts;
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
		computed: {
			getAddressText() {
				return () => this.userAddress.province + '  ' + this.userAddress.city + '  ' + this.userAddress.area;
			}
		},
		methods: {
			//""选择地区
			addressFun(){
				// this.from.address = 
				this.addressShow = true
			},
			//选择日期
			changeData(e){
				this.form.params.beginTime = e.startDate
				this.form.params.endTime = e.endDate
				this.rewardListFun();
			},
			rewardListFun(){
				let _this = this;
				let pageNum = 1;
				let pageSize = 10;
				// '
				this.$u.post(`/reward/list?pageNum=${pageNum}&pageSize=${pageSize}`, {
					province: this.form.address.province,
					city: this.form.address.city,
					area: this.form.address.area,
					workType: this.form.workType,
					type: this.form.type,
					params: this.form.params,
				}).then(result => {
					console.log('result',result);
					this.rewardList = result.rows;
					if(result.rows.length<=0){
						this.loadStatus = "";
					}
				})
			},
			actionSheetCallback(index) {
				this.form.type = this.actionSheetList[index].value;
				this.form.typeName = this.actionSheetList[index].text;
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
			pickerCancel() {
				//隐藏联动展示框
				this.addressShow = false;
				//重置联动数据为初始状态
				this.$refs.uPicker.setIndexs([0, 0, 0], true);
				this.$refs.uPicker.setColumnValues(0, areaList);
				this.$refs.uPicker.setColumnValues(1, areaList[0].cities);
				this.$refs.uPicker.setColumnValues(2, areaList[0].cities[0].districts);
			},
			//三级联动框滑动选择后触发的事件
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					indexs,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, areaList[index].cities)
					picker.setColumnValues(2, areaList[indexs[0]].cities[0].districts)
				} else if (columnIndex === 1) {
					// picker为选择器this实例，变化第三列对应的选项
					picker.setColumnValues(2, areaList[indexs[0]].cities[indexs[1]].districts)
				}
			},
			// 点击确定事件,回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				// //省
				// this.userAddress.province = e.value[0].name;
				// //市
				// this.userAddress.city = e.value[1].name;
				// //区
				// this.userAddress.area = e.value[2].name;
				// //区域代码
				// this.userAddress.regionId = e.value[2].id;
				this.form.address.area = e.area.label  
				this.form.address.city = e.city.label 
				this.form.address.province = e.province.label
				console.log('this.address', this.form.address)
				this.rewardListFun();
				// this.pickerCancel();
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .intCl{
		height: 60rpx;
		line-height: 60rpx!important;
		.u-input__input{
			min-height: 60rpx!important;
		}
	}
	.chDiv{
		margin: 20rpx 0;
		background:#fff;
		padding: 20rpx 0
	}
	.choose{
		padding: 0 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		.chooseList{
			width:30%
		}
	}
	.formflex{
		display: flex;
		justify-content: flex-start;
		.formDiv{
			width:50%
		}
	}
	.formDiv{
		padding: 0rpx 20rpx 10rpx;
		font-size:24rpx;
	}
</style>
