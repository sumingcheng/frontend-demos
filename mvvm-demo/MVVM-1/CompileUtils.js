CompileUtils = {
  // 处理data
  model(node, vm, exp) {
    let upDateFn = this.updater['modelUpdater']
    // 观察者
    new Watcher(vm, exp, () => {
      upDateFn && upDateFn(node, this.getValue(vm, exp))
    })
    // input 绑定事件处理函数
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.setValue(vm, exp, newValue)
    })
    upDateFn && upDateFn(node, this.getValue(vm, exp))
  },
  // 设置视图的值
  setValue(vm, exp, value) {
    exp = exp.split('.')
    // 取值
    return exp.reduce((prev, next, currentIndex) => {
      if (currentIndex === exp.length - 1) {
        return prev[next] = value
      }
      return prev[next]
    }, vm.$data)
  },

  // 处理 {{ }} 内的值
  text(node, vm, exp) {
    // 使用textUpdater处理器
    let upDateFn = this.updater['textUpdater']
    let value = this.getTextValue(vm, exp)
    let reg = /\{\{([^}]+)\}\}/g
    exp.replace(reg, (...args) => {
      // 观察者
      new Watcher(vm, args[1], () => {
        upDateFn && upDateFn(node, this.getTextValue(vm, exp))
      })
    })
    upDateFn && upDateFn(node, value)
  },

  getTextValue(vm, exp) {
    let reg = /\{\{([^}]+)\}\}/g
    return exp.replace(reg, (...args) => {
      return this.getValue(vm, args[1])
    })
  },
  // 替换节点内容
  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    textUpdater(node, value) {
      node.textContent = value
    }
  },
  getValue(vm, exp) {
    let arr = exp.split('.')
    // 生成数组，找vm.$data.massage.a
    return arr.reduce((previousValue, currentValue) => {
      return previousValue[currentValue]
    }, vm.$data)
  }
}
