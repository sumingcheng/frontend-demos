class Observer {
  constructor(data) {
    this.observe(data)
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    // 遍历 key 对所有的 key 进行监听
    Object.keys(data).forEach((key) => {
      // 数据劫持
      this.defineReactive(data, key, data[key])
      // 递归 穿透到对象内部
      this.observe(data[key])
    })
  }
  // 数据劫持
  defineReactive(obj, key, value) {
    let _this = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 控制台内可以看到被劫持的getter和setter
      get() {
        // 获取
        Dep.target && dep.addSubs(Dep.target)
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          // 新增加的值，也要增加getter和setter
          _this.observe(newValue)
          value = newValue
          // 更新新值的时候发布
          dep.notify()
        }
      }
    })
  }
}

class Dep {
  constructor() {
    // 订阅者数组
    this.subs = []
  }

  // 订阅
  addSubs(watcher) {
    this.subs.push(watcher)
  }

  // 发布
  notify() {
    this.subs.forEach(watcher => watcher.updater())
  }
}
