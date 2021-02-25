<template>
  <v-container>
    <v-switch
      left
      v-model="isCompletedLaunches"
      inset
      :label="isCompletedLaunches ? 'Completed Launches' : 'Upcoming Launches'"
    ></v-switch>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          elevation="24"
          height="500" width="500">
          <v-card-title class="justify-center">Launches Count Per Rocket</v-card-title>
          <v-row class="fill-height aligGraph" align="center" justify="center">
            <PieChart
              v-if="calculatePieChartForRocketLaunchesData != null"
              :chartData="calculatePieChartForRocketLaunchesData"/></v-row>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card elevation="24" height="500" width="500">
          <v-card-title class="justify-center">Launches Count Per Launch-Pads</v-card-title>
          <v-row class="fill-height aligGraph" align="center" justify="center"
            ><BarChart
              v-if="calculateBarChartForLaunchPadsLaunchesData != null"
              :chartData="calculateBarChartForLaunchPadsLaunchesData"
          /></v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-card elevation="24" style="margin-top: 20px">
      <v-card-title class="justify-center">Launches/Rockets By Year</v-card-title>
            <BarChart
              v-if="calculateBarChartForLaunchesPerYearData != null"
              :chartData="calculateBarChartForLaunchesPerYearData"/>
     </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import {
  isEmpty, mapValues, groupBy, omit, first, last, range,
} from 'lodash';
import Constants from '@/constants';
import PieChart from '@/components/common/charts/PieChart.vue';
import BarChart from '@/components/common/charts/BarChart.vue';
import LaunchesMixin from '@/mixins/LaunchesMixin.vue';

export default {
  mixins: [LaunchesMixin],

  components: {
    PieChart,
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

    getRandomChartColorArray(charLabelArrayLength) {
      const backgroundColorArray = [];
      if (charLabelArrayLength > 0) {
        for (let i = 0; i < charLabelArrayLength; i += 1) {
          if (
            charLabelArrayLength < this.randomColorForChart.length
          ) {
            let colorStr = this.getRandormColor(this.randomColorForChart);
            console.log('***** Color Previous : ', colorStr);
            while (backgroundColorArray.includes(colorStr)) {
              console.log(
                '***** Color Exist : ',
                backgroundColorArray,
                ' : ',
                colorStr,
              );
              colorStr = this.getRandormColor(this.randomColorForChart);
            }
            backgroundColorArray.push(colorStr);
          } else {
            backgroundColorArray.push(
              this.getRandormColor(this.randomColorForChart),
            );
          }
        }
      }
      return backgroundColorArray;
    },

    filterObjectByGroupBy(criteriaKey) {
      if (this.launchesList && this.launchesList.length > 0) {
        return mapValues(groupBy(this.launchesList, criteriaKey),
          (clist) => clist.map((launch) => omit(launch, criteriaKey)));
      }
      return {};
    },

    filterLaunchesByYear() {
      if (this.launchesList && this.launchesList.length > 0) {
        // Get all unique rockets so first groupByRockets
        const yearRangeArray = this.findYearRangeArrayFromLaunchList();
        const allRocketByGroup = this.filterObjectByGroupBy('rocket.name');
        console.log(' **** allRocketByGroup : ', allRocketByGroup);
        if (allRocketByGroup) {
          const allAvailableRocketsKeysArray = Object.keys(allRocketByGroup);
          if (allAvailableRocketsKeysArray) {
            // Get all dataset for all available rockets
            const datasets = [];
            allAvailableRocketsKeysArray.forEach((rocket, index) => {
              if (!this.isCompletedLaunches) {
                datasets.push({
                  label: rocket,
                  backgroundColor: this.randomColorForChart[index],
                  data: this.filterUpcomingLaunchesByYear(yearRangeArray, rocket),
                });
              } else {
                datasets.push({
                  label: rocket,
                  backgroundColor: this.randomColorForChart[index],
                  data: this.filterLaunchByRocketAndYearAndSuccess(yearRangeArray, rocket),
                });
              }
            });

            if (this.isCompletedLaunches) {
              datasets.push({
                label: 'Launches Failure',
                backgroundColor: '#9C27B0',
                data: this.filterLaunchesFailureByYear(yearRangeArray),
              });
            }

            return {
              labels: yearRangeArray,
              datasets,
            };
          }
        }
      }
      return {};
    },

    /**
     * Return year ranges from launch list.
     */
    findYearRangeArrayFromLaunchList() {
      let fromYear = this.$options.filters.format_Date_yyyy(last(this.launchesList).date);
      const toYear = this.$options.filters.format_Date_yyyy(first(this.launchesList).date);
      if (!this.isCompletedLaunches) {
        fromYear = 2006;
      }
      return range(parseInt(fromYear, 10), parseInt(toYear, 10) + 1);
    },

    /**
     * filter launch list by rocket, year and success true
     */
    filterLaunchByRocketAndYearAndSuccess(yearRangeArray, rocketName) {
      return (yearRangeArray)
        .map((year) => (this.launchesList)
          .filter((launch) => Number(
            this.$options.filters.format_Date_yyyy(launch.date),
          ) === year
                && launch.rocket.name === rocketName
                 && launch.success).length);
    },

    /**
     * Get all Upcoming Launches by year
     */
    filterUpcomingLaunchesByYear(yearRangeArray, rocketName) {
      console.log(' **** yearRangeArrayyearRangeArrayyearRangeArray : ', yearRangeArray);
      return (yearRangeArray)
        .map((year) => (this.launchesList)
          .filter((launch) => Number(
            this.$options.filters.format_Date_yyyy(launch.date),
          ) === year && launch.rocket.name === rocketName).length);
    },

    /**
     * Get all Upcoming Launches by year
     */
    filterLaunchesFailureByYear(yearRangeArray) {
      console.log(' **** yearRangeArrayyearRangeArrayyearRangeArray : ', yearRangeArray);
      return (yearRangeArray)
        .map((year) => (this.launchesList)
          .filter((launch) => Number(
            this.$options.filters.format_Date_yyyy(launch.date),
          ) === year && !launch.success).length);
    },

    prepareChartObject(groupedObject) {
      console.log('*****here i m *******');
      if (!isEmpty(groupedObject)) {
        const charLabelArray = [...Object.keys(groupedObject)];

        const initiChartObject = { labels: charLabelArray };
        const initialChartDataSet = {
          label: this.isCompletedLaunches
            ? 'Past Launches'
            : 'Upcoming Launches',
        };
        const prepareDatasetsObject = {
          ...initialChartDataSet,
          backgroundColor: this.getRandomChartColorArray(charLabelArray.length),
          data: [
            ...Object.values(groupedObject).map((launch) => launch.length),
          ],
        };

        return {
          ...initiChartObject,
          datasets: [prepareDatasetsObject],
        };
      }
      return {};
    },

  },

  computed: {
    calculatePieChartForRocketLaunchesData() {
      if (this.launchesList && this.launchesList.length > 0) {
        const grouped = this.filterObjectByGroupBy('rocket.name');
        return this.prepareChartObject(grouped);
      }
      return {};
    },

    calculateBarChartForLaunchPadsLaunchesData() {
      if (this.launchesList && this.launchesList.length > 0) {
        const grouped = this.filterObjectByGroupBy('launchpad.name');
        return this.prepareChartObject(grouped);
      }
      return {};
    },

    calculateBarChartForLaunchesPerYearData() {
      if (this.launchesList && this.launchesList.length > 0) {
        return this.filterLaunchesByYear();
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

    calculateBarChartForLaunchPadsLaunchesData() {
      this.isChartDataLoaded = true;
    },

    calculateBarChartForLaunchesPerYearData() {
      this.isChartDataLoaded = true;
    },

  },
};
</script>
<style scoped>

.aligGraph{
  margin-top: -40px;
}
</style>
