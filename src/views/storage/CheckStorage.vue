<template>
  <div>
    <el-button
      :loading="downloadLoading"
      style="margin:0 0 20px 0;"
      type="primary"
      icon="document"
      @click="handleDownload"
    >导出Excel</el-button>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="库存总览" name="storageOverview">
        <el-table
          :data="storageTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          :default-sort="{prop:'name' , order: 'ascending'}"
          :summary-method="getSummaries"
          style="width: 100%;"
          highlight-current-row
          show-summary
          fit
        >
          <el-table-column prop="name" label="配件名" sortable align="center"></el-table-column>
          <el-table-column prop="count" label="数量（个）" sortable align="center"></el-table-column>
          <el-table-column prop="buyPrice" label="进货价" sortable align="center">
            <template slot-scope="scope">{{ scope.row.buyPrice | currency('¥') }}</template>
          </el-table-column>
          <el-table-column prop="sellPrice" label="出售价" sortable align="center">
            <template slot-scope="scope">{{ scope.row.sellPrice | currency('¥') }}</template>
          </el-table-column>
          <el-table-column prop="date" label="上次进货日期" sortable align="center"></el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="请输入配件搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="库存预警" name="warning">
        <warning :warningData="warningData"></warning>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStorageList, deleteFitting } from "@/api/storage.js";
import { currency } from "@/utils/currency";
import Warning from "./components/Warning";
export default {
  name: "CheckStorage",
  props: [""],
  data() {
    return {
      activeCard: "storageOverview",
      search: "",
      searchWarning: "",
      storageTable: [],
      downloadLoading: false,
      filename: "库存详情",
      autoWidth: true,
      bookType: "xlsx"
    };
  },

  filters: {
    currency
  },

  components: {
    Warning
  },

  computed: {
    warningData() {
      let lack = [];
      this.storageTable.forEach((item, index) => {
        if (item.count <= 5) {
          lack.push(item);
        }
      });
      return lack;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      getStorageList()
        .then(res => {
          this.storageTable = res.result;
        })
        .catch();
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
            case "count":
              sums[index] += " 个";
              break;
            case "buyPrice":
            case "sellPrice":
              sums[index] = currency(sums[index], "¥");
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
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该配件信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFitting(row)
            .then(res => {
              this.getList();
              this.$message({
                type: "success",
                message: "配件删除成功!",
                center: true,
                duration: 2000
              });
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true,
            duration: 2000
          });
        });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["配件名","数量（个）","进货价","出售价","上次进货日期"];
        const filterVal = ['name', 'count', 'buyPrice', 'sellPrice','date']
        const data = this.formatJson(filterVal, this.storageTable);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'buyPrice' || j === 'sellPrice') {
          return currency(v[j],'¥')
        } else {
          return v[j]
        }
      }))
    }
  }
};
</script>

<style scoped>
</style>
