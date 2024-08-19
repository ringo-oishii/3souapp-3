import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

//const vuetify = new Vuetify();
Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(), 
  icons: {
    iconfont: "mdi", // デフォルトでMDIアイコンを使用
  },
  router,
  render: h => h(App),
}).$mount('#app');
