<template>
	<view class="release">
		<u-navbar :is-back="false" title="发布"></u-navbar>
		<u-form v-model="form" ref="uForm">
			<u-form-item :border-bottom="false">
				<u-input v-model="form.typeName" type="select" :border="true" @click="showType = true" placeholder="选择发布类型"/>
				<!-- <!-- <u-input v-model="value" type="text" /> v-show="false" -->
				<u-action-sheet :list="actionSheetList" v-model="showType" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.name"
					placeholder="请输入项目名称"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.description"
					placeholder="请输入项目信息"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.contactName"
					placeholder="请输入联系人名称"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.contactPhone"
					placeholder="请输入联系人电话"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.address"
					placeholder="请输入项目地址"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.workType"
					placeholder="请输入所需工种"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-upload 
					:action="action" 
					:file-list="fileList" 
					on-change="imgChange"
					on-uploaded="imgUploaded"
				></u-upload>
			</u-form-item>
			<u-button type="primary" class="loginBtn"  @click="login()">提交</u-button>
		</u-form>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				form: {
					type: '',
					typeName: '',
					id:'',
					name: '',//'18720989281
					password: '123456',//'123456',
					contactName:'',
					contactPhone:'',
					workType:'',
					description:'',
					province:'',
					city:'',
					area:'',
					address:'',
					materialList:[],
				},
				action: 'http://www.example.com/upload',
				fileList: [],
				value: '',
				type: 'select',
				showType: false,
				border: true,
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
		methods: {
			imgChange(e){
				console.log('imgChange',e)
			},
			imgUploaded(e){
				console.log('on-uploaded',e)
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				this.form.type = this.actionSheetList[index].value;
				this.form.typeName = this.actionSheetList[index].text;
			},
			login(){
				console.log('this.form',this.form)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #ffffff;
	}
	.release{
		padding: 0 20rpx;
	}
</style>