module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/mock': {
        target: 'http://8.210.126.36:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      }
    }
  }
}