<template>
  <div>
    This is Ships ....
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {

  data() {
    return {
      SPACEX_SHIPS_CONSTANTS: Constants.SPACEX_SHIPS,
    };
  },

  mounted() {
    this.setShipAsPageTitle();
  },

  methods: {

    ...mapActions(['setPageTitle']),

    setShipAsPageTitle() {
      this.setPageTitle(this.SPACEX_SHIPS_CONSTANTS);
    },

  },

};
</script>
