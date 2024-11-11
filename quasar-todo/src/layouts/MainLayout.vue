<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="left = !left" />

        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todayDate }}</div>
      </div>
      <q-img src="../assets/images/img.jpg"
        class="header-image absolute-top"></q-img>
    </q-header>

    <q-drawer v-model="left"
      show-if-above
      :width="250"
      :breakpoint="600">
      <q-scroll-area style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        ">
        <q-list padding>
          <q-item to="/"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>Todo</q-item-section>
          </q-item>

          <q-item to="/help"
            exact
            active
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top"
        src="../assets/images/img.jpg"
        style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px"
            class="q-mb-sm">
            <img src="../assets/images/fxh.jpg" />
          </q-avatar>
          <div class="text-weight-bold">fxh Todo</div>
          <div>@fanxiaohao</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";
export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      left: false,
    };
  },
  computed: {
    todayDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "YYYY年MM月DD日");
    },
  },
};
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.8;
  filter: grayscale(30%);
}
</style>