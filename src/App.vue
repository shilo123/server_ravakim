<template>
  <!-- <div class="Maala" v-if="$route.path === '/'"></div> -->
  <img src="@/assets/Baner-Maala.jpeg" class="Maala" alt="" />
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
  // background-image: url("@/assets/Baner.jpeg");
  background-image: url("@/assets/Baner.jpeg");
  background-size: cover;
  // background: radial-gradient(circle at center, #ffb4a4, #f1efef);

  overflow-x: hidden;
  width: 100%;
  padding-bottom: 1260px;
  // background: #ffa9f180;
}
html {
  overflow-x: hidden;
}
.Maala {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 99%;
  // height: 40px;
  height: 40%;
  border-radius: 10px;
  text-align: center;
  // background: url("@/assets/Baner-Maala.jpeg");
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
@media screen and (max-width: 500px) {
  .Maala {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 95%;
    // height: 40px;
    height: 7%;
    border-radius: 10px;
    text-align: center;
    background: url("@/assets/Baner-Maala.jpeg");
    background-size: cover;
    color: #000;
    font-size: 32px;
  }
}
</style>
