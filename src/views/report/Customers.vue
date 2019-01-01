<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import {getCustomersList} from '@/api/customers.js'
import "echarts/theme/macarons.js";
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: "CustomersChart",
  props: [""],
  data() {
    return {
      cusInfo: []
    };
  },

  components: {},

  computed: {
    month() {
      let month = [];
      let i = 0;
      while (i <= 6) {
        month.push(this.calcMonthsAgo(i++));
      }
      return month.reverse();
    },
    vipCount() {
      let vipCount = [];
      let i = 0;
      while (i <= 6) {
        let count = 0;
        this.cusInfo.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == this.calcMonthsAgo(i)) {
            vipCount[i] = ++count;
          } else {
            vipCount[i] = count;
          }
        });
        i++;
      }
      return vipCount.reverse();
    }
  },

  watch: {},

  beforeMount() {
    
  },

  mounted() {
    getCustomersList().then(res=>{
      this.cusInfo = res.result;
      this.drawChart();
    }).catch();
  },

  methods: {
    calcMonthsAgo(number) {
      let now = this.$moment().format("YYYY-MM");
      return this.$moment()
        .subtract(number, "M")
        .format("YYYY-MM");
    },
    drawChart() {
      const chartData = {
        title: {
          text: "半年新会员统计",
          textStyle: {
            color: "#1890ff"
          }
        },
        tooltip: {},
        legend: {
          data: ["新会员数量"]
        },
        xAxis: {
          type: "category",
          data: this.month
        },
        yAxis: {},
        series: [
          {
            name: "新会员数量",
            type: "line",
            smooth: true,
            data: this.vipCount
          }
        ]
      };
      let myChart = echarts.init(
        document.getElementById("myChart"),
        "macarons"
      );
      myChart.setOption(chartData);
    }
  }
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 400px;
}
</style>
