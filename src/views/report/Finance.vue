<template>
  <div id="myChart"></div>
</template>

<script>
import "echarts/theme/roma.js";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "ReportFinance",
  props: [""],
  data() {
    return {
      purchaseData: [
        {
          date: "2018-09-01",
          fittingsPay: [
            { item: "xxx", cost: 300 },
            { item: "xxx", cost: 400, key: 1545892360424 },
            { item: "xxx", cost: 200, key: 1545892403887 }
          ],
          fittingsPayTotal: 900,
          otherPay: [
            { item: "xxx", cost: 500 },
            { item: "xxx", cost: 100, key: 1545892409648 }
          ],
          otherPayTotal: 600,
          totalPay: 1500
        },
        {
          date: "2018-10-01",
          fittingsPay: [
            { item: "xxx", cost: 300 },
            { item: "xxx", cost: 400, key: 1545892360424 }
          ],
          fittingsPayTotal: 700,
          otherPay: [{ item: "xxx", cost: 500 }],
          otherPayTotal: 500,
          totalPay: 5000
        },
        {
          date: "2018-11-01",
          fittingsPay: [
            {
              item: "11月采购费",
              cost: 2000
            }
          ],
          fittingsPayTotal: 2000,
          otherPay: [
            {
              item: "清洗液",
              cost: 222
            },
            {
              item: "工具",
              cost: 330,
              key: 1545642934514
            }
          ],
          otherPayTotal: 552,
          totalPay: 3000
        }
      ],
      payData: [
        {
          date: "2018-09-05",
          basePay: [
            {
              item: "日常开销",
              cost: 2300
            },
            {
              item: "清洗用具",
              cost: 400,
              key: 1545641252908
            }
          ],
          basePayTotal: 2700,
          salaryPay: [
            {
              item: "王小虎1",
              cost: 4000
            },
            {
              item: "王小虎2",
              cost: 5500,
              key: 1545641286663
            }
          ],
          salaryPayTotal: 9500,
          otherPay: [
            {
              item: "保险费",
              cost: 1300
            },
            {
              item: "缴税",
              cost: 800,
              key: 1545641988237
            }
          ],
          otherPayTotal: 2100,
          totalPay: 12000
        },
        {
          date: "2018-10-05",
          basePay: [
            {
              item: "日常开销",
              cost: 2300
            },
            {
              item: "清洗用具",
              cost: 400,
              key: 1545641252908
            }
          ],
          basePayTotal: 2700,
          salaryPay: [
            {
              item: "王小虎1",
              cost: 4000
            },
            {
              item: "王小虎2",
              cost: 3800,
              key: 1545641286663
            }
          ],
          salaryPayTotal: 7800,
          otherPay: [
            {
              item: "保险费",
              cost: 1300
            },
            {
              item: "缴税",
              cost: 800,
              key: 1545641988237
            }
          ],
          otherPayTotal: 2100,
          totalPay: 13000
        },
        {
          date: "2018-11-05",
          basePay: [
            {
              item: "日常开销",
              cost: 2300
            },
            {
              item: "清洗用具",
              cost: 400,
              key: 1545641252908
            }
          ],
          basePayTotal: 2700,
          salaryPay: [
            {
              item: "王小虎1",
              cost: 4000
            },
            {
              item: "王小虎2",
              cost: 3500,
              key: 1545641286663
            }
          ],
          salaryPayTotal: 7500,
          otherPay: [
            {
              item: "保险费",
              cost: 1300
            },
            {
              item: "缴税",
              cost: 800,
              key: 1545641988237
            }
          ],
          otherPayTotal: 2100,
          totalPay: 14000
        }
      ],
      orderData: [
        //9月
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "xxx",
              brand: "xxx",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-09-01",
          services: ["汽车美容", "汽车维修"],
          content: [
            {
              item: "美容费",
              cost: 50,
              key: 1545468633009
            },
            {
              item: "维修费",
              cost: 500,
              key: 1545829913036
            }
          ],
          fittings: [
            {
              name: "米其林轮胎19寸",
              sellPrice: "200",
              count: 4,
              total: 800
            },
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            }
          ],
          totalPrice: 22380
        },
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "xxx",
              brand: "xxx",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-09-19",
          services: ["汽车美容", "汽车维修"],
          content: [
            {
              item: "美容费",
              cost: 50,
              key: 1545468633009
            },
            {
              item: "维修费",
              cost: 500,
              key: 1545829913036
            }
          ],
          fittings: [
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 1,
              total: 1200
            }
          ],
          totalPrice: 2638
        },
        {
          orderType: "会员消费",
          cusInfo: [
            {
              name: "胡凯莉5",
              phone: "13313313355",
              plate: "粤R99991",
              brand: "保时捷",
              date: "2018-07-07",
              balance: "10000",
              point: "666"
            }
          ],
          date: "2018-09-18",
          services: ["汽车维修", "配件购买"],
          content: [
            {
              item: "xxxx",
              cost: 300,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 1,
              total: 1200
            }
          ],
          totalPrice: 8268.6
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-09-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 5000
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-09-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 2000
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-09-27",
              balance: 700
            }
          ],
          date: "2018-09-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 700
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-09-27",
              balance: 1000
            }
          ],
          date: "2018-09-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 12000
        },
        //10月
        {
          orderType: "会员消费",
          cusInfo: [
            {
              name: "胡凯莉5",
              phone: "13313313355",
              plate: "粤R99991",
              brand: "保时捷",
              date: "2018-07-07",
              balance: "10000",
              point: "666"
            }
          ],
          date: "2018-10-15",
          services: ["汽车维修", "配件购买"],
          content: [
            {
              item: "xxx",
              cost: 300,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "导航仪",
              sellPrice: "800",
              count: 2,
              total: 1600
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 1,
              total: 1200
            }
          ],
          totalPrice: 5945
        },
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "xxx",
              brand: "xxx",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-10-19",
          services: ["汽车美容", "汽车维修"],
          content: [
            {
              item: "美容费",
              cost: 50,
              key: 1545468633009
            },
            {
              item: "维修费",
              cost: 500,
              key: 1545829913036
            }
          ],
          fittings: [
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 2,
              total: 2400
            }
          ],
          totalPrice: 3838
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-10-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 2000
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-10-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 3000
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-10-27",
              balance: 500
            }
          ],
          date: "2018-10-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 500
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-10-27",
              balance: 800
            }
          ],
          date: "2018-10-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 800
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-10-27",
              balance: 1000
            }
          ],
          date: "2018-10-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 20000
        },
        //11月
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "xxx",
              brand: "xxx",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-11-21",
          services: ["汽车美容", "汽车维修"],
          content: [
            {
              item: "美容费",
              cost: 930,
              key: 1545468633009
            },
            {
              item: "维修费",
              cost: 500,
              key: 1545829913036
            }
          ],
          fittings: [
            {
              name: "导航仪",
              sellPrice: "888",
              count: 2,
              total: 1776
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 1,
              total: 1200
            }
          ],
          totalPrice: 7406
        },
        {
          orderType: "会员消费",
          cusInfo: [
            {
              name: "胡凯莉5",
              phone: "13313313355",
              plate: "粤R99991",
              brand: "保时捷",
              date: "2018-07-07",
              balance: "10000",
              point: "666"
            }
          ],
          date: "2018-11-27",
          services: ["汽车维修", "配件购买"],
          content: [
            {
              item: "xxx",
              cost: 300,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 1,
              total: 1200
            }
          ],
          totalPrice: 4425
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-11-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 5000
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-11-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 1200
        },
        {
          orderType: "会员充值",
          cusInfo: [
            {
              name: "胡凯莉4",
              phone: "13313313344",
              plate: "粤D44444",
              brand: "宝骏",
              date: "2018-07-07",
              balance: "500",
              point: "444"
            }
          ],
          date: "2018-11-18",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 1000
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-11-27",
              balance: 700
            }
          ],
          date: "2018-11-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 6000
        },
        {
          orderType: "新会员加入",
          cusInfo: [
            {
              name: "秀秀秀",
              phone: "13313313312",
              plate: "xxxxx",
              brand: "xxxxx",
              date: "2018-11-27",
              balance: 700
            }
          ],
          date: "2018-11-27",
          services: [],
          content: [],
          fittings: [],
          totalPrice: 13000
        }
      ]
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
      let myChart = echarts.init(document.getElementById("myChart"), "roma");
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
