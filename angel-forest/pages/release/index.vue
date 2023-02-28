<template>
	<view class="release">
		<u-navbar :is-back="false" title="发布"></u-navbar>
		<u-form v-model="form" ref="uForm">
			<u-form-item :border-bottom="false">
				<u-input v-model="form.typeName" type="select" :border="true" @click="showType = true" placeholder="选择发布类型"/>
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
				<!-- <u-input
					:border="true"
					v-model="form.address"
					placeholder="请输入项目地址"
					clearable
				></u-input> -->
				<u-input v-model="form.addressUrl" type="select" :border="true" @click="addressFun" placeholder="请选择项目地址"/>
				<u-picker v-model="addressShow" mode="region" @confirm="confirm"></u-picker>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input v-model="form.address" :border="true"  placeholder="详细地址"/>
			</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-input
					:border="true"
					v-model="form.workTypeName"
					placeholder="请输入所需工种"
					type="select"
					@click="showWorkType = true"
				></u-input>
				<!-- <u-input v-model="form.typeName" type="select" :border="true" @click="showType = true" placeholder="选择发布类型"/> -->
				<u-action-sheet :list="radiolist1" v-model="showWorkType" @click="changeWorkType"></u-action-sheet>
				<!-- <u-radio-group
				    v-model="form.workType"
				    placement="column"
				    @change="groupChange"
				  >
				    <u-radio
				      :customStyle="{marginBottom: '8px'}"
				      v-for="(item, index) in radiolist1"
				      :key="index"
				      :label="item.name"
				      :name="item.name"
				      @change="radioChange"
				    >
				    </u-radio>
				</u-radio-group> -->
			</u-form-item>
			<u-form-item :border-bottom="false">上传图片(最多6张)</u-form-item>
			<u-form-item  :border-bottom="false">
				<u-upload ref="uUpload" :action="action" :file-list="fileList" :auto-upload="true"></u-upload>
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
					// name: '',//'18720989281
					// password: '',//'123456',
					contactName:'',
					contactPhone:'',
					workType:'',
					workTypeName:'',
					description:'',
					province:'',
					city:'',
					area:'',
					addressUrl: '',
					address:'',
					materialList:[],
				},
				radiolist1: [
					{
						text: '力工',
						value:'0',
					},
					{
						text: '技工 ',
						value:'1',
					},
					{
						text: '其他',
						value:'2',
					},
				],
				formData: {
					access_token:uni.getStorageSync('access_token')
				},
				// 预置上传列表
				deviceInfo: {
					photoUrl: '',
				},
				action: 'http://8.210.126.36:8080/material/uploadPic?type=0',
				fileList: [],
				value: '',
				type: 'select',
				showType: false,
				showWorkType: false,
				border: true,
				addressShow: false,
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
				// 上传图片
				
			}
		},
		methods: {
			// 选择地区
			addressFun(){
				// this.from.address = 
				this.addressShow = true
			},
			// 点击确定事件,回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				// //省
				// this.userAddress.province = e.value[0].name;
				// //市
				// this.userAddress.city = e.value[1].name;
				// //区
				// this.userAddress.area = e.value[2].name;
				// //区域代码
				// this.userAddress.regionId = e.value[2].id;
				this.form.area = e.area.label  
				this.form.city = e.city.label 
				this.form.province = e.province.label
				console.log('this.address', this.form.address)
				// this.rewardListFun();
				// this.pickerCancel();
			},
			changeUpload(res, index, lists, name){
				console.log('(res',res)
				console.log('index',index)
				console.log('lists',lists)
				console.log('name',name)
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			onChooseComplete(lists, name) {
				console.log('lists',lists)
			},
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
			// 点击actionSheet回调
			changeWorkType(index) {
				this.form.workType = this.radiolist1[index].value;
				this.form.workTypeName = this.radiolist1[index].text;
			},
			login(){
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// })
				// 如果您不需要进行太多的处理，直接如下即可
				files = this.$refs.uUpload.lists;
				files.forEach(item=>{
					console.log('item',item)
					console.log('item.response',item.response)
					console.log('item.response.data',item.response.data)
					if(item.response.data[0]){
						this.form.materialList.push({url:item.response.data[0],name:''})
					}
				})
				console.log(files)
				console.log('fileList',this.fileList)
				console.log('this.form',this.form)
				this.$u.post(`/reward/addOrUpdate`, {
					...this.form
				}).then(result => {
					this.hatchList = result.rows;
					this.nowList = result.rows;
				})
			},
			beforeUpload(index, list) {
				console.log('list',list)
				var formData = new FormData();
				formData.append('files',list[0].url);
				console.log('formData',formData)
				formData.forEach(value => console.log(value))
				// 返回一个promise
				return new Promise((resolve, reject) => {
					this.$u.post('/material/uploadPic?type=0',formData,{'Content-Type':'multipart/form-data'}).then(res => {
						// resolve()之后，将会进入promise的组件内部的then回调，相当于返回true
						resolve();
					}).catch(err => {
						// reject()之后，将会进入promise的组件内部的catch回调，相当于返回false
						reject();
					})
				})
			},
			//删除图片
			deletePic(e) {
				console.log(e);
				this[`fileList${e.name}`].splice(e.index, 1)
			},
		
			//上传图片
			uploadFilePromise(url) {
				console.log('url',url)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						//url: this.$common.domain+'/api/common/upload', // 仅为示例，非真实的接口地址
						url:'/material/uploadPic?type=0', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let data=JSON.parse(res.data) //最终传给的是字符串，这里需要转换格式
							resolve(data.data.url)
						}
					});
				})
			},
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