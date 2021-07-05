import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import { Swipe, SwipeItem, Lazyload, Toast } from "vant";


Vue.config.productionTip = false
Vue.prototype.$assetsSrc = 'http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/celebration/'
Vue.use(Swipe),
  Vue.use(SwipeItem),
  Vue.use(Lazyload),
  Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
