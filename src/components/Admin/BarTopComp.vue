<template>
  <div>
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
  </div>
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
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import "@/views/cssOfRedyElements.scss";
import axios from "axios";
import { URL } from "@/URL/url";
import { useStore } from "vuex";

export default {
  setup(props, { emit }) {
    const Store = useStore();

    const Filters = reactive({
      Name: "",
      RamaDatit: "",
      AgeStart: 1,
      AgeEnd: 100,
      Gender: "",
    });
    watch(Filters, async (val) => {
      setTimeout(async () => {
        emit("updateisFinished", false);
        let result = await axios.post(URL + "FilterData", Filters);
        emit("updateisFinished", true);
        emit("UpdateData", result.data);
      }, 200);
    });
    const isFinished = computed(() => {
      return Store.state.isFinished;
    });

    return { Filters, isFinished };
  },
};
</script>
<style lang="scss" scoped>
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
</style>
