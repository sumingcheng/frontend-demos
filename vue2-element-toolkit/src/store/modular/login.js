const login = {
  state: {
    globalStateInstance: '这是一个全局状态'
  },
  getters: {
    getStatus: (state) => state.globalStateInstance
  },
  actions: {
    asynchronousSubmission({commit}, val) {
      commit('modifyState', val);
    },
  },
  mutations: {
    modifyState(state, val) {
      state.globalStateInstance = val;
    }
  }
};

export default login;
