<template>
  <div>
    <el-table v-loading="listLoading" :data="tableData" style="width:100%" highlight-current-row>
      <el-table-column type="expand" fit>
        <template slot-scope="scope">
          <p class="details">具体支出项：</p>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              v-for="(item) in scope.row.basePay"
              :key="item._id"
              :label="item.item"
            >
              <span>{{ item.cost | currency('¥') }}</span>
            </el-form-item>
            <el-form-item
              v-for="(item) in scope.row.salaryPay"
              :key="item._id"
              :label="item.item"
            >
              <span>{{ item.cost | currency('¥') }}</span>
            </el-form-item>
            <el-form-item
              v-for="(item,index) in scope.row.otherPay"
              :key="item._id"
              :label="item.item"
            >
              <span>{{ item.cost | currency('¥') }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="基本支出">
        <template slot-scope="scope">
          <span>{{scope.row.basePayTotal|currency("¥")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工资支出">
        <template slot-scope="scope">
          <span>{{scope.row.salaryPayTotal|currency("¥")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他支出">
        <template slot-scope="scope">
          <span>{{scope.row.otherPayTotal|currency("¥")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="合计支出">
        <template slot-scope="scope">
          <span>{{scope.row.totalPay|currency("¥")}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMonthlyPay } from "@/api/monthlyPay.js";
import { currency } from "@/utils/currency";
export default {
  name: "",
  props: [""],
  data() {
    return {
      listLoading: true,
      tableData: []
    };
  },

  components: {},

  filters: {
    currency
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getMonthlyPay()
      .then(res => {
        this.tableData = res.result;
        this.listLoading = false;
      })
      .catch();
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.details {
  font-size: 16px;
  margin: 8px 0;
  color: #9671c7;
}
.demo-table-expand {
  font-size: 0;
  border: none;

  label {
    width: 90px;
    color: #99a9bf;
  }

  .el-form-item {
    margin: 0;
    width: 33%;
  }
}
</style>