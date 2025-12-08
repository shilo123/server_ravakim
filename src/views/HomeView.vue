<template>
  <div class="page-wrapper">
    <div v-if="!Zehu" class="form-card" dir="rtl">
      <div class="form-header">
        <h1>טופס היכרות</h1>
        <p>מלא את הפרטים בנחת 🙂</p>
      </div>

      <div class="form-content">
        <!-- צד שמאל – טופס משודרג -->
        <div class="form-main">
          <!-- סקשן 1: פרטים בסיסיים -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-pill">1</div>
              <div class="section-text">
                <h2>פרטים בסיסיים</h2>
                <p>שם, טלפון ופרטי רקע</p>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>שם</label>
                <input
                  v-model="Form.Name"
                  type="text"
                  placeholder="הקלד שם מלא"
                />
              </div>

              <div class="field">
                <label>מספר טלפון</label>
                <input
                  v-model="Form.phone"
                  type="tel"
                  placeholder="הקלד מספר טלפון"
                />
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>עיסוק / מוסד לימודים</label>
                <input
                  v-model="Form.IsuckOrMosadLimudim"
                  type="text"
                  placeholder="מה אתה עושה ביומיום?"
                />
              </div>

              <div class="field">
                <label>גיל</label>
                <input
                  v-model="Form.Age"
                  type="number"
                  placeholder="הקלד גיל"
                />
              </div>
            </div>
          </section>

          <!-- סקשן 2: רקע דתי ואופי -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-pill">2</div>
              <div class="section-text">
                <h2>רקע ואופי</h2>
                <p>רמה דתית ותכונות אופי</p>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>רמה דתית</label>
                <select v-model="Form.RamaDatit">
                  <option disabled value="">בחר רמה דתית</option>
                  <option value="לא דתי">לא דתי</option>
                  <option value="מסורתי">מסורתי</option>
                  <option value="דתי לאומי">דתי לאומי</option>
                  <option value="דתי">דתי</option>
                  <option value="תורני">תורני</option>
                  <option value="חרדי">חרדי</option>
                </select>
              </div>

              <div class="field">
                <label>תכונות אופי</label>
                <textarea
                  v-model="Form.Ofi"
                  rows="3"
                  placeholder="כתוב בקצרה איך היית מתאר את האופי שלך"
                ></textarea>
              </div>
            </div>
          </section>

          <!-- סקשן 3: תחביבים וציפיות -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-pill">3</div>
              <div class="section-text">
                <h2>תחביבים וציפיות</h2>
                <p>מה אתה אוהב ומה אתה מחפש</p>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>תחביבים</label>
                <textarea
                  v-model="Form.Hobits"
                  rows="2"
                  placeholder="מה עושה לך טוב בזמנך הפנוי?"
                ></textarea>
              </div>

              <div class="field">
                <label>מה אתה מחפש?</label>
                <textarea
                  v-model="Form.MaMehapes"
                  rows="2"
                  placeholder="מה חשוב לך למצוא בצד השני?"
                ></textarea>
              </div>
            </div>
          </section>

          <!-- סקשן 4: משפחה -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-pill">4</div>
              <div class="section-text">
                <h2>המשפחה שלך</h2>
                <p>תיאור קצר של הבית שממנו אתה מגיע</p>
              </div>
            </div>

            <div class="field">
              <label>תאר בקווים כלליים את משפחתך</label>
              <textarea
                v-model="Form.KavimClalim"
                rows="3"
                placeholder="לדוגמה: מספר אחים, אווירה בבית, רקע כללי"
              ></textarea>
            </div>
          </section>
        </div>

        <!-- צד ימין – תמונה, מגדר, כפתור -->
        <div class="form-side">
          <div class="avatar-section">
            <div v-if="AfterUpload && Form.picURL" class="avatar-ring">
              <img :src="Form.picURL" class="avatar-img" />
            </div>

            <div v-else class="upload-box">
              <label class="upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  hidden
                />
                העלה תמונה
              </label>
              <p class="upload-hint">תמונה אחת ברורה ומכובדת 😊</p>
            </div>
          </div>

          <div class="gender-section">
            <span class="gender-label">מגדר</span>
            <div class="gender-buttons">
              <label>
                <input
                  type="radio"
                  value="זכר"
                  v-model="Form.Gender"
                  name="gender"
                />
                <span>גבר</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="נקבה"
                  v-model="Form.Gender"
                  name="gender"
                />
                <span>אישה</span>
              </label>
            </div>
          </div>

          <button class="submit-btn" @click="Submit" :disabled="LoadingB">
            <span v-if="!LoadingB">שלח</span>
            <span v-else>שולח...</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="thank-you" dir="rtl">
      <div class="thank-card">
        <h1>תודה רבה על הפרטים 🙏</h1>
        <p>ניצור קשר אחרי שנעבור על הכל.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { URL } from "@/URL/url";
import axios from "axios";

export default {
  setup() {
    const Form = reactive({});
    const Zehu = ref(false);
    const AfterUpload = ref(false);
    const LoadingB = ref(false);

    const showError = (msg) => {
      window.$toast && window.$toast("העלאת התמונה נכשלה ❌ ", "error");
      msg;
    };

    const Submit = async () => {
      try {
        LoadingB.value = true;

        const bool =
          Form.Name &&
          Form.phone &&
          Form.IsuckOrMosadLimudim &&
          Form.Age &&
          Form.RamaDatit &&
          Form.Ofi &&
          Form.Hobits &&
          Form.MaMehapes &&
          Form.KavimClalim &&
          Form.Gender;

        if (bool) {
          if (Form.phone.length === 10) {
            const { data } = await axios.post(URL + "ADDForm", Form);
            LoadingB.value = false;

            if (data) {
              Object.keys(Form).forEach((key) => {
                Form[key] = "";
              });
              AfterUpload.value = false;
              Zehu.value = true;
            }
          } else {
            showError("מספר טלפון חייב להכיל עשרה תווים");
            LoadingB.value = false;
          }
        } else {
          if (!Form.Name) showError("לא מלאת שם");
          else if (!Form.phone) showError("לא מלאת מספר טלפון");
          else if (!Form.IsuckOrMosadLimudim)
            showError("לא מלאת עיסוק\\מוסד לימודים");
          else if (!Form.Age) showError("לא מלאת גיל");
          else if (!Form.RamaDatit) showError("לא מלאת רמה דתית");
          else if (!Form.Ofi) showError("לא מלאת אופי");
          else if (!Form.Hobits) showError("לא מלאת תחביבים");
          else if (!Form.MaMehapes) showError("לא אמרת מה אתה מחפש");
          else if (!Form.KavimClalim) showError("לא תיארת את משפחתך");
          else if (!Form.Gender) showError("לא תיארת מגדר");

          LoadingB.value = false;
        }
      } catch (error) {
        LoadingB.value = false;
        showError("משהו השתבש");
      }
    };

    const GetPiccher = (url) => {
      if (url) {
        Form.picURL = url;
        setTimeout(() => {
          AfterUpload.value = true;
        }, 100);
      }
    };

    const handleFileChange = async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      try {
        LoadingB.value = true;
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post(
          "/postFilee",
          // "https://server-ravakim-10c1effbda77.herokuapp.com/postFilee",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        GetPiccher(data);
      } catch (e) {
        showError("העלאת התמונה נכשלה");
      } finally {
        LoadingB.value = false;
      }
    };

    return {
      Form,
      Zehu,
      AfterUpload,
      LoadingB,
      Submit,
      GetPiccher,
      handleFileChange,
    };
  },
};
</script>

<style scoped lang="scss">
.page-wrapper {
  min-height: 100vh;
  padding: 40px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at top left,
    #0f172a,
    #020617 55%,
    #111827
  );
}

/* כרטיס הטופס */
.form-card {
  width: 100%;
  max-width: 1100px;
  background: rgba(15, 23, 42, 0.96);
  border-radius: 28px;
  padding: 28px 26px 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.35);
  backdrop-filter: blur(16px);
  color: #e5e7eb;
}

/* כותרת */
.form-header {
  border-bottom: 1px solid rgba(75, 85, 99, 0.7);
  padding-bottom: 14px;
  margin-bottom: 20px;
}

.form-header h1 {
  margin: 0;
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.form-header p {
  margin: 6px 0 0;
  font-size: 0.95rem;
  color: #9ca3af;
}

/* תוכן – גריד */
.form-content {
  display: grid;
  grid-template-columns: minmax(0, 2.3fr) minmax(260px, 1.1fr);
  gap: 26px;
  margin-top: 10px;
}

/* צד שמאל – עיצוב חדש */
.form-main {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* סקשנים */
.form-section {
  background: radial-gradient(
    circle at top right,
    rgba(15, 118, 210, 0.12),
    transparent 55%
  );
  border-radius: 18px;
  padding: 14px 14px 16px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.7);
}

/* כותרת של כל סקשן */
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.section-pill {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #38bdf8, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #f9fafb;
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.65);
}

.section-text h2 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #e5e7eb;
}

.section-text p {
  margin: 2px 0 0;
  font-size: 0.8rem;
  color: #9ca3af;
}

/* גריד שדות */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
  margin-top: 6px;
}

/* שדות */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5f5;
}

.field input,
.field select,
.field textarea {
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.8);
  background: rgba(15, 23, 42, 0.98);
  padding: 7px 9px;
  font-size: 0.9rem;
  color: #f9fafb;
  transition: border-color 0.18s ease, box-shadow 0.18s ease,
    background 0.18s ease, transform 0.08s ease;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #6b7280;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.7);
  background: rgba(15, 23, 42, 1);
  transform: translateY(-1px);
}

.field textarea {
  resize: vertical;
}

/* צד ימין */
.form-side {
  background: radial-gradient(circle at top, #1e293b, #020617);
  border-radius: 22px;
  padding: 18px 16px 20px;
  border: 1px solid rgba(75, 85, 99, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

/* תמונה */
.avatar-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.avatar-ring {
  width: 140px;
  height: 140px;
  border-radius: 999px;
  padding: 4px;
  background: conic-gradient(
    from 200deg,
    #38bdf8,
    #6366f1,
    #a855f7,
    #f97316,
    #38bdf8
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
}

/* upload */
.upload-box {
  text-align: center;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: #f9fafb;
  border: none;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.55);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.upload-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.7);
  filter: brightness(1.05);
}

.upload-hint {
  margin-top: 6px;
  font-size: 0.78rem;
  color: #9ca3af;
}

/* מגדר */
.gender-section {
  width: 100%;
}

.gender-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #cbd5f5;
}

.gender-buttons {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.gender-buttons input[type="radio"] {
  display: none;
}

.gender-buttons span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.8);
  background: rgba(15, 23, 42, 0.95);
  color: #e5e7eb;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.gender-buttons label input[type="radio"]:checked + span {
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  border-color: transparent;
  color: #f9fafb;
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.55);
}

/* כפתור שליחה */
.submit-btn {
  margin-top: 4px;
  width: 100%;
  padding: 9px 0;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ecfdf5;
  box-shadow: 0 16px 38px rgba(22, 163, 74, 0.7);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease,
    opacity 0.15s ease;
}

.submit-btn:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 22px 48px rgba(22, 163, 74, 0.85);
  filter: brightness(1.04);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: default;
  box-shadow: none;
}

/* מסך תודה */
.thank-you {
  min-height: 100vh;
  padding: 40px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at top left,
    #0f172a,
    #020617 55%,
    #111827
  );
}

.thank-card {
  background: rgba(15, 23, 42, 0.98);
  border-radius: 24px;
  padding: 32px 28px;
  text-align: center;
  color: #e5e7eb;
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.thank-card h1 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.thank-card p {
  margin: 0;
  font-size: 1rem;
  color: #9ca3af;
}

/* רספונסיביות */
@media (max-width: 900px) {
  .form-content {
    grid-template-columns: 1fr;
  }

  .form-side {
    order: -1;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-card {
    padding: 20px 18px 22px;
  }

  .form-header h1 {
    font-size: 1.6rem;
  }
}
</style>
