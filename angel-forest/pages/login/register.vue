<!-- 注册页面 -->
<style lang="scss" scoped>
	@import "register.scss";
</style>
<template>
	<view class="register">
		<view class="img-a"></view>
		<view class="content"> 
			<view class="t-login">
				<u-form v-model="form" ref="uForm">
					<u-form-item left-icon="phone" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.phone" maxlength="11"  placeholder="请输入注册手机号码"/>
					</u-form-item>
					<u-form-item left-icon="email" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}">
						<u-input v-model="form.messagee" name="code" maxlength="18" placeholder="请输入短信验证码" />
						<u-button slot="right" class="yanzheng">获取验证码</u-button>
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}">
						<u-input v-model="form.pass" type="password" name="code" maxlength="18" placeholder="请设置6-20位登录密码" />
					</u-form-item>
					<u-form-item left-icon="lock" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}">
						<u-input v-model="form.secondPass" type="password" name="code" maxlength="18" placeholder="请再次确认登录密码" />
					</u-form-item>
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
							<u-checkbox label="item.name" v-model="form.xieyi">同意<span @click="goUserAgreement">《用户服务协议》</span></u-checkbox>
						</u-checkbox-group>
					</view>
					<u-button class="registerBtn"  >注册</u-button>
				</u-form>
			</view>
		</view>
		<!--<view class="content">
			<view class="title">欢迎登录</view>
			<input class="u-border-bottom" type="number" v-model="loginName" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建账号</view>
			<u-button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</u-button>
			<view class="alternative">
				<view class="account" @click="accountLogin">密码登录</view>
				<view class="issue" @click="problem">遇到问题</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="60" name="server-man" color="#999" @click="server"></u-icon></view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phone: '',
				messagee: '',
				pass: '',
				secondPass: '',
				radio:'',
				xieyi: false,
			},
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
		submit() {
			if(this.$u.test.mobile(this.loginName)) {
				this.$u.route({
					url: 'pages/login/code',
					params: {
						loginName: this.loginName
					}
				})
			}
		},
		accountLogin(){
			this.$u.route({
				url: 'pages/login/login'
			})
		},
		problem(){
			this.$u.route({
				url: 'pages/login/problem'
			})
		},
		server(){
			window.open ('https://sourcebyte.cn')
		},
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
		.getCaptcha {
			background-color: rgba(0, 0, 0,.1);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			.account {
				&:active{
					background-color: #ededed;
				}
			}
		}
	}
	.buttom {
		.loginType {
			font-size: 14px;
			position: fixed;
			right: 50rpx;
			bottom: 50rpx;
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
}
</style>
