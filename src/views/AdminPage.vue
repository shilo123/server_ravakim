<template>
  <div class="ravakim-page" :class="{ 'ravakim-page--delete-mode': isDelete }">
    <!-- overlay כהה בזמן מחיקה -->
    <div v-if="isDelete" class="ravakim-page__overlay"></div>

    <BarTop
      @updateisFinished="isFinished = $event"
      @UpdateData="data = $event"
      class="BarTop"
    />
    <!-- v-if="!ifPhone" -->

    <!-- Allgrid מקבל מצב מחיקה + פונקציית מחיקה -->
    <Allgrid
      :data="data"
      :isFinished="isFinished"
      :isDeleteMode="isDelete"
      @GetPratim="GetPratim"
      @DelteUser="DelteUser"
    />

    <DetalisCompVue
      v-if="showDetails && selectedId"
      :id="selectedId"
      @close="showDetails = false"
    />
  </div>
</template>

<script>
import { useAxios } from "@vueuse/integrations/useAxios";
// import axios from "axios";
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

    // קריאה לשרת + פונקציית רענון
    const { data, isFinished, execute } = useAxios(
      URL + "GetRavakim",
      { method: "GET" },
      { immediate: true } // רץ פעם אחת כשהדף נטען
    );

    const ifPhone = computed(() => window.innerWidth < 400);
    const isDelete = computed(() => Store.state.isDelete);
    const isUpdate = computed(() => Store.state.isUpdate);

    const showDetails = ref(false);
    const selectedId = ref(null);

    // עדכון סטטוס טעינה ב-Vuex (אם אתה משתמש בזה במקום אחר)
    watch(isFinished, (val) => {
      Store.commit("updateisFinished", val);
      // console.log("data.value", data.value);
    });

    // אם נכנסים למצב מחיקה – נסגור את דף הפרטים
    watch(isDelete, (val) => {
      if (val) {
        showDetails.value = false;
      }
    });

    watch(isUpdate, (val) => {
      // אם תרצה לעשות משהו כשנכנסים למצב עדכון – תוסיף פה
    });

    onMounted(() => {
      document.body.style.background = "#4da0ff2a";
    });

    const GetPratim = (id) => {
      // אם במצב מחיקה – אל תפתח פירוט
      if (isDelete.value) return;

      selectedId.value = id;
      showDetails.value = true;
      Store.dispatch("GetDetalis", id);
    };

    const DelteUser = async (id) => {
      try {
        const success = await Store.dispatch("DelteUser", id);

        if (success) {
          await execute();
          Store.commit("UpdateState", { isDelete: false });
        } else {
          console.warn("מחיקה נכשלה בשרת");
        }
      } catch (err) {
        console.error("DeleteUser error:", err);
      }
    };

    return {
      data,
      isFinished,
      ifPhone,
      showDetails,
      selectedId,
      GetPratim,
      isDelete,
      DelteUser,
    };
  },
};
</script>

<style scoped lang="scss">
.ravakim-page {
  position: relative;
  padding: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
}

/* overlay כהה מאחורי הכרטיסיות */
.ravakim-page__overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75); /* שחור-כחלחל שקוף */
  pointer-events: none; /* כדי שהכרטיסיות עדיין יהיו קליקביליות */
  z-index: 5;
}
</style>
