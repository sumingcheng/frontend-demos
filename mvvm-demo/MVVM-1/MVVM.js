class MVVM {
  constructor(opt) {
    // $ 标记 表示为 Vue 内部的属性
    this.$el = opt.el
    this.$data = opt.data
    if (this.$el) {
      // 数据劫持
      new Observer(this.$data)
      // 预编译解析指令，传入this，为了方便处理其他的配置项，这里建议直接传入this
      new Compile(this.$el, this)
    }
  }
}


