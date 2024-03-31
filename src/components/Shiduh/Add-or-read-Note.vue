<template>
  <div class="OTFEF">
    <div class="Addnote" dir="rtl">
      <i class="fa-solid fa-xmark" @click="$emit('sgor')"></i>
      <div v-if="params.Note" class="AddnoteY">
        <h1>הערה</h1>
        <p v-if="!Update">{{ params.Note }}</p>
        <div v-if="Update">
          <el-input
            v-model="inputNote"
            placeholder="הקלד הערה"
            type="textarea"
            :autosize="{ minRows: 9 }"
            class="intut"
          ></el-input>
        </div>
        <div class="buttons">
          <el-button
            v-if="!Update"
            type="primary"
            @click="
              Update = true;
              inputNote = params.Note;
            "
            >עדכן</el-button
          >
          <el-button
            v-if="Update"
            type="success"
            @click="AddNote(params._id, inputNote)"
            >שמור</el-button
          >
        </div>
      </div>
      <div v-else class="AddnoteN">
        <h1>הוסף הערה</h1>
        <el-input
          v-model="inputNote"
          placeholder="הקלד הערה"
          type="textarea"
          :autosize="{ minRows: 9 }"
          class="intut"
        ></el-input>
        <div class="button" v-if="inputNote">
          <el-button type="success" @click="AddNote(params._id, inputNote)"
            >שמור</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import { URL } from "@/URL/url";

export default {
  props: ["ParamsOfAddNote"],
  setup(props, { emit }) {
    const params = inject("containor_params");
    const inputNote = ref("");
    const Update = ref(false);
    // onMounted(() => {
    //   console.log({ ...params.value });
    // });
    const AddNote = async (id, note) => {
      const paramas = { id, note };
      let { data } = await axios.post(URL + "AddNoteT", paramas);
      if (data) {
        window.location.reload();
      }
    };
    return { params, inputNote, Update, AddNote };
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
    transform: translateY(-50%);
    width: 50%;
    height: 50%;
    background: white;
    border-radius: 20px;
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
    &Y {
      text-align: center;
      p {
        font-weight: 700;
      }
      .intut {
        width: 80%;
      }
    }
    &N {
      text-align: center;
      .intut {
        width: 80%;
      }
      .button {
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        bottom: 20px;
      }
    }
  }
}
.el-button {
  margin: 5px;
}
</style>
