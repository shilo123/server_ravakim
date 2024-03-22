<template>
  <div class="container-All" v-if="ifDOM">
    <div class="container-ManAndWuman" v-if="isFinished">
      <div class="list-Man">
        <h2 class="title">גברים</h2>
        <draggable
          v-model="data.man"
          :group="{ name: 'people', pull: 'clone' }"
          @end="Evenetdraggable"
          id="man"
        >
          <!-- :group="{ name: 'people', pull: 'clone', put: true }" -->
          <div class="item" v-for="(ish, i) in data.man" :key="i" id="man">
            {{ ish.Name + "/" + ish.Age
            }}<span>
              <img
                v-if="ish.picURL"
                :src="ish.picURL"
                alt="אין תמונה"
                width="30px"
                height="30px"
              />
            </span>
          </div>
        </draggable>
      </div>
      <div class="list-Wooman">
        <h2 class="title">נשים</h2>

        <draggable
          v-model="data.woman"
          :group="{ name: 'people', pull: 'clone' }"
          @end="Evenetdraggable"
          id="woman"
        >
          <!-- :group="{ name: 'people', pull: 'clone', put: true }" -->
          <div class="item" v-for="(ish, i) in data.woman" :key="i" id="woman">
            {{ ish.Name + "/" + ish.Age
            }}<span>
              <img
                v-if="ish.picURL"
                :src="ish.picURL"
                alt="אין תמונה"
                width="30px"
                height="30px"
              />
            </span>
          </div>
        </draggable>
      </div>
    </div>
    <!-- class="contaner-Finish" -->
    <div class="contiiin" v-if="newShi">
      <draggable v-model="newSHiduh" :group="{ name: 'people' }">
        <div v-for="(sod, i) in newSHiduh" :key="i">
          <div class="icon">
            <i
              class="fa-duotone fa-heart fa-xl"
              style="--fa-secondary-color: #ce2c2c"
            ></i>
          </div>
          <div :class="sod.Gender === 'זכר' ? 'man' : 'woman'">
            <div class="item">
              {{ sod.Name + "/" + sod.Age
              }}<span>
                <img
                  v-if="sod.picURL"
                  :src="sod.picURL"
                  alt="אין תמונה"
                  width="30px"
                  height="30px"
                />
              </span>
            </div>
          </div>
        </div>
      </draggable>
      <el-button
        type="success"
        v-if="ifSubmit"
        class="SubMit"
        @click="InsertNewSHid"
        >שמור</el-button
      >
    </div>
    <div :class="{ newShi: newShi, 'contaner-Finish': !newShi }">
      <el-button type="success" class="Add" @click="AddNewShiduh">{{
        !newShi ? "צור" : "חזור"
      }}</el-button>
      <h2>פוטנציאל לשידוך</h2>
      <div class="container-S">
        <div class="conton" v-for="(itmem, i) in resonse" :key="i">
          <!-- <div class="newItem" v-if="i === 0">sdf</div> -->
          <el-button
            type="danger"
            class="Button-Delete"
            @click="DeleteShiduh(itmem._id)"
            >מחיקה</el-button
          >
          <draggable
            v-model="itmem.Shiduh"
            group="people"
            @add="evntos($event, itmem)"
          >
            <div
              v-for="(S, indo) in itmem.Shiduh"
              :key="indo"
              :class="{
                listcomlitedMan: S.Gender === 'זכר',
                listcomlitedWoman: S.Gender === 'נקבה',
              }"
            >
              <div class="item" :id="S.Gender === 'זכר' ? 'man' : 'woman'">
                {{ S.Name + "/" + S.Age
                }}<span :id="S.Gender === 'זכר' ? 'man' : 'woman'">
                  <img
                    v-if="S.picURL"
                    :src="S.picURL"
                    alt="אין תמונה"
                    :id="S.Gender === 'זכר' ? 'man' : 'woman'"
                  />
                </span>
              </div>
            </div>
          </draggable>

          <div class="icon">
            <i
              class="fa-duotone fa-heart"
              style="
                --fa-primary-color: #ffffff;
                --fa-secondary-color: #ffffff;
                --fa-secondary-opacity: 0.5;
              "
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRef, toRefs, watch } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { URL } from "@/URL/url";
import { VueDraggableNext } from "vue-draggable-next";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  // props: ["isFinished"],

  setup(props) {
    // const {data} = toRefs(this.data)
    const ifDOM = ref(true);
    const newShi = ref(false);
    const newSHiduh = ref([]);
    const { data, isFinished } = useAxios(URL + "GetShiduhim");
    const { data: resonse, isFinished: finsih } = useAxios(URL + "GetShoduh");
    watch(resonse, (val) => {
      // console.log(val);
    });
    const AddNewShiduh = () => {
      newShi.value = !newShi.value;
      newSHiduh.value = [];
    };
    const ifSubmit = computed(() => newSHiduh.value.length === 2);
    return {
      resonse,
      finsih,
      data,
      isFinished,
      ifDOM,
      AddNewShiduh,
      newShi,
      newSHiduh,
      ifSubmit,
    };
  },
  methods: {
    async InsertNewSHid() {
      let arrids = this.newSHiduh.map((e) => e._id);
      let { data } = await axios.post(URL + "InsertShiduh", arrids);
      if (data) {
        this.AddNewShiduh();
        let res = await axios.get(URL + "GetShoduh");
        this.resonse = res.data;
      }
    },
    consolelll(val) {
      console.log(`val`, val);
    },
    findMan(val) {
      return val.find((e) => e.Gender === "זכר");
    },
    findWoman(val) {
      return val.find((e) => e.Gender === "נקבה");
    },
    Evenetdraggable(e) {
      const { newIndex } = e;
      if (this.newShi && this.newSHiduh.length > 2) {
        let gendro = this.newSHiduh[newIndex].Gender;
        let index = this.newSHiduh.findIndex((e) => e.Gender === gendro);
        this.newSHiduh.splice(index, 1);
      }
    },
    async DeleteShiduh(id) {
      console.log(id);
      let { data } = await axios.delete(URL + "DeleteShiduh/" + id);
      console.log(data);
      if (data) {
        let res = await axios.get(URL + "GetShoduh");
        this.resonse = res.data;
      }
    },
    async evntos(e, val) {
      const ID = val._id;
      let arr = val.Shiduh;
      // console.log("arr", arr);
      const { newIndex } = e;
      let originalArr = arr;
      if (arr.length === 3) {
        let MyGend;
        if (originalArr[newIndex].Gender === "זכר") {
          MyGend = "זכר";
        } else {
          MyGend = "נקבה";
        }
        const index = arr.findIndex(
          (e, i) => e.Gender === MyGend && i !== newIndex
        );
        originalArr.splice(index, 1);
      } else {
        originalArr.push(originalArr[newIndex]);
      }
      let newPoten = originalArr.map((e) => e._id);
      // console.log({ newPoten, originalArr });
      let { data } = await axios.put(URL + "EditZog", { newPoten, ID });
      if (data) {
        this.resonse = data;
        ElMessage.success("בוצע");
      } else {
        ElMessage.error("משהו השתבש");
      }
    },
    rafreshDom() {
      this.ifDOM = false;
      setTimeout(() => {
        this.ifDOM = true;
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-All {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 10%;
  .container-ManAndWuman {
    width: 30%;
    margin: 5%;
    margin-top: 2%;
    // background: #0000005a;
    background: #d532325a;
    position: absolute;
    right: 0;
    padding: 20px;
    height: 470px;
    border-radius: 30px;
    box-shadow: 0 0 7px 1px #0000003a;
    .list-Man {
      position: absolute;
      right: 20px;
      top: 0;
      margin: 20px;
      box-shadow: 0 0 7px 3px #0000003a;
      padding: 10px;
      height: 80%;
      overflow-y: auto;
      border-radius: 5px;
      .title {
        text-align: center;
      }
      .item {
        margin-bottom: 8px;
        border-radius: 5px;
        padding: 10px;
        background: #5cffe9;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: all-scroll;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 10px;
          position: relative;
          top: 2px;
        }
      }
    }
    .list-Wooman {
      position: absolute;
      left: 20px;
      top: 0;
      margin: 20px;
      box-shadow: 0 0 7px 3px #0000003a;
      padding: 10px;
      height: 80%;
      overflow-y: auto;
      border-radius: 5px;
      .title {
        text-align: center;
      }
      .item {
        margin-bottom: 8px;
        border-radius: 5px;
        padding: 10px;
        background: #5cffe9;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: all-scroll;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 10px;
          position: relative;
          top: 2px;
        }
      }
    }
  }
  .contiiin {
    border: 3px solid black;
    border-radius: 20px;
    width: 30%;
    height: 6em;
    position: absolute;
    left: 30%;
    top: 10%;
    z-index: 2000;
    .SubMit {
      position: absolute;
      bottom: -50px;
      width: 100%;
    }
    .icon {
      position: absolute;
      left: 47%;
      transform: translateX(-80%);
      top: 50%;
      transform: translateY(-50%);
    }
    .man {
      position: absolute;
      left: 0px;
      top: 0;
      width: 40%;
      height: 90%;
      // margin-top: 12px;

      .item {
        margin-bottom: 8px;
        border-radius: 20px;
        padding: 5px;
        background: #5cffe9;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        img {
          border-radius: 50%;
        }
      }
    }
    .woman {
      position: absolute;
      right: 10px;
      top: 0;
      width: 40%;
      height: 90%;
      // margin-right: 11px;
      // margin-top: 12px;

      .item {
        margin-bottom: 8px;
        border-radius: 20px;
        padding: 5px;
        background: #5cffe9;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        img {
          border-radius: 50%;
        }
      }
    }
  }
  .newShi {
    width: 210px;
    position: absolute;
    left: 100px;
    margin-top: 2%;
    top: 0;
    transition: all 0.5s;

    img {
      display: none;
    }
    .Add {
    }
    .container-S {
      display: none;
    }
    h2 {
      display: none;
    }
  }

  .contaner-Finish {
    border: 2px solid black;
    background: #7b7b7b;
    background: radial-gradient(#ff2222, #f96060b5, #ff8056);
    width: 40%;
    height: 80%;
    position: absolute;
    left: 100px;
    margin-top: 2%;
    top: 0;
    border-radius: 20px;
    box-shadow: 0 0 7px 2px #0000008e;
    transition: all 0.5s ease-in-out;
    h2 {
      text-align: center;
    }
    .Add {
      position: absolute;
      right: 0;
      top: 10px;
      margin: 10px;
      width: 130px;
      background: #ff8e8e;
      border: 1px solid #d45b48;
    }
    .container-S {
      width: 80%;
      margin-left: 8%;
      height: 80%;
      // border: 2px solid black;
      box-shadow: 0 0 7px 2px #0000008e;

      border-radius: 10px;
      padding: 5px;
      overflow-y: auto;
      .conton {
        border: 2px solid black;
        width: 80%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 15%;
        margin: 5px;
        margin-bottom: 15px;
        left: 10%;
        padding: 3px;
        border-radius: 10px;
        .Button-Delete {
          position: absolute;
          left: -55px;
          // transform: rotate(270deg);
          width: 50px;
          font-size: 13px;
          // background: #000;
        }

        .newItem {
          width: 80%;
          height: 2em;
          border: 3px solid black;
        }
        .listcomlited {
          &Man {
            position: absolute;
            left: 20px;
            top: 0;
            margin-top: 12px;
            .item {
              margin-bottom: 8px;
              border-radius: 5px;
              padding: 5px;
              background: #5cffe9;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              &:hover {
                cursor: all-scroll;
              }
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-left: 10px;
                position: relative;
                top: 2px;
              }
            }
          }
          &Woman {
            position: absolute;
            right: 20px;
            top: 0;
            margin-right: 11px;
            margin-top: 12px;
            .item {
              margin-bottom: 8px;
              border-radius: 5px;
              padding: 5px;
              background: #5cffe9;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              &:hover {
                cursor: all-scroll;
              }
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-left: 10px;
                position: relative;
                top: 2px;
              }
            }
          }
        }
      }
    }
  }
}
//
//
//
//
//
::-webkit-scrollbar {
  width: 2px;
  height: 10px;
  background-color: #f9f9f9;
}

/* פס גלילה - ריחוף */
::-webkit-scrollbar:hover {
  background-color: #f5f5f5;
}

/* פס גלילה - ידית */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

/* פס גלילה - ידית - ריחוף */
::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}
</style>
