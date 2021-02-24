<template>
  <div class="d-flex flex-no-wrap center">
    <v-card elevation="0" shaped>
      <v-card-text>
        <h2 class="black--text font-weight-light">SpaceX-API GUI</h2>
      </v-card-text>
      <v-card-text>
        <span
          >Open Source REST API for launch, rocket, core, capsule, starlink,
          launchpad, and landing pad data.</span
        >
      </v-card-text>
      <v-card-text>
        <v-switch
          left
          v-model="isCompletedLaunches"
          inset
          :label="
            isCompletedLaunches ? 'Completed Launches' : 'Upcoming Launches'" ></v-switch>

          <BarChart v-if="isChartDataLoaded" :chartData="calculatePieChartForRocketLaunchesData" />

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
import {
  isEmpty, mapValues, groupBy, omit,
} from 'lodash';
import Constants from '@/constants';
import BarChart from '@/components/common/BarChart.vue';
import LaunchesMixin from '@/mixins/LaunchesMixin.vue';

export default {
  mixins: [LaunchesMixin],

  components: {
    BarChart,
  },

  async mounted() {
    this.setHomeAsPageTitle();
    this.scrollPaginationCurrentCounter = 0;
    // Load all items for home page.
    await this.loadAllSpaceXLaunchesSortedByLaunchDateDesc();
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

  computed: {

    calculatePieChartForRocketLaunchesData() {
      console.log(' ******* Home : this.launchesList ', this.launchesList);
      if (this.launchesList) {
        const grouped = mapValues(groupBy(this.launchesList, 'rocket.name'),
          (clist) => clist.map((launch) => omit(launch, 'rocket.name')));

        console.log(' ******* Home : grouped ', grouped);

        if (!isEmpty(grouped)) {
          const backgroundColorArray = [];

          const charLabelArray = Object.keys(grouped);

          for (let i = 0; i < charLabelArray.length; i += 1) {
            if (charLabelArray && (charLabelArray.length < (this.randomColorForChart).length)) {
              let colorStr = this.getRandormColor(this.randomColorForChart);
              console.log('***** Color Previous : ', colorStr);
              while (backgroundColorArray.includes(colorStr)) {
                console.log('***** Color Exist : ', backgroundColorArray, ' : ', colorStr);
                colorStr = this.getRandormColor(this.randomColorForChart);
              }
              backgroundColorArray.push(colorStr);
            } else {
              backgroundColorArray.push(this.getRandormColor(this.randomColorForChart));
            }
          }

          const initiChartObject = { labels: charLabelArray };
          const initialChartDataSet = { label: this.isCompletedLaunches ? 'Past Launches' : 'Upcoming Launches' };
          const prepareDatasetsObject = {
            ...initialChartDataSet,
            backgroundColor: backgroundColorArray,
            data: Object.values(grouped).map((launch) => launch.length),
          };

          return {
            ...initiChartObject,
            datasets: [prepareDatasetsObject],
          };
        }
      }
      return {};
    },

  },

  watch: {

    isCompletedLaunches() {
      console.log('****** Watch  isCompletedLaunches **** : ');
      this.launchesList = [];
      this.scrollPaginationCurrentCounter = 0;
      this.loadAllSpaceXLaunchesSortedByLaunchDateDesc();
    },

    calculatePieChartForRocketLaunchesData() {
      this.isChartDataLoaded = true;
    },

  },

};
</script>
<style scoped>
</style>
