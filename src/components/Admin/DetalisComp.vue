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
            <p class="sub">{{ user.age }} · {{ user.Gender }}</p>
            <p class="job">{{ user.IsuckOrMosadLimudim }}</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- פרטים -->
        <div class="grid">
          <!-- גיל -->
          <div class="block" v-if="user.Age || user.age">
            <h3>גיל</h3>

            <!-- מצב תצוגה -->
            <p class="row" v-if="editField !== 'Age'">
              <span>{{ user.Age ?? user.age }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('Age')"
              ></i>
            </p>

            <!-- מצב עריכה -->
            <div class="edit-row" v-else>
              <input
                v-model="editDraft"
                class="edit-input"
                type="number"
                min="0"
              />
              <button class="edit-save" @click="confirmEdit('Age')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- רמה דתית -->
          <div class="block" v-if="user.RamaDatit">
            <h3>רמה דתית</h3>

            <!-- מצב תצוגה -->
            <p class="row" v-if="editField !== 'RamaDatit'">
              <span>{{ user.RamaDatit }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('RamaDatit')"
              ></i>
            </p>

            <!-- מצב עריכה -->
            <div class="edit-row" v-else>
              <input v-model="editDraft" class="edit-input" type="text" />
              <button class="edit-save" @click="confirmEdit('RamaDatit')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- אופי -->
          <div class="block" v-if="user.Ofi">
            <h3>אופי</h3>

            <p class="row" v-if="editField !== 'Ofi'">
              <span>{{ user.Ofi }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('Ofi')"
              ></i>
            </p>

            <div class="edit-row" v-else>
              <input v-model="editDraft" class="edit-input" type="text" />
              <button class="edit-save" @click="confirmEdit('Ofi')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- תחביבים -->
          <div class="block" v-if="user.Hobits">
            <h3>תחביבים</h3>

            <p class="row" v-if="editField !== 'Hobits'">
              <span>{{ user.Hobits }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('Hobits')"
              ></i>
            </p>

            <div class="edit-row" v-else>
              <input v-model="editDraft" class="edit-input" type="text" />
              <button class="edit-save" @click="confirmEdit('Hobits')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- מה מחפש -->
          <div class="block" v-if="user.MaMehapes">
            <h3>מה מחפש</h3>

            <p class="row" v-if="editField !== 'MaMehapes'">
              <span>{{ user.MaMehapes }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('MaMehapes')"
              ></i>
            </p>

            <div class="edit-row" v-else>
              <input v-model="editDraft" class="edit-input" type="text" />
              <button class="edit-save" @click="confirmEdit('MaMehapes')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- משפחה -->
          <div class="block" v-if="user.KavimClalim">
            <h3>משפחה</h3>

            <p class="row" v-if="editField !== 'KavimClalim'">
              <span>{{ user.KavimClalim }}</span>
              <i
                class="fa-solid fa-pen edit-icon"
                @click="startEdit('KavimClalim')"
              ></i>
            </p>

            <div class="edit-row" v-else>
              <input v-model="editDraft" class="edit-input" type="text" />
              <button class="edit-save" @click="confirmEdit('KavimClalim')">
                עדכון
              </button>
              <button class="edit-cancel" @click="cancelEdit">בטל</button>
            </div>
          </div>

          <!-- הערה -->
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

    // שדה שנמצא כרגע בעריכה + הערך הזמני שלו
    const editField = ref(null); // למשל "RamaDatit" / "Age" וכו'
    const editDraft = ref("");

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

    const EditUser = async (payload) => {
      const { id, field, value } = payload;
      await axios.put(`${URL}EditUser`, { id, field, value });
    };

    const startEdit = (fieldKey) => {
      if (!user.value) return;
      editField.value = fieldKey;
      editDraft.value = user.value[fieldKey] ?? "";
    };

    const cancelEdit = () => {
      editField.value = null;
      editDraft.value = "";
    };

    const confirmEdit = (fieldKey) => {
      if (!user.value) return;

      const payload = {
        id: user.value._id,
        field: fieldKey,
        value: editDraft.value,
      };

      EditUser(payload);

      // עדכון מקומי ב-UI (אופטימי)
      user.value[fieldKey] = editDraft.value;

      // יציאה ממצב עריכה
      editField.value = null;
      editDraft.value = "";
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

    const LOGUSER = (userObj) => {
      console.log({ ...userObj });
    };

    const exportDetails = async () => {
      if (!user.value) return;

      const imageUrl = user.value.picURL || "";

      const content = `
${imageUrl ? "🖼️ תמונה:\n" + imageUrl + "\n\n" : ""}🧑‍💼 *כרטיס מועמד*

👤 *שם:* ${user.value.Name || "—"}
🎂 *גיל:* ${user.value.Age || "—"}
🚻 *מגדר:* ${user.value.Gender || "—"}
💼 *עיסוק:* ${user.value.IsuckOrMosadLimudim || "—"}
🕍 *רמה דתית:* ${user.value.RamaDatit || "—"}
🧠 *אופי:* ${user.value.Ofi || "—"}
🎯 *תחביבים:* ${user.value.Hobits || "—"}
❤️ *מה מחפש:* ${user.value.MaMehapes || "—"}
👨‍👩‍👧‍👦 *משפחה:* ${user.value.KavimClalim || "—"}

📌 נשלח דרך https://server-ravakim-10c1effbda77.herokuapp.com/ 
`.trim();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content);
          window.$toast && window.$toast("✅ הפרטים הועתקו לווצאפ", "success");
        } else {
          const temp = document.createElement("textarea");
          temp.value = content;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          window.$toast && window.$toast("✅ הפרטים הועתקו לווצאפ", "success");
        }
      } catch (e) {
        window.$toast && window.$toast("❌ לא הצלחתי להעתיק לווצאפ", "error");
      }
    };

    const close = () => emit("close");

    const initials = computed(() => {
      if (!user.value?.Name) return "?";
      const parts = user.value.Name.split(" ");
      return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
    });

    return {
      EditUser,
      user,
      loading,
      error,
      noteDraft,
      saveNote,
      exportDetails,
      close,
      LOGUSER,
      initials,
      editField,
      editDraft,
      startEdit,
      cancelEdit,
      confirmEdit,
    };
  },
};
</script>

<style scoped lang="scss">
.details-overlay {
  overflow: hidden;

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
  overflow-x: hidden;
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
  overflow: hidden;

  position: absolute;
  top: 10px;
  left: 10px;

  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  border: none;
  border-radius: 12px;

  padding: 10px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  cursor: pointer;
  overflow: visible;

  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.45);

  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;

  animation: exportBreath 2.5s infinite ease-in-out;

  &:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 10px 28px rgba(16, 185, 129, 0.75);
    filter: brightness(1.15);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
  }

  // ברק שעובר
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -130%;
    width: 130%;
    height: 100%;

    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent
    );

    transition: left 0.7s ease;
    border-radius: 12px;
  }

  &:hover::after {
    left: 130%;
  }

  // ✅ הפס שנפתח למטה
  .export-hover {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -38px;

    background: rgba(5, 150, 105, 0.98);
    color: white;

    font-size: 0.7rem;
    padding: 7px 8px;
    text-align: center;

    border-radius: 0 0 12px 12px;

    opacity: 0;
    transform: translateY(-8px) scale(0.92);
    transition: opacity 0.25s ease, transform 0.25s ease, bottom 0.25s ease;
  }

  &:hover .export-hover {
    overflow: hidden;

    opacity: 1;
    bottom: -44px;
    transform: translateY(0) scale(1);
  }
}

// ✅ אנימציית "נשימה"
@keyframes exportBreath {
  0% {
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  }
  50% {
    box-shadow: 0 8px 22px rgba(16, 185, 129, 0.7);
  }
  100% {
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  }
}

// אנימציית נשימה
@keyframes exportBreath {
  0% {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
  }
  50% {
    box-shadow: 0 7px 20px rgba(16, 185, 129, 0.65);
  }
  100% {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
  }
}

// אנימציית "נשימה"
@keyframes exportBreath {
  0% {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
  }
  50% {
    box-shadow: 0 6px 18px rgba(16, 185, 129, 0.6);
  }
  100% {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
  }
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

/* === שורה עם אייקון עריכה === */
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.edit-icon {
  font-size: 0.75rem;
  color: #60a5fa;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.edit-icon:hover {
  color: #93c5fd;
  transform: scale(1.2);
}

/* === מצב עריכה (אינפוט וכפתורים) === */
.edit-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.edit-input {
  flex: 1;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #020617;
  color: #e5e7eb;
  font-size: 0.8rem;
}

.edit-save,
.edit-cancel {
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.7rem;
  cursor: pointer;
}

.edit-save {
  background: #10b981;
  color: white;
}

.edit-cancel {
  background: #ef4444;
  color: white;
}
</style>
