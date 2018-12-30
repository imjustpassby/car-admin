<template>
  <div>
    <el-table 
    :data="recordTable" 
    :default-sort="{prop: 'date', order: 'descending'}" 
    highlight-current-row 
    fit 
    style="width:100%"
    >
      <el-table-column label="会员姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="会员手机" prop="phone" align="center"></el-table-column>
      <el-table-column label="兑换前积分" prop="point" align="center"></el-table-column>
      <el-table-column label="日期" prop="date" sortable align="center"></el-table-column>
      <el-table-column label="兑换奖品" prop="reward" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRecordList} from '@/api/record.js'
export default {
  name: "Record",
  props: [""],
  data() {
    return {
      recordTable: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getRecordList().then(res=>{
      this.recordTable = res.result;
    }).catch();
  },

  methods: {}
};
</script>

<style scoped>
</style>
