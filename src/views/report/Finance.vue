<template>
  <div id="myChart"></div>
</template>

<script>
import "echarts/theme/macarons.js";
import {getOrderList} from '@/mock/order.js'
import {getMonthlyPay} from '@/mock/monthlyPay.js'
import {getPurchasePay} from '@/mock/purchasePay.js'
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
        monthlyPurchaseTotal.push(money);
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
        monthlyPayTotal.push(money)
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
            money += parseFloat(item.totalPrice);
          }
        });
        monthlyOrderTotal.push(money);
      }
      return monthlyOrderTotal;
    },
    monthlyProfitTotal() {
      let monthlyProfitTotal = [];
      for (let i = 0; i < this.months.length; i++) {
        let money = 0;
        money =
          parseFloat(this.monthlyOrderTotal[i]) -
          parseFloat(this.monthlyPurchaseTotal[i]) -
          parseFloat(this.monthlyPayTotal[i]);
        monthlyProfitTotal.push(money);
      }
      return monthlyProfitTotal;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    this.purchaseData = getPurchasePay();
    this.payData = getMonthlyPay();
    this.orderData = getOrderList();
    this.drawChart();
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
        yAxis: {},
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
      let myChart = echarts.init(document.getElementById("myChart"), "macarons");
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
