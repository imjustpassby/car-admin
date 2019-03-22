<template>
  <div>
    <el-tabs type="card" v-model="activeCard">
      <el-tab-pane label="录入" name="showForm">
        <el-form
          :model="formData"
          ref="monthlyPay"
          :rules="rules"
          label-position="right"
          label-width="120px"
        >
          <span class="form-item">日期</span>
          <el-form-item label="日期" prop="date">
            <el-col :span="8">
              <el-date-picker
                v-model="formData.date"
                type="date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <span class="form-item">基本支出</span>
          <el-form-item
            v-for="(item, index) in formData.basePay"
            :label="'项目' + (index+1)"
            :key="item.key"
            prop="basePay"
          >
            <el-col :span="8">
              <el-input v-model="item.item"></el-input>
            </el-col>
            <el-col :span="1" :offset="1">
              <span>金额</span>
            </el-col>
            <el-col :span="8">
              <el-input-number v-model="item.cost" :min="0" :precision="2" :step="0.1"></el-input-number>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="danger" round @click.prevent="removeBasePay(item)">删除</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="addBasePay()">添加项目</el-button>
          </el-form-item>
          <el-form-item label="总额">
            <el-col :span="4" :offset="17" class="total-price">{{basePayTotal | currency('¥')}}</el-col>
          </el-form-item>

          <span class="form-item">工资支出</span>
          <el-form-item
            v-for="(item, index) in formData.salaryPay"
            :label="'项目' + (index+1)"
            :key="item.key"
            prop="salaryPay"
          >
            <el-col :span="8">
              <el-input v-model="item.item"></el-input>
            </el-col>
            <el-col :span="1" :offset="1">
              <span>金额</span>
            </el-col>
            <el-col :span="8">
              <el-input-number v-model="item.cost" :min="0" :precision="2" :step="0.1"></el-input-number>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="danger" round @click.prevent="removeSalaryPay(item)">删除</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="addSalaryPay()">添加项目</el-button>
          </el-form-item>
          <el-form-item label="总额">
            <el-col :span="4" :offset="17" class="total-price">{{salaryPayTotal | currency('¥')}}</el-col>
          </el-form-item>

          <span class="form-item">其他支出</span>
          <el-form-item
            v-for="(item, index) in formData.otherPay"
            :label="'项目' + (index+1)"
            :key="item.key"
            prop="otherPay"
          >
            <el-col :span="8">
              <el-input v-model="item.item"></el-input>
            </el-col>
            <el-col :span="1" :offset="1">
              <span>金额</span>
            </el-col>
            <el-col :span="8">
              <el-input-number v-model="item.cost" :min="0" :precision="2" :step="0.1"></el-input-number>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="danger" round @click.prevent="removeOtherPay(item)">删除</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="addOtherPay()">添加项目</el-button>
          </el-form-item>
          <el-form-item label="总额">
            <el-col :span="4" :offset="17" class="total-price">{{otherPayTotal | currency('¥')}}</el-col>
          </el-form-item>

          <span class="form-item">合计</span>
          <el-form-item label="合计总额">
            <el-col :span="4" :offset="17" class="total-price">{{totalPay | currency('¥')}}</el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="warning" round @click="submitForm('monthlyPay')">完成</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="总览" name="showTable">
        <monthly-table></monthly-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { currency } from "@/utils/currency";
import { addMonthlyPay } from "@/api/monthlyPay";
import MonthlyTable from "./components/MonthlyTable"
export default {
  name: "MonthlyPay",
  props: [""],
  data() {
    return {
      isSubmit: false,
      activeCard: "showForm",
      rules: {
        date: [{ required: true, message: "请选择日期" }],
        basePay: [{ required: true, message: "请填写完整项目" }],
        salaryPay: [{ required: true, message: "请填写完整项目" }],
        otherPay: [{ required: true, message: "请填写完整项目" }]
      },
      formData: {
        date: null,
        basePay: [
          {
            item: "",
            cost: 0
          }
        ],
        basePayTotal: 0,
        salaryPay: [
          {
            item: "",
            cost: 0
          }
        ],
        salaryPayTotal: 0,
        otherPay: [
          {
            item: "",
            cost: 0
          }
        ],
        otherPayTotal: 0,
        totalPay: 0
      }
    };
  },

  components: {
    MonthlyTable
  },

  filters: {
    currency
  },

  computed: {
    basePayTotal() {
      let money = 0;
      this.formData.basePay.forEach(item => {
        money += parseFloat(item.cost);
      });
      return money;
    },
    salaryPayTotal() {
      let money = 0;
      this.formData.salaryPay.forEach(item => {
        money += parseFloat(item.cost);
      });
      return money;
    },
    otherPayTotal() {
      let money = 0;
      this.formData.otherPay.forEach(item => {
        money += parseFloat(item.cost);
      });
      return money;
    },
    totalPay() {
      return (
        parseFloat(this.basePayTotal) +
        parseFloat(this.salaryPayTotal) +
        parseFloat(this.otherPayTotal)
      );
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    removeBasePay(item) {
      if (this.formData.basePay.length == 1) {
        this.$message({
          message: "不能继续删除！请填写完整项目信息！",
          type: "error",
          center: true,
          duration: 3000
        });
      } else {
        var index = this.formData.basePay.indexOf(item);
        if (index !== -1) {
          this.formData.basePay.splice(index, 1);
        }
      }
    },
    addBasePay() {
      this.formData.basePay.push({
        item: "",
        cost: 0,
        key: Date.now()
      });
    },
    removeSalaryPay(item) {
      if (this.formData.salaryPay.length == 1) {
        this.$message({
          message: "不能继续删除！请填写完整项目信息！",
          type: "error",
          center: true,
          duration: 3000
        });
      } else {
        var index = this.formData.salaryPay.indexOf(item);
        if (index !== -1) {
          this.formData.salaryPay.splice(index, 1);
        }
      }
    },
    addSalaryPay() {
      this.formData.salaryPay.push({
        item: "",
        cost: 0,
        key: Date.now()
      });
    },
    removeOtherPay(item) {
      if (this.formData.otherPay.length == 1) {
        this.$message({
          message: "不能继续删除！请填写完整项目信息！",
          type: "error",
          center: true,
          duration: 3000
        });
      } else {
        var index = this.formData.otherPay.indexOf(item);
        if (index !== -1) {
          this.formData.otherPay.splice(index, 1);
        }
      }
    },
    addOtherPay() {
      this.formData.otherPay.push({
        item: "",
        cost: 0,
        key: Date.now()
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isSubmit) {
            this.isSubmit = true;
            this.formData.salaryPayTotal = this.salaryPayTotal;
            this.formData.basePayTotal = this.basePayTotal;
            this.formData.otherPayTotal = this.otherPayTotal;
            this.formData.totalPay = this.totalPay;
            addMonthlyPay(this.formData)
              .then()
              .catch();
            this.$message({
              message: "表单提交成功！",
              type: "success",
              center: true,
              duration: 3000
            });
          } else {
            this.$message({
              message: "请刷新页面再提交新表单！",
              type: "success",
              center: true,
              duration: 3000
            });
          }
        } else {
          this.$message({
            message: "表单提交失败！请检查信息是否填写正确！",
            type: "error",
            center: true,
            duration: 3000
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.total-price {
  color: orange;
  font-size: 30px;
}
</style>
