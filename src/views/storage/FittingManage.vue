<template>
  <div>
    <el-form :model="fittingInfo" ref="fittingManage" label-width="120px">
      <span class="form-item">配件信息</span>
      <el-form-item label="配件名">
        <template slot-scope="scope">
          <el-col :span="12">
            <el-input v-model="fittingName"></el-input>
          </el-col>
          <el-button type="primary" circle icon="el-icon-search" class="content-margin" @click="getFittingInfo"></el-button>
        </template>
      </el-form-item>
      <el-form-item label="配件数量">
        <template slot-scope="scope">
          <el-input-number v-model="fittingInfo.count" :min="0" :step="1"></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="出售价">
        <template slot-scope="scope">
          <el-input-number v-model="fittingInfo.sellPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="submitForm('fittingManage')">更新</el-button>
        <el-button round @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name:'OutStorage',
    props:[''],
    data () {
      return {
        fittingName:'',
        storageData: [
          {
            name: "米其林轮胎19寸",
            count: "12",
            buyPrice: "120",
            sellPrice: "200"
          },
          {
            name: "导航仪",
            count: "10",
            buyPrice: "500",
            sellPrice: "888"
          },
          {
            name: "挡风玻璃",
            count: "3",
            buyPrice: "600",
            sellPrice: "1200"
          }
        ],
        fittingInfo:{
          name: null,
          count: 0,
          buyPrice: 0,
          sellPrice: 0
        }
      };
    },

    components: {},

    computed: {},

    watch: {},

    beforeMount() {},

    mounted() {},

    methods: {
      getFittingInfo(){
        let hasItem = false;
        this.storageData.forEach(item => {
          if (item.name == this.fittingName) {
            hasItem = true;
            this.fittingInfo.name = item.name;
            this.fittingInfo.count = item.count;
            this.fittingInfo.sellPrice = item.sellPrice;
            this.fittingInfo.buyPrice = item.buyPrice;
          }
        });
        if (hasItem) {
          this.$message({
            message: "已列出该配件信息！",
            type: "success",
            center: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: "库存还没有该配件！",
            type: "warning",
            center: true,
            duration: 2000
          });
        }
      },
      submitForm(formName){
        this.$refs[formName].validate(valid => {
        if (valid) {
          //update sellPrice & count
          this.$message({
            message: "配件入库成功！点击重置继续入库操作！",
            type: "success",
            center: true,
            duration: 2000
          });
        } else {
          this.$message({
            message: "配件入库失败！请检查信息是否填写正确！",
            type: "error",
            center: true,
            duration: 2000
          });
          return false;
        }
      });
      },
      resetForm() {
        this.fittingName = null;
        this.fittingInfo.name = null;
        this.fittingInfo.count = 0;
        this.fittingInfo.sellPrice = 0;
        this.fittingInfo.buyPrice = 0;
      }
    },

  }

</script>
<style scoped>
.content-margin {
  margin: 0 12px;
}
</style>