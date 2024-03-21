import { createStore } from "vuex";

export default createStore({
  state: { isFinished: false },
  getters: {},
  mutations: {
    updateisFinished(state, val) {
      state.isFinished = val;
    },
  },
  actions: {},
  modules: {},
});
