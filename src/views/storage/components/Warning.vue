<template>
  <div>
    <el-table 
      :data="warningData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :default-sort = "{prop: 'name', order: 'ascending'}"
      :summary-method="getSummaries"
      style="width: 100%;" 
      stripe 
      show-summary
      >
      <el-table-column prop="name" label="配件名" sortable fit align="center"></el-table-column>
      <el-table-column prop="count" label="数量（个）" sortable fit align="center"></el-table-column>
      <el-table-column prop="buyPrice" label="进货价" sortable fit align="center">
        <template slot-scope="scope">
          {{ scope.row.buyPrice | currency('¥') }}
        </template>
      </el-table-column>
      <el-table-column prop="sellPrice" label="出售价" sortable fit align="center">
        <template slot-scope="scope">
          {{ scope.row.sellPrice | currency('¥') }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="请输入配件搜索"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {currency} from '@/utils/currency'
  export default {
    name:'Warning',
    props:['warningData'],
    data () {
        return {
          search: ""
      };
    },

    filters:{
      currency
    },

    components: {},

    computed: {},

    watch: {},

    beforeMount() {},

    mounted() {},

    methods: {
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
              case "count":
                sums[index] += ' 个'; 
                break;
              case "buyPrice":
              case "sellPrice":
                sums[index] = currency(sums[index],'¥');
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
    },

  }

</script>
<style scoped>

</style>