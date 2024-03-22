<template>
  <BarTop @updateisFinished="isFinished = $event" @UpdateData="data = $event" />
  <Allgrid :data="data" :isFinished="isFinished" @GetPratim="GetPratim" />
  <DetalisCompVue />
</template>

<script>
import { useAxios } from "@vueuse/integrations/useAxios";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";
import { ElMessage } from "element-plus";
import BarTop from "@/components/Admin/BarTopComp.vue";
import Allgrid from "@/components/Admin/GridComp.vue";
import "./cssOfRedyElements.scss";
import { useStore } from "vuex";
import DetalisCompVue from "@/components/Admin/DetalisComp.vue";

export default {
  components: { BarTop, Allgrid, DetalisCompVue },
  setup() {
    // $ Vars
    // const { data, isFinished } = useAxios(URL + "GetRavakim");
    const Store = useStore();
    const { data, isFinished } = useAxios(URL + "GetRavakim");

    // $ Life Sycle

    onMounted(() => {
      document.body.style.background = "#4da0ff2a";
    });
    // $ watch
    watch(isFinished, (val) => {
      Store.commit("updateisFinished", val);
    });
    return {
      data,
      isFinished,
    };
  },
  methods: {
    async GetPratim(id) {
      this.$store.dispatch("GetDetalis", id);
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background: #4da0ff2a;
}
// $ Card:
//
// @media screen and (max-width: 1560px) {
//   .container-All {
//     .card {
//       position: relative;
//       // width: 14%;
//       width: 100%;
//       height: 370px;
//       background: rgb(103, 225, 255);
//       transition: all 0.4s;
//       border-radius: 10px;
//       box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
//       font-size: 30px;
//       font-weight: 900;

//       &:hover {
//         border-radius: 15px;
//         cursor: pointer;
//         transform: scale(1.2);
//         box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
//         background: rgb(103, 151, 255);
//       }
//     }
//     .first-content {
//       height: 100%;
//       width: 100%;
//       transition: all 0.4s;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       opacity: 1;
//       border-radius: 15px;
//     }

//     .card:hover .first-content {
//       height: 0px;
//       opacity: 0;
//     }

//     .second-content {
//       height: 0%;
//       width: 100%;
//       opacity: 0;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       border-radius: 15px;
//       transition: all 0.4s;
//       font-size: 0px;
//       transform: rotate(90deg) scale(-1);
//     }

//     .card:hover .second-content {
//       opacity: 1;
//       height: 100%;
//       font-size: 1.8rem;
//       transform: rotate(0deg);
//     }
//     //
//     .first-content {
//       position: relative;
//       display: flex;
//       flex-direction: column;
//       img {
//         margin-top: 30px;
//         margin-bottom: 30px;
//         width: 50%;
//         height: 37%;
//         border-radius: 60%;
//         position: absolute;
//         top: 0;
//       }
//       .OtehrContent {
//         height: 42%;
//         position: absolute;
//         bottom: 0;

//         .Age {
//           font-size: 20px;
//           text-align: center;
//         }
//       }
//     }
//     .el-row {
//       position: relative;
//       top: 160px;
//       right: 200px;
//     }
//   }
//   //
//   .Maala {
//     background: #ffd622;
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100px;
//     border-bottom: 3px solid black;
//     .input-Serch {
//       position: absolute;
//       right: 40%;
//       top: 10px;
//       width: 20%;
//     }
//     .FilterOfRamaDatit {
//       position: absolute;
//       left: 23%;
//       width: 14%;
//       top: 30px;
//     }
//     // $select:
//     /* בחירת סגנון כללי */
//     .filterAges {
//       position: absolute;
//       right: 20px;
//       top: 30px;
//       display: flex;
//       flex-direction: row;
//       color: #000;
//       label {
//         margin: 0 20px;
//       }
//       .selectStartAge {
//         select {
//           /* גודל ורוחב */
//           width: 200px;
//           height: 40px;
//           font-size: 20px;
//           /* משפחת גופן */
//           font-family: Arial, sans-serif;

//           /* צבע טקסט */
//           color: #333;

//           /* מרווח פנימי */
//           padding: 0 10px;

//           /* גבול */
//           border: 1px solid #ccc;
//           border-radius: 5px;

//           /* מראה רך */
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

//           /* הופעה בריחוף */
//           &:hover {
//             border-color: #999;
//           }
//         }
//         &:focus,
//         &:active {
//           /* צבע רקע */
//           background-color: #f9f9f9;

//           /* צבע גבול */
//           border-color: #999;
//         }
//         option:checked {
//           /* צבע רקע */
//           background-color: #ccc;

//           /* צבע טקסט */
//           color: #000;
//         }
//       }
//       .selectEndAge {
//         select {
//           /* גודל ורוחב */
//           width: 200px;
//           height: 40px;
//           font-size: 20px;
//           /* משפחת גופן */
//           font-family: Arial, sans-serif;

//           /* צבע טקסט */
//           color: #333;

//           /* מרווח פנימי */
//           padding: 0 10px;

//           /* גבול */
//           border: 1px solid #ccc;
//           border-radius: 5px;

//           /* מראה רך */
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

//           /* הופעה בריחוף */
//           &:hover {
//             border-color: #999;
//           }
//         }
//         &:focus,
//         &:active {
//           /* צבע רקע */
//           background-color: #f9f9f9;

//           /* צבע גבול */
//           border-color: #999;
//         }
//         option:checked {
//           /* צבע רקע */
//           background-color: #ccc;

//           /* צבע טקסט */
//           color: #000;
//         }
//       }
//     }
//   }
//   //
//   .Sahor {
//     background: #000000a5;
//     position: fixed;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     .Detalis {
//       position: absolute;
//       left: 20%;
//       top: 100px;
//       width: 70%;
//       min-height: 50%;
//       background: #9029ffcd;
//       animation: expandAnimation 0.8s;
//       border-radius: 20px;
//       overflow-y: auto;
//       .ParentsImg {
//         // border: 3px solid black;
//         width: 40%;
//         min-height: 100%;
//         position: absolute;
//         left: 0;
//         top: 0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         img {
//           border-radius: 50%;
//           // position: absolute;
//           // left: 6%;
//           // top: 9%;
//           height: 300px;
//           width: 300px;
//         }
//       }
//       .closeIcon {
//         position: absolute;
//         top: 10px;
//         right: 10px;
//         margin: 5px;
//         border-radius: 30%;
//         z-index: 500;
//         &:hover {
//           background: #0000007e;
//           padding: 20px;
//           top: 0px;
//           right: 0px;
//           margin: 5px;
//           cursor: pointer;
//         }
//       }
//       .content {
//         position: absolute;
//         right: 0px;
//         top: 0px;
//         // font-size: 30px;
//         font-size: 120%;
//         border: 3px solid black;
//         height: 100%;
//         width: 60%;
//         border-radius: 20px;
//         background: #ffffff69;
//         overflow-y: auto;

//         .Container-Key-value {
//           display: flex;
//           width: 80%;
//           border-radius: 5px;

//           margin-bottom: 10px;
//           box-shadow: 0 0 8px 3px #0000007d;
//           border-radius: 5px;
//           .key {
//             background: #c95dff;
//             padding: 5px;
//             width: 30%;
//             border-radius: 0 10px 10px 0;
//           }
//           .value {
//             padding: 5px;
//             background: #ba91ff;
//             border-radius: 10px 0 0 10px;
//             width: 80%;
//           }
//         }
//       }
//     }
//   }
//   @keyframes expandAnimation {
//     from {
//       opacity: 0;
//       transform: scale(0);
//     }
//     to {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }
//   .Loading {
//     background: #0000006d;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0;
//     top: 10%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     .spinner {
//       width: 56px;
//       height: 56px;
//       display: grid;
//       border: 4.5px solid #0000;
//       border-radius: 50%;
//       border-color: #dbdcef #0000;
//       animation: spinner-e04l1k 1s infinite linear;
//       &::before,
//       &::after {
//         content: "";
//         grid-area: 1/1;
//         margin: 2.2px;
//         border: inherit;
//         border-radius: 50%;
//       }
//       &::before {
//         border-color: #474bff #0000;
//         animation: inherit;
//         animation-duration: 0.5s;
//         animation-direction: reverse;
//       }

//       &::after {
//         margin: 8.9px;
//       }
//     }

//     @keyframes spinner-e04l1k {
//       100% {
//         transform: rotate(1turn);
//       }
//     }
//   }
// }
//
//
//
//
//
//
//
</style>
