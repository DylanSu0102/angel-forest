<template>
	<view>
		<u-navbar :is-back="true" title="个人信息"></u-navbar>
		<view class="userInfo">
			<u-cell-group>
				<u-cell-item icon="edit-pen" title="昵称" :arrow="false" :value="this.userInfo.nickName"></u-cell-item>
				<u-cell-item icon="file-text" title="真实姓名" :arrow="false" :value="this.userInfo.realName"></u-cell-item>
				<u-cell-item icon="phone" title="手机号码" :arrow="false" :value="this.userInfo.phone"></u-cell-item>
				<u-cell-item icon="email" title="邮箱地址" :arrow="false" :value="this.userInfo.email"></u-cell-item>
				<u-cell-item icon="coupon" title="身份证号" :arrow="false" :value="this.userInfo.idCard"></u-cell-item>
				<u-cell-item icon="weixin-fill" title="微信号" :arrow="false" :value="this.userInfo.wechat"></u-cell-item>
				<u-cell-item icon="map" title="所在区域" :arrow="false" :value="this.area"></u-cell-item>
				<u-cell-item icon="map-fill" title="详细地址" :arrow="false" :value="this.userInfo.address"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo:{
				nickName: '',
				realName: '',
				phone: '',
				email: '',
				idCard: '',
				wechat: '',
				address: '',
			},
			area:""
		}
	},
	onLoad() {
		this.userInfoFun()
	},
	methods: {
		userInfoFun(){
			let _this = this;
			//TODO 更换为当前登录人Id
			this.$u.get(`/user/1080635285304266752`, {}).then(result => {
				console.log('result',result);
				this.userInfo = result.data;
				let resultData = result.data;
				this.area = (resultData.province==null?"":resultData.province)+(resultData.city==null?"":resultData.city)+(resultData.area==null?"":resultData.area);
			})
		}
	}
};
</script>

<style scoped lang="scss">
	.userInfo{
		margin:20rpx
	}
	
</style>