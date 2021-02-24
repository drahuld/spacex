<template>
  <div>
    <v-carousel v-model="model" v-if="subType === 'ROCKET'">
      <v-carousel-item
        v-for="(item, i) in componentArray"
        :key="i"
        :src="item"
        reverse-transition="fade-transition"
        transition="fade-transition">
      </v-carousel-item>
    </v-carousel>
    <v-carousel v-if="subType === 'CREW'">
      <v-carousel-item
        v-for="crew in componentArray"
        :key="crew.id"
        reverse-transition="fade-transition"
        transition="fade-transition">
        <v-sheet color="black" height="100%">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">CREW</div>
                <v-list-item-title class="headline mb-1">
                  <div>{{ crew.name }}</div>
                  <span style="font-size: 16px"
                    >{{ crew.agency }}
                    <span :class="crew.status ? 'green--text' : 'red--text'">
                      ( {{ crew.status ? "Active" : "Inactive" }} )</span></span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ crew.wikipedia }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar tile size="350">
                <v-img height="100%" :src="crew.image"></v-img>
              </v-list-item-avatar>
            </v-list-item>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  props: {
    subType: {
      type: String,
      required: true,
    },

    componentArray: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      model: 0,
    };
  },
};
</script>
