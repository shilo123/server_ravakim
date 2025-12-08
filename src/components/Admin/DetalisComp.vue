<template>
  <div class="details-overlay" dir="rtl" v-if="activeIsh">
    <div
      class="details-overlay__backdrop"
      @click="$store.commit('UpdateActiveIsh', null)"
    ></div>

    <div class="details-card">
      <!-- כפתור סגירה -->
      <button
        class="details-card__close"
        type="button"
        @click="$store.commit('UpdateActiveIsh', null)"
      >
        <i class="fa-light fa-xmark fa-xl"></i>
      </button>

      <!-- כפתור יצוא/שיתוף -->
      <button class="details-card__export-btn" @click="ExportIsh(TextOfShare)">
        <div class="details-card__export-icon">
          <svg viewBox="0 0 512 512">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            ></path>
          </svg>
        </div>
        <span class="details-card__export-text">יצוא</span>
      </button>

      <div class="details-card__content">
        <!-- צד שמאל – תמונה -->
        <div class="details-card__image-wrapper">
          <img :src="activeIsh.picURL" alt="תמונה" />
        </div>

        <!-- צד ימין – נתונים -->
        <div class="details-card__info">
          <ul class="details-card__list">
            <li
              v-for="(value, key, index) in activeIsh"
              :key="index"
              v-show="key !== 'picURL' && key !== '_id' && key !== 'Note'"
              class="details-card__item Container-Key-value"
            >
              <div class="details-card__item-key key">
                {{ ReturnKey(key) }}:
              </div>
              <span class="details-card__item-value value">
                {{ value }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- אזור הערות -->
      <div
        :class="{ Note: !expendNote, NoteExpend: expendNote }"
        class="details-card__note"
      >
        <div class="details-card__note-header">
          <el-button
            :type="expendNote ? 'danger' : 'primary'"
            class="Title"
            @click="expendNote = !expendNote"
          >
            {{ !expendNote ? (!Note ? "הוסף הערה" : "ראה הערה") : "הסתר" }}
          </el-button>

          <i class="fa-solid fa-plus fa-lg iconPlus" v-if="!expendNote"></i>
        </div>

        <div class="details-card__note-body">
          <!-- הוספת הערה חדשה -->
          <el-input
            ref="AddNote"
            v-if="expendNote && !Note"
            class="AddNote"
            v-model="InputNote"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
          ></el-input>

          <!-- הצגת הערה קיימת -->
          <div v-else-if="expendNote && Note" class="NoteContent">
            {{ Note }}
          </div>

          <!-- כפתורים -->
          <div class="details-card__note-actions" v-if="expendNote">
            <el-button
              v-if="Note"
              class="ButtonUpdate"
              type="primary"
              @click="
                InputNote = activeIsh.Note;
                activeIsh.Note = false;
              "
            >
              עדכן
            </el-button>

            <el-button
              type="success"
              class="SubmitNote"
              v-if="!Note"
              v-show="InputNote"
              @click="ADDNote(InputNote, activeIsh._id)"
            >
              הוסף
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { URL } from "@/URL/url";
import axios from "axios";

export default {
  setup(props, { emit }) {
    const Store = useStore();
    const TextOfShare = ref("");
    const expendNote = ref(false);
    const InputNote = ref("");

    const activeIsh = computed(() => Store.state.activeIsh);
    const Note = computed(() => activeIsh.value?.Note);

    // פוקוס לתיבת ההערה כשנפתח
    watch(expendNote, (val) => {
      if (val) {
        setTimeout(() => {
          const el = document.querySelector(".AddNote");
          if (el && el.children && el.children[0]) {
            el.children[0].focus();
          }
        }, 200);
      }
    });

    // יצירת טקסט שיתוף בעת פתיחת אדם
    watch(activeIsh, (val) => {
      if (!val) {
        InputNote.value = "";
      } else {
        expendNote.value = false;
        TextOfShare.value = `
        *שם:*
        ${val.Name ? val.Name : "לא ידוע"},
        *גיל:*
        ${val.Age ? val.Age : "לא ידוע"},
        *מספר טלפון:*
        ${val.Phone ? val.Phone : "לא ידוע"},
       *רמה דתית:*
        ${val.RamaDatit ? val.RamaDatit : "לא ידוע"},
        *מגדר:*
        ${val.Gender ? val.Gender : "לא ידוע"},
         *עיסוק\\מוסד לימודים:*
        ${val.IsuckOrMosadLimudim ? val.IsuckOrMosadLimudim : "לא ידוע"},
        *תכונות אופי:*
        ${val.Ofi ? val.Ofi : "לא ידוע"},
        *משפחה:*
        ${val.KavimClalim ? val.KavimClalim : "לא ידוע"},
        *מה מחפש:*
        ${val.MaMehapes ? val.MaMehapes : "לא ידוע"},
        `;
      }
    });

    const ExportIsh = async () => {
      try {
        await navigator.clipboard.writeText(TextOfShare.value);
        ElMessage.success("הועתק בהצלחה");
      } catch (err) {
        ElMessage.error("השתבש פה משהו");
      }
    };

    return {
      activeIsh,
      expendNote,
      InputNote,
      Note,
      ExportIsh,
    };
  },
  methods: {
    ReturnKey(key) {
      let returnelo = "";
      if (key === "Gender") {
        returnelo = "מגדר";
      } else if (key === "Name") {
        returnelo = "שם";
      } else if (key === "phone") {
        returnelo = "מספר טלפון";
      } else if (key === "Age") {
        returnelo = "גיל";
      } else if (key === "RamaDatit") {
        returnelo = "רמה דתית";
      } else if (key === "Hobits") {
        returnelo = "תחביבים";
      } else if (key === "MaMehapes") {
        returnelo = "מה מחפש";
      } else if (key === "IsuckOrMosadLimudim") {
        returnelo = "עיסוק/מוסד לימודים";
      } else if (key === "Ofi") {
        returnelo = "תכונות אופי";
      } else if (key === "KavimClalim") {
        returnelo = "תאר בקווים כללים את משפחתך";
      } else {
        returnelo = "מוזר";
      }
      return returnelo;
    },
    async ADDNote(val, id) {
      const { data } = await axios.post(URL + "AddNote", { val, id });
      this.$store.dispatch("GetDetalis", this.activeIsh._id);
      if (data) {
        ElMessage.success("נוסף בהצלחה");
        this.expendNote = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$bg-overlay: #000000a5;
$bg-card1: #1b0624;
$bg-card2: #2f0a3c;
$accent-gold: #ffb703;
$accent-pink: #ff4d6d;
$accent-purple: #c77dff;
$text-main: #ffffff;
$text-muted: rgba(255, 255, 255, 0.78);

.Sahor {
  background: $bg-overlay;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 20;

  .Detalis {
    position: absolute;
    left: 20%;
    top: 100px;
    width: 60%;
    min-height: 50%;
    background: linear-gradient(145deg, $bg-card1, $bg-card2);
    animation: expandAnimation 0.8s;
    border-radius: 20px;
    padding-bottom: 3%;
    z-index: 30;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 200, 255, 0.45);

    .Note {
      position: absolute;
      bottom: -30px;
      width: 98%;
      height: 25px;
      background: #21041f;
      z-index: 200;
      text-align: center;
      padding: 1%;
      padding-bottom: 10px;
      border-radius: 0 0 10px 10px;
      transition: all 0.4s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      color: $text-muted;

      &:hover {
        color: $text-main;
        font-size: 17px;
        cursor: pointer;
      }

      .Title {
        font-size: 25px;
        position: absolute;
        top: 0;
      }

      .iconPlus {
        position: absolute;
        left: 30px;
        top: 50%;
        color: $accent-gold;
      }

      &Expend {
        transition: all 0.4s;
        position: absolute;
        bottom: -70px;
        width: 98%;
        height: 195px;
        background: #21041f;
        z-index: 200;
        text-align: center;
        padding: 1%;
        padding-bottom: 10px;
        border-radius: 0 0 10px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        color: $text-main;

        .Title {
          font-size: 19px;
          padding: 10px;
          position: absolute;
          top: 0;

          &:hover {
            color: $accent-gold;
            cursor: pointer;
          }
        }
        .ButtonUpdate {
          font-size: 19px;
          padding: 10px;
          position: absolute;
          top: 0;
          width: 200px;
          right: 10%;
        }
        .AddNote {
          background: rgba(255, 77, 109, 0.85);
          width: 60%;
          height: 60%;
          border-radius: 20px;
          position: relative;
          right: 200px;
          font-size: 20px;
          margin: 10px;
          direction: rtl;
        }
        .SubmitNote {
          position: absolute;
          left: 40px;
          bottom: 80px;
        }
        .NoteContent {
          font-size: 25px;
        }
      }
    }

    .ParentsImg {
      width: 40%;
      min-height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        border-radius: 50%;
        height: 300px;
        width: 300px;
        object-fit: cover;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.85);
        border: 4px solid rgba(255, 200, 255, 0.85);
      }
    }

    .closeIcon {
      position: absolute;
      top: 10px;
      right: 10px;
      margin: 5px;
      border-radius: 30%;
      z-index: 500;
      color: $text-main;

      &:hover {
        background: #0000007e;
        padding: 20px;
        top: 0px;
        right: 0px;
        margin: 5px;
        cursor: pointer;
      }
    }

    .content {
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 170%;
      border: 1px solid rgba(255, 200, 255, 0.45);
      height: 100%;
      width: 60%;
      border-radius: 20px;
      background: rgba(10, 0, 18, 0.55);
      overflow-y: auto;
      color: $text-main;

      .Container-Key-value {
        display: flex;
        width: 80%;
        margin-bottom: 10px;
        box-shadow: 0 0 8px 3px #0000007d;
        max-height: 100px;
        overflow-y: auto;
        position: relative;
        height: auto;

        .key {
          background: linear-gradient(135deg, $accent-purple, $accent-pink);
          padding: 5px;
          width: 30%;
          border-radius: 0 10px 10px 0;
          height: 100%;
          color: #1a0312;
          font-weight: 600;
        }
        .value {
          padding: 5px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px 0 0 10px;
          width: 80%;
          height: 100%;
          color: $text-main;
        }
      }
    }
  }
}

@keyframes expandAnimation {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* סקרולבר */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #1a0318;
}

::-webkit-scrollbar-thumb {
  background-color: #4b0e5b;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #731f7c;
}

/* מובייל */
@media screen and (max-width: 400px) {
  .Sahor {
    .Detalis {
      left: 10%;
      top: 100px;
      width: 89%;
      min-height: 75%;
      .ParentsImg {
        display: none;
      }
      .content {
        right: 0;
        top: 0;
        font-size: 90%;
        width: 100%;
      }
      .Note {
        left: -5px;
      }
      .NoteExpend {
        left: -5px;
        .AddNote {
          width: 90%;
          right: 0;
        }
      }
    }
  }
}
</style>
