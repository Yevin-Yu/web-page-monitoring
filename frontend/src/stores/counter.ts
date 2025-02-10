import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getToken } from "@/utils/token";
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
  const userInfo = ref<UserInter>({
    email: "",
  });
  const token = getToken();
  const isLogin = ref<boolean>(token ? true : false);
  function setUserInfo(email: string) {
    window.localStorage.setItem("userInfo", JSON.stringify(email));
  }
  function getUserInfo() {
    return window.localStorage.getItem("userInfo");
  }
  return { userInfo, token, isLogin, setUserInfo, getUserInfo };
});
