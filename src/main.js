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

Vue.mixin({
  methods: {
    isObjectNotEmpty(object) {
      return Object.keys(object).length > 0;
    },
    isArrayNotEmpty(arrayObject) {
      return arrayObject.length > 0;
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
