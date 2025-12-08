<template>
  <div class="ravakim-page">
    <BarTop
      @updateisFinished="isFinished = $event"
      @UpdateData="data = $event"
      class="BarTop"
      v-if="!ifPhone"
    />
    <Allgrid :data="data" :isFinished="isFinished" @GetPratim="GetPratim" />
    <DetalisCompVue />
  </div>
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
.ravakim-page {
  min-height: 100vh;
  padding-top: 1rem;
  padding-inline: 0.75rem;
  background: radial-gradient(circle at 15% 15%, #2f0835, transparent 55%),
    radial-gradient(circle at 80% 10%, #ff4d6d33, transparent 55%),
    radial-gradient(circle at 50% 100%, #ffb70333, transparent 55%),
    linear-gradient(135deg, #0b010f, #1a0318 40%, #120014);
}
</style>
