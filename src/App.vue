<template>
  <div id="app">
    <!-- Progressbar Component START -->
    <v-overlay :value="loader" z-index="9999">
      <v-progress-circular :size="100" :width="10" color="#ffea00" indeterminate>
      </v-progress-circular>
    </v-overlay>
    <v-app>
      <Home />
    </v-app>
  </div>
</template>
<script>
import Home from '@/components/Home.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Home,
  },

  computed: {
    ...mapGetters(['loader']),
  },

};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
