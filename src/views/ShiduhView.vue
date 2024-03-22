<template>
  <button @click="RoutePush">
    <span> חזור </span>
  </button>
  <h1>שידוכים</h1>
  <containor />
</template>

<script>
import { onMounted, ref } from "vue";
import containor from "@/components/Shiduh/ContainorComp.vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { URL } from "@/URL/url";
import router from "@/router";
export default {
  components: { containor },
  setup() {
    onMounted(() => {
      //   document.body.style.background = "#4da0ff2a";
      document.body.style.background =
        "radial-gradient(circle at center,#ffcf2273, #f9844581, #ffb9564c)";
    });
    const RoutePush = () => {
      router.push("/Admin");
    };
    return { RoutePush };
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}
h1 {
  text-align: center;
  border-bottom: 3px solid black;
  // background: radial-gradient(#ffcf2273, #f9844581, #ffb9564c);
}
// $ button back
button {
  display: inline-block;
  border-radius: 4px;
  background-color: #3d405b;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 17px;
  padding: 10px;
  width: 130px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  position: absolute;
  left: 0;
  top: 0;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button span:after {
  content: "«";
  position: absolute;
  opacity: 0;
  top: 0;
  left: -15px;
  transition: 0.5s;
}

button:hover span {
  padding-left: 15px;
}

button:hover span:after {
  opacity: 1;
  left: 0;
}
</style>
