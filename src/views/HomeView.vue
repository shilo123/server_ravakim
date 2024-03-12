<template>
  <div>
    <div class="Form" dir="rtl" v-if="!Zehu">
      <div class="line"></div>
      <el-row :gutter="360">
        <el-col :span="8">
          <input-form v-model="Form.Name" :Label="'שם'" :Pleace="'הקלד שם'" />
        </el-col>
        <el-col :span="8">
          <input-form
            v-model="Form.phone"
            :Label="'מספר טלפון'"
            :Pleace="'הקלד מספר טלפון'"
            type="Number"
          />
        </el-col>
      </el-row>
      <el-row :gutter="360">
        <el-col :span="8">
          <input-form
            v-model="Form.Age"
            :Label="'גיל'"
            :Pleace="'הקלד גיל'"
            type="Number"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="Form.RamaDatit"
            placeholder="רמה דתית"
            class="RamaDatit"
            dir="rtl"
          >
            <el-option value="אדמור" align="right"></el-option>
            <el-option value="רב עיר" align="right"></el-option>
            <el-option value="אברך" align="right"></el-option>
            <el-option value="דתי" align="right"></el-option>
            <el-option value="מסורתי" align="right"></el-option>
            <el-option value="לא מאמין" align="right"></el-option>
            <el-option value="כופר בתורת משה" align="right"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="360">
        <el-col :span="8">
          <label>תחביבים</label>
          <el-input
            v-model="Form.Hobits"
            style="width: 240px; margin-top: 10px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="כתוב נא את תחביבך"
            :input-style="{ background: 'none', border: '1px solid black' }"
          />
        </el-col>
        <el-col :span="8">
          <label class="Lablel">מה אתה מחפש?</label>
          <el-input
            v-model="Form.MaMehapes"
            style="width: 240px; margin-top: 10px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="כתוב נא את תחביבך"
            :input-style="{ background: 'none', border: '1px solid black' }"
          />
        </el-col>
      </el-row>
      <div class="sabaSwich">
        <label>מגדר:</label>
        <div class="ParentsSwithc">
          <el-switch
            ref="Switchty"
            class="Swichto"
            v-model="Form.Gender"
            :active-text="'זכר'"
            :inactive-text="'נקבה'"
            active-value="זכר"
            inactive-value="נקבה"
            size="large"
            style="
              --el-switch-on-color: #3c9dff;
              --el-switch-off-color: #533cff;
            "
          ></el-switch>
        </div>
      </div>
      <el-upload
        v-if="!AfterUpload"
        class="Uploados"
        action="http://localhost:3006/postFilee"
        multiple
        :on-success="GetPiccher"
      >
        <el-button type="primary"
          >העלה תמונה <i class="fa-duotone fa-file-arrow-up fa-xl ic"></i
        ></el-button>
      </el-upload>
      <img :src="Form.picURL" v-else class="IMG" />
      <el-button type="success" class="ButtonFinish" @click="Submit"
        >שלח</el-button
      >
    </div>
    <div v-else class="Toda">תודה רבה על הפרטים וכו וכו</div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";
export default {
  setup() {
    const Switchty = ref(null);
    const AfterUpload = ref(false);
    const Form = reactive({});
    const Zehu = ref(false);
    //
    onMounted(() => {
      if (Switchty.value) {
        const el = Switchty.value.$el.children;
        el[1].style.position = "absolute";
        el[1].style.left = "-30px";
        el[3].style.position = "absolute";
        el[3].style.right = "-30px";
      }
    });
    //
    watch(Form, (val) => {});
    //
    const Submit = async () => {
      let { data } = await axios.post(URL + "GetForm", Form);
      // Form = {};
      if (data) {
        Object.keys(Form).forEach((key) => {
          Form[key] = ""; // או כל ערך התחלתי אחר תלוי בסוג הנתונים
        });
        AfterUpload.value = false;
        Zehu.value = true;
      }
    };
    const GetPiccher = (url) => {
      // console.log(url);
      if (url) {
        Form.picURL = url;
        setTimeout(() => {
          AfterUpload.value = true;
        }, 100);
      }
    };
    return {
      Switchty,
      Form,
      AfterUpload,
      Submit,
      GetPiccher,
      Zehu,
    };
  },
};
</script>
<style lang="scss" scoped>
.Form {
  background: #ff8fd842;
  border-radius: 20px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  height: 45%;
  border: 3px solid black;
  padding: 20px;
  padding-right: 30%;
  .line {
    height: 100%;
    width: 1px;
    background: #000;
    position: absolute;
    right: 25%;
    top: 0;
  }
  .el-row {
    margin-bottom: 30px;
  }

  .sabaSwich {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 1%;
    label {
      position: absolute;
      top: 15px;
      right: -70px;
      font-size: 25px;
    }
    .ParentsSwithc {
      background: #00000065;
      padding: 10px 40px;
      width: 130px;
      height: 40px;

      border-radius: 20px;
      .Swichto {
        position: absolute;
        left: 38%;
      }
    }
  }
  .RamaDatit {
    width: 200px;
    position: relative;
    top: 20px;
  }
  .Uploados {
    width: 25%;
    height: 100%;
    position: absolute;
    right: 0%;
    top: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    .el-button {
      position: absolute;
      right: 30%;
      .ic {
        margin-right: 10px;
      }
    }
  }
  .Lablel {
    display: block;
    width: 100px;
  }
  .ButtonFinish {
    position: absolute;
    bottom: 0;
    right: 25%;
    width: 10%;
  }
  .IMG {
    width: 25%;
    height: 80%;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
  }
}
.Toda {
  position: absolute;
  top: 130px;
  left: 28%;
  font-size: 70px;
}
</style>
