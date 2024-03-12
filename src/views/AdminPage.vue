<template>
  <div class="Maala" dir="rtl">
    <input-Serch class="input-Serch" v-model="Filters.Name" />
    <el-select
      @select="FlilTer"
      v-model="Filters.RamaDatit"
      placeholder="סנן לפי רמה דתית"
      class="FilterOfRamaDatit"
      size="large"
    >
      <el-option label="כולם" value="" align="right"></el-option>
      <el-option value="אדמור" align="right"></el-option>
      <el-option value="רב עיר" align="right"></el-option>
      <el-option value="אברך" align="right"></el-option>
      <el-option value="דתי" align="right"></el-option>
      <el-option value="מסורתי" align="right"></el-option>
      <el-option value="לא מאמין" align="right"></el-option>
      <el-option value="כופר בתורת משה" align="right"></el-option>
    </el-select>
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
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else class="Loading"><div class="spinner"></div></div>
  </div>
  <div class="Sahor" dir="rtl" v-if="activeIsh">
    <div class="Detalis">
      <i class="fa-light fa-xmark fa-xl closeIcon" @click="activeIsh = ''"></i>
      <div class="ParentsImg">
        <img :src="activeIsh.picURL" alt="" />
      </div>
      <div class="content">
        <ul>
          <li
            v-for="(value, key, index) in activeIsh"
            :key="index"
            v-show="key !== 'picURL' && key !== '_id'"
            class="Container-Key-value"
          >
            <div class="key">{{ ReturnKey(key) }}:</div>
            <span class="value">{{ value }}</span>
          </li>
        </ul>
        <!-- . -->
      </div>
    </div>
  </div>
</template>

<script>
import { useAxios } from "@vueuse/integrations/useAxios";

import { onMounted, reactive, ref, watch } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";

export default {
  setup() {
    // $ Vars
    const { data, isFinished } = useAxios(URL + "GetRavakim");
    const Filters = reactive({
      Name: "",
      RamaDatit: "",
      AgeStart: "1",
      AgeEnd: "50",
    });
    const activeIsh = ref(null);
    // $ Life Sycle

    onMounted(() => {});
    // $ watch

    watch(Filters, async (val) => {
      try {
        isFinished.value = false;
        let result = await axios.post(URL + "FilterData", Filters);
        isFinished.value = true;
        data.value = result.data;
      } catch (error) {}
    });
    return { data, isFinished, Filters, activeIsh };
  },
  methods: {
    async GetPratim(id) {
      let { data } = await axios.get(URL + "GetDetalis/" + id);
      if (data) {
        this.activeIsh = data;
      }
    },
    /**
     * Gender
Name
phone
Age
RamaDatit
Hobits
MaMehapes
     */
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
      } else {
        returnelo = "מוזר";
        console.log(key);
      }
      return returnelo;
    },
  },
};
</script>
<style lang="scss" scoped>
// $ Card:
.container-All {
  .card {
    position: relative;
    // width: 14%;
    width: 100%;
    height: 370px;
    background: rgb(103, 225, 255);
    transition: all 0.4s;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
    font-size: 30px;
    font-weight: 900;

    &:hover {
      border-radius: 15px;
      cursor: pointer;
      transform: scale(1.2);
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
      background: rgb(103, 151, 255);
    }
  }
  .first-content {
    height: 100%;
    width: 100%;
    transition: all 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    border-radius: 15px;
  }

  .card:hover .first-content {
    height: 0px;
    opacity: 0;
  }

  .second-content {
    height: 0%;
    width: 100%;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: all 0.4s;
    font-size: 0px;
    transform: rotate(90deg) scale(-1);
  }

  .card:hover .second-content {
    opacity: 1;
    height: 100%;
    font-size: 1.8rem;
    transform: rotate(0deg);
  }
  //
  .first-content {
    position: relative;
    display: flex;
    flex-direction: column;
    img {
      margin-top: 30px;
      margin-bottom: 30px;
      width: 50%;
      height: 37%;
      border-radius: 60%;
      position: absolute;
      top: 0;
    }
    .OtehrContent {
      height: 42%;
      position: absolute;
      bottom: 0;

      .Age {
        font-size: 20px;
        text-align: center;
      }
    }
  }
  .el-row {
    position: absolute;
    top: 160px;
    right: 10% !important;
    width: 90%;
  }
  .el-col {
    margin-bottom: 30px;
  }
}
//
.Maala {
  background: #ffd622;
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
    }
    .selectStartAge {
      select {
        /* גודל ורוחב */
        width: 200px;
        height: 40px;
        font-size: 20px;
        /* משפחת גופן */
        font-family: Arial, sans-serif;

        /* צבע טקסט */
        color: #333;

        /* מרווח פנימי */
        padding: 0 10px;

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
        width: 200px;
        height: 40px;
        font-size: 20px;
        /* משפחת גופן */
        font-family: Arial, sans-serif;

        /* צבע טקסט */
        color: #333;

        /* מרווח פנימי */
        padding: 0 10px;

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
    overflow-y: auto;

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
@media screen and (max-width: 1560px) {
  .container-All {
    .card {
      position: relative;
      // width: 14%;
      width: 100%;
      height: 370px;
      background: rgb(103, 225, 255);
      transition: all 0.4s;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
      font-size: 30px;
      font-weight: 900;

      &:hover {
        border-radius: 15px;
        cursor: pointer;
        transform: scale(1.2);
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
        background: rgb(103, 151, 255);
      }
    }
    .first-content {
      height: 100%;
      width: 100%;
      transition: all 0.4s;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-radius: 15px;
    }

    .card:hover .first-content {
      height: 0px;
      opacity: 0;
    }

    .second-content {
      height: 0%;
      width: 100%;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      transition: all 0.4s;
      font-size: 0px;
      transform: rotate(90deg) scale(-1);
    }

    .card:hover .second-content {
      opacity: 1;
      height: 100%;
      font-size: 1.8rem;
      transform: rotate(0deg);
    }
    //
    .first-content {
      position: relative;
      display: flex;
      flex-direction: column;
      img {
        margin-top: 30px;
        margin-bottom: 30px;
        width: 50%;
        height: 37%;
        border-radius: 60%;
        position: absolute;
        top: 0;
      }
      .OtehrContent {
        height: 42%;
        position: absolute;
        bottom: 0;

        .Age {
          font-size: 20px;
          text-align: center;
        }
      }
    }
    .el-row {
      position: relative;
      top: 160px;
      right: 200px;
    }
  }
  //
  .Maala {
    background: #ffd622;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100px;
    border-bottom: 3px solid black;
    .input-Serch {
      position: absolute;
      right: 50%;
      top: 10px;
      width: 20%;
    }
    .FilterOfRamaDatit {
      position: absolute;
      left: 10%;
      width: 14%;
      top: 30px;
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
      }
      .selectStartAge {
        select {
          /* גודל ורוחב */
          width: 200px;
          height: 40px;
          font-size: 20px;
          /* משפחת גופן */
          font-family: Arial, sans-serif;

          /* צבע טקסט */
          color: #333;

          /* מרווח פנימי */
          padding: 0 10px;

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
          width: 200px;
          height: 40px;
          font-size: 20px;
          /* משפחת גופן */
          font-family: Arial, sans-serif;

          /* צבע טקסט */
          color: #333;

          /* מרווח פנימי */
          padding: 0 10px;

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
  //
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
      width: 70%;
      min-height: 50%;
      background: #9029ffcd;
      animation: expandAnimation 0.8s;
      border-radius: 20px;
      overflow-y: auto;
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
        font-size: 120%;
        border: 3px solid black;
        height: 100%;
        width: 60%;
        border-radius: 20px;
        background: #ffffff69;
        overflow-y: auto;

        .Container-Key-value {
          display: flex;
          width: 80%;
          border-radius: 5px;

          margin-bottom: 10px;
          box-shadow: 0 0 8px 3px #0000007d;
          border-radius: 5px;
          .key {
            background: #c95dff;
            padding: 5px;
            width: 30%;
            border-radius: 0 10px 10px 0;
          }
          .value {
            padding: 5px;
            background: #ba91ff;
            border-radius: 10px 0 0 10px;
            width: 80%;
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
</style>
