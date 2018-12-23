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
          <el-input v-model="fitting.name"></el-input>
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
        <el-col :span="12">
          <el-input-number v-model="fitting.count" :min="0" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="进货价" prop="buyPrice">
        <el-input-number v-model="fitting.buyPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
      </el-form-item>
      <el-form-item label="出售价" prop="sellPrice">
        <el-input-number v-model="fitting.sellPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="submitForm('inStorage')">入库</el-button>
        <el-button round @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "InStorage",
  props: [""],
  data() {
    return {
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
      storageData: [
        {
          name: "米其林轮胎19寸",
          date: "2018-02-02",
          count: "12",
          buyPrice: "120",
          sellPrice: "200"
        },
        {
          name: "导航仪",
          date: "2018-03-03",
          count: "10",
          buyPrice: "500",
          sellPrice: "888"
        },
        {
          name: "挡风玻璃",
          date: "2018-04-04",
          count: "3",
          buyPrice: "600",
          sellPrice: "1200"
        }
      ],
      fitting: {
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

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
      this.fitting.name = null;
      this.fitting.count = null;
      this.fitting.sellPrice = null;
      this.fitting.buyPrice = null;
    },
    checkHas() {
      let hasItem = false;
      this.storageData.forEach(item => {
        if (item.name == this.fitting.name) {
          hasItem = true;
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
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped>
.el-form-item{
  margin-top: 2.9%
}
.form-span {
  color: #1890ff;
  font-size: 20px;
  border-bottom: 2px solid #e0eef8;
}
</style>
