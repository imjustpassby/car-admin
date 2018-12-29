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
        name: "",
        phone: null,
        point: 0,
        date: null,
        reward: null
      },
      rewardTable: [
        {
          name: "导航仪",
          point: 8000,
          originalPoint: 8000,
          edit: false
        },
        {
          name: "洗车服务",
          point: 500,
          originalPoint: 500,
          edit: false
        }
      ],
      cusData: [
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: "1000",
          point: "145"
        },
        {
          name: "胡凯莉2",
          phone: "13313313322",
          plate: "粤B22222",
          brand: "日产",
          date: "2018-11-30",
          balance: "1200",
          point: "567"
        },
        {
          name: "胡凯莉3",
          phone: "13313313333",
          plate: "粤C33333",
          brand: "奔驰",
          date: "2018-10-07",
          balance: "800",
          point: "898"
        },
        {
          name: "胡凯莉4",
          phone: "13313313344",
          plate: "粤D44444",
          brand: "宝骏",
          date: "2018-08-07",
          balance: "500",
          point: "444"
        },
        {
          name: "胡凯莉5",
          phone: "13313313355",
          plate: "粤R99991",
          brand: "保时捷",
          date: "2018-01-07",
          balance: "10000",
          point: "666"
        }
      ]
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getVipPoint() {
      let hasItem = false;
      this.cusData.forEach(item => {
        if (this.formData.phone == item.phone) {
          this.isVip = true;
          hasItem = true;
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
                //deal with cus point
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
