import type { App } from "vue";
import { useDateFormat } from "@/hooks/useDateFormat";

export default {
  install(app: App) {
    // 添加为全局方法
    app.config.globalProperties.$formatDate = (
      dateString: string,
      format?: string
    ) => {
      return useDateFormat(dateString, { format }).value;
    };

    // 如果需要，添加为全局指令
    app.directive("format-date", {
      mounted(el: HTMLElement, binding: any) {
        el.textContent = useDateFormat(binding.value, {
          format: binding.arg,
        }).value;
      },
    });
  },
};
