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
export default {
  name: "",
  props: [""],
  data() {
    return {
      recordTable: [
        {
          name: "胡凯莉3",
          phone: "13313313333",
          point: "898",
          date: "2018-12-25",
          reward: "洗车服务---500"
        },
        {
          name: "胡凯莉2",
          phone: "13313313322",
          point: "567",
          date: "2018-12-16",
          reward: "洗车服务---500"
        }
      ]
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {}
};
</script>

<style scoped>
</style>
