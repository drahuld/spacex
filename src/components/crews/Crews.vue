<template>
  <div>
    This is Crews ....
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {

  mounted() {
    this.setCrewsAsPageTitle();
  },

  data() {
    return {
      SPACEX_CREWS_CONSTANTS: Constants.SPACEX_CREWS,
    };
  },

  methods: {

    ...mapActions(['setPageTitle']),

    setCrewsAsPageTitle() {
      this.setPageTitle(this.SPACEX_CREWS_CONSTANTS);
    },

  },

};
</script>
