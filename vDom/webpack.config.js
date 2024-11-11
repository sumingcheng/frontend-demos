const HtmlWebpackPlugin = require('html-webpack-plugin'),
    { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html')
    })
  ],
  devServer: {
    // static: {
    //   directory: resolve.join(__dirname, 'public'), // 静态文件所在的目录
    // },
    open: true
  }
}
