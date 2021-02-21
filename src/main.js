import ApiService from '@/services/ApiService';
import Vue from 'vue';
import App from './App.vue';
import './plugins/Filters';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Global Event Bus
Vue.prototype.$eventBus = new Vue();

ApiService.init(process.env.VUE_APP_SPACEX_API_ENDPOINT);
ApiService.setGlobalExceptionResponseHandler(Vue.prototype.$eventBus);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
