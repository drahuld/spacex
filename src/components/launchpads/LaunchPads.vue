<template>
  <div>
    <v-data-table
      item-key="id"
      :headers="launchPadHeaderList"
      :items="launchesPadsList"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import Constants from '@/constants';
import { isEmpty } from 'lodash';

export default {

  async mounted() {
    this.setLaunchAPadsAsPageTitle();
    this.loadAllLaunchPads();
  },

  data() {
    return {
      SPACEX_LAUNCH_PADS_CONSTANTS: Constants.SPACEX_LAUNCH_PADS,
      launchesPadsList: [],
      launchPadHeaderList: [],
    };
  },

  methods: {

    ...mapActions(['setPageTitle', 'getLaunchesPads', 'setUnLoadingRequest']),

    setLaunchAPadsAsPageTitle() {
      console.log('****** setLaunchAPadsAsPageTitle *** ', this.SPACEX_LAUNCH_PADS_CONSTANTS);
      this.setPageTitle(this.SPACEX_LAUNCH_PADS_CONSTANTS);
    },

    async loadAllLaunchPads() {
      const launchPadResponse = await this.getLaunchesPads();
      if (!isEmpty(launchPadResponse)) {
        this.launchesPadsList = launchPadResponse.map((launchPad) => ({
          id: launchPad.id,
          name: launchPad.name,
          full_name: launchPad.full_name,
          locality: launchPad.locality,
          launch_attempts: launchPad.launch_attempts,
          launch_successes: launchPad.launch_successes,
          status: launchPad.status,
          details: launchPad.details,
        }));

        Object.keys(this.launchesPadsList[0]).forEach((key) => {
          this.launchPadHeaderList.push(
            {
              text: key,
              value: key,
              align: (key === 'id' ? ' d-none' : ''),
              width: '100px',
            },
          );
        });
        console.log('****** launchPadHeaderList :', this.launchPadHeaderList);
        this.setUnLoadingRequest();
      }
    },

  },

};
</script>
