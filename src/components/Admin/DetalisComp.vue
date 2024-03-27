<template>
  <div class="Sahor" dir="rtl" v-if="activeIsh">
    <div class="Detalis">
      <i
        class="fa-light fa-xmark fa-xl closeIcon"
        @click="$store.commit('UpdateActiveIsh', null)"
      ></i>
      <!-- <div class="Shre"> -->
      <button class="Btn" @click="ExportIsh(TextOfShare)">
        <div class="sign">
          <svg viewBox="0 0 512 512">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            ></path>
          </svg>
        </div>

        <div class="text">יצוא</div>
      </button>
      <!-- </div> -->
      <div class="ParentsImg">
        <img :src="activeIsh.picURL" />
      </div>
      <div class="content">
        <ul>
          <li
            v-for="(value, key, index) in activeIsh"
            :key="index"
            v-show="key !== 'picURL' && key !== '_id' && key !== 'Note'"
            class="Container-Key-value"
          >
            <div class="key">{{ ReturnKey(key) }}:</div>
            <span class="value">{{ value }}</span>
          </li>
        </ul>
        <!-- . -->
      </div>
      <div :class="{ Note: !expendNote, NoteExpend: expendNote }">
        <!-- :contenteditable="expendNote ? 'true' : 'false'" -->
        <!-- <button class="Title" @click="expendNote = !expendNote">
          {{ !expendNote ? "הוסף הערה" : "הסתר" }}
        </button> -->
        <el-button
          :type="expendNote ? 'danger' : 'primary'"
          class="Title"
          @click="expendNote = !expendNote"
        >
          {{
            !expendNote ? (!Note ? "הוסף הערה" : "ראה הערה") : "הסתר"
          }}</el-button
        >
        <el-input
          ref="AddNote"
          v-if="expendNote && !Note"
          class="AddNote"
          v-model="InputNote"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4 }"
        ></el-input>
        <div v-else-if="expendNote && Note" class="NoteContent">{{ Note }}</div>
        <el-button
          v-if="expendNote && Note"
          class="ButtonUpdate"
          type="primary"
          @click="
            InputNote = activeIsh.Note;
            activeIsh.Note = false;
          "
          >עדכן</el-button
        >
        <el-button
          type="success"
          class="SubmitNote"
          v-if="expendNote && !Note"
          v-show="InputNote"
          @click="ADDNote(InputNote, activeIsh._id)"
          >הוסף</el-button
        >
        <i class="fa-solid fa-plus fa-lg iconPlus" v-if="!expendNote"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
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
    const Note = computed(() => activeIsh.value.Note);

    //
    //
    watch(expendNote, (val) => {
      if (val) {
        setTimeout(() => {
          let el = document.querySelector(".AddNote");
          if (el) {
            el.children[0].focus();
          } //   console.log("AddNote.value", AddNote.value);
        }, 200);
      }
    });
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
    // $methods:
    const ExportIsh = async () => {
      try {
        await navigator.clipboard.writeText(TextOfShare.value);
        ElMessage.success("הועתק בהצלחה");
      } catch (err) {
        ElMessage.error("השתבש פה משהו");
      }
    };
    // $ computed:

    //

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
        // console.log(key);
      }
      return returnelo;
    },
    async ADDNote(val, id) {
      //   console.log(val);
      let { data } = await axios.post(URL + "AddNote", { val, id });
      //   this.GetPratim(this.activeIsh._id);
      this.$store.dispatch("GetDetalis", this.activeIsh._id);

      // console.log(data);
      if (data) {
        ElMessage.success("נוסף בהצלחה");
        this.expendNote = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Sahor {
  background: #000000a5;
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
    background: #9029ffcd;
    animation: expandAnimation 0.8s;
    border-radius: 20px;
    padding-bottom: 3%;
    z-index: 30;

    .Note {
      position: absolute;
      bottom: -30px;
      width: 98%;
      height: 25px;
      background: #5b5b5b;
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

      &:hover {
        color: white;
        font-size: 17px;
        cursor: pointer;
        // background: #5b5b5bdc;
      }
      .Title {
        font-size: 25px;
        position: absolute;
        top: 0;
        // padding: 10px;
      }
      .iconPlus {
        position: absolute;
        left: 30px;
        top: 50%;
      }
      &Expend {
        transition: all 0.4s;
        position: absolute;
        bottom: -70px;
        width: 98%;
        height: 195px;
        background: #5b5b5b;
        z-index: 200;
        text-align: center;
        padding: 1%;
        padding-bottom: 10px;
        border-radius: 0 0 10px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        .Title {
          font-size: 19px;
          padding: 10px;
          position: absolute;
          top: 0;

          &:hover {
            color: white;
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
          background: #ff4e4ecc;
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
      // border: 3px solid black;
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
      }
    }
    .closeIcon {
      position: absolute;
      top: 10px;
      right: 10px;
      margin: 5px;
      border-radius: 30%;
      z-index: 500;
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
      // font-size: 30px;
      font-size: 170%;
      border: 3px solid black;
      height: 100%;
      width: 60%;
      border-radius: 20px;
      background: #ffffff69;
      overflow-y: auto;

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
          background: #c95dff;
          padding: 5px;
          width: 30%;
          border-radius: 0 10px 10px 0;
          height: 100%;
        }
        .value {
          padding: 5px;
          background: #ba91ff;
          border-radius: 10px 0 0 10px;
          width: 80%;
          height: 100%;
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
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f9f9f9;
}

/* פס גלילה - ריחוף */
::-webkit-scrollbar:hover {
  background-color: #f5f5f5;
}

/* פס גלילה - ידית */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

/* פס גלילה - ידית - ריחוף */
::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}
@media screen and (max-width: 400px) {
  .Sahor {
    background: #000000a5;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 20;
    .Detalis {
      position: absolute;
      left: 10%;
      top: 100px;
      width: 89%;
      min-height: 75%;
      //   background: #9029ffcd;
      animation: expandAnimation 0.8s;
      border-radius: 20px;
      padding-bottom: 3%;
      z-index: 30;

      .Note {
        position: absolute;
        bottom: -30px;
        width: 98%;
        height: 25px;
        left: -5px;
        background: #5b5b5b;
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

        &:hover {
          color: white;
          font-size: 17px;
          cursor: pointer;
          // background: #5b5b5bdc;
        }
        .Title {
          font-size: 25px;
          position: absolute;
          top: 0;
          // padding: 10px;
        }
        .iconPlus {
          position: absolute;
          left: 30px;
          top: 50%;
        }
        &Expend {
          transition: all 0.4s;
          position: absolute;
          bottom: -70px;
          width: 98%;
          height: 195px;
          background: #5b5b5b;
          z-index: 200;
          text-align: center;
          padding: 1%;
          padding-bottom: 10px;
          border-radius: 0 0 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          left: -5px;

          .Title {
            font-size: 19px;
            padding: 10px;
            position: absolute;
            top: 0;

            &:hover {
              color: white;
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
            background: #ff4e4ecc;
            width: 90%;
            height: 60%;
            border-radius: 20px;
            position: relative;
            // right: 200px;
            right: 0px;
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
        // border: 3px solid black;
        width: 40%;
        min-height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
        img {
          border-radius: 50%;
          height: 140px;
          width: 140px;
          display: none;
        }
      }
      .closeIcon {
        position: absolute;
        top: 10px;
        right: 10px;
        margin: 5px;
        border-radius: 30%;
        z-index: 500;
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
        right: 0;
        top: 0px;
        // font-size: 30px;
        font-size: 90%;
        border: 3px solid black;
        height: 100%;
        // width: 60%;
        width: 100%;
        border-radius: 20px;
        background: #ffffff69;
        overflow-y: auto;

        .Container-Key-value {
          display: flex;
          width: 80%;
          margin-bottom: 10px;
          box-shadow: 0 0 8px 3px #0000007d;
          max-height: 100px;
          overflow-y: auto;
          position: relative;
          .key {
            background: #c95dff;
            padding: 5px;
            width: 30%;
            border-radius: 0 10px 10px 0;
            height: 100%;
          }
          .value {
            padding: 5px;
            background: #ba91ff;
            border-radius: 10px 0 0 10px;
            width: 80%;
            height: 100%;
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
}
</style>
