<template>
  <div class="Maala" v-if="$route.path === '/'">ברוכים הבאים לאתר</div>
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
  // background: #035f62d7;
  background: radial-gradient(circle at center, #ffb4a4, #f1efef);

  overflow-x: hidden;
  width: 100%;
  // background: #ffa9f180;
}
html {
  overflow-x: hidden;
}
.Maala {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  background: aliceblue;
  color: #000;
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
