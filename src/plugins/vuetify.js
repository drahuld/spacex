import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VLayout } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: { VLayout },
});

const opts = {};

export default new Vuetify(opts);
