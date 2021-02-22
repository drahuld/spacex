/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import SpaceXService from '@/services/spacex/SpaceXService';

const state = {

};

const getters = {

};

const mutations = {

};

const actions = {

  /**
   * Get SpaceX company data to display on header and footer.
   *
   * @param {*} : commit for store
   */
  async getCompanyInfo({ commit }) {
    console.log('------------ SpaceX Store: Action: getCompanyInfo -----------');
    commit('loadingRequest');
    try {
      console.log('------------ SpaceX Store: Action: getCompanyInfo Start -----------');
      return await SpaceXService.getCompanyInfo();
    } catch (e) {
      commit('unLoadingRequest');
      if (e instanceof Error) {
        console.log('SpaceX-Store: getCompanyInfo : Exception : ', e);
      }
      return {};
    }
  },

  /**
   * Get all launches list from SpaceX sorterd by latest date first.
   *
   * @param {*} : commit for store
   */
  async getLaunchesSortedByLaunchDateDesc({ commit }) {
    console.log('------------ SpaceX Store: Action: getLaunchesSortedByLaunchDateDesc -----------');
    commit('loadingRequest');
    try {
      console.log('------------ SpaceX Store: Action: getLaunchesSortedByLaunchDateDesc Start -----------');
      return await SpaceXService.getLaunchesSortedByLaunchDateDesc();
    } catch (e) {
      commit('unLoadingRequest');
      if (e instanceof Error) {
        console.log('SpaceX-Store: getLaunchesSortedByLaunchDateDesc : Exception : ', e);
      }
      return {};
    }
  },

  /**
   * Get all launches pad list from SpaceX.
   *
   * @param {*} : commit for store
   */
  async getLaunchesPads({ commit }) {
    console.log('------------ SpaceX Store: Action: getLaunchesPads -----------');
    commit('loadingRequest');
    try {
      console.log('------------ SpaceX Store: Action: getLaunchesPads Start -----------');
      return await SpaceXService.getLaunchesPads();
    } catch (e) {
      commit('unLoadingRequest');
      if (e instanceof Error) {
        console.log('SpaceX-Store: getLaunchesPads : Exception : ', e);
      }
      return {};
    }
  },

};

export default {
  state,
  getters,
  mutations,
  actions,
};
