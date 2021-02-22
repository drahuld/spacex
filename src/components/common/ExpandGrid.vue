<template>
  <v-card pa-0 ma-0 color="teal darken-3" dark>
    <v-card-actions>
      <v-btn color="white dark-2" text> {{ gridName }} </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <Carousel :componentImageArray="fetchComponentImagesArray" />
        <v-card>
          <v-card-title
            >{{ data.name }}
            <ToolTip
              :color="data.active ? 'green' : 'gray'"
              icon="mdi-rocket"
              :tooltip="data.active ? 'Status is active' : 'Status is inactive'"
            />
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-left">
                <div class="overline mb-4 font-weight-bold">{{ data.name }} Details:</div>
                <v-row width="100%" v-for="(data) in convertObjectIntoArray"
                    :key="data.key">
                  <v-col cols="12" md="4" class="font-weight-bold" >
                      {{ data.key | toUppercase }}
                  </v-col>
                  <v-col cols="12" md="8">
                      {{ JSON.stringify(data.value)  }}
                  </v-col>
                </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Carousel from '@/components/common/Carousel.vue';
import ToolTip from '@/components/common/ToolTip.vue';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    gridName: {
      type: String,
      required: true,
    },
  },

  components: {
    Carousel,
    ToolTip,
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {

    convertObjectIntoArray() {
      const {
        id, engines,
        // eslint-disable-next-line camelcase
        first_stage, flickr_images, second_stage, ...others
      } = this.data;

      return Object.entries(others).map(([key, value]) => ({ key, value }));
    },

    fetchComponentImagesArray() {
      const { flickr_images: flickrImages = [] } = this.data;
      return flickrImages;
    },
  },
};
</script>
