const packageName = require('./package.json').name

const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 20233
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      uniqueName: packageName
    }
  }
})
