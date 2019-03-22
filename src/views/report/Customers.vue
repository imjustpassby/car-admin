<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import { getCustomersList } from "@/api/customers.js";
import "echarts/theme/macarons.js";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
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
      while (i <= 12) {
        month.push(this.calcMonthsAgo(i++));
      }
      return month.reverse();
    },
    vipCount() {
      let vipCount = [];
      let i = 0;
      while (i <= 12) {
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

  beforeMount() {},

  mounted() {
    getCustomersList()
      .then(res => {
        this.cusInfo = res.result;
        this.drawChart();
      })
      .catch();
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
        backgroundColor: "#fbffff",
        title: {
          text: "近一年新会员统计",
          textStyle: {
            color: "#57617B",
            fontSize: 24
          }
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["新会员数量"],
          textStyle: {
            fontSize: 16,
            color: '#57617B'
          }
        },
        xAxis: {
          type: "category",
          data: this.month,
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          }
        },
        series: [
          {
            name: "新会员数量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 136, 212, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 136, 212, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            data: this.vipCount
          },
          {
            name: "新会员数量",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(20,200,212,0.5)" },
                  { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                  { offset: 1, color: "rgba(20,200,212,0)" }
                ])
              }
            },
            z: -12,
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
  height: 500px;
}
</style>
