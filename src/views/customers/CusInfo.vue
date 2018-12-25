<template>
  <div>
    <el-tabs type="card" v-model="activeCard">
      <el-tab-pane label="会员总览" name="showCus">
        <el-table
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
        <create-cus></create-cus>
      </el-tab-pane>
      <el-tab-pane label="会员信息修改" name="updateCus">
        <update-cus :cusInfo="cusInfo"></update-cus>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateCus from "./components/CreateCus";
import UpdateCus from "./components/UpdateCus";
import { currency } from "@/utils/currency";
export default {
  name: "CusInfo",
  props: [""],
  data() {
    return {
      search: "",
      activeCard: "showCus",
      tableData: [
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: "1000",
          point: "145"
        },
        {
          name: "胡凯莉2",
          phone: "13313313322",
          plate: "粤B22222",
          brand: "日产",
          date: "2018-11-30",
          balance: "1200",
          point: "567"
        },
        {
          name: "胡凯莉3",
          phone: "13313313333",
          plate: "粤C33333",
          brand: "奔驰",
          date: "2018-10-07",
          balance: "800",
          point: "898"
        },
        {
          name: "胡凯莉4",
          phone: "13313313344",
          plate: "粤D44444",
          brand: "宝骏",
          date: "2018-08-07",
          balance: "500",
          point: "444"
        },
        {
          name: "胡凯莉5",
          phone: "13313313355",
          plate: "粤R99991",
          brand: "保时捷",
          date: "2018-01-07",
          balance: "10000",
          point: "666"
        }
      ],
      cusInfo: {
        name: null,
        phone: null,
        plate: null,
        brand: null,
        date: null,
        balance: null,
        point: null
      }
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

  mounted() {},

  methods: {
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
      this.tableData.forEach((item,index)=>{
        if (item.name == row.name){
          this.cusInfo = this.tableData[index];
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该会员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //delete method
          this.tableData.forEach((item,index)=>{
          if (item.name == row.name){
            this.tableData.splice(index, 1);
            }
          });
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