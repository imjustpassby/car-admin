<template>
  <div>
    <el-tabs type="card" v-model="activeCard">
      <el-tab-pane label="非会员订单" name="commonOrder">
        <common-order></common-order>
      </el-tab-pane>
      <el-tab-pane label="会员订单" name="vipOrder">
        <vip-order></vip-order>
      </el-tab-pane>
      <el-tab-pane label="会员充值" name="vipRefill">
        <vip-refill></vip-refill>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CommonOrder from './components/CommonOrder'
  import VipOrder from './components/VipOrder'
  import VipRefill from './components/VipRefill'
  export default {
    name:'CreateOrder',
    props:[''],
    data () {
      return {
        activeCard: "commonOrder"
      };
    },

    components: {
      CommonOrder,
      VipOrder,
      VipRefill
    },

    computed: {},

    watch: {},

    beforeMount() {},

    mounted() {},

    methods: {},

  }

</script>
<style scoped>

</style>