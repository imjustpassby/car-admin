<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import "echarts/theme/macarons.js";
import {getMonthlyPay} from '@/api/monthlyPay.js'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: "SalaryChart",
  props: [""],
  data() {
    return {
      payData: []
    };
  },

  components: {},

  computed: {
    month() {
      let month = [];
      this.payData.forEach(item => {
        month.push(this.$moment(item.date).format('YYYY-MM'));
      });
      return month.sort();
    },
    monthlySalary() {
      let monthlySalary = [];
      let months = this.month;
      for (let i = 0; i < months.length; i++) {
        let money = 0;
        this.payData.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == months[i]) {
            money += parseFloat(item.salaryPayTotal);
          }
        });
        monthlySalary.push(money)
      }
      return monthlySalary;

    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    getMonthlyPay().then(res=>{
      this.payData = res.result;
      this.drawChart();
    }).catch();
  },

  methods: {
    drawChart() {
      const chartData = {
        title: {
          text: "每月工资统计",
          textStyle: {
            color: '#1890ff'
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : ¥{c}"
        },
        legend: {
          data: ["工资支出"]
        },
        xAxis: {
          type: "category",
          data: this.month
        },
        yAxis: {
        },
        series: [
          {
            name: "工资支出",
            type: "line",
            smooth: true,
            lineStyle:{
              color: "#1890ff"
            },
            data: this.monthlySalary
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
