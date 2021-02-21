<template>
  <div>
    <v-item-group>
      <v-item v-for="button in mapPropsToIconObject" :key="button.iconId">
        <v-btn class="mx-2 white--text" icon :href="button.iconLink" target="_blank">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon medium v-bind="attrs" v-on="on" color="white">{{
                button.iconName
              }}</v-icon>
            </template>
            <span>{{ button.iconToolTip }}</span>
          </v-tooltip>
        </v-btn>
      </v-item>
    </v-item-group>
  </div>
</template>
<script>
export default {
  props: {
    links: {
      type: Object,
      required: true,
    },
  },

  computed: {
    mapPropsToIconObject() {
      const buttonArray = [];
      const {
        patch,
        reddit,
        flickr,
        // eslint-disable-next-line camelcase
        youtube_id,
        ...others
      } = this.links;
      let counter = 1;
      Object.entries(others).forEach((key) => {
        buttonArray.push({
          icond: counter += 1,
          iconName: this.getIconFromType(key[0]),
          iconLink: key[1],
          iconToolTip: key[0],
        });
      });
      console.log('***** tesssss : ', others);
      return buttonArray;
    },
  },

  methods: {
    getIconFromType(name) {
      console.log('******** getIconFromType :', name);
      let iconName = '';
      switch (name) {
        case 'presskit':
          iconName = 'mdi-newspaper';
          break;
        case 'webcast':
          iconName = 'mdi-youtube';
          break;
        case 'article':
          iconName = 'mdi-note';
          break;
        case 'wikipedia':
          iconName = 'mdi-wikipedia';
          break;
        default:
          break;
      }
      return iconName;
    },
  },
};
</script>
