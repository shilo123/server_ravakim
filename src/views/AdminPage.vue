<template>
  <div class="Maala" dir="rtl">
    <input-Serch class="input-Serch" v-model="Filters.Name" />
    <select v-model="Filters.RamaDatit" class="FilterOfRamaDatit">
      <option label="כולם" value=""></option>
      <option value="לא דתי" label="לא דתי" align="right"></option>
      <option value=" מסורתי" label=" מסורתי" align="right"></option>
      <option value="דתי לאומי" label="דתי לאומי" align="right"></option>
      <option value="דתי" label="דתי" align="right"></option>
      <option value="תורני" label="תורני" align="right"></option>
      <option value="חרדי" label="חרדי" align="right"></option>
    </select>
    <div class="filterAges">
      <label>מגיל:</label>
      <div class="selectStartAge">
        <select v-model="Filters.AgeStart">
          <option v-for="n in 50" :key="n" :value="n" :label="n"></option>
        </select>
      </div>
      <label>עד גיל:</label>
      <div class="selectEndAge">
        <select v-model="Filters.AgeEnd">
          <option v-for="n in 100" :key="n" :value="n" :label="n"></option>
        </select>
      </div>
    </div>
  </div>
  <div dir="rtl">
    <div class="container-All" v-if="isFinished">
      <el-row :gutter="70">
        <el-col :span="5" v-for="(Item, i) in data" :key="i">
          <div class="card">
            <img :src="Item.picURL" />

            <div class="card-details" @click="GetPratim(Item._id)">
              <p class="text-title">{{ Item.Name }}/{{ Item.Age }}</p>
              <!-- <p class="text-body">{{ Item.Age }}</p> -->
            </div>
            <button class="card-button" @click="GetPratim(Item._id)">
              מידע נוסף
            </button>
          </div>
          <!-- <div class="card">
            <div class="first-content">
              <img :src="Item.picURL" />
              <div class="OtehrContent">
                <el-divider></el-divider>
                <div>{{ Item.Name }}</div>
                <div class="Age">{{ Item.Age }}</div>
              </div>
            </div>
            <div class="second-content" @click="GetPratim(Item._id)">
              <span>לפרטים נוספים</span>
            </div>
          </div> -->
        </el-col>
      </el-row>
    </div>

    <div v-else class="Loading"><div class="spinner"></div></div>
    <div class="body">
      <div class="tabs">
        <input
          checked=""
          value="זכר"
          name="fav_language"
          id="html"
          type="radio"
          class="input"
          v-model="Filters.Gender"
        />
        <label for="html" class="label">גבר</label>
        <input
          value="נקבה"
          name="fav_language"
          id="css"
          type="radio"
          class="input"
          v-model="Filters.Gender"
        />
        <label for="css" class="label">אישה</label>
        <input
          value=""
          name="fav_language"
          id="javascript"
          type="radio"
          class="input"
          v-model="Filters.Gender"
        />
        <label for="javascript" class="label">הכל</label>
      </div>
    </div>
  </div>
  <div class="Sahor" dir="rtl" v-if="activeIsh">
    <div class="Detalis">
      <i class="fa-light fa-xmark fa-xl closeIcon" @click="activeIsh = ''"></i>
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
import { useAxios } from "@vueuse/integrations/useAxios";

import { computed, onMounted, reactive, ref, watch } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  setup() {
    // $ Vars
    const { data, isFinished } = useAxios(URL + "GetRavakim");
    const Filters = reactive({
      Name: "",
      RamaDatit: "",
      AgeStart: 1,
      AgeEnd: 100,
      Gender: "",
    });
    const TextOfShare = ref("");
    const activeIsh = ref(null);
    const AddNote = ref(null);
    const expendNote = ref(false);
    const InputNote = ref("");
    // $ Life Sycle

    onMounted(() => {});
    // $ watch

    watch(Filters, async (val) => {
      setTimeout(async () => {
        isFinished.value = false;
        let result = await axios.post(URL + "FilterData", Filters);
        isFinished.value = true;
        data.value = result.data;
      }, 200);
    });

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
    const Note = computed(() => {
      return activeIsh.value.Note;
    });
    return {
      data,
      isFinished,
      Filters,
      activeIsh,
      expendNote,
      InputNote,
      Note,
      ExportIsh,
    };
  },
  methods: {
    async GetPratim(id) {
      let { data } = await axios.get(URL + "GetDetalis/" + id);
      if (data) {
        this.activeIsh = data;
      } else {
        ElMessage.error("משהו השתבש ");
      }
    },
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
      console.log(val);
      let { data } = await axios.post(URL + "AddNote", { val, id });
      this.GetPratim(this.activeIsh._id);
      // console.log(data);
      if (data) {
        ElMessage.success("נוסף בהצלחה");
        this.expendNote = false;
      }
    },
    // ExportIsh(text) {
    //   console.log(this.TextOfShare);
    // },
  },
};
</script>
<style lang="scss" scoped>
// $ Card:
.container-All {
  // .card {
  //   position: relative;
  //   // width: 14%;
  //   width: 100%;
  //   height: 370px;
  //   background: rgb(103, 225, 255);
  //   transition: all 0.4s;
  //   border-radius: 10px;
  //   box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
  //   font-size: 30px;
  //   font-weight: 900;

  //   &:hover {
  //     border-radius: 15px;
  //     cursor: pointer;
  //     box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
  //     background: rgb(103, 151, 255);
  //   }
  // }
  // .first-content {
  //   height: 100%;
  //   width: 100%;
  //   transition: all 0.4s;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   opacity: 1;
  //   border-radius: 15px;
  // }

  // .card:hover .first-content {
  //   height: 0px;
  //   opacity: 0;
  // }

  // .second-content {
  //   height: 0%;
  //   width: 100%;
  //   opacity: 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   border-radius: 15px;
  //   transition: all 0.4s;
  //   font-size: 0px;
  //   transform: rotate(90deg) scale(-1);
  // }

  // .card:hover .second-content {
  //   opacity: 1;
  //   height: 100%;
  //   font-size: 1.8rem;
  //   transform: rotate(0deg);
  // }
  // //
  // .first-content {
  //   position: relative;
  //   display: flex;
  //   flex-direction: column;
  //   img {
  //     margin-top: 30px;
  //     margin-bottom: 30px;
  //     width: 50%;
  //     height: 37%;
  //     border-radius: 60%;
  //     position: absolute;
  //     top: 0;
  //   }
  //   .OtehrContent {
  //     height: 42%;
  //     position: absolute;
  //     bottom: 0;

  //     .Age {
  //       font-size: 20px;
  //       text-align: center;
  //     }
  //   }
  // }
  // $
  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    background: #f5f5f5;
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
    img {
      margin-top: 30px;
      margin-bottom: 30px;
      width: 50%;
      height: 37%;
      border-radius: 60%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }
  }

  .card-details {
    color: black;
    height: 100%;
    gap: 0.5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #008bf8;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  /*Text*/
  .text-title {
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    text-align: center;
    bottom: 0;
  }

  /*Hover*/
  .card:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
  // $
  .el-row {
    position: absolute;
    top: 160px;
    right: 13% !important;
    width: 90%;
  }
  .el-col {
    margin-bottom: 30px;
  }
}
//
.Maala {
  // background: #ffd622;
  background: #22bdff;
  background: radial-gradient(circle at center, #22bdff, #4554f9, #56ccff);

  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100px;
  border-bottom: 3px solid black;
  .input-Serch {
    position: absolute;
    right: 40%;
    top: 10px;
    width: 20%;
  }
  .FilterOfRamaDatit {
    position: absolute;
    left: 20%;
    width: 14%;
    top: 30px;
    padding: 10px;
    background: #2f3640;
    color: white;
  }
  // $select:
  /* בחירת סגנון כללי */
  .filterAges {
    position: absolute;
    right: 20px;
    top: 30px;
    display: flex;
    flex-direction: row;
    color: #000;
    label {
      margin: 0 20px;
      font-size: 16px;
    }
    .selectStartAge {
      select {
        /* גודל ורוחב */
        width: 180px;
        height: 40px;
        font-size: 20px;
        /* משפחת גופן */
        font-family: Arial, sans-serif;

        /* צבע טקסט */
        color: #333;

        /* מרווח פנימי */
        padding: 0 5px;

        /* גבול */
        border: 1px solid #ccc;
        border-radius: 5px;

        /* מראה רך */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        /* הופעה בריחוף */
        &:hover {
          border-color: #999;
        }
      }
      &:focus,
      &:active {
        /* צבע רקע */
        background-color: #f9f9f9;

        /* צבע גבול */
        border-color: #999;
      }
      option:checked {
        /* צבע רקע */
        background-color: #ccc;

        /* צבע טקסט */
        color: #000;
      }
    }
    .selectEndAge {
      select {
        /* גודל ורוחב */
        width: 180px;
        height: 40px;
        font-size: 20px;
        /* משפחת גופן */
        font-family: Arial, sans-serif;

        /* צבע טקסט */
        color: #333;

        /* מרווח פנימי */
        padding: 0 5px;

        /* גבול */
        border: 1px solid #ccc;
        border-radius: 5px;

        /* מראה רך */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        /* הופעה בריחוף */
        &:hover {
          border-color: #999;
        }
      }
      &:focus,
      &:active {
        /* צבע רקע */
        background-color: #f9f9f9;

        /* צבע גבול */
        border-color: #999;
      }
      option:checked {
        /* צבע רקע */
        background-color: #ccc;

        /* צבע טקסט */
        color: #000;
      }
    }
  }
}
.Sahor {
  background: #000000a5;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .Detalis {
    position: absolute;
    left: 20%;
    top: 100px;
    width: 60%;
    min-height: 50%;
    background: #9029ffcd;
    animation: expandAnimation 0.8s;
    border-radius: 20px;
    // overflow-y: auto;
    padding-bottom: 3%;
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
        // position: absolute;
        // left: 6%;
        // top: 9%;
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
.Loading {
  background: #0000006d;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  .spinner {
    width: 56px;
    height: 56px;
    display: grid;
    border: 4.5px solid #0000;
    border-radius: 50%;
    border-color: #dbdcef #0000;
    animation: spinner-e04l1k 1s infinite linear;
    &::before,
    &::after {
      content: "";
      grid-area: 1/1;
      margin: 2.2px;
      border: inherit;
      border-radius: 50%;
    }
    &::before {
      border-color: #474bff #0000;
      animation: inherit;
      animation-duration: 0.5s;
      animation-direction: reverse;
    }

    &::after {
      margin: 8.9px;
    }
  }

  @keyframes spinner-e04l1k {
    100% {
      transform: rotate(1turn);
    }
  }
}
// @media screen and (max-width: 1560px) {
//   .container-All {
//     .card {
//       position: relative;
//       // width: 14%;
//       width: 100%;
//       height: 370px;
//       background: rgb(103, 225, 255);
//       transition: all 0.4s;
//       border-radius: 10px;
//       box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
//       font-size: 30px;
//       font-weight: 900;

//       &:hover {
//         border-radius: 15px;
//         cursor: pointer;
//         transform: scale(1.2);
//         box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
//         background: rgb(103, 151, 255);
//       }
//     }
//     .first-content {
//       height: 100%;
//       width: 100%;
//       transition: all 0.4s;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       opacity: 1;
//       border-radius: 15px;
//     }

//     .card:hover .first-content {
//       height: 0px;
//       opacity: 0;
//     }

//     .second-content {
//       height: 0%;
//       width: 100%;
//       opacity: 0;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       border-radius: 15px;
//       transition: all 0.4s;
//       font-size: 0px;
//       transform: rotate(90deg) scale(-1);
//     }

//     .card:hover .second-content {
//       opacity: 1;
//       height: 100%;
//       font-size: 1.8rem;
//       transform: rotate(0deg);
//     }
//     //
//     .first-content {
//       position: relative;
//       display: flex;
//       flex-direction: column;
//       img {
//         margin-top: 30px;
//         margin-bottom: 30px;
//         width: 50%;
//         height: 37%;
//         border-radius: 60%;
//         position: absolute;
//         top: 0;
//       }
//       .OtehrContent {
//         height: 42%;
//         position: absolute;
//         bottom: 0;

//         .Age {
//           font-size: 20px;
//           text-align: center;
//         }
//       }
//     }
//     .el-row {
//       position: relative;
//       top: 160px;
//       right: 200px;
//     }
//   }
//   //
//   .Maala {
//     background: #ffd622;
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100px;
//     border-bottom: 3px solid black;
//     .input-Serch {
//       position: absolute;
//       right: 40%;
//       top: 10px;
//       width: 20%;
//     }
//     .FilterOfRamaDatit {
//       position: absolute;
//       left: 23%;
//       width: 14%;
//       top: 30px;
//     }
//     // $select:
//     /* בחירת סגנון כללי */
//     .filterAges {
//       position: absolute;
//       right: 20px;
//       top: 30px;
//       display: flex;
//       flex-direction: row;
//       color: #000;
//       label {
//         margin: 0 20px;
//       }
//       .selectStartAge {
//         select {
//           /* גודל ורוחב */
//           width: 200px;
//           height: 40px;
//           font-size: 20px;
//           /* משפחת גופן */
//           font-family: Arial, sans-serif;

//           /* צבע טקסט */
//           color: #333;

//           /* מרווח פנימי */
//           padding: 0 10px;

//           /* גבול */
//           border: 1px solid #ccc;
//           border-radius: 5px;

//           /* מראה רך */
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

//           /* הופעה בריחוף */
//           &:hover {
//             border-color: #999;
//           }
//         }
//         &:focus,
//         &:active {
//           /* צבע רקע */
//           background-color: #f9f9f9;

//           /* צבע גבול */
//           border-color: #999;
//         }
//         option:checked {
//           /* צבע רקע */
//           background-color: #ccc;

//           /* צבע טקסט */
//           color: #000;
//         }
//       }
//       .selectEndAge {
//         select {
//           /* גודל ורוחב */
//           width: 200px;
//           height: 40px;
//           font-size: 20px;
//           /* משפחת גופן */
//           font-family: Arial, sans-serif;

//           /* צבע טקסט */
//           color: #333;

//           /* מרווח פנימי */
//           padding: 0 10px;

//           /* גבול */
//           border: 1px solid #ccc;
//           border-radius: 5px;

//           /* מראה רך */
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

//           /* הופעה בריחוף */
//           &:hover {
//             border-color: #999;
//           }
//         }
//         &:focus,
//         &:active {
//           /* צבע רקע */
//           background-color: #f9f9f9;

//           /* צבע גבול */
//           border-color: #999;
//         }
//         option:checked {
//           /* צבע רקע */
//           background-color: #ccc;

//           /* צבע טקסט */
//           color: #000;
//         }
//       }
//     }
//   }
//   //
//   .Sahor {
//     background: #000000a5;
//     position: fixed;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     .Detalis {
//       position: absolute;
//       left: 20%;
//       top: 100px;
//       width: 70%;
//       min-height: 50%;
//       background: #9029ffcd;
//       animation: expandAnimation 0.8s;
//       border-radius: 20px;
//       overflow-y: auto;
//       .ParentsImg {
//         // border: 3px solid black;
//         width: 40%;
//         min-height: 100%;
//         position: absolute;
//         left: 0;
//         top: 0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         img {
//           border-radius: 50%;
//           // position: absolute;
//           // left: 6%;
//           // top: 9%;
//           height: 300px;
//           width: 300px;
//         }
//       }
//       .closeIcon {
//         position: absolute;
//         top: 10px;
//         right: 10px;
//         margin: 5px;
//         border-radius: 30%;
//         z-index: 500;
//         &:hover {
//           background: #0000007e;
//           padding: 20px;
//           top: 0px;
//           right: 0px;
//           margin: 5px;
//           cursor: pointer;
//         }
//       }
//       .content {
//         position: absolute;
//         right: 0px;
//         top: 0px;
//         // font-size: 30px;
//         font-size: 120%;
//         border: 3px solid black;
//         height: 100%;
//         width: 60%;
//         border-radius: 20px;
//         background: #ffffff69;
//         overflow-y: auto;

//         .Container-Key-value {
//           display: flex;
//           width: 80%;
//           border-radius: 5px;

//           margin-bottom: 10px;
//           box-shadow: 0 0 8px 3px #0000007d;
//           border-radius: 5px;
//           .key {
//             background: #c95dff;
//             padding: 5px;
//             width: 30%;
//             border-radius: 0 10px 10px 0;
//           }
//           .value {
//             padding: 5px;
//             background: #ba91ff;
//             border-radius: 10px 0 0 10px;
//             width: 80%;
//           }
//         }
//       }
//     }
//   }
//   @keyframes expandAnimation {
//     from {
//       opacity: 0;
//       transform: scale(0);
//     }
//     to {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }
//   .Loading {
//     background: #0000006d;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0;
//     top: 10%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     .spinner {
//       width: 56px;
//       height: 56px;
//       display: grid;
//       border: 4.5px solid #0000;
//       border-radius: 50%;
//       border-color: #dbdcef #0000;
//       animation: spinner-e04l1k 1s infinite linear;
//       &::before,
//       &::after {
//         content: "";
//         grid-area: 1/1;
//         margin: 2.2px;
//         border: inherit;
//         border-radius: 50%;
//       }
//       &::before {
//         border-color: #474bff #0000;
//         animation: inherit;
//         animation-duration: 0.5s;
//         animation-direction: reverse;
//       }

//       &::after {
//         margin: 8.9px;
//       }
//     }

//     @keyframes spinner-e04l1k {
//       100% {
//         transform: rotate(1turn);
//       }
//     }
//   }
// }
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
//
//
//
//
//
//
//
// $
$body-radius: 8px;
$body-border: 4px;
$body-height: 48px;
$body-speed: 0.25s;

.body {
  display: grid;
  place-items: center;
  align-content: center;
  font-family: "SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue",
    Helvetica, Arial, sans-serif, system-ui;
  position: absolute;
  left: 1%;
  top: 1%;

  .tabs {
    --ease: linear(
      0,
      0.1641 3.52%,
      0.311 7.18%,
      0.4413 10.99%,
      0.5553 14.96%,
      0.6539 19.12%,
      0.738 23.5%,
      0.8086 28.15%,
      0.8662 33.12%,
      0.9078 37.92%,
      0.9405 43.12%,
      0.965 48.84%,
      0.9821 55.28%,
      0.992 61.97%,
      0.9976 70.09%,
      1
    );
    height: $body-height;
    display: grid;
    grid-auto-flow: column;
    background: hsl(0 0% 0%);
    border-radius: $body-radius;
    grid-auto-columns: 1fr;
    position: relative;
    border: $body-border solid hsl(0 0% 0%);

    > .input,
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    &::after {
      pointer-events: none;
      content: "";
      width: calc(100% / var(--count));
      height: 100%;
      background: hsl(0 0% 100%);
      position: absolute;
      border-radius: calc(#{$body-radius} - #{$body-border});
      mix-blend-mode: difference;
      transform: translateX(calc(var(--active, 0) * -100%));
      transition: translate, outline-color $body-speed var(--ease, ease);
      outline: 2px solid transparent;
    }

    &:has(:focus-visible)::after {
      outline-color: red;
    }

    .label {
      padding: 0 clamp(10px, 10px + 10px, 20px);
      cursor: pointer;
      text-align: center;
      height: 100%;
      display: grid;
      border-radius: calc(#{$body-radius} - #{$body-border});
      place-items: center;
      color: hsl(0 0% 100% / calc(0.5 + var(--highlight, 0)));
      transition: background, color $body-speed var(--ease, ease);

      &:hover {
        --highlight: 0.35;
        background: hsl(0 0% 20%);
      }
    }

    &:has(:checked:nth-of-type(1)) {
      --active: 0;
    }
    &:has(:checked:nth-of-type(2)) {
      --active: 1;
    }
    &:has(:checked:nth-of-type(3)) {
      --active: 2;
    }
    &:has(:checked:nth-of-type(4)) {
      --active: 3;
    }

    :checked + .label {
      --highlight: 1;
    }

    &:has(.input:nth-of-type(2)) {
      --count: 2;
    }
    &:has(.input:nth-of-type(3)) {
      --count: 3;
    }
    &:has(.input:nth-of-type(4)) {
      --count: 4;
    }
  }
}
//
//
// $ Button :
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 0;
  z-index: 200;
  top: 0;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}
/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
  margin-right: 10px;
}
/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
