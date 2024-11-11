<template>
  <q-page class="bg-grey-2 column">
    <div class="row q-pa-sm ">
      <q-input filled
        v-model="newTask"
        class="col"
        square
        placeholder="Add task"
        bg-color="white"
        dense
        @keyup.enter="addTask">
        <template v-slot:append>
          <q-btn round
            dense
            flat
            icon="add"
            @click="addTask"></q-btn>
        </template>
      </q-input>
    </div>
    <q-list class="bg-white"
      separator
      bordered>
      <q-item v-for="(taks,index) in tasks"
        clickable
        v-ripple
        :key="taks.title"
        @click="taks.done = !taks.done"
        :class="{'done bg-grey-2':taks.done}">
        <q-item-section avatar>
          <q-checkbox v-model="taks.done"
            val="teal"
            color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ taks.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="taks.done"
          side>
          <q-btn @click.stop="deleteTask(index)"
            flat
            round
            dense
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="no-tasks absolute-center"
      v-if="!tasks.length">
      <q-icon name="check"
        size="100px"
        color="primary">
      </q-icon>
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      confirm: false,
      newTask: "",
    };
  },
  methods: {
    deleteTask(val) {
      this.$q
        .dialog({
          title: "提示",
          message: "确定要删除该任务吗？",
        })
        .onOk(() => {
          this.tasks.splice(val, 1);
          this.$q.notify("已删除");
        });
    },
    addTask() {
      if (!this.newTask == "") {
        this.tasks.push({
          title: this.newTask,
          done: false,
        });
        this.newTask = "";
      }
    },
  },
};
</script>
<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>

