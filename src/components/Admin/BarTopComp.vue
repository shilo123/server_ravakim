<template>
  <header class="bar-top" dir="rtl">
    <div class="bar-top__inner">
      <!-- שורה עליונה: חיפוש + מגדר + אפשרויות -->
      <div class="bar-top__row bar-top__row--top">
        <!-- חיפוש -->
        <div class="bar-top__search-wrapper">
          <input-Serch v-model="Filters.Name" />
        </div>

        <!-- מגדר + אפשרויות -->
        <div class="bar-top__right-side">
          <!-- מגדר -->
          <div class="bar-top__gender">
            <span class="bar-top__label">מגדר</span>
            <div class="bar-top__gender-tabs">
              <label class="bar-top__tab">
                <input type="radio" value="זכר" v-model="Filters.Gender" />
                <span>גבר</span>
              </label>
              <label class="bar-top__tab">
                <input type="radio" value="נקבה" v-model="Filters.Gender" />
                <span>אישה</span>
              </label>
              <label class="bar-top__tab">
                <input type="radio" value="" v-model="Filters.Gender" />
                <span>הכל</span>
              </label>
            </div>
          </div>

          <!-- אפשרויות -->
          <div class="bar-top__dropdown">
            <Dropdown />
          </div>
        </div>
      </div>

      <!-- שורה תחתונה: רמה דתית + טווח גילאים -->
      <div class="bar-top__row bar-top__row--bottom">
        <!-- רמה דתית -->
        <!-- <div class="bar-top__field bar-top__field--rama">
          <label class="bar-top__label">רמה דתית</label>
          <select v-model="Filters.RamaDatit" class="bar-top__select">
            <option label="כולם" value=""></option>
            <option value="לא דתי" label="לא דתי"></option>
            <option value=" מסורתי" label="מסורתי"></option>
            <option value="דתי לאומי" label="דתי לאומי"></option>
            <option value="דתי" label="דתי"></option>
            <option value="תורני" label="תורני"></option>
            <option value="חרדי" label="חרדי"></option>
          </select>
        </div> -->

        <!-- טווח גילאים -->
        <div class="bar-top__field bar-top__field--ages">
          <label class="bar-top__label">טווח גילאים</label>
          <div class="bar-top__ages">
            <div class="bar-top__age-group">
              <span class="bar-top__age-label">מגיל</span>
              <select
                v-model="Filters.AgeStart"
                class="bar-top__select bar-top__select--age"
              >
                <option
                  v-for="n in 50"
                  :key="`age-start-${n}`"
                  :value="n"
                  :label="n"
                ></option>
              </select>
            </div>

            <div class="bar-top__age-group">
              <span class="bar-top__age-label">עד גיל</span>
              <select
                v-model="Filters.AgeEnd"
                class="bar-top__select bar-top__select--age"
              >
                <option
                  v-for="n in 100"
                  :key="`age-end-${n}`"
                  :value="n"
                  :label="n"
                ></option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, reactive, watch } from "vue";
import "@/views/cssOfRedyElements.scss";
import axios from "axios";
import { URL } from "@/URL/url";
import { useStore } from "vuex";
import Dropdown from "./Elements/DropdownComp.vue";

export default {
  components: { Dropdown },
  setup(props, { emit }) {
    const Store = useStore();

    const Filters = reactive({
      Name: "",
      RamaDatit: "",
      AgeStart: 1,
      AgeEnd: 100,
      Gender: "",
    });

    watch(Filters, async () => {
      setTimeout(async () => {
        emit("updateisFinished", false);
        const result = await axios.post(URL + "FilterData", Filters);
        emit("updateisFinished", true);
        emit("UpdateData", result.data);
      }, 200);
    });

    const isFinished = computed(() => Store.state.isFinished);

    return { Filters, isFinished };
  },
};
</script>

<style lang="scss" scoped>
$bg1: #1a0318;
$bg2: #2b0630;
$accent-gold: #ffb703;
$accent-pink: #ff4d6d;
$accent-purple: #c77dff;
$text-main: #ffffff;
$text-muted: rgba(255, 255, 255, 0.7);

.bar-top {
  position: sticky;
  top: 0;
  z-index: 15;
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, $bg1, $bg2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
}

/* מעט ריווח כללי */
.bar-top__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.7rem 1.25rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.bar-top__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.bar-top__row--top {
  align-items: center;
}

.bar-top__row--bottom {
  align-items: center;
}

/* חיפוש – רוחב קבוע בדסקטופ */
.bar-top__search-wrapper {
  flex: 0 0 260px;
  max-width: 260px;
  width: 260px;
}

/* צד ימין (מגדר + אפשרויות) */
.bar-top__right-side {
  flex: 1;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* לייבלים */
.bar-top__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: $text-muted;
  margin-bottom: 0.2rem;
}

/* מגדר */
.bar-top__gender {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bar-top__gender-tabs {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.18rem;
  background: rgba(10, 0, 18, 0.9);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
}

.bar-top__tab {
  position: relative;
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  color: $text-muted;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

  input {
    display: none;
  }

  span {
    position: relative;
    z-index: 1;
  }

  input:checked + span {
    font-weight: 700;
  }

  &:has(input:checked) {
    background: linear-gradient(135deg, $accent-gold, $accent-pink);
    color: #1a0312;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &:hover:not(:has(input:checked)) {
    background: rgba(255, 255, 255, 0.08);
    color: $text-main;
  }
}

/* Dropdown */
.bar-top__dropdown {
  display: flex;
  align-items: center;
}

/* שורה תחתונה – שדות */
.bar-top__field {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bar-top__field--rama {
  flex: 1;
  min-width: 200px;
}

.bar-top__field--ages {
  flex: 1.3;
  min-width: 260px;
}

/* סלקטים */
.bar-top__select {
  width: 100%;
  height: 38px;
  border-radius: 999px;
  border: none;
  padding: 0 1rem;
  font-size: 0.9rem;
  font-family: inherit;
  background: rgba(24, 4, 35, 0.96);
  color: $text-main;
  outline: none;
  box-shadow: 0 0 0 1px rgba(255, 200, 255, 0.4);
  transition: box-shadow 0.18s ease, background 0.18s ease, transform 0.08s ease;

  &:hover {
    background: rgba(31, 6, 46, 0.98);
    box-shadow: 0 0 0 2px rgba(255, 183, 3, 0.7);
  }

  &:focus {
    box-shadow: 0 0 0 2px $accent-gold;
    transform: translateY(-1px);
  }

  &--age {
    max-width: 140px;
  }
}

/* טווח גילאים */
.bar-top__ages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
  align-items: center;
}

.bar-top__age-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.bar-top__age-label {
  font-size: 0.8rem;
  color: $text-muted;
  white-space: nowrap;
}

/* ========== רספונסיביות ========== */

/* טאבלטים – קצת פחות ריווח */
@media (max-width: 900px) {
  .bar-top__inner {
    padding-inline: 0.75rem;
  }
}

/* מובייל (עד ~700px) – הכל בערימה, פול־ווית', מותאם אצבעות */
@media (max-width: 700px) {
  .bar-top__inner {
    padding-top: 0.5rem;
    padding-bottom: 0.6rem;
    padding-inline: 0.75rem;
    gap: 0.75rem;
  }

  .bar-top__row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  /* חיפוש – בפול רוחב למעלה */
  .bar-top__search-wrapper {
    flex: initial;
    max-width: 100%;
    width: 100%;
  }

  /* צד ימין – שורה מתחת, גם כן פול־ווית' */
  .bar-top__right-side {
    flex: initial;
    min-width: 100%;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  /* כפתורי מגדר – שיהיו שווים ונוחים ללחיצה */
  .bar-top__gender-tabs {
    width: 100%;
    justify-content: space-between;
  }

  .bar-top__tab {
    flex: 1;
    padding: 0.25rem 0.4rem;
    font-size: 0.8rem;
    text-align: center;
  }

  /* דרופדאון – ירד שורה מתחת למגדר, מיושר לימין */
  .bar-top__dropdown {
    width: 100%;
    justify-content: flex-end;
  }

  .bar-top__field--rama,
  .bar-top__field--ages {
    flex: initial;
    min-width: 100%;
  }

  .bar-top__ages {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  .bar-top__age-group {
    width: 100%;
    justify-content: space-between;
  }

  .bar-top__select--age {
    max-width: 180px;
    flex: 1;
  }
}

/* מובייל קטן ממש (עד ~480px) – עוד כיווץ טיפוגרפי ורוחב מלא לסלקטים */
@media (max-width: 480px) {
  .bar-top__label {
    font-size: 0.8rem;
  }

  .bar-top__age-label {
    font-size: 0.75rem;
  }

  .bar-top__tab {
    font-size: 0.75rem;
    padding: 0.25rem 0.3rem;
  }

  .bar-top__select--age {
    max-width: 100%;
  }

  .bar-top__age-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }
}
</style>
