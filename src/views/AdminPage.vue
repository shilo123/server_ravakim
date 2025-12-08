<template>
  <div class="ravakim-page">
    <BarTop
      @updateisFinished="isFinished = $event"
      @UpdateData="data = $event"
      class="BarTop"
      v-if="!ifPhone"
    />
    <Allgrid :data="data" :isFinished="isFinished" @GetPratim="GetPratim" />

    <DetalisCompVue
      v-if="showDetails && selectedId"
      :id="selectedId"
      @close="showDetails = false"
    />
  </div>
</template>

<script>
import { useAxios } from "@vueuse/integrations/useAxios";
import { computed, onMounted, ref, watch } from "vue";
import { URL } from "@/URL/url";
import { useStore } from "vuex";
import BarTop from "@/components/Admin/BarTopComp.vue";
import Allgrid from "@/components/Admin/GridComp.vue";
import DetalisCompVue from "@/components/Admin/DetalisComp.vue";
import "./cssOfRedyElements.scss";

export default {
  components: { BarTop, Allgrid, DetalisCompVue },
  setup() {
    const Store = useStore();
    const { data, isFinished } = useAxios(URL + "GetRavakim");
    const ifPhone = computed(() => window.innerWidth < 400);
    const isDelete = computed(() => Store.state.isDelete);
    const isUpdate = computed(() => Store.state.isUpdate);

    const showDetails = ref(false);
    const selectedId = ref(null);

    watch(isFinished, (val) => {
      Store.commit("updateisFinished", val);
    });
    watch(isDelete, (val) => {
      console.log("watch isDelete:", val);
      if (val) {
        alert("isDelete");
        // חשוב: לאפס כדי שברגע הבא יהיה שינוי שוב
        // Store.commit("setIsDelete", false);
      }
    });

    watch(isUpdate, (val) => {
      console.log("watch isUpdate:", val);
      if (val) {
        alert("isUpdate");
        // Store.commit("setIsUpdate", false);
      }
    });

    onMounted(() => {
      document.body.style.background = "#4da0ff2a";
    });

    const GetPratim = (id) => {
      selectedId.value = id;
      showDetails.value = true;
      // אם אתה עדיין רוצה לשמור גם ב־Vuex:
      Store.dispatch("GetDetalis", id);
    };

    return {
      data,
      isFinished,
      ifPhone,
      showDetails,
      selectedId,
      GetPratim,
    };
  },
};
</script>
