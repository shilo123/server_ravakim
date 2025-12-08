<template>
  <div class="details-overlay" dir="rtl" @click.self="close">
    <div class="details-card">
      <!-- כפתורים עליונים -->
      <button class="close-btn" @click="close">✕</button>
      <button class="export-btn" @click="exportDetails">⬇️ ייצוא פרטים</button>

      <!-- מצבים -->
      <div v-if="loading" class="state-msg">טוען פרטים...</div>
      <div v-else-if="error" class="state-msg error">שגיאה בטעינת הנתונים</div>

      <!-- תוכן -->
      <div v-else-if="user" class="content">
        <!-- חלק עליון -->
        <div class="top">
          <div class="avatar-wrapper" v-if="user.picURL">
            <img :src="user.picURL" class="avatar" />
          </div>
          <div v-else class="avatar placeholder">
            {{ initials }}
          </div>

          <div class="top-text">
            <h2>{{ user.Name }}</h2>
            <p class="sub">{{ user.Age }} · {{ user.Gender }}</p>
            <p class="job">{{ user.IsuckOrMosadLimudim }}</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- פרטים -->
        <div class="grid">
          <div class="block" v-if="user.RamaDatit">
            <h3>רמה דתית</h3>
            <p>{{ user.RamaDatit }}</p>
          </div>

          <div class="block" v-if="user.Ofi">
            <h3>אופי</h3>
            <p>{{ user.Ofi }}</p>
          </div>

          <div class="block" v-if="user.Hobits">
            <h3>תחביבים</h3>
            <p>{{ user.Hobits }}</p>
          </div>

          <div class="block" v-if="user.MaMehapes">
            <h3>מה מחפש</h3>
            <p>{{ user.MaMehapes }}</p>
          </div>

          <div class="block" v-if="user.KavimClalim">
            <h3>משפחה</h3>
            <p>{{ user.KavimClalim }}</p>
          </div>

          <!-- הערה + עריכה -->
          <div class="block">
            <h3>הערה</h3>
            <textarea v-model="noteDraft" placeholder="כתוב הערה..."></textarea>
            <button class="save-btn" @click="saveNote">שמור הערה</button>
          </div>
        </div>
      </div>

      <div v-else class="state-msg">אין נתונים</div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import axios from "axios";
import { URL } from "@/URL/url";

export default {
  name: "DetalisComp",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(false);
    const noteDraft = ref("");

    const fetchDetails = async () => {
      if (!props.id) return;
      loading.value = true;
      error.value = false;

      try {
        const { data } = await axios.get(`${URL}GetDetalis/${props.id}`);
        user.value = data;
        noteDraft.value = data?.Note || "";
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    watch(
      () => props.id,
      () => {
        fetchDetails();
      },
      { immediate: true }
    );

    const saveNote = async () => {
      try {
        await axios.put(`${URL}UpdateNote/${props.id}`, {
          Note: noteDraft.value,
        });
        user.value.Note = noteDraft.value;
        window.$toast && window.$toast("✅ הערה נשמרה", "success");
      } catch (e) {
        window.$toast && window.$toast("❌ שגיאה בשמירת הערה", "error");
      }
    };

    const exportDetails = async () => {
      if (!user.value) return;

      const content = `
שם: ${user.value.Name || ""}
גיל: ${user.value.Age || ""}
מגדר: ${user.value.Gender || ""}
עיסוק: ${user.value.IsuckOrMosadLimudim || ""}
רמה דתית: ${user.value.RamaDatit || ""}
אופי: ${user.value.Ofi || ""}
תחביבים: ${user.value.Hobits || ""}
מה מחפש: ${user.value.MaMehapes || ""}
משפחה: ${user.value.KavimClalim || ""}
הערה: ${user.value.Note || ""}
  `.trim();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content);
          window.$toast && window.$toast("✅ הפרטים הועתקו ללוח", "success");
        } else {
          // fallback לדפדפנים ישנים
          const temp = document.createElement("textarea");
          temp.value = content;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          window.$toast && window.$toast("✅ הפרטים הועתקו ללוח", "success");
        }
      } catch (e) {
        window.$toast && window.$toast("❌ לא הצלחתי להעתיק ללוח", "error");
      }
    };

    const close = () => emit("close");

    const initials = computed(() => {
      if (!user.value?.Name) return "?";
      const parts = user.value.Name.split(" ");
      return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
    });

    return {
      user,
      loading,
      error,
      noteDraft,
      saveNote,
      exportDetails,
      close,
      initials,
    };
  },
};
</script>

<style scoped lang="scss">
.details-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.details-card {
  width: min(460px, 92%);
  max-height: 78vh;
  background: linear-gradient(135deg, #020617, #0b1220);
  border-radius: 16px;
  padding: 1rem;
  color: #f9fafb;
  overflow-y: auto;
  position: relative;
  direction: rtl;
  text-align: right;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.75);
}

/* כפתורים עליונים */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 1.1rem;
  cursor: pointer;
}

.export-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
}

/* עליון */
.top {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.6rem;
}

.avatar-wrapper,
.avatar.placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.top-text h2 {
  font-size: 1.05rem;
  margin: 0;
}

.sub {
  font-size: 0.75rem;
  color: #94a3b8;
}

.job {
  font-size: 0.75rem;
  color: #cbd5f5;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #334155, transparent);
  margin: 0.5rem 0;
}

/* רשת פרטים */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.45rem;
}

.block {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 10px;
  padding: 0.5rem 0.55rem;
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.block h3 {
  margin: 0 0 0.2rem;
  font-size: 0.72rem;
  color: #93c5fd;
}

.block p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: #e5e7eb;
  white-space: pre-line;
}

/* הערה */
textarea {
  width: 100%;
  min-height: 60px;
  border-radius: 8px;
  border: 1px solid #475569;
  padding: 6px;
  background: #020617;
  color: white;
  font-size: 0.8rem;
  resize: none;
  direction: rtl;
}

.save-btn {
  margin-top: 4px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
}

/* מצבים */
.state-msg {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: #cbd5f5;
}

.state-msg.error {
  color: #fecaca;
}
</style>
