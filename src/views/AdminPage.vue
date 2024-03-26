<template>
  <BarTop
    @updateisFinished="isFinished = $event"
    @UpdateData="data = $event"
    class="BarTop"
    v-if="!ifPhone"
  />
  <Allgrid :data="data" :isFinished="isFinished" @GetPratim="GetPratim" />
  <DetalisCompVue />
</template>

<script>
import { useAxios } from "@vueuse/integrations/useAxios";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";
import { ElMessage } from "element-plus";
import BarTop from "@/components/Admin/BarTopComp.vue";
import Allgrid from "@/components/Admin/GridComp.vue";
import "./cssOfRedyElements.scss";
import { useStore } from "vuex";
import DetalisCompVue from "@/components/Admin/DetalisComp.vue";

export default {
  components: { BarTop, Allgrid, DetalisCompVue },
  setup() {
    // $ Vars
    // const { data, isFinished } = useAxios(URL + "GetRavakim");
    const Store = useStore();
    const { data, isFinished } = useAxios(URL + "GetRavakim");

    // $ Life Sycle

    onMounted(() => {
      document.body.style.background = "#4da0ff2a";
      // setTimeout(() => {
      //   ifPhone.value;
      //   console.log("🚀 ~ setTimeout ~ ifPhone.value:", ifPhone.value);
      // }, 2000);
    });
    // $ watch
    const ifPhone = computed(() => window.innerWidth < 400);
    watch(isFinished, (val) => {
      Store.commit("updateisFinished", val);
    });
    return {
      data,
      isFinished,
      ifPhone,
    };
  },
  methods: {
    async GetPratim(id) {
      this.$store.dispatch("GetDetalis", id);
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background: #4da0ff2a;
}
</style>
