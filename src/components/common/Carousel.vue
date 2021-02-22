<template>
     <v-carousel>
      <v-carousel-item
        v-for="(item,i) in componentImageArray"
        :key="i"
        :src="item"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
</template>
<script>
export default {

  props: {

    componentImageArray: {
      type: Array,
      required: true,
    },
  },

};
</script>
