<template>
  <v-app id="inspire" app>
    <AppBar
      :tabProp="tab"
      :applicationMeusListProp="applicationMeusList"
      :headerProps="companyInfo.header" />
    <v-main style="margin-top: 200px;" app>
      <v-container
        fluid
        style="align-items: flex-center"
        fill-height
        justify-center>
        <v-row>
          <v-col>
            <transition name="fade">
              <v-card :elevation="24" class="vCardBackgroundCss">
                <v-img
                  height="200px"
                  :src="getComputedPop">
                  <v-app-bar flat color="rgba(0, 0, 0, 0)">
                    <v-toolbar-title class="title white--text pl-0">
                      {{ pageTitle }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-app-bar>
                  <v-card-title class="white--text mt-8">
                    <p class="ml-3" dark></p>
                  </v-card-title>
                </v-img>
                <router-view></router-view>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter :footerProps="companyInfo.footer" />
  </v-app>
</template>

<script>
import AppBar from '@/components/app/AppBar.vue';
import AppFooter from '@/components/app/AppFooter.vue';
import Constants from '@/constants';
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';

export default {

  async mounted() {
    this.loadCompanyInfo();
  },

  components: {
    AppBar,
    AppFooter,
  },

  data() {
    return {
      tab: '/launchpads',
      applicationMeusList: [
        { id: 1, name: Constants.SPACEX_HOME, route: '/home' },
        { id: 2, name: Constants.SPACEX_LAUNCHES, route: '/launches' },
        { id: 3, name: Constants.SPACEX_LAUNCH_PADS, route: '/launchpads' },
        { id: 4, name: Constants.SPACEX_ROCKETS, route: '/rockets' },
        { id: 5, name: Constants.SPACEX_SHIPS, route: '/ships' },
        { id: 6, name: Constants.SPACEX_CAPSULES, route: '/capsules' },
        { id: 7, name: Constants.SPACEX_CREWS, route: '/crews' },
      ],
      companyInfo: {
        header: {
          name: '',
          founder: '',
        },
        footer: {
          name: '',
          summary: '',
          founded: '',
          links: {},
          address: {},
        },
      },
      SPACEX_LAUNCHES_CONSTANTS: Constants.SPACEX_LAUNCHES,
      SPACEX_LAUNCH_PADS_CONSTANTS: Constants.SPACEX_LAUNCH_PADS,
      SPACEX_ROCKETS_CONSTANTS: Constants.SPACEX_ROCKETS,
      SPACEX_SHIPS_CONSTANTS: Constants.SPACEX_SHIPS,
      SPACEX_CAPSULES_CONSTANTS: Constants.SPACEX_CAPSULES,
      SPACEX_CREWS_CONSTANTS: Constants.SPACEX_CREWS,
    };
  },

  computed: {
    ...mapGetters(['pageTitle']),

    getComputedPop() {
      const imageUrl = '';
      console.log('************ getImageForSelectedTab : this.pageTitle ', this.pageTitle);
      switch (this.pageTitle) {
        case this.SPACEX_LAUNCHES_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/launchesTabBanner.jpeg');
        case this.SPACEX_LAUNCH_PADS_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/launchPadTabBanner.jpg');
        case this.SPACEX_ROCKETS_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/rocketTabBanner.jpg');
        case this.SPACEX_SHIPS_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/shipsTabBanner.jpg');
        case this.SPACEX_CAPSULES_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/dragonTabBanner.jpg');
        case this.SPACEX_CREWS_CONSTANTS:
          // eslint-disable-next-line global-require
          return require('@/assets/crewTabBanner.jpg');
        default: break;
      }
      return imageUrl;
    },

  },

  methods: {
    ...mapActions(['getCompanyInfo', 'setUnLoadingRequest']),

    async loadCompanyInfo() {
      const companyInfoResponse = await this.getCompanyInfo();
      console.log('Home Component: Response : ', companyInfoResponse);
      if (!isEmpty(companyInfoResponse)) {
        console.log('Home Component: Response : Not Empty');

        this.companyInfo = {
          header: {
            name: companyInfoResponse.name,
            founder: companyInfoResponse.founder,
          },
          footer: {
            name: companyInfoResponse.name,
            summary: companyInfoResponse.summary,
            founded: companyInfoResponse.founded,
            links: companyInfoResponse.links,
            address: companyInfoResponse.headquarters,
          },
        };
      }
      console.log('Map Object to logical object: ', this.companyInfo);
      this.setUnLoadingRequest();
    },

  },
};
</script>
<style scoped>
.vCardBackgroundCss {
  padding: 25px;
}
</style>
