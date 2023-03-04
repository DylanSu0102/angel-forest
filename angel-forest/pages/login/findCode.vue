<style lang="scss" scoped>
	@import "login.scss";
</style>
<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <!-- <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="true"></u-tabs-swiper> -->
		<u-tabs-swiper ref="tabs" :list="list" :current="current" :is-scroll="false" bar-height="6" bar-width="40" active-color="#0079FE" ></u-tabs-swiper>
      </view>
      <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y >
            <view class="t-login">
				<u-form v-model="form" ref="uForm">
					<!-- <u-form-item left-icon="phone" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.phone" maxlength="11"  placeholder="请输入手机号码"/>
					</u-form-item> -->
					<u-form-item left-icon="email" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.email" type="email" placeholder="请输入注册邮箱地址"/>
					</u-form-item>
					<u-form-item left-icon="edit-pen" :leftIconStyle="{color: '#cccccc', fontSize: '35rpx'}" :border-bottom="false">
						<u-input v-model="form.code" name="code" maxlength="4" placeholder="请输入邮箱验证码" />
						<u-verification-code :seconds="10" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button @tap="verificationCode"  class="yanzheng">{{tips}}</u-button>
					</u-form-item>
				</u-form>
				<u-button class="loginBtn"  @click="change()">下一步</u-button>
			</view>	
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;">
			<view class="t-login">
				<u-form v-model="form" ref="uForm">
					<u-form-item prop="newPwd" left-icon="lock" :leftIconStyle="{color: '#888', fontSize: '40rpx'}">
						<u-input v-model="form.newPwd" type="password" name="code" maxlength="18" placeholder="请设置6-20位新的登录密码" />
					</u-form-item>
					<u-form-item prop="confirmPwd" left-icon="lock" :leftIconStyle="{color: '#888', fontSize: '40rpx'}">
						<u-input v-model="form.confirmPwd" type="password" name="code" maxlength="18" placeholder="请再次输入新的登录密码" />
					</u-form-item>
					<u-button class="loginBtn"  @click="login()">登录</u-button>
				</u-form>
			</view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
    data() {
		return {
			form: {
				uuId:'',
				code:'',
				email:'',
				newPwd: '',
				confirmPwd: '',
			},
			tips:'',
			list: [
				{
				  name: '待付款1'
				}, {
				  name: '待付款2'
				}
				],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},

	methods: {
		// tab栏切换
		change(index) {
		  this.swiperCurrent = 1;
		},
		transition({ detail: { dx } }) {
		  this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
		  this.$refs.tabs.setFinishCurrent(current);
		  this.swiperCurrent = current;
		  this.current = current;
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
		codeChange(text) {
			this.tips = text;
		},
		login() {
			console.log('this.form',this.form)
			// uni.switchTab({
			// 	url: '/pages/index/index'
			// })
			// console.log('this.form.username',this.form.username)
			// if(!this.confirmPwd){
			// 	return this.$refs.uToast.show({
			// 		title: '密码不能为空',
			// 		type: 'warning',
			// 	})
			// }
			// 登录json参数，不同于表单参数
			this.$u.get(`/user/updatePassword?id=${this.form.password}`,{
				code: this.form.username,
				password: this.form.password
			}).then(data => {
				// 登录成功初始化token与用户信息
				console.log('data',data)
				this.$u.vuex('vuex_token', data.data.token);
				this.$u.vuex('vuex_user', data.data.loginUser);
				uni.switchTab({
					url: '/pages/index/index'
				})
			});
		},
	}
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
page{
	background-color: #f9f9f9;
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
	.swiper-box{
		height:70vh
	}
  // width: 100%;
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

</style>