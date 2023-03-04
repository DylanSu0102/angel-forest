<template>
	<view class="emoji" :style="{height:height+'px'}">
		<view class="emoji-line" v-for="(line,i) in emoji" :key="i">
			<view class="emoji-line-item" v-for="(item,index) in line" :key="index" @tap="clickEmoji(item)">{{entitiesToUtf16(item)}}
			</view>\ue415
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			height:{
				type:Number,
				default:260
			}
		},
		name: "emoji",
		data() {
			return {
				emoji: [
					['&\ue415;', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '??', '??', '??'],
					['??', '??', '??', '??', '????', '???', '???'],
					['????', '????', '????', '???', '????', '????', '????'],
					['????', '??', '??', '??', '??', '??'] //'??',
				]
			};
		},
		mounted() {
			const str = '😊大家好👏';
			console.log('list',this.entitiesToUtf16(str))
			console.log('list',this.utf16ToEntities(str))
			console.log('list',this.entitiesToUtf16('&#128522;'))
			console.log('list',this.utf16ToEntities('&#128522;'))
		},
		methods: {
			clickEmoji(e) {
				this.$emit('emotion', e)
			},
			utf16ToEntities(str) {
			  const reg = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
			  str = str.replace(reg, (char) => {
			    let H, L, code, s;
			
			    if (char.length === 2) {
			      H = char.charCodeAt(0); // 取出高位
			      L = char.charCodeAt(1); // 取出低位
			      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
			      s = `&#${code};`;
			    } else {
			      s = char;
			    }
			
			    return s;
			  });
			
			  return str;
			},
			entitiesToUtf16(str) {
				const reg = /&#\d+;/g;
				const arr = str.match(reg) || [];

				let H, L, code;

				for (let i = 0; i < arr.length; i += 1) {
					code = arr[i];
					code = code.replace('&#', '').replace(';', '');
					// 高位
					H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
					// 低位
					L = ((code - 0x10000) % 0x400) + 0xDC00;
					code = `&#${code};`;
					const s = String.fromCharCode(H, L);
					str = str.replace(code, s);
				}
				return str;
			}
		}
	}
</script>

<style lang="scss">
	.emoji {
		width: 100%;
		// height: 460rpx;
		padding: 16rpx 10rpx 130rpx 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;

		.emoji-line{
			display: flex;

			.emoji-line-item {
				flex: 1;
				text-align: center;
				font-size: 44rpx;
				line-height: 140rpx;
			}
		}
	}
</style>
