<template>
  <div>
    <h1 v-bgColor="'red'">这是一个h1</h1>
    <h1>这是一段文字</h1>
    <h1>这是一个标题</h1>
    <h1>这是一段内容</h1>
    <el-button @click="eventBus">eventBus</el-button>
    <event></event>
  </div>
</template>

<script>
export default {
  name: 'customInstructions',
  components: {
    event: () => import('@/views/instructions/eventBus.vue')
  },
  methods: {
    eventBus() {
      this.$eventBus.$emit('myEvent', '修改myEvent')
    }
  }
}
</script>

<style scoped>

</style>
