<template>
  <div class="flex-box">
    <div id="myChart1"></div>
    <div id="myChart2"></div>
    <div id="myChart3"></div>
    <div id="myChart4"></div>
  </div>
</template>

<script>
import "echarts/theme/macarons.js";
import { getOrderList } from "@/api/order.js";
import { getMonthlyPay } from "@/api/monthlyPay.js";
import { getPurchasePay } from "@/api/purchasePay.js";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "FinanceChart",
  props: [""],
  data() {
    return {
      purchaseData: [],
      payData: [],
      orderData: []
    };
  },

  components: {},

  computed: {
    months() {
      let months = [];
      this.orderData.forEach(item => {
        let dateFmt = this.$moment(item.date).format("YYYY-MM");
        if (!months.includes(dateFmt)) {
          months.push(dateFmt);
        }
      });
      return months;
    },
    monthlyPurchaseTotal() {
      let monthlyPurchaseTotal = [];
      let months = this.months;
      for (let i = 0; i < months.length; i++) {
        let money = 0;
        this.purchaseData.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == months[i]) {
            money += parseFloat(item.totalPay);
          }
        });
        monthlyPurchaseTotal.push(money.toFixed(2));
      }
      return monthlyPurchaseTotal;
    },
    monthlyPayTotal() {
      let monthlyPayTotal = [];
      let months = this.months;
      for (let i = 0; i < months.length; i++) {
        let money = 0;
        this.payData.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == months[i]) {
            money += parseFloat(item.totalPay);
          }
        });
        monthlyPayTotal.push(money.toFixed(2));
      }
      return monthlyPayTotal;
    },
    monthlyOrderTotal() {
      let monthlyOrderTotal = [];
      let months = this.months;
      for (let i = 0; i < months.length; i++) {
        let money = 0;
        this.orderData.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == months[i]) {
            if (item.orderType != "会员消费")
              money += parseFloat(item.totalPrice);
          }
        });
        monthlyOrderTotal.push(money.toFixed(2));
      }
      return monthlyOrderTotal;
    },
    monthlyProfitTotal() {
      let monthlyProfitTotal = [];
      for (let i = 0; i < this.months.length; i++) {
        let money = 0;
        money =
          parseFloat(
            this.monthlyOrderTotal[i] ? this.monthlyOrderTotal[i] : 0
          ) -
          parseFloat(
            this.monthlyPurchaseTotal[i] ? this.monthlyPurchaseTotal[i] : 0
          ) -
          parseFloat(this.monthlyPayTotal[i] ? this.monthlyPayTotal[i] : 0);
        monthlyProfitTotal.push(money.toFixed(2));
      }
      return monthlyProfitTotal;
    }
  },

  watch: {},

  mounted() {
    this.init();
  },

  methods: {
    init() {
      getPurchasePay()
        .then(res => {
          this.purchaseData = res.result;
          getMonthlyPay().then(res => {
            this.payData = res.result;
            getOrderList().then(res => {
              this.orderData = res.result;
              this.drawChart();
            });
          });
        })
        .catch();
    },
    drawChart() {
      const chartData1 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a} <br/>{b} : ¥{c} "
        },
        legend: {
          data: ["每月利润"],
          textStyle: {
            color: "#14c8d4",
            fontSize: 16
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          },
          data: this.months
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#14c8d4"
              }
            },
            type: "value"
          }
        ],
        series: [
          {
            name: "每月利润",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E1C0DB" }
                ])
              }
            },
            data: this.monthlyProfitTotal
          },
          {
            name: "每月利润",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D2A9B0" },
                  { offset: 0.5, color: "#E1C0DB" },
                  { offset: 1, color: "#F1CFE5" }
                ])
              }
            },
            data: this.monthlyProfitTotal
          }
        ]
      };
      const chartData2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a} <br/>{b} : ¥{c} "
        },
        legend: {
          data: ["订单收入"],
          textStyle: {
            color: "#14c8d4",
            fontSize: 16
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          },
          data: this.months
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#14c8d4"
              }
            },
            type: "value"
          }
        ],
        series: [
          {
            name: "订单收入",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E1C0DB" }
                ])
              }
            },
            data: this.monthlyOrderTotal
          },
          {
            name: "订单收入",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D2A9B0" },
                  { offset: 0.5, color: "#E1C0DB" },
                  { offset: 1, color: "#F1CFE5" }
                ])
              }
            },
            data: this.monthlyOrderTotal
          }
        ]
      };
      const chartData3 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a} <br/>{b} : ¥{c} "
        },
        legend: {
          data: ["每月支出"],
          textStyle: {
            color: "#FCAF67",
            fontSize: 16
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          },
          data: this.months
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#14c8d4"
              }
            },
            type: "value"
          }
        ],
        series: [
          {
            name: "每月支出",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCAF67" }
                ])
              }
            },
            data: this.monthlyPayTotal
          },
          {
            name: "每月支出",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCAF67" }
                ])
              }
            },
            data: this.monthlyPayTotal
          }
        ]
      };
      const chartData4 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a} <br/>{b} : ¥{c} "
        },
        legend: {
          data: ["采购支出"],
          textStyle: {
            color: "#FCAF67",
            fontSize: 16
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#14c8d4"
            }
          },
          data: this.months
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#14c8d4"
              }
            },
            type: "value"
          }
        ],
        series: [
          {
            name: "采购支出",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCAF67" }
                ])
              }
            },
            data: this.monthlyPurchaseTotal
          },
          {
            name: "采购支出",
            type: "bar",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCAF67" }
                ])
              }
            },
            data: this.monthlyPurchaseTotal
          }
        ]
      };

      let myChart1 = echarts.init(
        document.getElementById("myChart1"),
        "macarons"
      );
      myChart1.setOption(chartData1);

      let myChart2 = echarts.init(
        document.getElementById("myChart2"),
        "macarons"
      );
      myChart2.setOption(chartData2);

      let myChart3 = echarts.init(
        document.getElementById("myChart3"),
        "macarons"
      );
      myChart3.setOption(chartData3);

      let myChart4 = echarts.init(
        document.getElementById("myChart4"),
        "macarons"
      );
      myChart4.setOption(chartData4);
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  div {
    width: 49%;
    height: 350px;
  }
}
</style>
