// types/vue-global-properties.d.ts
import { App } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $formatDate: (dateString: string, format?: string) => string;
  }
}
