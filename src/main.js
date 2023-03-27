import Vue from "vue";
import App from "./App";
import router from "./router/index";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import "./assets/css/global.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/app.scss'
import axios from "axios";

Vue.use(ElementUI);
Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$axios = axios

new Vue({
  router,
  axios,
  render: (h) => h(App),
}).$mount("#app");
