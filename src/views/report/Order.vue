<template>
  <div>
    <div class="select-container">
      <el-col :span="2" class="select-span">
        <span>请选择时间</span>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-select v-model="selectDate" placeholder="请选择时间" size="mini" @change="changeSelect">
          <el-option
            v-for="item in dateOption"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import "echarts/theme/macarons.js";
import {getOrderList} from '@/api/order.js'
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "OrderChart",
  props: [""],
  data() {
    return {
      selectDate: "",
      dateOption: [
        {
          key: Math.random(0, 1000),
          value: "所有时间",
          label: "所有时间"
        }
      ],
      monthlyCommonOrderTotal: 0,
      monthlyVipOrderTotal: 0,
      monthlyRefillTotal: 0,
      monthlyNewVipTotal: 0,
      orderData: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getOrderList().then(res=>{
      this.orderData = res.result;
      this.getDateOption();
      this.getMonthlyCommonOrderTotal();
      this.getMonthlyVipOrderTotal();
      this.getMonthlyRefillTotal();
      this.getMonthlyNewVipTotal();
      this.drawChart();
    }).catch();
  },

  methods: {
    getMonthlyCommonOrderTotal() {
      let money = 0;
      this.orderData.forEach(item => {
        if (item.orderType == "普通客户") {
          money += parseFloat(item.totalPrice);
        }
      });
      this.monthlyCommonOrderTotal = money;
    },
    getMonthlyVipOrderTotal() {
      let money = 0;
      this.orderData.forEach(item => {
        if (item.orderType == "会员消费") {
          money += parseFloat(item.totalPrice);
        }
      });
      this.monthlyVipOrderTotal = money;
    },
    getMonthlyRefillTotal() {
      let money = 0;
      this.orderData.forEach(item => {
        if (item.orderType == "会员充值") {
          money += parseFloat(item.totalPrice);
        }
      });
      this.monthlyRefillTotal = money;
    },
    getMonthlyNewVipTotal() {
      let money = 0;
      this.orderData.forEach(item => {
        if (item.orderType == "新会员加入") {
          money += parseFloat(item.totalPrice);
        }
      });
      this.monthlyNewVipTotal = money;
    },
    getDateOption() {
      let getDateOption = [];
      this.orderData.forEach(item => {
        getDateOption.push({
          key: Math.random(0, 1000),
          value: this.$moment(item.date).format("YYYY-MM"),
          label: this.$moment(item.date).format("YYYY-MM")
        });
      });
      getDateOption.forEach(item => {
        let hasItem = false;
        for (let i = 0; i < this.dateOption.length; i++) {
          if (this.dateOption[i].value == item.value) {
            hasItem = true;
            break;
          }
        }
        if (!hasItem) {
          this.dateOption.push(item);
        }
      });
    },
    drawChart() {
      const chartData = {
        title: {
          text: this.selectDate + "业务总览",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : ¥{c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["普通客户", "会员消费", "会员充值", "新会员加入"]
        },
        series: [
          {
            name: "消费类型",
            type: "pie",
            roseType: 'radius',
            radius: [50,90],
            center: ["50%", "60%"],
            data: [
              {
                value: this.monthlyCommonOrderTotal,
                name: "普通客户"
              },
              {
                value: this.monthlyVipOrderTotal,
                name: "会员消费"
              },
              {
                value: this.monthlyRefillTotal,
                name: "会员充值"
              },
              {
                value: this.monthlyNewVipTotal,
                name: "新会员加入"
              }
            ],
            label: {
              normal: {
                textStyle: {
                  fontSize: 16
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(0, 0, 0, .7)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      };
      let myChart = echarts.init(
        document.getElementById("myChart"),
        "macarons"
      );
      myChart.setOption(chartData);
    },
    changeSelect(selVal) {
      if (selVal == "所有时间") {
        this.getMonthlyCommonOrderTotal();
        this.getMonthlyVipOrderTotal();
        this.getMonthlyRefillTotal();
        this.getMonthlyNewVipTotal();
      } else {
        this.monthlyCommonOrderTotal = 0;
        this.monthlyVipOrderTotal = 0;
        this.monthlyRefillTotal = 0;
        this.monthlyNewVipTotal = 0;
        this.orderData.forEach(item => {
          let itemDateFmt = this.$moment(item.date).format("YYYY-MM");
          if (itemDateFmt == selVal) {
            if (item.orderType == "普通客户") {
              this.monthlyCommonOrderTotal += parseFloat(item.totalPrice);
            } else if (item.orderType == "会员消费") {
              this.monthlyVipOrderTotal += parseFloat(item.totalPrice);
            } else if (item.orderType == "会员充值") {
              this.monthlyRefillTotal += parseFloat(item.totalPrice);
            } else if (item.orderType == "新会员加入") {
              this.monthlyNewVipTotal += parseFloat(item.totalPrice);
            }
          }
        });
      }
      this.drawChart();
    }
  }
};
</script>

<style scoped>
#myChart {
  top: 20px;
  width: 100%;
  height: 500px;
}

.select-container {
  height: 36px;
  border-bottom: 1px solid #e0eefb;
}

.select-span {
  line-height: 28px;
  text-align: center;
  color: #1890ff;
}
</style>
