<template>
  <el-row class="main" :gutter="row.gutter">
    <div :style="{width:width}" v-for="item in descriptionList" :key="item.key">
      <div class="label">{{ item.label }}</div>
      <div class="text">{{ item.text }}</div>
    </div>
  </el-row>
</template>
<script>


export default {
  props: {
    descriptionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      row: {
        gutter: 0,
        span: 8,
      },
    }
  },
  computed: {
    width: function () {
      let num = 100 / this.descriptionList.length
      return Number(num) + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  justify-content: left;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
}

.label {
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
}

.text {
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  border: 1px solid #ebebeb;
  background-color: #bcc9ee;
}


</style>
