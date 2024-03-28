<template>
  <div class="OTFEF">
    <div class="Addnote">
      <i class="fa-solid fa-xmark" @click="$emit('sgor')"></i>
      {{ params ? "יש לנו!!" : "אין לנו..." }}
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
export default {
  props: ["ParamsOfAddNote"],
  setup(props) {
    const params = inject("containor_params");
    onMounted(() => {
      console.log(params.value);
    });
    return { params };
  },
};
</script>
<style lang="scss" scoped>
.OTFEF {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #00000058;
  .Addnote {
    position: absolute;
    left: 30%;
    top: 50%;
    //   transform: translateX(-50%);
    transform: translateY(-50%);
    width: 50%;
    height: 50%;
    background: white;
    i {
      position: absolute;
      right: 0;
      top: 0;
      margin: 5px;
      &:hover {
        padding: 5px;
        margin: 0;
        background: #858282;
        border-radius: 7px;
        cursor: pointer;
      }
    }
  }
}
</style>
