<template>
  <div>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="奖品总览" name="RewardOverview">
        <reward-manage></reward-manage>
      </el-tab-pane>
      <el-tab-pane label="添加奖品" name="AddReward">
        <add-reward></add-reward>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { currency } from "@/utils/currency";
import RewardManage from './components/RewardManage'
import AddReward from './components/AddReward';
export default {
  props: [""],
  data() {
    return {
      activeCard: "RewardOverview",
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

  mounted() {},

  methods: {}
};
</script>

<style scoped>
</style>
