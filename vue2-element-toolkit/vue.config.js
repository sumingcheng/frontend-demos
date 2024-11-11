const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = defineConfig({
  transpileDependencies: true,  // 是否将所有文件都编译一遍（通过 babel 编译文件：ES6+ → ES5）
  publicPath: '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'assets', // 放置静态资源的目录
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    // host: 'localhost',
    // port: 80,
    // open: true,   //启动后是否自动打开浏览器访问首页
    historyApiFallback: true,
    allowedHosts: 'all',
    // allowedHosts: [
    //   'apply.free.svipss.top',    // 允许访问的域名地址，即内网穿透的地址
    //   '.free.svipss.top',    // .是二级域名的通配符
    // '.natappfree.cc'
    // ],
    // 跨域代理配置
    proxy: {
      '/front': {
        target: process.env.VUE_APP_HTTP_BASE_URL, // 我们要代理的地址
        changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
        // 路径重写
        pathRewrite: {
          // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
          '^/front': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做
        }
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
})
