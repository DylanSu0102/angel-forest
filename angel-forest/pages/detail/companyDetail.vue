<template>
	<view>
		<!-- <u-navbar :is-back="true" :title="个人赏金详情"></u-navbar> -->
		<view class="detail">
			<view class="detailTop">
				<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
				<text>12313123</text>
			</view>
			<!-- <u-line color="" style="padding:0 20rpx;" /> -->
			<view class='detailCenter'>
				<view class='detailCenterList'>
					<text>联系人</text>12
				</view>
				<view class='detailCenterList'>
					<text>电话</text>213
				</view>
				<view class='detailCenterList'>
					<text>所需工种</text>312
				</view>
				<view class='detailCenterList'>
					<text>所需工种</text>
				</view>
				<view class='detailCenterList'>
					<text>项目赏金</text>
				</view>
				<view class='detailCenterList'>
					<text>项目地址</text>
				</view>
				<view class='detailCenterText'>
					<text>项目内容</text>
					<u-input v-model="form.intro" placeholder="项目内容" type="textarea" />
				</view>
				<view class='detailImg'>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
					<u-image width="100%" height="300rpx" class="listImg" src="../../static/qiandao.png"></u-image>
				</view>
				<!-- 孵化 -->
				<view class='detailCenterText'>
					<text>项目背景</text>
					<u-input v-model="form.intro" placeholder="项目内容" type="textarea" />
				</view>
				<view class='detailCenterText'>
					<text>项目工作原理</text>
					<u-input v-model="form.intro" placeholder="项目内容" type="textarea" />
				</view>
				<view class='detailCenterText'>
					<text>项目投资分析</text>
					<u-input v-model="form.intro" placeholder="项目内容" type="textarea" />
				</view>
				<view class='detailCenterText'>
					<text>合作方式</text>
					<u-input v-model="form.intro" placeholder="项目内容" type="textarea" />
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				},
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail{
		background:#fff;
		.detailTop{
			display:flex;
			justify-content: flex-start;
			line-height:80rpx;
			margin:0 20rpx;
			padding-bottom:20rpx;
			border-bottom:1rpx solid #e3e3e3;
			.listImg{
				width: 80rpx!important;
				height: 80rpx!important;
			}
			text{
				padding-left:20rpx;
			}
		}
		.detailCenter{
			padding:20rpx;
			.detailCenterList{
				color:#999999;
				padding: 10rpx 0rpx;
				display:flex;
				justify-content: space-between;
				text{
					color:#666666;
				}
			}
			.detailCenterText{
				padding-top: 10rpx;
				text{
					display:flex;
				}
				.u-input{
					border: 1rpx solid #000!important;
					margin-top: 10rpx;
					min-height: 190rpx;
				}
				.uni-textarea-textarea{
					border: 1rpx solid #000;
				}
			}
			.detailImg{
				margin-top:20rpx;
				display:flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap:2%;
				.listImg{
					width:23%!important;
					height: 178rpx!important;
				}
			}
		}
	}
</style>