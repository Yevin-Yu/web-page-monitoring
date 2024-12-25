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

export const useRememberPwd = defineStore("rememberPwd", () => {
  const rememberPwd = ref<boolean>(false);
  const userInfo = ref<UserInter>({
    userName: "",
    password: "",
  });
  const token = ref<string>("");
  return { rememberPwd, userInfo, token };
});
