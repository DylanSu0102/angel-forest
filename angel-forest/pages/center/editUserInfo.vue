<!-- 登录页面 -->
<template>
	<view>
		<u-navbar :is-back="true" title="修改资料"></u-navbar>
		<u-toast ref="uToast" />
		<view class="">
			<view>
				<u-form v-model="form" ref="uForm" class="userTab">
					<u-form-item label="真实姓名" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.realName" maxlength="10" placeholder="输入真实姓名" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="手机号码" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.phone" type="number" maxlength="11"  placeholder="输入手机号码" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="邮箱地址" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.email" placeholder="输入邮箱地址" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="微信号" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.wechat" maxlength="10"  placeholder="输入微信号" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="身份证号" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.idCard" maxlength="18"  placeholder="输入身份证号" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="所在区域" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="area" maxlength="50"  placeholder="输入所在区域" :custom-style="{color:'#666666'}"/>
					</u-form-item>
					<u-form-item label="详细地址" label-width="160" :label-style="{color:'#333333'}">
						<u-input v-model="form.address" maxlength="100"  placeholder="输入详细地址" :custom-style="{color:'#666666'}"/>
					</u-form-item>
				</u-form>
				<u-button class="affirmBtn"  @click="affirm()" type="primary" :ripple="true" ripple-bg-color="#b7ccf3">确认</u-button>
				<!-- </form> -->
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			form: {
				id:'',
				avatarUrl:'',
				// nickName: '',
				realName: '',
				phone: '',
				email: '',
				idCard: '',
				wechat: '',
				province:'',
				city:'',
				area:'',
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
				//this.form = result.data;
				let resultData = result.data;
				this.form.id = resultData.id;
				this.form.avatarUrl = resultData.avatarUrl;
				this.form.realName = resultData.realName;
				this.form.phone = resultData.phone;
				this.form.email = resultData.email;
				this.form.idCard = resultData.idCard;
				this.form.wechat = resultData.wechat;
				this.form.province = resultData.province;
				this.form.city = resultData.city;
				this.form.area = resultData.area;
				this.form.address = resultData.address;
				this.area = (resultData.province==null?"":resultData.province)+(resultData.city==null?"":resultData.city)+(resultData.area==null?"":resultData.area);
			})
		},
		affirm() {
			if(!this.form.phone){
				return this.$refs.uToast.show({
					title: '手机号不能为空',
					type: 'warning',
				})
			}
			if(!this.form.email){
				return this.$refs.uToast.show({
					title: '邮箱不能为空',
					type: 'warning',
				})
			}
			this.$u.post("/user/updateUser",this.form).then(data => {
				if(data.code=="200"){
					this.$refs.uToast.show({title: '修改资料成功！',type: 'success'});
					uni.switchTab({
						url: '/pages/center/me'
					})
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.userTab{
		background-color:#ffffff;
		margin:20rpx;
		.u-form-item{
			padding:20rpx 40rpx;
		}
	}
	.affirmBtn{
		margin:40rpx 20rpx 0 20rpx;
	}
	
</style>

