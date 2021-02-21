<template>
  <v-footer padless class="backgroundCss">
    <v-card style="min-width: 100%;" padless class="backgroundCss">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon.id" class="mx-4 white--text"
        icon :href="icon.link" target="_blank">
         <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" :color="iconColor" dark>{{ icon.name }}</v-icon>
            </template>
        <span>{{ icon.toolTip }}</span>
      </v-tooltip>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0"
      style="max-width: 60%; margin: 0 auto">{{ footerProps.summary }}</v-card-text>
      <v-card-text class="white--text pt-0">
         <v-icon :color="iconColor">mdi-at</v-icon>{{ footerProps.address.address }},
        {{ footerProps.address.city }}, {{ footerProps.address.state }}
        </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }}
        <v-icon small :color="iconColor">mdi-at</v-icon> <strong>{{ footerProps.name }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {

  props: {
    footerProps: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      iconColor: 'white',
      icons: [
        {
          id: 1, name: 'mdi-web', link: this.footerProps.links.website, toolTip: 'SpaceX Website',
        },
        {
          id: 2, name: 'mdi-flickr', link: this.footerProps.links.flickr, toolTip: 'SpaceX flickr',
        },
        {
          id: 3, name: 'mdi-twitter', link: this.footerProps.links.twitter, toolTip: 'SpaceX twitter',
        },
        {
          id: 4, name: 'mdi-twitter', link: this.footerProps.links.elon_twitter, toolTip: 'Elonmusk twitter',
        },
      ],
    };
  },
  computed: {},
};
</script>
<style scoped>

.backgroundCss {
  background: rgb(19,84,122);
  background: linear-gradient(90deg, rgba(19,84,122,1) 0%, rgba(128,208,199,1) 100%);
}

</style>
