import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getBaseUrl } from "@/mixins/getBaseUrl";

Vue.mixin(getBaseUrl);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
