<template>
  <div class="sec-center">
    <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
    <label class="for-dropdown" for="dropdown"> אפשרויות </label>
    <div class="section-dropdown">
      <a href="#" @click="Evnent('Shiduh')"
        ><i class="fa-light fa-restroom"></i>התחל לשדך
      </a>
      <a href="#" @click="Evnent"
        ><i class="fa-duotone fa-pen-to-square"></i>עוד משהו
      </a>
      <a href="#" @click="Evnent"
        ><i class="fa-duotone fa-trash"></i>עוד משהו2
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router";

export default {
  setup() {
    return {};
  },
  methods: {
    Evnent(val) {
      if (typeof val === "string") {
        router.push(`/${val}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* Please ❤ this if you like it! */

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
}
.sec-center {
  position: absolute;
  left: 0%;
  top: 100px;
  max-width: 100%;
  text-align: center;
  z-index: 10;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}
.dropdown:checked + label,
.dropdown:not(:checked) + label {
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 2;
  height: 50px;
  transition: all 200ms linear;
  border-radius: 4px;
  width: 220px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  cursor: pointer;
  color: #102770;
  box-shadow: 0 12px 35px 0 rgba(255, 235, 167, 0.15);
}
.dark-light:checked ~ .sec-center .for-dropdown {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 12px 35px 0 rgba(16, 39, 112, 0.25);
}
.dropdown:checked + label:before,
.dropdown:not(:checked) + label:before {
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: auto;
  pointer-events: none;
}
.dropdown:checked + label:before {
  pointer-events: auto;
}
.dropdown:not(:checked) + label .uil {
  font-size: 24px;
  margin-left: 10px;
  transition: transform 200ms linear;
}
.dropdown:checked + label .uil {
  transform: rotate(180deg);
  font-size: 24px;
  margin-left: 10px;
  transition: transform 200ms linear;
}
.section-dropdown {
  position: absolute;
  padding: 5px;
  background-color: #111;
  top: 70px;
  left: 0;
  width: 100%;
  border-radius: 4px;
  display: block;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
  //   z-index: 2;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 200ms linear;
}
.dark-light:checked ~ .sec-center .section-dropdown {
  background-color: #fff;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.15);
}
.dropdown:checked ~ .section-dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.section-dropdown:before {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
  display: block;
  z-index: 1;
}
.section-dropdown:after {
  position: absolute;
  top: -7px;
  right: 30px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #111;
  content: "";
  display: block;
  z-index: 2;
  transition: all 200ms linear;
}
.dark-light:checked ~ .sec-center .section-dropdown:after {
  border-bottom: 8px solid #fff;
}

a {
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  margin: 2px 0;
  text-align: right;
  text-decoration: none;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
  -ms-flex-pack: distribute;
}
.dark-light:checked ~ .sec-center .section-dropdown a {
  color: #102770;
}
a:hover {
  color: #102770;
  background-color: #ffeba7;
}
.dark-light:checked ~ .sec-center .section-dropdown a:hover {
  color: #ffeba7;
  background-color: #102770;
}
a .uil {
  font-size: 22px;
}
.dropdown-sub:checked + label,
.dropdown-sub:not(:checked) + label {
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  text-align: left;
  text-decoration: none;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
  -ms-flex-pack: distribute;
  cursor: pointer;
}
.dropdown-sub:checked + label .uil,
.dropdown-sub:not(:checked) + label .uil {
  font-size: 22px;
}
.dropdown-sub:not(:checked) + label .uil {
  transition: transform 200ms linear;
}
.dropdown-sub:checked + label .uil {
  transform: rotate(135deg);
  transition: transform 200ms linear;
}
.dropdown-sub:checked + label:hover,
.dropdown-sub:not(:checked) + label:hover {
  color: #102770;
  background-color: #ffeba7;
}
.dark-light:checked ~ .sec-center .section-dropdown .for-dropdown-sub {
  color: #102770;
}
.dark-light:checked ~ .sec-center .section-dropdown .for-dropdown-sub:hover {
  color: #ffeba7;
  background-color: #102770;
}

.section-dropdown-sub {
  position: relative;
  display: block;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  max-height: 0;
  padding-left: 10px;
  padding-right: 3px;
  overflow: hidden;
  transition: all 200ms linear;
}
.dropdown-sub:checked ~ .section-dropdown-sub {
  pointer-events: auto;
  opacity: 1;
  max-height: 999px;
}
.section-dropdown-sub a {
  font-size: 14px;
}
.section-dropdown-sub a .uil {
  font-size: 20px;
}

@media screen and (max-width: 991px) {
  .dark-light:checked + label,
  .dark-light:not(:checked) + label {
    top: 20px;
    right: 20px;
  }
}
</style>
