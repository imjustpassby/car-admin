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
        <el-button round @click="resetForm('fittingManage')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStorageList, updateFitting } from "@/api/storage.js";
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
      storageData: [],
      fittingInfo: {
        id: null,
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

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      getStorageList()
        .then(res => {
          this.storageData = res.result;
        })
        .catch();
    },
    getFittingInfo() {
      let hasItem = false;
      this.storageData.forEach(item => {
        if (item.name == this.fittingInfo.name) {
          hasItem = true;
          this.fittingInfo.id = item.id;
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
          if (!this.isSubmit) {
            updateFitting(this.fittingInfo)
              .then(res => {
                this.getList();
                this.hasFitting = false;
                this.isSubmit = true;
                this.$message({
                  message: "配件信息更新成功！",
                  type: "success",
                  center: true,
                  duration: 3000
                });
              })
              .catch();
          } else {
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
    resetForm(formName) {
      this.isSubmit = false;
      this.fittingInfo.id = null;
      this.fittingInfo.buyPrice = 0;
      this.$refs[formName].resetFields();
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