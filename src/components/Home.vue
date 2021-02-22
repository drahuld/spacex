<template>
  <div class="d-flex flex-no-wrap center">
    <v-card elevation="0" shaped>
      <v-card-text>
        <h2 class="black--text font-weight-light">SpaceX-API GUI</h2>
      </v-card-text>
      <v-card-text>
        <span
          >Open Source REST API for launch, rocket, core, capsule, starlink,
          launchpad, and landing pad data.</span>
      </v-card-text>
      <v-card-text>
        <span
          >We are not affiliated, associated, authorized, endorsed by, or in any
          way officially connected with Space Exploration Technologies Corp
          (SpaceX), or any of its subsidiaries or its affiliates. The names
          SpaceX as well as related names, marks, emblems and images are
          registered trademarks of their respective owners.</span
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Constants from '@/constants';

export default {
  mounted() {
    this.setHomeAsPageTitle();
  },

  data() {
    return {
      SPACEX_HOME_CONSTANTS: Constants.SPACEX_HOME,
    };
  },

  methods: {
    ...mapActions(['setPageTitle']),

    setHomeAsPageTitle() {
      this.setPageTitle(this.SPACEX_HOME_CONSTANTS);
    },
  },
};
</script>
<style scoped>
</style>
