<template>
   <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" large
                    :color="color"> {{ icon }} </v-icon>
            </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
</template>
<script>
export default {

  props: {

    icon: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    tooltip: {
      type: String,
      required: true,
    },

  },
};
</script>
