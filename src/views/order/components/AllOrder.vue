<template>
  <div>
    <el-table 
    :data="orderTable" 
    :default-sort="{prop: 'date', order: 'descending'}" 
    stripe 
    style="width:100%"
    >
      <el-table-column type="expand" fit >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="客户姓名">
              <span>{{ props.row.cusInfo[0].name }}</span>
            </el-form-item>
            <el-form-item label="客户手机">
              <span>{{ props.row.cusInfo[0].phone }}</span>
            </el-form-item>
            <el-form-item label="客户车牌">
              <span>{{ props.row.cusInfo[0].plate }}</span>
            </el-form-item>
            <el-form-item label="汽车品牌">
              <span>{{ props.row.cusInfo[0].brand }}</span>
            </el-form-item>
            <el-form-item label="客户余额">
              <span>{{ props.row.cusInfo[0].balance }}</span>
            </el-form-item>
            <el-form-item label="客户积分">
              <span>{{ props.row.cusInfo[0].point }}</span>
            </el-form-item>
            <el-form-item label="配件清单">
              <div v-for="(item,index) in props.row.fittings" :key="item.name">
                <span>( {{ index+1 }} ) {{ item.name}}&nbsp;&nbsp;{{ item.count }}个&nbsp;&nbsp;{{ item.total | currency('¥') }}</span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="消费类型" prop="orderType" fit></el-table-column>
      <el-table-column label="业务项目" prop="services" fit>
        <template slot-scope="scope">
          <p v-for="item in scope.row.services" :key="item.index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column label="服务项目" prop="content" fit>
        <template slot-scope="scope">
          <p v-for="item in scope.row.content" :key="item.index">
            <span>{{ item.item }} &nbsp;</span>
            <span>{{ item.cost | currency('¥') }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
        :filters="[{text:'一周前',value:oneWeekAgo},{text:'一个月前',value:oneMonthAgo},{text:'一个季度前',value:oneQuarterAgo},{text:'半年前',value:halfYearAgo}]"
        :filter-method="filterHandler"
        sortable
        fit
      ></el-table-column>
      <el-table-column label="总额" prop="totalPrice" fit>
        <template slot-scope="scope">{{ scope.row.totalPrice | currency('¥') }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { currency } from "@/utils/currency";
export default {
  name: "",
  props: [""],
  data() {
    return {
      orderTable: [
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

  filters: {
    currency
  },

  components: {},

  computed: {
    oneWeekAgo() {
      let now = this.$moment().format();
      return this.$moment()
        .subtract(1, "w")
        .format("YYYY-MM-DD");
    },
    oneMonthAgo() {
      let now = this.$moment().format();
      return this.$moment()
        .subtract(1, "M")
        .format("YYYY-MM-DD");
    },
    oneQuarterAgo() {
      let now = this.$moment().format();
      return this.$moment()
        .subtract(1, "Q")
        .format("YYYY-MM-DD");
    },
    halfYearAgo() {
      let now = this.$moment().format();
      return this.$moment()
        .subtract(6, "M")
        .format("YYYY-MM-DD");
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] >= value;
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
  border: none;

  label {
    width: 90px;
    color: #99a9bf;
  }

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
}
</style>
