<template>
  <div>
    This is launchPad....
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {

  mounted() {
    this.setLaunchAPadsAsPageTitle();
  },

  data() {
    return {
      SPACEX_LAUNCH_PADS_CONSTANTS: Constants.SPACEX_LAUNCH_PADS,
    };
  },

  methods: {

    ...mapActions(['setPageTitle']),

    setLaunchAPadsAsPageTitle() {
      console.log('****** setLaunchAPadsAsPageTitle *** ', this.SPACEX_LAUNCH_PADS_CONSTANTS);
      this.setPageTitle(this.SPACEX_LAUNCH_PADS_CONSTANTS);
    },

  },

};
</script>
