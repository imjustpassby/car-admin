<template>
  <div>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="工资总览" name="salaryOverview">
        <el-table 
        :data="salaryTable" 
        :summary-method="getSummaries"
        style="width: 100%;" 
        highlight-current-row 
        show-summary
        >
          <el-table-column prop="date" label="入职日期" fit align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" fit align="center"></el-table-column>
          <el-table-column prop="baseSalary" label="基本工资（元）" fit align="center">
            <template slot-scope="scope">
              {{ scope.row.baseSalary | currency('¥') }}
            </template>
          </el-table-column>

          <el-table-column prop="welfare" label="福利（元）" fit align="center">
            <template slot-scope="scope">
              {{ scope.row.welfare | currency('¥') }}
            </template>
          </el-table-column>

          <el-table-column prop="extra" label="额外（元）" fit align="center">
            <template slot-scope="scope">
              {{ scope.row.extra | currency('¥') }}
            </template>
          </el-table-column>

          <el-table-column prop="total" label="总和（元）" fit align="center">
            <template slot-scope="scope">
              {{ scope.row.total | currency('¥') }}
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="更改工资" name="salaryChange">
        <update-salary :staffSalary="staffSalary"></update-salary>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UpdateSalary from './components/UpdateSalary'
import {getStaffList} from '@/api/staff.js'
import {currency} from '@/utils/currency'
export default {
  name: "Salary",
  props: [""],
  data() {
    return {
      activeCard: "salaryOverview",
      salaryTable: [],
      staffSalary: {
        name: null,
        baseSalary: null,
        welfare: null,
        extra: null
      }
    };
  },

  filters:{
    currency
  },

  components: {
    UpdateSalary
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getStaffList().then(res=>{
      this.salaryTable = res.result;
    }).catch();
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.staffSalary = this.salaryTable[index];
      this.activeCard = "salaryChange";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          switch(column.property) {
            case "baseSalary":
            case "welfare":
            case "extra":
            case "total":
              sums[index] = currency(parseFloat(sums[index]),'¥');
              break;
            default:
              sums[index] = '';
              break;
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 50%;
}
.el-button {
  width: 100px;
}
</style>