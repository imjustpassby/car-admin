<template>
  <div id="myChart"></div>
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
    getPurchasePay()
      .then(res => {
        this.purchaseData = res.result;
      })
      .catch();
    getMonthlyPay()
      .then(res => {
        this.payData = res.result;
      })
      .catch();
    getOrderList()
      .then(res => {
        this.orderData = res.result;
        this.drawChart();
      })
      .catch();
  },

  methods: {
    drawChart() {
      const chartData = {
        title: {
          text: "收支情况",
          textStyle: {
            color: "#1890ff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : ¥{c} "
        },
        legend: {
          data: ["采购支出", "每月支出", "订单收入", "每月利润"]
        },
        xAxis: {
          type: "category",
          data: this.months
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "采购支出",
            type: "line",
            smooth: true,
            data: this.monthlyPurchaseTotal
          },
          {
            name: "每月支出",
            type: "line",
            smooth: true,
            data: this.monthlyPayTotal
          },
          {
            name: "订单收入",
            type: "line",
            smooth: true,
            data: this.monthlyOrderTotal
          },
          {
            name: "每月利润",
            type: "line",
            smooth: true,
            data: this.monthlyProfitTotal
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
