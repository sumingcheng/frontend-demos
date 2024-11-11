import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import login from "@/store/modular/login"

export default new Vuex.Store(
    login
);
