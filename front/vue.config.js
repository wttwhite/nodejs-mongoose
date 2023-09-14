const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name
const { getEnvUrl } = require('arkfun/lib/main.js')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV == 'production'
      ? getEnvUrl('other', 'context-seat', false) // 函数入参  1.环境目前api,wx  2.上下文(项目名)  3.是否进行鉴权
      : './',
  filenameHashing: true,
  assetsDir: 'selfstatic',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/other': {
        target: 'https://192.168.2.20',
        changeOrigin: true,
      },
      '/devKey': {
        target: 'https://192.168.2.20',
        changeOrigin: true,
        pathRewrite: {
          '/devKey': '',
        },
      },
      '/api/context-seat': {
        target: 'http://localhost:3000',// 后端地址
        // target: 'https://192.168.2.20',
        changeOrigin: true,
        pathRewrite: {
          // '/api': '', // 连后端本地接口，打开这一行，后端接口不带api
        },
      },
    },
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
    },
  },
})
