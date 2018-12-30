<template>
  <div>
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
import {getStorageList} from '@/api/storage.js'
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
      storageTable: []
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
        if (item.count <= 10) {
          lack.push(item);
        }
      });
      return lack;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    getStorageList().then(res=>{
      this.storageTable = res.result;
    }).catch();
  },

  methods: {
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
    }
  }
};
</script>

<style scoped>
</style>
