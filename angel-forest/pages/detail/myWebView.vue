<template>
    <web-view :src="url" :webview-styles="webviewStyles"></web-view>
</template>

<script>
    export default {
        data() {
            return {
                url:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
            }
        },
        onLoad(val) {
            this.url = val.url
        }
    }
</script>

<style>
</style>