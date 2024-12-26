import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { UserInter } from "@/types/userInterface";
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useUserInfo = defineStore("rememberPwd", () => {
  const rememberPwd = ref<boolean>(false);
  const userInfo = ref<UserInter>({
    email: "",
    password: "",
  });
  const token = ref<string>("");
  const isLogin = ref<boolean>(false);
  function setUserInfo(info: UserInter, rememberPwd: boolean) {
    window.localStorage.setItem("userInfo", JSON.stringify(info));
    window.localStorage.setItem("rememberPwd", JSON.stringify(rememberPwd));
  }
  function getUserInfo() {
    const info = window.localStorage.getItem("userInfo");
    const remember = window.localStorage.getItem("rememberPwd");
    if (remember) {
      if (info) {
        userInfo.value = JSON.parse(info);
      }
      rememberPwd.value = JSON.parse(remember);
    }
  }
  return { rememberPwd, userInfo, token, isLogin, setUserInfo, getUserInfo };
});
