<template>
  <div>
    <el-form
      :model="fitting"
      ref="inStorage"
      :label-position="labelPosition"
      label-width="120px"
      :rules="rules"
    >
      <span class="form-span">配件入库</span>
      <el-form-item label="配件名" prop="name">
        <el-col :span="8">
          <el-input v-model.trim="fitting.name"></el-input>
        </el-col>
        <el-button
          type="primary"
          icon="el-icon-search"
          circle
          style="margin-left:16px"
          @click="checkHas"
        ></el-button>
      </el-form-item>

      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="fitting.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="数量" prop="count">
        <el-col :span="8">
          <el-input-number v-model="fitting.count" :min="0" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="进货价" prop="buyPrice">
        <el-col :span="8">
          <el-input-number v-model="fitting.buyPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="出售价" prop="sellPrice">
        <el-col :span="8">
          <el-input-number v-model="fitting.sellPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('inStorage')">入库</el-button>
        <el-button round @click="resetForm('inStorage')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStorageList, newFitting } from "@/api/storage.js";
export default {
  name: "InStorage",
  props: [""],
  data() {
    return {
      isCheck: false,
      isSubmit: false,
      labelPosition: "right",
      rules: {
        name: [
          {
            required: true,
            message: "配件名不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        count: [
          {
            required: true,
            message: "数量不能为空且为数字",
            trigger: "blur"
          }
        ],
        buyPrice: [
          {
            required: true,
            message: "进货价不能为空且为数字",
            trigger: "blur"
          }
        ],
        sellPrice: [
          {
            required: true,
            message: "出售价不能为空且为数字",
            trigger: "blur"
          }
        ]
      },
      storageData: [],
      fitting: {
        id: "0",
        name: null,
        date: null,
        count: null,
        buyPrice: null,
        sellPrice: null
      }
    };
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isSubmit) {
            if (this.isCheck) {
              newFitting(this.fitting)
                .then(res => {
									this.getList();
                  this.isSubmit = true;
                  this.$message({
                    message: "配件入库成功！点击重置继续入库操作！",
                    type: "success",
                    center: true,
                    duration: 3000
                  });
                })
                .catch();
            } else {
              this.$message({
                message: "请先查询库存中是否有该配件！",
                type: "error",
                center: true,
                duration: 3000
              });
            }
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
            message: "配件入库失败！请检查信息是否填写正确！",
            type: "error",
            center: true,
            duration: 3000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.isCheck = false;
      this.isSubmit = false;
      this.fitting.id = "0";
      this.$refs[formName].resetFields();
    },
    checkHas() {
      this.isCheck = true;
      let hasItem = false;
      this.storageData.forEach(item => {
        if (item.name == this.fitting.name) {
          hasItem = true;
          this.fitting.id = item.id;
          this.fitting.count = item.count;
          this.fitting.sellPrice = item.sellPrice;
          this.fitting.buyPrice = item.buyPrice;
        }
      });
      if (hasItem) {
        this.$message({
          message: "库存已有该配件！",
          type: "success",
          center: true,
          duration: 3000
        });
      } else {
        this.$message({
          message: "库存还没有该配件！",
          type: "warning",
          center: true,
          duration: 3000
        });
      }
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-top: 2.9%;
}
.form-span {
  color: #1890ff;
  font-size: 20px;
  border-bottom: 2px solid #e0eef8;
}
.el-input-number {
  width: 100%;
}
</style>
