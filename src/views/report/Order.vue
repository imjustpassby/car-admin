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
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "ReportOrder",
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

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.getDateOption();
    this.getMonthlyCommonOrderTotal();
    this.getMonthlyVipOrderTotal();
    this.getMonthlyRefillTotal();
    this.getMonthlyNewVipTotal();
    this.drawChart();
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
            radius: "65%",
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
            }
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
  width: 100%;
  height: 400px;
  top: 20px;
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
