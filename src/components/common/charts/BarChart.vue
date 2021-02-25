<script>

import { Bar } from 'vue-chartjs';

export default {

  extends: Bar,

  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true,
          },
        }],
        xAxes: [{
          gridLines: {
            display: true,
          },
        }],
      },
      legend: {
        display: true,
      },
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
