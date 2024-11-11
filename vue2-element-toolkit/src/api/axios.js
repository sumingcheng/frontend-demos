import axios from 'axios';

const service = axios.create({
  crossDomain: true,
  withCredentials: true,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
// service.interceptors.request.use(config => {
//       let loginData = sessionStorage.getItem('loginData');
//       let token = JSON.parse(loginData).token || '';
//       if (token) {
//         Object.assign(config.headers, { Authorization: token });
//       }
//       return config;
//     },
//     error => {
//       Promise.reject(error);
//     });
//
// // 响应拦截器
// service.interceptors.response.use(response => {
//   let code = response.data.code;
//   let message = response.data.message;
//   if (code === 401001 || code === 401002) {
//     // token失效  清理登录暂存信息
//     // removeLogin();
//     utils.warning('登录状态已失效，请重新登录！');
//     setTimeout(() => {
//       location.reload();
//     }, 1000);
//   } else if (code === 403001) {
//     // 针对表单信息错误提示特殊处理，页面需要在el-form-item上配合:error属性显示错误信息
//     return response.data;
//   } else if (code === 200) {
//     return response.data;
//   } else {
//     utils.error(message);
//     return response.data;
//   }
// }, error => {
//   console.log('err' + error); // for debug
//   return Promise.reject(error);
// });

export default service;
