const axios = require('axios')
const {XiaoShuo, Log} = require('../config')
const {print} = require('../utils')
const colors = require('colors-console')

const instance = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: XiaoShuo,
  timeout: 10000
})

instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前可以对请求进行一些处理，如添加请求头、验证等
      if (Log) {
        print(config)
        console.log(colors('blue', '⬆请求拦截器⬆'))
      }
      return config
    },
    function (error) {
      // 对请求错误做处理
      return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
      // 对响应数据进行处理
      if (Log) {
        print(response.data)
        console.log(colors('blue', '⬆响应拦截器⬆'))
      }
      return response.data
    },
    function (error) {
      // 对响应错误做处理
      return Promise.reject(error)
    }
)

module.exports = instance

