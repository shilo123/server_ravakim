import { createStore } from "vuex";
import axios from "axios";
import { URL } from "@/URL/url";

export default createStore({
  state: {
    isFinished: false,
    activeIsh: null,
    isDelete: false,
    isUpdate: false,
  },
  getters: {},
  mutations: {
    updateisFinished(state, val) {
      state.isFinished = val;
    },
    UpdateActiveIsh(state, val) {
      state.activeIsh = val;
    },
    UpdateState(state, val) {
      if (val["Delete"]) {
        state.isDelete = val;
      } else if (val["Update"]) {
        state.isUpdate = val;
      }
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
