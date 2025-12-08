<template>
  <div class="actions-dropdown" dir="rtl">
    <button type="button" class="actions-dropdown__trigger" @click="toggleOpen">
      <span>אפשרויות</span>
      <i
        class="fa-solid fa-chevron-down actions-dropdown__chevron"
        :class="{ 'is-open': isOpen }"
      ></i>
    </button>

    <transition name="actions-dropdown-fade">
      <div v-if="isOpen" class="actions-dropdown__menu">
        <button
          type="button"
          class="actions-dropdown__item"
          @click="Evnent('Shiduh')"
        >
          <span class="actions-dropdown__item-text">
            <i class="fa-light fa-restroom"></i>
            התחל לשדך
          </span>
        </button>

        <button type="button" class="actions-dropdown__item" @click="Evnent()">
          <span class="actions-dropdown__item-text">
            <i class="fa-duotone fa-pen-to-square"></i>
            עוד משהו
          </span>
        </button>

        <button type="button" class="actions-dropdown__item" @click="Evnent()">
          <span class="actions-dropdown__item-text">
            <i class="fa-duotone fa-trash"></i>
            עוד משהו2
          </span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const isOpen = ref(false);

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const Evnent = (val) => {
      // לסגור תפריט אחרי לחיצה
      isOpen.value = false;
      if (typeof val === "string") {
        router.push(`/${val}`);
      }
    };

    return {
      isOpen,
      toggleOpen,
      Evnent,
    };
  },
};
</script>

<style lang="scss" scoped>
$bg-dark: #150218;
$accent-gold: #ffb703;
$accent-pink: #ff4d6d;
$accent-purple: #c77dff; // ← זה היה חסר
$text-main: #ffffff;
$text-dark: #16020e;

.sec-center {
  position: relative;
  max-width: 100%;
  text-align: center;
  z-index: 10;
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

.dropdown:checked + label,
.dropdown:not(:checked) + label {
  position: relative;
  font-weight: 500;
  font-size: 14px;
  line-height: 2;
  height: 40px;
  transition: all 200ms linear;
  border-radius: 999px;
  width: 170px;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, $accent-purple, $accent-pink);
  color: $text-dark;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.6);
}

.dropdown:checked + label:before,
.dropdown:not(:checked) + label:before {
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: auto;
  pointer-events: none;
}

.dropdown:checked + label:before {
  pointer-events: auto;
}

.section-dropdown {
  position: absolute;
  padding: 5px;
  background: linear-gradient(145deg, #1b0522, #2f0835);
  top: 50px;
  right: 0;
  width: 190px;
  border-radius: 12px;
  display: block;
  box-shadow: 0 14px 35px 0 rgba(0, 0, 0, 0.75);
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
  transition: all 200ms linear;
  border: 1px solid rgba(255, 200, 255, 0.45);
}

.dropdown:checked ~ .section-dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.section-dropdown:after {
  position: absolute;
  top: -7px;
  right: 30px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #2f0835;
  content: "";
  display: block;
  z-index: 2;
}

.section-dropdown a {
  position: relative;
  color: $text-main;
  transition: all 200ms linear;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 2px 0;
  text-align: right;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    margin-left: 8px;
  }

  &:hover {
    color: $text-dark;
    background: linear-gradient(135deg, $accent-gold, $accent-pink);
  }
}
</style>
