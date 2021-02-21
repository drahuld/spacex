/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import spacex from './modules/spacex/spacex.store';

Vue.use(Vuex);

const state = {
  loader: false,
  pageTitle: '',
  isDarkModeState: '',
};

const getters = {

  loader: () => state.loader,

  pageTitle: () => state.pageTitle,

};

const mutations = {

  loadingRequest(state) {
    state.loader = true;
  },

  unLoadingRequest(state) {
    state.loader = false;
  },

  setPageTitle(state, pageTitle) {
    state.pageTitle = pageTitle;
  },

};

const actions = {

  setPageTitle({ commit }, pageTitle) {
    commit('setPageTitle', pageTitle);
  },

  setUnLoadingRequest({ commit }) {
    commit('unLoadingRequest');
  },

};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    spacex,
  },
});
