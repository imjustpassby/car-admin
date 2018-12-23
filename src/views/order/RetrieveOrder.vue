<template>
  <div>
    <el-tabs type="card" v-model="activeCard">
      <el-tab-pane label="订单总览" name="allOrder">
        <all-order></all-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AllOrder from './components/AllOrder';
  export default {
    name:'RetrieveOrder',
    props:[''],
    data () {
      return {
        activeCard: "allOrder"
      };
    },

    components: {
      AllOrder
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