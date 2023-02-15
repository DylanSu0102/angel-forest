<!-- 登录页面 -->
<style lang="scss" scoped>
	@import "login.scss";
</style>
<template>
	<view>
		<u-toast ref="uToast" />
		<view class="img-a"></view>
		<view class="login-view">
			<view class="t-login">
				<u-form v-model="form" ref="uForm">
					<u-form-item left-icon="phone" :leftIconStyle="{color: '#888', fontSize: '40rpx'}" :border-bottom="false">
						<u-input v-model="form.username" maxlength="11"  placeholder="手机号码"/>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#888', fontSize: '40rpx'}">
						<u-input v-model="form.password" type="password" name="code" maxlength="18" placeholder="密码" />
					</u-form-item>
					<u-button class="loginBtn"  @click="login()">登录</u-button>
				</u-form>
				<u-row gutter="16">
					<u-col span="6" text-align="center">
						<view class="demo-layout bg-purple buleColor" @click="reg()">注册新用户</view>
					</u-col>
					<u-col span="6" text-align="center">
						<view class="demo-layout bg-purple-light buleColor">找回密码</view>
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
				username: '',//'18720989281
				password: '',//'123456',
			},
		}
	},
	methods: {
		login() {
			console.log('this.form.username',this.form.username)
			if(!this.form.username){
				return this.$refs.uToast.show({
					title: '手机号不能为空',
					type: 'warning',
				})
			}
			if(!this.$u.test.mobile(this.form.username)){
				return this.$refs.uToast.show({
					title: '手机号格式不正确',
					type: 'warning',
				})
			}
			if(!this.form.password){
				return this.$refs.uToast.show({
					title: '登录密码不能为空',
					type: 'warning',
				})
			}
			// 登录json参数，不同于表单参数
			let url = "/api/thirdLogin";
			this.$u.post(url,{
				username: this.username,
				password: this.password
			}).then(data => {
				// 登录成功初始化token与用户信息
				this.$u.vuex('vuex_token', data.token);
				this.$u.vuex('vuex_user', data.loginUser);
				uni.switchTab({
					url: '/pages/index/index'
				})
			});
		},
		reg(){
			this.$u.route({
				url: 'pages/login/register'
			})
		}
	}
};
</script>
