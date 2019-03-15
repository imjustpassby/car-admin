<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import "echarts/theme/macarons.js";
import { getMonthlyPay } from "@/api/monthlyPay.js";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

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
        month.push(this.$moment(item.date).format("YYYY-MM"));
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
        monthlySalary.push(money);
      }
      return monthlySalary;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    getMonthlyPay()
      .then(res => {
        this.payData = res.result;
        this.drawChart();
      })
      .catch();
  },

  methods: {
    drawChart() {
      const chartData = {
        title: {
          text: "每月工资统计",
          textStyle: {
            color: "#1e1e1e"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a} <br/>{b} : ¥{c}"
        },
        legend: {
          data: ["每月工资支出"]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#1e1e1e"
            }
          },
          axisLabel:{
            fontSize: 14
          },
          data: this.month
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#1e1e1e"
            }
          }
        },
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 50,
            end: 100,
            handleSize: "90%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle:{
              color: "#1E1E1E"
            },
            bottom: 8
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "每月工资支出",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#14c8d4" },
                  { offset: 1, color: "#43eec6" }
                ])
              }
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
  height: 500px;
}
</style>
