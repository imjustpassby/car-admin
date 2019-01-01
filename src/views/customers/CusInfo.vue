<template>
  <div>
    <el-tabs type="card" v-model="activeCard">
      <el-tab-pane label="会员总览" name="showCus">
        <el-table
          v-loading="listLoading"
          :default-sort="{prop: 'date', order: 'descending'}"
          :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%"
          highlight-current-row
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" width="120" align="center"></el-table-column>
          <el-table-column prop="plate" label="车牌" width="120" align="center"></el-table-column>
          <el-table-column prop="brand" label="汽车品牌" fit align="center"></el-table-column>
          <el-table-column
            prop="date"
            :filters="[{text:'一周前',value:oneWeekAgo},{text:'一个月前',value:oneMonthAgo},{text:'一个季度前',value:oneQuarterAgo},{text:'半年前',value:halfYearAgo}]"
            :filter-method="filterHandler"
            sortable
            label="日期"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column prop="balance" label="余额" width="120" align="center">
            <template slot-scope="scope">{{ scope.row.balance | currency('¥') }}</template>
          </el-table-column>
          <el-table-column prop="point" label="积分" width="120" align="center"></el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="请输入会员手机搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="新会员加入" name="createCus">
        <create-cus v-on:isCreated="getList"></create-cus>
      </el-tab-pane>
      <el-tab-pane label="会员信息修改" name="updateCus">
        <update-cus :cusInfo="cusInfo" v-on:isUpdated="getList"></update-cus>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCustomersList,deleteVip } from "@/api/customers.js";
import CreateCus from "./components/CreateCus";
import UpdateCus from "./components/UpdateCus";
import { currency } from "@/utils/currency";
export default {
  name: "CusInfo",
  props: [""],
  data() {
    return {
      listLoading: true,
      search: "",
      activeCard: "showCus",
      tableData: [],
      cusInfo: {}
    };
  },

  filters: {
    currency
  },

  components: {
    CreateCus,
    UpdateCus
  },

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

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      this.tableData = [];
      getCustomersList()
        .then(res => {
          this.tableData = res.result;
          this.listLoading = false;
        })
        .catch();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] >= value;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, cur) => {
            const value = Number(cur);
            if (!isNaN(value)) {
              return prev + cur;
            } else {
              return prev;
            }
          }, 0);
          switch (column.property) {
            case "balance":
              sums[index] = currency(sums[index], "¥");
              break;
            case "point":
              sums[index] = sums[index];
              break;
            default:
              sums[index] = "";
              break;
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    handleEdit(index, row) {
      this.activeCard = "updateCus";
      this.cusInfo = row;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该会员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteVip(row).then().catch();
          this.getList();
          this.$message({
            type: "success",
            message: "会员信息删除成功!",
            center: true,
            duration: 2000
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true,
            duration: 2000
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
