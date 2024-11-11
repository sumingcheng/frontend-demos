import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import '@/assets/reset.scss'
import '@/assets/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 指令的定义对象可以包含多个钩子函数，如 bind、update、inserted、componentUpdated 和 unbind，用于在指令生命周期的不同阶段执行不同的操作。
Vue.directive('bgColor', {
  bind(el, binding) {
    el.style.backgroundColor = binding.value
  }
})

// 总线
Vue.prototype.$eventBus = new Vue()



new Vue({
  router, store, render: h => h(App)
}).$mount('#app')



