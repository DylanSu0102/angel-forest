<template>
	<view>
		<u-navbar :is-back="false" title="动态"></u-navbar>
		<u-image :showLoading="true" :src="src" width="100%" height="280px"></u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../static/img/temp/comingOnline.png'
			}
		}
	}
</script>
<style>
</style>