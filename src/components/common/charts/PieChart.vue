<script>

import { Pie } from 'vue-chartjs';

export default {

  extends: Pie,

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
    chartData(newValue) {
      this.renderChart(newValue, this.options);
    },
  },

};

</script>
