<template>
  <div>
    <h1 style="color: orange">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'EventBus'
    }
  },
  watch: {
    msg(newName, oldName) {
      this.msg = newName
    }
  },
  created() {
    this.$eventBus.$on('myEvent', (message) => {
      this.msg = message
    })
  }
}
</script>

