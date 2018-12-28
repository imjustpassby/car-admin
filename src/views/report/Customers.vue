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
      cusInfo: [
        {
          name: "胡凯莉5",
          phone: "13313313355",
          plate: "粤R99991",
          brand: "保时捷",
          date: "2018-01-07",
          balance: 10000,
          point: "666"
        },
        {
          name: "胡凯莉4",
          phone: "13313313344",
          plate: "粤D44444",
          brand: "宝骏",
          date: "2018-08-07",
          balance: 500,
          point: "444"
        },
        {
          name: "胡凯莉3",
          phone: "13313313333",
          plate: "粤C33333",
          brand: "奔驰",
          date: "2018-10-07",
          balance: 800,
          point: "898"
        },
        {
          name: "胡凯莉2",
          phone: "13313313322",
          plate: "粤B22222",
          brand: "日产",
          date: "2018-11-30",
          balance: "1200",
          point: 567
        },
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: 1000,
          point: "145"
        },
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: 1000,
          point: "145"
        },
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: 1000,
          point: "145"
        }
      ]
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

  beforeMount() {},

  mounted() {
    this.drawChart();
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
          text: "每月新会员统计",
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
