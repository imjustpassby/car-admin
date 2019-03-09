<template>
  <div>
    <el-button
      :loading="downloadLoading"
      style="margin:0 0 20px 0;"
      type="primary"
      icon="el-icon-download"
      @click="handleDownload"
    >导出Excel</el-button>
    <el-table
      v-loading="loading"
      :data="orderTable"
      :default-sort="{prop: 'date', order: 'descending'}"
      highlight-current-row
      style="width:100%"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column type="expand" fit>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="客户姓名">
              <span>{{ props.row.cusInfo.name }}</span>
            </el-form-item>
            <el-form-item label="客户手机">
              <span>{{ props.row.cusInfo.phone }}</span>
            </el-form-item>
            <el-form-item label="客户车牌">
              <span>{{ props.row.cusInfo.plate }}</span>
            </el-form-item>
            <el-form-item label="汽车品牌">
              <span>{{ props.row.cusInfo.brand }}</span>
            </el-form-item>
            <el-form-item label="客户余额">
              <span>{{ props.row.cusInfo.balance | currency('¥') }}</span>
            </el-form-item>
            <el-form-item label="客户积分">
              <span>{{ props.row.cusInfo.point }}</span>
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
import { getOrderList } from "@/api/order.js";
import { currency } from "@/utils/currency";
export default {
  name: "AllOrder",
  props: [""],
  data() {
    return {
      loading: true,
      orderTable: [],
      downloadLoading: false,
      filename: "订单详情",
      autoWidth: true,
      bookType: "xlsx"
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

  mounted() {
    getOrderList().then(res => {
      this.orderTable = res.result;
      this.loading = false;
    });
  },

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
            case "totalPrice":
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
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["日期","消费类型","业务项目","服务项目","总额","客户姓名","客户手机","客户车牌","汽车品牌","配件清单"];
        const filterVal = ["date","orderType","services","content","totalPrice","cusInfo-name","cusInfo-phone","cusInfo-plate","cusInfo-brand","fittings"]
        const data = this.formatJson(filterVal, this.orderTable);
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
        if (j === 'content') {
          let content= "";
          v[j].forEach((e,index)=>{
            let cost = currency(e.cost,"¥");
            content += `(${index+1}) ${e.item}  ${cost}  `;
          })
          return content;
        } else if (j=== "totalPrice"){
          return currency(v[j],"¥");
        } else if (j==="cusInfo-name"){
          return v.cusInfo.name;
        } else if (j==="cusInfo-phone"){
          return v.cusInfo.phone;
        } else if (j==="cusInfo-plate"){
          return v.cusInfo.plate;
        } else if (j==="cusInfo-brand"){
          return v.cusInfo.brand;
        } else if (j==="fittings"){
          let content = "";
          v[j].forEach((e,index)=>{
            content += `(${index+1}) ${e.name}  ${e.count}个  `;
          })
          return content;
        }
        else {
          return v[j]
        }
      }))
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
