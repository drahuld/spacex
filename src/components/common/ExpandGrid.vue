<template>
  <v-card pa-0 ma-0 color="teal darken-3" dark>
    <v-card-actions>
      <v-btn color="white dark-2" text> {{ subType }} </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <Carousel :subType="subType" :componentArray="fetchComponentImagesArray" />
        <v-card v-if="subType === this.ROCKET">
          <v-card-title>{{ data.name }}
            <ToolTip
              :color="data.active ? 'green' : 'gray'"
              :icon="getIconBySubType"
              :tooltip="data.active ? 'Status is active' : 'Status is inactive'"/>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-left">
            <div class="overline mb-4 font-weight-bold">
              {{ data.name }} Details:
            </div>
            <div>
              <v-row
                width="100%"
                v-for="details in convertObjectIntoArray"
                :key="details.key">
                <v-col cols="12" md="4" class="font-weight-bold">
                  {{ details.key | toUppercase }}
                </v-col>
                <v-col cols="12" md="8">
                  {{ details.value }}
                </v-col>
              </v-row>
            </div>
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
    subType: {
      type: String,
      required: true,
    },

    data: {
      type: [Object, Array],
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
      CREW: 'CREW',
      ROCKET: 'ROCKET',
    };
  },

  computed: {
    convertObjectIntoArray() {
      const {
        id,
        engines,
        first_stage: firstStage,
        payload_weights: payloadWeights,
        flickr_images: flickrImg,
        second_stage: secoStage,
        ...others
      } = this.data;
      return Object.entries(others).map(([key, value]) => ({ key, value }));
    },

    getIconBySubType() {
      switch (this.subType) {
        case this.ROCKET:
          return 'mdi-rocket';
        case this.CREW:
          return 'mdi-account-multiple';
        default:
          break;
      }
      return '';
    },

    fetchComponentImagesArray() {
      switch (this.subType) {
        case this.ROCKET: {
          // eslint-disable-next-line no-case-declarations
          const { flickr_images: flickrImages = [] } = this.data;
          return flickrImages;
        }
        case this.CREW:
          console.log('>>>>>>>>>>> ', this.data);
          return this.data;
        default:
          break;
      }
      return [];
    },
  },
};
</script>
