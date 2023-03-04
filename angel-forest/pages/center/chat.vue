<template>
	<view class="content">
		<!-- 聊天内容 -->
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in unshiftmsg" :key="index" :id="'msg'+ index">
					<view class="chat-time" v-if="item.createTime != ''">{{changeTime(item.createTime)}}</view>
					<view class="msg-m msg-left" v-if="item.sendName ==  friendName">
						<image class="user-img" :src="srcLogo"></image>
						<view class="message" v-if="item.TextType == 0">
							<!-- 文字 -->
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<view class="message" v-if="item.TextType == 1" @tap="previewImg(item.sendText)">
							<!-- 图像 -->
							<image :src="item.sendText" class="msg-img" mode="widthFix"></image>
						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								<image :src="srcLogo" class="voice-img"></image>
								{{item.sendText.time}}″
							</view>
						</view>
						<view class="message" v-if="item.TextType == 3" @tap="openLocation(item.sendText)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">{{item.sendText.name}}</view>
								<view class="map-address">{{item.sendText.address}}</view>
								<!-- 如果map不起作用，就可以直接用一张图片去替代 -->
								<map class="map" :longitude="item.sendText.longitude" :latitude="item.sendText.latitude"
									:markers="covers(item.sendText)"></map>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.sendName != friendName">
						<image class="user-img" :src="srcLogo"></image>
						<view class="message" v-if="item.TextType == 0">
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<view class="message" v-if="item.TextType == 1" @tap="previewImg(item.sendText)">
							<image :src="item.sendText" class="msg-img" mode="widthFix"></image>
						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								{{item.sendText.time}}″
								<image :src="srcLogo" class="voice-img"></image>
							</view>
						</view>
						<view class="message" v-if="item.TextType == 3" @tap="openLocation(item.sendText)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">{{item.sendText.name}}</view>
								<view class="map-address">{{item.sendText.address}}</view>
								<map class="map" :longitude="item.sendText.longitude" :latitude="item.sendText.latitude"
									:markers="covers(item.sendText)"></map>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import store from "../../store";
	import dateTime from './dateTime.js';
	import submit from '../../components/submit/submit.vue';
	//音频播放
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				friendName: "xpq",
				srcLogo:'http://demo.rageframe.com/attachment/images/2021/11/02/image_1635838346_MH3eD7HX.jpeg',
				msg: [],
				// 反转数据接收
				unshiftmsg: [],
				imgMsg: [],
				scrollToView: '',
				oldTime: new Date(),
				inputh: '60'
			}
		},
		onShow() {
			console.log("$router",this.$route.query)
			this.contactsListFun(this.$route.query)
			this.chatInit()  //socket相关操作
			// // 数组倒叙 主要是应对后端传过来的数据
			// for (var i = 0; i < this.msg.length; i++) {
			// 	//时间间隔处理
			// 	if (i < this.msg.length - 1) { //这里表示头部时间还是显示一下
			// 		let t = dateTime.spaceTime(this.oldTime, this.msg[i].createTime);
			// 		if (t) {
			// 			this.oldTime = t;
			// 		}
			// 		this.msg[i].createTime = t;
			// 	}
			// 	// 获取图片，为下面的预览做准备
			// 	if (this.msg[i].TextType == 1) {
			// 		this.imgMsg.unshift(this.msg[i].sendText)
			// 	}
			// 	this.unshiftmsg.unshift(this.msg[i]);
			// }
			// // 跳转到最后一条数据 与前面的:id进行对照
			// this.$nextTick(function() {
			// 	this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
			// })
		},
		components: {
			submit,
		},
		methods: {
			chatInit(){
				uni.request({
					url: `/ws://8.210.126.36:8080/websocket/${this.$store.state.vuex_user}`,  //此接口返回socket请求地址
					method: 'GET',
					success: res => {
						if(res.data.code==200){
							let socketlink=null
							if(this.userToken){  //已登录，携带token
								socketlink=`${res.data.msg}?token=${this.$store.state.vuex_token}`
							}else{  //未登录
								socketlink=res.data.msg
							}
							this.commentList=[]  //创建新的socket连接前先清除之前的实时聊天记录
							uni.closeSocket()  //创建新的socket连接前确保旧的已关闭
							//创建一个socket连接
							uni.connectSocket({
								url:socketlink,
								success: res=>{}
							})
							//监听socket打开
							uni.onSocketOpen(()=>{
								this.isSocketOpen=true
								console.log('WebSocket连接已打开！');
							})
							//监听socket关闭
							uni.onSocketClose(()=>{
								this.isSocketOpen=false
								console.log('WebSocket连接已关闭！');
							})
							//监听socket错误
							uni.onSocketError(()=>{
								this.isSocketOpen=false
								console.log('WebSocket连接打开失败');
							})
							//监听socket消息
							uni.onSocketMessage((res)=>{
								let infos=JSON.parse(res.data)
								if(infos.cadmin!=5){
									this.commentList=this.commentList.concat(infos)  //获取实时聊天内容信息
								}
							})
							//先确保清除了之前的心跳定时器
							clearInterval(this.pingpangTimes)
							//每过一段时间发送一次心跳，发送Ping,服务器会反馈pong，这样操作以保持socket一直是连接状态，防止断开连接，心跳停止
							this.pingpangTimes=setInterval(()=>{
								uni.sendSocketMessage({
									data: "ping",
									success:()=>{},
									fail:()=>{
										this.isSocketOpen=false
									}
								});
							},60000)
						}
					},
				});
			},
			contactsListFun(params){
				console.log('this.$store.state',this.$store.state)
				console.log('store',store.state)
				var _this = this;
				this.$u.get(`/im/messageList?pageNum=1&pageSize=10&fromUserId=${params.fromUserId}&toUserId=${this.$store.state.vuex_user}`, {}).then(result => {
					console.log('result',result);
					result.rows.map(function(m){m.createTime = _this.formatDate(m.createTime)})
					this.contactsList = result.rows;
				})
			},
			changeTime(date) {
				return dateTime.dateTime1(date);
			},
			// 进行图片的预览
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				console.log("index", index)
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//音频播放
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
			},
			//地图定位
			covers(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: '../../static/logo.png'
				}]
				return (map);
			},
			//跳转地图信息
			openLocation(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});
			},
			//接受输入内容
			inputs(e) {
				console.log('e===',e)
				//时间间隔处理
				let data = {
					"sendName": "゛时光い",
					"receviceName": "xpq",
					"sendText": e.message,
					"createTime": new Date(),
					"updateTime": new Date(),
					"chatmState": 1,
					"TextType": e.type
				};
				// 发送给服务器消息
				// onSendWS(JSON.stringify(data));
				
				this.unshiftmsg.push(data);
				// 跳转到最后一条数据 与前面的:id进行对照
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
				if (e.type == 1) {
					this.imgMsg.push(e.message);
				}
				console.log(e)
			},
			//输入框高度
			heights(e) {
				console.log("高度:", e)
				this.inputh = e;
				this.goBottom();
			},
			// 滚动到底部
			goBottom() {
				this.scrollToView = '';
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: rgba(244, 244, 244, 1);
	}

	.chat {
		height: 100%;

		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 20rpx;
			// padding-bottom: 120rpx;  //获取动态高度
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 10rpx 0rpx;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}

				.message {
					flex: none;
					max-width: 480rpx;
				}

				.msg-text {
					font-size: 32rpx;
					color: rgba(39, 40, 50, 1);
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: 20rpx;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;

					.map-name {
						font-size: 32rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: 24rpx;
						color: rgba(39, 40, 50, 0.4);
						padding: 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map {
						padding-top: 8rpx;
						width: 464rpx;
						height: 190rpx;
					}
				}

				.voice {
					// width: 200rpx;
					min-width: 100rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-left: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.voice {
					text-align: right;

				}

				.voice-img {
					float: left;
					transform: rotate(180deg);
					width: 28rpx;
					height: 36rpx;
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: rgba(255, 228, 49, 0.8);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-right: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.voice {
					text-align: left;

				}

				.voice-img {
					float: right;
					padding: 4rpx;
					width: 28rpx;
					height: 36rpx;
				}
			}
		}
	}
</style>