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
        '#CDDC39',
        '#64FFDA',
        '#FB8C00',
        '#0091EA',
        '#5E35B1',
        '#FFD54F',
        '#FFD600',
        '#0288D1',
        '#FFEA00',
        '#E65100',
        '#FF6F00',
        '#283593',
        '#C51162',
        '#E53935',
        '#8E24AA',
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
          })));
        this.isChartDataLoaded = true;
      }
      console.log('****** launchesList Transformed **** : ', this.launchesList);
      this.setUnLoadingRequest();
    },
  },

};
</script>
