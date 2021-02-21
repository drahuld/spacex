<template>
  <div>
    This is Rockets ....
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {

  mounted() {
    this.setRocketAsPageTitle();
  },

  data() {
    return {
      SPACEX_ROCKETS_CONSTANTS: Constants.SPACEX_ROCKETS,
    };
  },

  methods: {

    ...mapActions(['setPageTitle']),

    setRocketAsPageTitle() {
      this.setPageTitle(this.SPACEX_ROCKETS_CONSTANTS);
    },

  },

};
</script>
