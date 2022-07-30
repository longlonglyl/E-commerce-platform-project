const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const AutoImport = require('unplugin-auto-import/webpack') // 这三个plugin：element按需引入
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',  //配置以后，dist里的html引入资源时，会在前面加./  不加的话会找不到文件
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    externals: {
    //键：imoprt Mock from 'mockjs' 的mockjs 
    //值：imoprt Mock from 'mockjs' 的Mock，把script引入的cdn文件设定为全局变量Mock，其他文件就可以正常引入了
      'axios': 'axios',
      'mockjs': 'Mock',
      'swiper': 'Swiper'
    }
  }
})
