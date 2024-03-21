<template>
  <div>
    <div dir="rtl">
      <div class="container-All" v-if="isFinished">
        <el-row :gutter="70">
          <el-col :span="5" v-for="(Item, i) in data" :key="i">
            <div class="card">
              <img :src="Item.picURL" />

              <div class="card-details" @click="GetPratim(Item._id)">
                <p class="text-title">{{ Item.Name }}/{{ Item.Age }}</p>
                <!-- <p class="text-body">{{ Item.Age }}</p> -->
              </div>
              <button class="card-button" @click="GetPratim(Item._id)">
                מידע נוסף
              </button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-else class="Loading"><div class="spinner"></div></div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs, watch } from "vue";
import "@/views/cssOfRedyElements.scss";
import axios from "axios";
import { URL } from "@/URL/url";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useStore } from "vuex";

export default {
  props: ["data"],
  setup(props, { emit }) {
    const Store = useStore();
    const GetPratim = (id) => {
      emit("GetPratim", id);
    };
    const isFinished = computed(() => {
      return Store.state.isFinished;
    });
    return { isFinished, GetPratim };
  },
};
</script>
<style lang="scss" scoped>
.container-All {
  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    background: #f5f5f5;
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 0px 1px 1px #828282;

    &:hover {
      cursor: pointer;
    }
    img {
      margin-top: 30px;
      margin-bottom: 30px;
      width: 50%;
      height: 37%;
      border-radius: 60%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }
  }

  .card-details {
    color: black;
    height: 100%;
    gap: 0.5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #008bf8;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  /*Text*/
  .text-title {
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    text-align: center;
    bottom: 0;
  }

  /*Hover*/
  .card:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
  // $
  .el-row {
    position: absolute;
    top: 160px;
    right: 13% !important;
    width: 90%;
  }
  .el-col {
    margin-bottom: 30px;
  }
}
</style>
