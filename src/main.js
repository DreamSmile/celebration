import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vconsole from 'vconsole'
import * as apis from '@/utils/api.js';
import './assets/css/reset.css'
import { Swipe, SwipeItem, Lazyload, Toast } from "vant";

// const vConsole = new Vconsole()

Vue.config.productionTip = false
Vue.prototype.$assetsSrc = 'http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/celebration/';
Vue.prototype.$api = apis;
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Toast);
// Vue.use(vConsole);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
