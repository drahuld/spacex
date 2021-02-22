<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-row>
      <v-col cols="12" md="9"> </v-col>
      <v-col cols="12" md="3">
        <v-switch
          left
          v-model="isCompletedLaunches"
          inset
          :label="isCompletedLaunches ? 'Completed Launches' : 'Upcoming Launches'"
        ></v-switch>
      </v-col>
    </v-row>
    <v-item-group>
    <v-item
      v-for="(completedLaunchItem, index) in switchToSelectedLaunchesList"
      :key="completedLaunchItem.id">
      <v-timeline-item
        :color="completedLaunchItem.color"
        fill-dot
        :left="findEvenOdd(index)"
        :right="!findEvenOdd(index)"
        :small="!findEvenOdd(index)">
        <v-card>
          <v-card-title :class="completedLaunchItem.color">
            <v-layout column>
              <v-row>
                <v-col cols="12" md="12">
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="3">
                      <v-avatar size="100" align-self-center>
                        <img
                          v-if="!isEmpty(completedLaunchItem.links.patch.large)"
                          :src="completedLaunchItem.links.patch.large"
                          :alt="completedLaunchItem.name"/>
                        <img
                          v-if="isEmpty(completedLaunchItem.links.patch.large)"
                          :src="require('@/assets/launchImageNotAvailable.png')"
                          :alt="completedLaunchItem.name"/>
                      </v-avatar>
                    </v-col>
                    <v-col align="left" justify="center">
                      <h2 class="white--text font-weight-light">
                        {{ completedLaunchItem.name }}
                      </h2>
                    </v-col>
                    <v-col cols="12" md="2" v-if="isCompletedLaunches">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            v-if="completedLaunchItem.success"
                            x-large
                            color="green"
                            >mdi-thumb-up</v-icon>
                          <v-icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            v-if="!completedLaunchItem.success"
                            x-large
                            color="red"
                            >mdi-thumb-down</v-icon>
                        </template>
                        <span v-if="completedLaunchItem.success">Mission Successful</span>
                        <span v-if="!completedLaunchItem.success">Mission Failed</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="4"
                class="white--text font-weight-light">
                  {{ completedLaunchItem.date | formatDate }}
                </v-col>
                <v-col cols="12" md="8">
                    <ButtonList :links="completedLaunchItem.links" />
                </v-col>
              </v-row>
            </v-layout>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">
                {{
                  completedLaunchItem.details
                    ? completedLaunchItem.details
                    : "Details are not yet available."
                }}
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="2">
                <v-icon size="64"> mdi-calendar-text </v-icon>
              </v-col>
               <v-col cols="12" md="12" v-if="isObjectNotEmpty(completedLaunchItem.rocket)">
                  <ExpandGrid subType="ROCKET" :data="completedLaunchItem.rocket" />
               </v-col>
               <v-col cols="12" md="12" v-if="isArrayNotEmpty(completedLaunchItem.crew)">
                  <ExpandGrid subType="CREW" :data="completedLaunchItem.crew" />
               </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-item>
    </v-item-group>
  </v-timeline>
</template>
<script>
import { mapActions } from 'vuex';
import Constants from '@/constants';
import { isEmpty, random } from 'lodash';
import ButtonList from '@/components/common/ButtonList.vue';
import ExpandGrid from '@/components/common/ExpandGrid.vue';

export default {

  async mounted() {
    this.setLaunchesAsPageTitle();
    this.loadAllSpaceXLaunchesSortedByLaunchDateDesc();
  },

  components: {
    ButtonList,
    ExpandGrid,
  },

  data() {
    return {
      isCompletedLaunches: true,
      upComingLaunchesList: [],
      completedLaunchesList: [],
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
      SPACEX_LAUNCHES_CONSTANTS: Constants.SPACEX_LAUNCHES,
    };
  },

  computed: {

    switchToSelectedLaunchesList() {
      return this.isCompletedLaunches ? this.completedLaunchesList : this.upComingLaunchesList;
    },
  },

  methods: {
    ...mapActions(['setPageTitle', 'setUnLoadingRequest', 'getLaunchesSortedByLaunchDateDesc']),

    findEvenOdd(index) {
      return index % 2 === 0;
    },

    setLaunchesAsPageTitle() {
      this.setPageTitle(this.SPACEX_LAUNCHES_CONSTANTS);
    },

    getRandormColor() {
      return this.randomColorArray[random(this.randomColorArray.length - 1)];
    },

    isEmpty(details) {
      return isEmpty(details);
    },

    async loadAllSpaceXLaunchesSortedByLaunchDateDesc() {
      const launchesResponse = await this.getLaunchesSortedByLaunchDateDesc();
      // console.log('******** launchesResponse ******* :', launchesResponse);
      if (!isEmpty(launchesResponse)) {
        this.completedLaunchesList = launchesResponse
          .filter((launch) => !launch.upcoming)
          .map((launch) => ({
            id: launch.id,
            flight_number: launch.flight_number,
            name: launch.name,
            date: launch.date_local,
            upcoming: launch.upcoming,
            success: launch.success,
            links: launch.links,
            details: launch.details,
            color: this.getRandormColor(),
            rocket: launch.rocket,
            crew: launch.crew,
          }));

        this.upComingLaunchesList = launchesResponse
          .filter((launch) => launch.upcoming)
          .map((launch) => ({
            id: launch.id,
            flight_number: launch.flight_number,
            name: launch.name,
            date: launch.date_local,
            upcoming: launch.upcoming,
            success: launch.success,
            links: launch.links,
            details: launch.details,
            rocket: launch.rocket,
            crew: launch.crew,
            color: this.getRandormColor(),
          }));
      }
      console.log('****** completedLaunchesList Transformed **** : ', this.completedLaunchesList);
      console.log('****** upComingLaunchesList Transformed **** : ', this.upComingLaunchesList);
      this.setUnLoadingRequest();
    },
  },
};
</script>
