<!-- 注册页面 -->
<style lang="scss" scoped>
	@import "register.scss";
</style>
<template>
	<view class="register">
	
	<u-navbar title="注册" :autoBack="true"></u-navbar>
		<u-toast ref="uToast" />
		<view class="img-a"></view>
		<view class="content"> 
			<view class="t-login">
				<u-form v-model="form" ref="uForm">
					<u-form-item left-icon="account" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.nickName" maxlength="11"  placeholder="请输入用户名" @blur="checkName"/>
					</u-form-item>
					<u-form-item left-icon="phone" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.phone" maxlength="11"  placeholder="请输入手机号码"/>
					</u-form-item>
					<u-form-item left-icon="email" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.email" type="email" placeholder="请输入邮箱地址"/>
					</u-form-item>
					<u-form-item left-icon="edit-pen" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.code" name="code" maxlength="4" placeholder="请输入邮箱验证码" />
						<!-- <u-button slot="right" class="yanzheng" @click="verificationCode">发送验证码</u-button> -->
						
						<u-verification-code :seconds="10" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button @tap="verificationCode"  class="yanzheng">{{tips}}</u-button>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}">
						<u-input v-model="form.password" type="password" name="password" maxlength="18" placeholder="请设置6-20位登录密码" />
					</u-form-item>
					<!-- <u-form-item left-icon="lock" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}">
						<u-input v-model="form.secondPass" type="password" name="code" maxlength="18" placeholder="请再次确认登录密码" />
					</u-form-item> -->
					<view class="MaT">	
						是否微股东：
						<u-radio-group v-model="form.radio">
							<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="MaT">
						<u-checkbox-group > 
							<u-checkbox label="item.name" v-model="xieyi" >同意《<span @click="goUserAgreement" style="color:#2796f4">用户服务协议</span>》</u-checkbox>
						</u-checkbox-group>
					</view>
					<u-button class="registerBtn" @click="submit" >注册</u-button>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: '',
			form: {
				uuId:'',
				code:'',
				nickName:'',
				phone: '',
				email:'',
				messagee: '',
				password: '',
				//secondPass: '',
				radio:'',
				// xieyi: false,
			},
			xieyi: false,
			radioList:[
				{
					name: '是',
					disabled: false
				},
				{
					name: '否',
					disabled: false
				},
			]
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.loginName && this.$u.test.mobile(this.loginName)) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['primary'];
			}
			return style;
		}
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		checkName() {
			this.$u.get("/user/checkName",{
					userName: this.form.nickName
			}).then(data => {
				if(data.data){
					this.$refs.uToast.show({
						title: '用户名【'+this.form.nickName+'】已存在',
						type: 'warning',
						duration:2000
					});
					this.form.nickName = "";
				}
			});
		},
		verificationCode() {
			
			if(!this.form.email){
				return this.$refs.uToast.show({
					title: '请先输入邮箱！',
					type: 'warning',
				})
			}
			this.$u.get("/user/verificationCode",{
				email:this.form.email
			}).then(data => {
				if(data.code!="200"){
					this.$refs.uToast.show({
						title: data.msg,
						type: 'warning',
						duration:2000
					});
				}else{
					this.form.uuId = data.uuid;
					this.$refs.uToast.show({
						title: '验证码发送成功，请前往邮箱查看！',
						type: 'success',
						duration:4000
					});
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}
			});
		},
		submit() {
			if(!this.form.nickName){
				return this.$refs.uToast.show({
					title: '用户名不能为空',
					type: 'warning',
				})
			}
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
			if(!this.form.code){
				return this.$refs.uToast.show({
					title: '验证码不能为空',
					type: 'warning',
				})
			}
			if(!this.form.password){
				return this.$refs.uToast.show({
					title: '密码不能为空',
					type: 'warning',
				})
			}
			if(!this.form.xieyi){
				return this.$refs.uToast.show({
					title: '请勾选同意用户服务协议',
					type: 'warning',
				})
			}
			this.$u.post("/user/register",this.form).then(data => {
				if(data.code!="200"){
					this.$refs.uToast.show({
						title: data.msg,
						type: 'warning',
						duration:2000
					});
				}else{
					this.$refs.uToast.show({
						title: '注册成功，请登录！',
						type: 'success',
						duration:2000
					});
					// 注册成功初始化token与用户信息
					uni.switchTab({
						url: '/pages/login/login'
					})
				}
			});
		},
		// accountLogin(){
		// 	this.$u.route({
		// 		url: 'pages/login/login'
		// 	})
		// },
		// problem(){
		// 	this.$u.route({
		// 		url: 'pages/login/problem'
		// 	})
		// },
		// server(){
		// 	window.open ('https://sourcebyte.cn')
		// },
		goUserAgreement(){
			this.$u.route({
				url: 'pages/login/userAgreement'
			})
		}
	}
};
</script>

<style>
	page {
		overflow: hidden;
		background-color: #ffffff;
	}
</style>
<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
	}
	
}
</style>
