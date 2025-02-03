import type { DefineComponent } from "vue";

declare module "*.vue" {
  const component: DefineComponent<unknown, unknown, unknown>;
  export default component;
}
