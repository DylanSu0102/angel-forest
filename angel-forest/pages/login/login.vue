<!-- 登录页面 -->
<style lang="scss" scoped>
	@import "login.scss";
</style>
<template>
	<view>
		<u-navbar :is-back="false" title="登录"></u-navbar>
		<u-toast ref="uToast" />
		<view class="img-a"></view>
		<view class="login-view">
			<view class="t-login">
				<u-form v-model="form" ref="uForm">
					<u-form-item left-icon="account" :leftIconStyle="{color: '#888', fontSize: '40rpx'}" :border-bottom="false">
						<u-input v-model="form.username" maxlength="10"  placeholder="用户名"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#888', fontSize: '40rpx'}">
						<u-input v-model="form.password" type="password" name="code" maxlength="18" placeholder="密码" />
					</u-form-item>
					<u-button class="loginBtn"  @click="login()">登录</u-button>
				</u-form>
				<u-row gutter="16">
					<u-col class="regOrPwd" span="6" text-align="center">
						<view class="demo-layout bg-purple buleColor" @click="reg()">注册新用户</view>
					</u-col>
					<u-col class="regOrPwd" span="6" text-align="center">
						<view class="demo-layout bg-purple-light buleColor" @click="findCode()">找回密码</view>
					</u-col>
				</u-row>
				<view class='otherMethod'>其他登录方式</view>
				<view class='fillBot'>
					<u-icon name="qq-circle-fill" color="#cccccc" size="90"></u-icon>
					<u-icon name="weixin-circle-fill" color="#cccccc" size="90"></u-icon>
					<u-icon name="weibo-circle-fill" color="#cccccc" size="90"></u-icon>
				</view>
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
				"username": '逍遥丿阿磊',//'18720989281
				"password": '123456',//'123456',
			},
		}
	},
	methods: {
		login() {
			
			// uni.switchTab({
			// 	url: '/pages/index/index'
			// })
			// console.log('this.form.username',this.form.username)
			if(!this.form.username){
				return this.$refs.uToast.show({
					title: '用户名不能为空',
					type: 'warning',
				})
			}
			// if(!this.$u.test.mobile(this.form.username)){
			// 	return this.$refs.uToast.show({
			// 		title: '手机号格式不正确',
			// 		type: 'warning',
			// 	})
			// }
			if(!this.form.password){
				return this.$refs.uToast.show({
					title: '登录密码不能为空',
					type: 'warning',
				})
			}
			// 登录json参数，不同于表单参数
			this.$u.post("/login",{
				username: this.form.username,
				password: this.form.password
			}).then(data => {
				// 登录成功初始化token与用户信息
				console.log('data',data)
				this.$u.vuex('vuex_token', data.data.token);
				this.$u.vuex('vuex_user', data.data.userId);
				uni.switchTab({
					url: '/pages/index/index'
				})
			});
		},
		reg(){
			this.$u.route({
				url: 'pages/login/register'
			})
		},
		findCode(){
			this.$u.route({
				url: 'pages/login/findCode'
			})
		}
	}
};
</script>
