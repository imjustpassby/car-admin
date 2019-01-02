<template>
  <div>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="奖品总览" name="RewardOverview">
        <reward-manage :rewardTable="rewardTable" v-on:isDeleted="getList"></reward-manage>
      </el-tab-pane>
      <el-tab-pane label="添加奖品" name="AddReward">
        <add-reward v-on:isAdded="getList"></add-reward>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { currency } from "@/utils/currency";
import { getRewardList } from "@/api/pointMall.js";
import RewardManage from './components/RewardManage'
import AddReward from './components/AddReward';
export default {
  name: "Reward",
  props: [""],
  data() {
    return {
      activeCard: "RewardOverview",
      rewardTable: []
    };
  },

  filters: {
    currency
  },

  components: {
    RewardManage,
    AddReward
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      getRewardList()
        .then(res => {
          this.rewardTable = res.result;
        })
        .catch();
    }
  }
};
</script>

<style scoped>
</style>
