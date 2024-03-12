<template>
  <div class="Maala" v-if="$route.path === '/'">
    ברוכים הבאים לאתר בלה בלה בלה
  </div>
  <router-view />
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  setup() {
    // ElMessage(`${window.innerWidth}`);
  },
};
</script>
<style lang="scss">
body {
  background: #ffa9f154;
  // background: #ffa9f180;
}
.Maala {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #000;
  text-align: center;
  color: aliceblue;
  font-size: 32px;
}
input {
  text-align: right !important;
}
select {
  text-align: right;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* לפיירפוקס */
input[type="number"] {
  -moz-appearance: textfield;
}
// @media screen and (max-width: 1560px) {
//   // body {
//   //   background: #000;
//   // }
// }
</style>
