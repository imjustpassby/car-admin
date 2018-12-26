<template>
  <div id="myChart"></div>
</template>

<script>
import "echarts/theme/roma.js";
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: "ReportFinance",
  props: [""],
  data() {
    return {
      purchaseData: [
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
          totalPay: 2552
        },
        {
          date: "2018-12-01",
          fittingsPay: [
            {
              item: "12月采购费",
              cost: 3300
            }
          ],
          fittingsPayTotal: 3300,
          otherPay: [
            {
              item: "清洗液",
              cost: 321
            },
            {
              item: "工具",
              cost: 120,
              key: 1545642934514
            }
          ],
          otherPayTotal: 441,
          totalPay: 3741
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
          totalPay: 12300
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
          totalPay: 12300
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
          totalPay: 12300
        },
        {
          date: "2018-12-05",
          basePay: [
            {
              item: "日常开销",
              cost: 2000
            },
            {
              item: "清洗用具",
              cost: 500,
              key: 1545641252908
            }
          ],
          basePayTotal: 2500,
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
            }
          ],
          otherPayTotal: 1300,
          totalPay: 11300
        }
      ],
      orderData: [
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "粤B 12345",
              brand: "gtr",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-12-10",
          services: ["汽车维修"],
          content: [
            {
              item: "维修费",
              cost: 99,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 2,
              total: 2400
            },
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "米其林轮胎19寸",
              sellPrice: "200",
              count: 4,
              total: 800
            }
          ],
          totalPrice: 4187
        },
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "粤B 12345",
              brand: "gtr",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-10-29",
          services: ["汽车维修"],
          content: [
            {
              item: "维修费",
              cost: 99,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 2,
              total: 2400
            },
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "米其林轮胎19寸",
              sellPrice: "200",
              count: 4,
              total: 800
            }
          ],
          totalPrice: 4187
        },
        {
          orderType: "普通客户",
          cusInfo: [
            {
              name: "普通客户",
              phone: null,
              plate: "粤B 12345",
              brand: "gtr",
              date: null,
              balance: null,
              point: null
            }
          ],
          date: "2018-08-21",
          services: ["汽车维修"],
          content: [
            {
              item: "维修费",
              cost: 99,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 2,
              total: 2400
            },
            {
              name: "导航仪",
              sellPrice: "888",
              count: 1,
              total: 888
            },
            {
              name: "米其林轮胎19寸",
              sellPrice: "200",
              count: 4,
              total: 800
            }
          ],
          totalPrice: 4187
        },
        {
          orderType: "会员消费",
          cusInfo: [
            {
              name: "胡凯莉3",
              phone: "13313313333",
              plate: "粤C33333",
              brand: "奔驰",
              date: "2018-07-07",
              balance: "800",
              point: "898"
            }
          ],
          date: "2018-12-23",
          services: ["汽车美容", "汽车维修", "配件购买"],
          content: [
            {
              item: "维修费",
              cost: 100,
              key: 1545468633009
            },
            {
              item: "美容费",
              cost: 100,
              key: 1545468633009
            }
          ],
          fittings: [
            {
              name: "米其林轮胎19寸",
              sellPrice: "200",
              count: 2,
              total: 400
            },
            {
              name: "挡风玻璃",
              sellPrice: "1200",
              count: 2,
              total: 2400
            }
          ],
          totalPrice: 2767
        }
      ]
    };
  },

  components: {},

  computed: {
    month() {
      let month = [];
      this.payData.forEach(item => {
        month.push(item.date);
      });
      return month;
    },
    monthlySalary() {
      let monthlySalary = [];
      this.payData.forEach(item => {
        monthlySalary.push(parseFloat(item.salaryPayTotal));
      });
      return monthlySalary;
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
            color: '#1890ff'
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
            lineStyle:{
              color: "#1890ff"
            },
            data: this.monthlySalary
          }
        ]
      };
      let myChart = echarts.init(
        document.getElementById("myChart"),
        "roma"
      );
      myChart.setOption(chartData);
    }
  }
};
</script>

<style scoped>
#myChart{
  width: 100%;
  height: 400px;
}
</style>
