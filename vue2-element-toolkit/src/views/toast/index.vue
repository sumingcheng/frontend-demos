<template>
  <div>
    <el-button type="primary" @click="loading1">LOADING1</el-button>
    <el-button type="primary" @click="loading2">LOADING2</el-button>
  </div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      openFullScreen: false,
    };
  },
  methods: {
    // 以服务的方式调用
    loading1() {
      // 完整引入el UI可以使用 this.$loading 访问
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    loading2() {
      let options = {
        fullscreen: true,
        lock: false,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'abc',
      };
      let loadingInstance = Loading.service(options);

      setTimeout(() => {
        loadingInstance.close();
      }, 1000 * 10);
    }
  }
};
</script>

<style scoped>

</style>
