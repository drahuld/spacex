<template>
  <div>
    This is Capsules pad....
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {

  data() {
    return {
      SPACEX_CAPSULES_CONSTANTS: Constants.SPACEX_CAPSULES,
    };
  },

  mounted() {
    this.setCapsulesAsPageTitle();
  },

  methods: {

    ...mapActions(['setPageTitle']),

    setCapsulesAsPageTitle() {
      this.setPageTitle(this.SPACEX_CAPSULES_CONSTANTS);
    },

  },

};
</script>
