<template>
	<view class="rich-view">
		<rich-text :nodes="nodes" class="rich-text" :class="['omit' + isOmit]"><span style="color:#ccc;" v-if="placeholder">{{placeholder}}</span></rich-text>
	</view>
</template>
<script>
	import config from '@/config/index.js'
	export default {
		props:{
			height:{
				type:Number,
				default:260
			}
		},
		data() {
			return{
				dataList: {
					爱你: 'aini',
					奥特曼: 'aoteman',
					拜拜: 'baibai',
					抱抱: 'baobao',
					悲伤: 'beishang',
					并不简单: 'bingbujiandan',
					鄙视: 'bishi',
					闭嘴: 'bizui',
					馋嘴: 'chanzui',
					吃惊: 'chijing',
					打哈欠: 'dahaqi',
					打脸: 'dalian',
					敲头: 'ding',
					狗头: 'doge',
					二哈: 'erha',
					费解: 'feijie',
					肥皂: 'feizao',
					感冒: 'ganmao',
					鼓掌: 'guzhang',
					哈哈: 'haha',
					害羞: 'haixiu',
					汗: 'han',
					呵呵: 'hehe',
					嘿嘿嘿: 'heiheihei',
					黑线: 'heixian',
					哼: 'heng',
					坏笑: 'huaixiao',
					花心: 'huaxin',
					急眼: 'jiyan',
					可爱: 'keai',
					可怜: 'kelian',
					酷: 'ku',
					骷髅: 'kulou',
					困: 'kun',
					懒得理你: 'landelini',
					泪: 'lei',
					怒: 'nu',
					怒骂: 'numa',
					钱: 'qian',
					亲亲: 'qinqin',
					傻眼: 'shayan',
					生病: 'shengbing',
					失望: 'shiwang',
					衰: 'shuai',
					睡觉: 'shuijiao',
					思考: 'sikao',
					太开心: 'taikaixin',
					摊手: 'tanshou',
					舔: 'tian',
					偷笑: 'touxiao',
					吐: 'tu',
					挖鼻孔: 'wabishi',
					委屈: 'weiqu',
					污: 'wu',
					笑哭: 'xiaoku',
					星星眼: 'xingxingyan',
					嘻嘻: 'xixi',
					嘘: 'xu',
					阴险: 'yinxian',
					疑问: 'yiwen',
					右哼哼: 'youhengheng',
					晕: 'yun',
					允悲: 'yunbei',
					抓狂: 'zhuakuang'
				},
				nodes:''
			}
		},
		props:{
			richString:{
				type:String,
				default: () => {
					return ''
				}
			},
			placeholder:{
				type:String,
				default: null
			},
			// 是否限制显示行数
			isOmit:{
				type: String,
				default: 'n'
			}
		},
		watch:{
			richString(newValue,oldValue) {
				this.nodes = newValue
				if(this.nodes){
					this.replace()
				}else{
					this.nodes = `<span style="color:#ccc;">${this.placeholder}</span>`
				}
			}
		},
		methods:{
			replace() {
				// 处理富文本图片无法显示问题
				this.nodes = this.nodes.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
				
				// 处理表情
				let temp = []
				let reg = /\[.*?\]/g
				while((temp = reg.exec(this.nodes))){
					let str = temp[0].substring(1,temp[0].length-1)
					if(this.dataList[str]){
						let value = this.dataList[str]
						let html = `<img src='${config.imgUrl}/emoji/d_${value}.gif' style='width:18px;height:18px;vertical-align: middle;'></img>`
						this.nodes = this.nodes.replace(temp[0],html)
					}
				}
			}
		},
		created() {
			this.nodes = this.richString
			this.replace()
		}
	}
</script>
<style scoped lang="scss">
.rich-view{
	// display: inline-block;
	.rich-text{
		word-break: break-all;
		white-space: pre-line;
	}
}
.omit4{
	@include p-n(4);
	max-height: 400upx;
}
.omit3{
	@include p-n(3)
}
</style>

