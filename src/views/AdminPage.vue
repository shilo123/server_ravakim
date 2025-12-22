<template>
  <div
    class="ravakim-page"
    :class="{ 'ravakim-page--delete-mode': isDelete }"
    :style="{
      backgroundImage: 'url(/Logo.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }"
  >
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

    <!-- דיאלוג אישור מחיקה -->
    <div
      v-if="showDeleteConfirm"
      class="delete-confirm-overlay"
      @click.self="cancelDelete"
    >
      <div class="delete-confirm-dialog">
        <div class="delete-confirm-header">
          <h3>אישור מחיקה</h3>
          <button class="delete-confirm-close" @click="cancelDelete">✕</button>
        </div>
        <div class="delete-confirm-body">
          <p>האם אתה בטוח שברצונך למחוק את המשתמש הזה?</p>
          <p class="delete-confirm-warning">פעולה זו אינה ניתנת לביטול!</p>
        </div>
        <div class="delete-confirm-actions">
          <button
            class="delete-confirm-btn delete-confirm-btn--cancel"
            @click="cancelDelete"
          >
            ביטול
          </button>
          <button
            class="delete-confirm-btn delete-confirm-btn--confirm"
            @click="confirmDelete"
          >
            מחק
          </button>
        </div>
      </div>
    </div>
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
    const showDeleteConfirm = ref(false);
    const userToDelete = ref(null);

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

    const DelteUser = (id) => {
      // פתיחת דיאלוג אישור במקום מחיקה ישירה
      userToDelete.value = id;
      showDeleteConfirm.value = true;
    };

    const confirmDelete = async () => {
      if (!userToDelete.value) return;

      try {
        const success = await Store.dispatch("DelteUser", userToDelete.value);

        if (success) {
          await execute();
          Store.commit("UpdateState", { isDelete: false });
          window.$toast && window.$toast("✅ המשתמש נמחק בהצלחה", "success");
        } else {
          console.warn("מחיקה נכשלה בשרת");
          window.$toast && window.$toast("❌ שגיאה במחיקת המשתמש", "error");
        }
      } catch (err) {
        console.error("DeleteUser error:", err);
        window.$toast && window.$toast("❌ שגיאה במחיקת המשתמש", "error");
      } finally {
        // סגירת הדיאלוג
        showDeleteConfirm.value = false;
        userToDelete.value = null;
      }
    };

    const cancelDelete = () => {
      showDeleteConfirm.value = false;
      userToDelete.value = null;
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
      showDeleteConfirm,
      confirmDelete,
      cancelDelete,
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  // שכבה כהה מעל הרקע כדי שהתוכן יהיה קריא
  &::before {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.85);
    z-index: 0;
    pointer-events: none;
  }

  // כל התוכן מעל השכבה הכהה
  // > * {
  //   position: relative;
  // }
}

/* overlay כהה מאחורי הכרטיסיות */
.ravakim-page__overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75); /* שחור-כחלחל שקוף */
  pointer-events: none; /* כדי שהכרטיסיות עדיין יהיו קליקביליות */
  z-index: 5;
}

/* דיאלוג אישור מחיקה */
.delete-confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
}

.delete-confirm-dialog {
  background: linear-gradient(135deg, #1a0318, #2b0630);
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 200, 255, 0.3);
  color: #ffffff;
  direction: rtl;
}

.delete-confirm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffb703;
  }
}

.delete-confirm-close {
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.delete-confirm-body {
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #e5e7eb;
  }
}

.delete-confirm-warning {
  color: #fecaca !important;
  font-weight: 600;
  font-size: 0.9rem !important;
}

.delete-confirm-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.delete-confirm-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &--cancel {
    background: rgba(148, 163, 184, 0.3);
    color: #e5e7eb;

    &:hover {
      background: rgba(148, 163, 184, 0.5);
      transform: translateY(-1px);
    }
  }

  &--confirm {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.7);
      filter: brightness(1.1);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
