<template>
  <v-card>
    <v-app-bar
      flat
      fixed
      clipped-left
      color="#fcb69f"
      dark
      prominent
      app
      :src="require('@/assets/spacexbanner2.jpeg')"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-toolbar-title style="font-size: 40px">{{ headerProps.name }} Insights</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs color="cyan lighter-4" v-model="tab" align-with-title>
          <v-tabs-slider color="orange"></v-tabs-slider>
          <v-tab
            v-for="item in applicationMeusListProp"
            :key="item.id"
            :to="item.route"
            exact
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
        <v-tab-item
          v-for="item in applicationMeusListProp"
          :key="item.id"
          :value="item.route"
        >
        </v-tab-item>
        <v-flex d-flex flex-row mb-0>
          <v-avatar size="100" mt-6
            ><img
              src="https://upload.wikimedia.org/wikipedia/commons/4/49/Elon_Musk_2015.jpg"
              :alt="headerProps.founder"
            />
          </v-avatar>
          <v-chip outlined x-large pill>
            {{ headerProps.founder }}
          </v-chip>
        </v-flex>
      </template>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  props: {
    headerProps: {
      type: Object,
      required: true,
    },
    applicationMeusListProp: {
      type: Array,
      required: true,
    },
    tabProp: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      tab: null,
      items: [{ title: 'More...' }],
    };
  },

  computed: {},

  watch: {
    tabProp(newProps) {
      console.log('------------ tab props ', newProps);
      this.tab = newProps;
    },
  },
};
</script>
<style scoped></style>
