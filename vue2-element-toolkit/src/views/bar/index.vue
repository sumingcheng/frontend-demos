<template>
  <div class="barBg" :style="cssVars">
    <div class="bar" :style="cssVars"></div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        // 高度，和圆角同步
        height: 15,
        // 最大值
        maximum: 100,
        // 最小值
        minimum: 50,
        // 百分比
        percentage: 30,
        // 背景色
        bgColor: '#e5f1ff',
        // bar颜色
        barColor: '#4fa5f8',
      })
    },
  },
  computed: {
    cssVars() {
      return {
        '--width': this.isPercentage(),
        '--height': this.options.height + 'px',
        '--angle': this.options.height + 'px',
        '--barColor': this.options.barColor,
        '--bgColor': this.options.bgColor,
      };
    }
  },
  data() {
    return {};
  },
  methods: {
    isPercentage() {
      let percentage = this.options.percentage;
      if (percentage) {
        return percentage + '%';
      } else {
        return this.GetPercent(Number(this.options.minimum), Number(this.options.maximum));
      }
    },
    GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        new Error('请传入正确数值');
        return 0;
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%';
    }
  }
};
</script>

<style lang="scss" scoped>
.bar {
  position: relative;
  top: 0;
  left: 0;
  width: var(--width);
  height: var(--height);
  background-color: var(--barColor);
  border-radius: var(--angle);
}

.barBg {
  width: 100%;
  height: var(--height);
  background-color: var(--bgColor);
  border-radius: var(--angle);
}
</style>
