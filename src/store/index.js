import { createStore } from "vuex";
import axios from "axios";
import { URL } from "@/URL/url";

export default createStore({
  state: { isFinished: false, activeIsh: null },
  getters: {},
  mutations: {
    updateisFinished(state, val) {
      state.isFinished = val;
    },
    UpdateActiveIsh(state, val) {
      state.activeIsh = val;
    },
  },
  //

  actions: {
    async GetDetalis({ commit }, id) {
      let { data } = await axios.get(URL + "GetDetalis/" + id);
      commit("UpdateActiveIsh", data);
    },
  },
  modules: {},
});
