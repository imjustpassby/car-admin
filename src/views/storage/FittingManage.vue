<template>
  <div>
    <el-form :model="fittingInfo" :rules="rules" ref="fittingManage" label-width="120px">
      <span class="form-item">配件信息</span>

      <el-form-item label="配件名" prop="name">
        <template slot-scope="scope">
          <el-col :span="8">
            <el-input v-model="fittingInfo.name"></el-input>
          </el-col>
          <el-button
            type="primary"
            circle
            icon="el-icon-search"
            class="content-margin"
            @click="getFittingInfo"
          ></el-button>
        </template>
      </el-form-item>

      <el-form-item label="配件数量" prop="count">
        <template slot-scope="scope">
          <el-col :span="8">
            <el-input-number v-model="fittingInfo.count" :min="0" :step="1"></el-input-number>
          </el-col>
        </template>
      </el-form-item>

      <el-form-item label="配件进货价">
        <template slot-scope="scope">
          <el-col :span="8">
            <span style="color:#409EFF">{{fittingInfo.buyPrice | currency('¥') }}</span>
          </el-col>
        </template>
      </el-form-item>

      <el-form-item label="出售价" prop="sellPrice">
        <template slot-scope="scope">
          <el-col :span="8">
            <el-input-number v-model="fittingInfo.sellPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
          </el-col>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('fittingManage')">更新</el-button>
        <el-button round @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { currency } from "@/utils/currency";
export default {
  name: "FittingManage",
  props: [""],
  data() {
    return {
      isSubmit: false,
      hasFitting: false,
      rules: {
        name: [{ required: true, message: "请输入正确的配件名" }],
        count: [{ required: true, message: "请输入数量" }],
        sellPrice: [{ required: true, message: "请输入售价" }]
      },
      storageData: [
        {
          name: "米其林轮胎19寸",
          date: "2018-09-01",
          count: 20,
          buyPrice: 100,
          sellPrice: 200
        },
        {
          name: "导航仪",
          date: "2018-09-01",
          count: 10,
          buyPrice: 500,
          sellPrice: 800
        },
        {
          name: "挡风玻璃",
          date: "2018-09-01",
          count: 12,
          buyPrice: 800,
          sellPrice: 1200
        }
      ],
      fittingInfo: {
        name: "",
        count: 0,
        buyPrice: 0,
        sellPrice: 0
      }
    };
  },

  filters: {
    currency
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getFittingInfo() {
      let hasItem = false;
      this.storageData.forEach(item => {
        if (item.name == this.fittingInfo.name) {
          hasItem = true;
          this.fittingInfo.name = item.name;
          this.fittingInfo.count = item.count;
          this.fittingInfo.sellPrice = item.sellPrice;
          this.fittingInfo.buyPrice = item.buyPrice;
        }
      });
      if (hasItem) {
        this.hasFitting = true;
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.hasFitting) {
          if (!this.isSubmit){
            //update sellPrice & count
            this.hasFitting = false;
            this.isSubmit = true;
            this.$message({
              message: "配件信息更新成功！",
              type: "success",
              center: true,
              duration: 3000
            });
          } else{
            this.$message({
              message: "请点击重置按钮再提交新表单！",
              type: "error",
              center: true,
              duration: 3000
            });
          }
        } else {
          this.$message({
            message: "配件信息更新失败！请检查库存是否有该配件！",
            type: "error",
            center: true,
            duration: 3000
          });
          return false;
        }
      });
    },
    resetForm() {
      this.isSubmit = false;
      this.fittingInfo.name = null;
      this.fittingInfo.count = 0;
      this.fittingInfo.sellPrice = 0;
      this.fittingInfo.buyPrice = 0;
    }
  }
};
</script>
<style scoped>
.content-margin {
  margin: 0 12px;
}
.el-input-number {
  width: 100%;
}
</style>