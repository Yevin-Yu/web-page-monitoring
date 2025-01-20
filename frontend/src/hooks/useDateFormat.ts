// src/composables/useDateFormat.ts
import { computed } from "vue";

interface DateOptions {
  format?: string;
}

export function useDateFormat(dateString: string, options: DateOptions = {}) {
  return computed(() => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; 

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const format = (options.format ?? "yyyy-MM-dd HH:mm:ss") as string;
    return format
      .replace("yyyy", year.toString())
      .replace("MM", month)
      .replace("dd", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);
  });
}
