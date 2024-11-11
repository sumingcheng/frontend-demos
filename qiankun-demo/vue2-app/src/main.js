import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const {container} = props
  instance = new Vue({
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// qiankun 的生命周期函数
export async function bootstrap() {
  console.log('vue app bootstraped')
}

export async function mount(props) {
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

// 如果不是通过 qiankun 启动，则直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
