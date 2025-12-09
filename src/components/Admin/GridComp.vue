<template>
  <div
    class="grid-wrapper"
    :class="{ 'grid-wrapper--delete-mode': isDelete }"
    dir="rtl"
  >
    <!-- מצב טעינה -->
    <div v-if="!isFinished" class="grid-loading">
      <div class="grid-loading__spinner"></div>
      <div class="grid-loading__text">טוען נתונים...</div>
    </div>

    <!-- מצב נתונים -->
    <div v-else class="grid-container">
      <template v-if="data && data.length">
        <div class="grid">
          <div
            v-for="(Item, i) in data"
            :key="Item._id || i"
            class="grid__item"
          >
            <article
              class="profile-card"
              :class="{ 'profile-card-DeleteMode': isDelete }"
              @click="GetPratim(Item._id)"
            >
              <div
                v-if="isDelete"
                class="delete-x"
                @click="DelteUser(Item._id)"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>

              <div class="profile-card__image-wrapper">
                <img
                  :src="Item.picURL"
                  alt="תמונה"
                  class="profile-card__image"
                />
              </div>

              <div class="profile-card__body">
                <h3 class="profile-card__title">
                  {{ Item.Name || "ללא שם" }}
                  <span v-if="Item.Age" class="profile-card__age">
                    / {{ Item.Age }}
                  </span>
                </h3>

                <p v-if="Item.RamaDatit" class="profile-card__subtitle">
                  {{ Item.RamaDatit }}
                </p>

                <button
                  v-show="!isDelete"
                  type="button"
                  class="profile-card__button"
                  @click.stop="GetPratim(Item._id)"
                >
                  מידע נוסף
                </button>
              </div>
            </article>
          </div>
        </div>
      </template>

      <!-- כשאין בכלל נתונים -->
      <div v-else class="grid-empty">
        <p class="grid-empty__text">לא נמצאו תוצאות בהתאם לסינון.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import "@/views/cssOfRedyElements.scss";
import { useStore } from "vuex";

export default {
  props: ["data"],
  setup(props, { emit }) {
    const Store = useStore();

    const GetPratim = (id) => {
      emit("GetPratim", id);
    };
    const DelteUser = (id) => {
      emit("DelteUser", id);
    };
    const isDelete = computed(() => Store.state.isDelete);
    const isUpdate = computed(() => Store.state.isUpdate);

    const isFinished = computed(() => Store.state.isFinished);

    return { isFinished, GetPratim, isUpdate, isDelete, DelteUser };
  },
};
</script>

<style lang="scss" scoped>
$card-bg1: #1d0624;
$card-bg2: #2b0835;
$accent-gold: #ffb703;
$accent-pink: #ff4d6d;
$text-main: #ffffff;
$text-muted: rgba(255, 255, 255, 0.75);

.grid-wrapper {
  max-width: 1200px;
  margin: 1.5rem auto 3rem;
  padding: 0 1rem;
}

/* מצב טעינה */
.grid-loading {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: $text-main;

  &__spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.15);
    border-top-color: $accent-gold;
    animation: grid-spin 0.8s linear infinite;
  }

  &__text {
    font-size: 0.95rem;
    color: $text-muted;
  }
}

@keyframes grid-spin {
  to {
    transform: rotate(360deg);
  }
}

/* רשת כרטיסים */
.grid-container {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem 1.2rem;
}

.grid__item {
  display: flex;
  justify-content: center;
}

/* כרטיס */
.profile-card {
  position: relative;
  width: 210px;
  height: 270px;
  border-radius: 20px;
  background: linear-gradient(145deg, $card-bg1, $card-bg2);
  padding: 1.2rem 1rem 1.3rem;
  border: 1px solid rgba(255, 200, 255, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.85);
  color: $text-main;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out,
    border-color 0.2s ease-out;
  z-index: 50;

  &-DeleteMode {
    border: 2px solid rgba(239, 68, 68, 0.9); // אדום חזק
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.35),
      0 12px 30px rgba(0, 0, 0, 0.85), 0 0 18px rgba(239, 68, 68, 0.7); // זוהר אדום
    transform: translateY(-2px) scale(1.015);
    animation: deleteCardPulse 1.3s infinite ease-in-out;
  }

  .delete-x {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #ff6b6b, #b91c1c);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.7),
      0 0 0 2px rgba(255, 255, 255, 0.8);
    transition: all 0.18s ease;
    animation: deletePulse 1.4s infinite ease-in-out;

    i {
      color: white;
      font-size: 0.85rem;
      font-weight: bold;
    }

    &:hover {
      animation: deleteBounce 0.4s ease-in-out;
      transform: scale(1.35) rotate(8deg);
      box-shadow: 0 12px 30px rgba(220, 38, 38, 0.95), 0 0 0 2px white;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  @keyframes deletePulse {
    0% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  }
}

.profile-card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.95);
  border-color: $accent-gold;
}

/* תמונה */
.profile-card__image-wrapper {
  margin-top: 0.2rem;
}

.profile-card__image {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9);
  border: 3px solid rgba(255, 200, 255, 0.8);
}

/* גוף הכרטיס */
.profile-card__body {
  margin-top: 1.2rem;
  text-align: center;
  width: 100%;
}

/* כותרת + גיל */
.profile-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: $accent-gold;
}

.profile-card__age {
  font-size: 0.95rem;
  font-weight: 500;
  color: $text-main;
}

/* תת כותרת (רמה דתית) */
.profile-card__subtitle {
  margin-top: 0.35rem;
  font-size: 0.9rem;
  color: $text-muted;
}

/* כפתור "מידע נוסף" */
.profile-card__button {
  margin-top: auto;
  margin-bottom: 0.1rem;
  width: 80%;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, $accent-gold, $accent-pink);
  color: #1a0312;
  font-size: 0.9rem;
  padding: 0.45rem 0.7rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.75);
  transform: translateY(8px);
  opacity: 0;
  transition: 0.22s ease-out;
}

.profile-card:hover .profile-card__button {
  transform: translateY(0);
  opacity: 1;
}

/* כשאין נתונים */
.grid-empty {
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-empty__text {
  color: $text-muted;
  font-size: 0.95rem;
}

/* ========= רספונסיביות ========= */

/* טאבלט – קצת יותר צמוד */
@media screen and (max-width: 900px) {
  .grid-wrapper {
    margin: 1rem auto 2rem;
    padding: 0 0.75rem;
  }

  .grid {
    gap: 1.2rem 0.9rem;
  }
}

/* מובייל כללי – כרטיסים קטנים יותר, שתי עמודות */
@media screen and (max-width: 600px) {
  .grid-wrapper {
    margin-top: 0.75rem;
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }

  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem 0.5rem;
  }

  .profile-card {
    width: 100%;
    max-width: 165px;
    height: 215px;
    padding: 0.9rem 0.7rem 1rem;
    border-radius: 16px;
  }

  .profile-card__image {
    width: 64px;
    height: 64px;
    border-width: 2px;
  }

  .profile-card__body {
    margin-top: 0.8rem;
  }

  .profile-card__title {
    font-size: 0.95rem;
  }

  .profile-card__age {
    font-size: 0.85rem;
  }

  .profile-card__subtitle {
    font-size: 0.8rem;
  }

  .profile-card__button {
    width: 90%;
    font-size: 0.8rem;
    padding: 0.35rem 0.6rem;
  }
}

/* מובייל קטן מאוד – ממש קומפקטי */
@media screen and (max-width: 400px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem 0.4rem;
  }

  .profile-card {
    max-width: 150px;
    height: 200px;
    padding: 0.8rem 0.6rem 0.9rem;
  }

  .profile-card__image {
    width: 56px;
    height: 56px;
  }

  .profile-card__title {
    font-size: 0.9rem;
  }

  .profile-card__subtitle {
    font-size: 0.78rem;
  }

  .profile-card__button {
    font-size: 0.78rem;
  }
}

@keyframes deleteCardPulse {
  0% {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.35),
      0 12px 30px rgba(0, 0, 0, 0.85), 0 0 12px rgba(239, 68, 68, 0.6);
  }

  50% {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5), 0 14px 34px rgba(0, 0, 0, 0.9),
      0 0 22px rgba(239, 68, 68, 0.9);
  }

  100% {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.35),
      0 12px 30px rgba(0, 0, 0, 0.85), 0 0 12px rgba(239, 68, 68, 0.6);
  }
}
</style>
