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
          <div
            class="avatar-wrapper"
            v-if="user.picURL"
            @click="openImageModal"
          >
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
          <!-- גיל ורמה דתית באותה שורה -->
          <div class="grid-row-2">
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

          <!-- כתובת מגורים וטלפון באותה שורה -->
          <div class="grid-row-2">
            <!-- כתובת מגורים -->
            <div class="block">
              <h3>כתובת מגורים</h3>

              <p class="row" v-if="editField !== 'Address'">
                <span>{{ user.Address || "—" }}</span>
                <i
                  class="fa-solid fa-pen edit-icon"
                  @click="startEdit('Address')"
                ></i>
              </p>

              <div class="edit-row" v-else>
                <input
                  v-model="editDraft"
                  class="edit-input"
                  type="text"
                  placeholder="הקלד כתובת מגורים"
                />
                <button class="edit-save" @click="confirmEdit('Address')">
                  עדכון
                </button>
                <button class="edit-cancel" @click="cancelEdit">בטל</button>
              </div>
            </div>

            <!-- טלפון -->
            <div class="block">
              <h3>טלפון</h3>

              <p class="row" v-if="editField !== 'phone'">
                <span>{{ user.phone || "—" }}</span>
                <i
                  class="fa-solid fa-pen edit-icon"
                  @click="startEdit('phone')"
                ></i>
              </p>

              <div class="edit-row" v-else>
                <input
                  v-model="editDraft"
                  class="edit-input"
                  type="tel"
                  placeholder="הקלד מספר טלפון"
                />
                <button class="edit-save" @click="confirmEdit('phone')">
                  עדכון
                </button>
                <button class="edit-cancel" @click="cancelEdit">בטל</button>
              </div>
            </div>
          </div>

          <!-- סרטון -->
          <div class="block" v-if="user.videoURL">
            <h3>סרטון</h3>
            <button class="video-view-btn" @click="openVideoModal">
              🎥 צפייה בסרטון
            </button>
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

    <!-- פופאפ תמונה מלא מסך -->
    <div
      v-if="showImageModal && user?.picURL"
      class="image-modal-overlay"
      @click.self="closeImageModal"
    >
      <div class="image-modal-content">
        <button class="image-modal-close" @click="closeImageModal">✕</button>
        <img :src="user.picURL" class="image-modal-img" alt="תמונה" />
      </div>
    </div>

    <!-- פופאפ סרטון מלא מסך -->
    <div
      v-if="showVideoModal && user?.videoURL"
      class="video-modal-overlay"
      @click.self="closeVideoModal"
    >
      <button class="video-modal-close" @click="closeVideoModal">✕</button>
      <div class="video-modal-content">
        <video
          :src="user.videoURL"
          class="video-modal-video"
          controls
          autoplay
        ></video>
      </div>
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
    const showImageModal = ref(false);
    const showVideoModal = ref(false);

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

      let imageUrl = user.value.picURL || "";
      imageUrl = encodeURI(imageUrl);
      const content = `
${imageUrl ? "🖼️ תמונה:\n" + imageUrl + "\n\n" : ""}🧑‍💼 *כרטיס מועמד*

👤 *שם:* ${user.value.Name || "—"}
🎂 *גיל:* ${user.value.Age || "—"}
🚻 *מגדר:* ${user.value.Gender || "—"}
📞 *טלפון:* ${user.value.phone || "—"}
💼 *עיסוק:* ${user.value.IsuckOrMosadLimudim || "—"}
📍 *כתובת מגורים:* ${user.value.Address || "—"}
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

    const openImageModal = () => {
      if (user.value?.picURL) {
        showImageModal.value = true;
      }
    };

    const closeImageModal = () => {
      showImageModal.value = false;
    };

    const openVideoModal = () => {
      if (user.value?.videoURL) {
        showVideoModal.value = true;
      }
    };

    const closeVideoModal = () => {
      showVideoModal.value = false;
    };

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
      showImageModal,
      openImageModal,
      closeImageModal,
      showVideoModal,
      openVideoModal,
      closeVideoModal,
    };
  },
};
</script>

<style scoped lang="scss">
.details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(2, 6, 23, 0.88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}

.details-card {
  width: min(460px, calc(100% - 40px));
  max-height: calc(100vh - 40px);
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
  margin: auto;
  flex-shrink: 0;
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

.avatar-wrapper {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255, 183, 3, 0.4);
  }
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

/* שורה עם 2 עמודות */
.grid-row-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
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

/* פופאפ תמונה מלא מסך */
.image-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image-modal-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.image-modal-img {
  max-width: 100%;
  max-height: 95vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* רספונסיביות לפופאפ */
@media (max-width: 600px) {
  .image-modal-close {
    top: -35px;
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .image-modal-img {
    max-height: 90vh;
    border-radius: 8px;
  }
}

/* כפתור צפייה בסרטון */
.video-view-btn {
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.6);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
}

/* פופאפ סרטון מלא מסך */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease;
}

.video-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-modal-close {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10003;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.video-modal-video {
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  animation: zoomIn 0.3s ease;
  background: #000;
  display: block;
  margin: 0 auto;
}

/* רספונסיביות לפופאפ סרטון */
@media (max-width: 600px) {
  .video-modal-close {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .video-modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .video-modal-video {
    max-width: 95vw;
    max-height: 85vh;
    border-radius: 8px;
  }

  /* במובייל - שורות עם 2 עמודות הופכות לעמודה אחת */
  .grid-row-2 {
    grid-template-columns: 1fr;
  }
}
</style>
