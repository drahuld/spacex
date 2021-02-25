<script>
import { isEmpty, random } from 'lodash';
import { mapActions } from 'vuex';

export default {

  data() {
    return {
      isChartDataLoaded: false,
      isCompletedLaunches: true,
      scrollPaginationCurrentCounter: 1,
      launchesList: [],
      randomColorArray: [
        'teal lighten-1',
        'purple lighten-2',
        'amber lighten-1',
        'cyan lighten-1',
        'red lighten-1',
        'green lighten-1',
        'yellow lighten-1',
        'pink lighten-3',
        'red lighten-4',
        'indigo lighten-2',
        'indigo lighten-1',
        'blue lighten-1',
        'indigo lighten-1',
        'light-blue lighten-1',
        'teal darken-2',
      ],
      randomColorForChart: [
        '#E91E63',
        '#2196F3',
        '#4CAF50',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#03A9F4',
        '#03A9F4',
        '#009688',
        '#8BC34A',
        '#CDDC39',
        '#F44336',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#607D8B',
        '#9E9E9E',
        '#000000',
      ],
    };
  },

  methods: {
    ...mapActions(['setUnLoadingRequest', 'getLaunchesSortedByLaunchDateDesc']),

    getRandormColor(randomColorArray) {
      return randomColorArray[random(randomColorArray.length - 1)];
    },

    async loadAllSpaceXLaunchesSortedByLaunchDateDesc() {
      this.isChartDataLoaded = false;
      const launchesResponse = await this.getLaunchesSortedByLaunchDateDesc(
        {
          isCompletedLaunches: this.isCompletedLaunches,
          paginationCounter: this.scrollPaginationCurrentCounter,
        },
      );

      console.log('******** Existing list size ******* :', this.launchesList);
      console.log('******** launchesResponse ******* :', launchesResponse);
      if (!isEmpty(launchesResponse)) {
        (this.launchesList).push(...launchesResponse
          .map((launch) => ({
            id: launch.id,
            flight_number: launch.flight_number,
            name: launch.name,
            date: launch.date_local,
            upcoming: launch.upcoming,
            success: launch.success,
            links: launch.links,
            details: launch.details,
            color: this.getRandormColor(this.randomColorArray),
            rocket: launch.rocket,
            crew: launch.crew,
            launchpad: launch.launchpad,
          })));
        this.isChartDataLoaded = true;
      }
      console.log('****** launchesList Transformed **** : ', this.launchesList);
      this.setUnLoadingRequest();
    },
  },

};
</script>
