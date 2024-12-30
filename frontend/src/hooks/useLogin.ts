import { ref, watchEffect, watch } from "vue";
import { getToken } from "@/utils/token";
import { useUserInfo } from "@/stores/counter.ts";
export default function () {
  const rememberPwdStore = useUserInfo();
  const isLogin = ref(false);
  const token = getToken();
  watchEffect(() => {
    if (token) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
    }
  });
  watch(
    rememberPwdStore,
    (a, b) => {
      if (a.isLogin) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }
    },
    { deep: true, immediate: true }
  );
  return { isLogin };
}
