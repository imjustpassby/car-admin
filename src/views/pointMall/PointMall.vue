<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="pointMall"
      label-position="right"
      label-width="120px"
    >
      <span class="form-item">会员选择</span>
      <el-form-item label="查询积分" prop="phone">
        <el-col :span="8">
          <el-input placeholder="请输入会员手机" v-model="formData.phone"></el-input>
        </el-col>
        <el-button
          type="primary"
          circle
          class="content-margin"
          icon="el-icon-search"
          @click="getVipPoint"
        ></el-button>
      </el-form-item>

      <el-form-item label="会员姓名">
        <template slot-scope="scope">
          <span style="color:#409EFF">{{formData.name}}</span>
        </template>
      </el-form-item>

      <el-form-item label="会员积分">
        <template slot-scope="scope">
          <span style="color:#409EFF">{{formData.point}}</span>
        </template>
      </el-form-item>

      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="奖品选择" prop="reward">
        <el-col :span="8">
          <el-select v-model="formData.reward" placeholder="请选择" clearable @change="setNeedPoint">
            <el-option
              v-for="item in rewardTable"
              :key="item.name"
              :label="item.name +'---' + item.point"
              :value="item.name +'---' + item.point"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('pointMall')">兑换</el-button>
        <el-button round @click="resetForm('pointMall')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRewardList } from "@/api/pointMall.js";
import { exchangeReward } from "@/api/record.js";
import { getCustomersList, descPoint } from "@/api/customers.js";
export default {
  name: "PointMall",
  props: [""],
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error("格式有误，请输入11位电话。"));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      isSubmit: false,
      isVip: false,
      needPoint: 0,
      rules: {
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        reward: [{ required: true, message: "请选择奖品" }]
      },
      formData: {
        id: null,
        name: "",
        phone: null,
        point: 0,
        date: null,
        reward: null
      },
      rewardTable: [],
      cusData: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getRewardList()
      .then(res => {
        this.rewardTable = res.result;
      })
      .catch();
    getCustomersList()
      .then(res => {
        this.cusData = res.result;
      })
      .catch();
  },

  methods: {
    getVipPoint() {
      let hasItem = false;
      this.cusData.forEach(item => {
        if (this.formData.phone == item.phone) {
          this.isVip = true;
          hasItem = true;
          this.formData.id = item.id;
          this.formData.point = item.point;
          this.formData.name = item.name;
        }
      });
      if (hasItem) {
        this.$message({
          message: "已列出该会员积分！",
          type: "success",
          center: true,
          duration: 3000
        });
      } else {
        this.$message({
          message: "没有该会员！请检查手机号是否填写正确！",
          type: "warning",
          center: true,
          duration: 3000
        });
      }
    },
    setNeedPoint(selVal) {
      let rewardPoint = selVal.slice(selVal.lastIndexOf("-") + 1);
      this.needPoint = rewardPoint;
    },
    submitForm(formName) {
      let enoughPoint =
        parseInt(this.formData.point) > parseInt(this.needPoint);
      if (this.isVip) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (enoughPoint) {
              if (!this.isSubmit) {
                this.isSubmit = true;
                exchangeReward(this.formData)
                  .then()
                  .catch();
                descPoint({
                  needPoint: parseFloat(this.needPoint),
                  id: this.formData.id 
                })
                  .then()
                  .catch();
                this.$message({
                  message: "兑换奖品成功！",
                  type: "success",
                  center: true,
                  duration: 3000
                });
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
                message: "很遗憾！积分不足！",
                type: "error",
                center: true,
                duration: 3000
              });
            }
          } else {
            this.$message({
              message: "兑换失败！请检查信息是否填写正确！",
              type: "error",
              center: true,
              duration: 3000
            });
            return false;
          }
        });
      } else {
        this.$message({
          message: "请检查会员手机号！",
          type: "error",
          center: true,
          duration: 3000
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.isSubmit = false;
      this.formData.name = "";
      this.formData.point = 0;
    }
  }
};
</script>

<style scoped>
.content-margin {
  margin: 0 12px;
}
.el-select {
  width: 100%;
}
</style>
