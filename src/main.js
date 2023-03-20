import Vue from "vue";
import App from "./App";
import router from "./router/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(ElementUI);
Vue.use(PaperDashboard);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
