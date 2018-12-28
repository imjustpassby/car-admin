<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import "echarts/theme/macarons.js";
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  props: [""],
  data() {
    return {
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
              cost: 3000
            },
            {
              item: "王小虎2",
              cost: 3500,
              key: 1545641286663
            }
          ],
          salaryPayTotal: 6500,
          otherPay: [
            {
              item: "保险费",
              cost: 1300
            }
          ],
          otherPayTotal: 1300,
          totalPay: 11300
        }
      ]
    };
  },

  components: {},

  computed: {
    month() {
      let month = [];
      this.payData.forEach(item => {
        month.push(this.$moment(item.date).format('YYYY-MM'));
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
