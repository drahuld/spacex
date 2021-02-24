<script>

import { Pie } from 'vue-chartjs';

export default {

  mixins: [Pie],

  props: {

    chartData: {
      type: Object,
      required: true,
    },

  },

  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  mounted() {
    console.log('************* Bar char here ?', this.chartData);
    this.renderChart(this.chartData, this.options);
  },

  watch: {

    chartData(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.renderChart(this.chartData, this.options);
    },
  },

};

</script>
