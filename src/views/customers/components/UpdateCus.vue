<template>
  <div>
    <el-form
      :model="cusInfo"
      :rules="rules"
      ref="UpdateCus"
      :label-position="labelPosition"
      label-width="120px"
    >
      <span class="form-item">信息更改</span>
      <el-form-item label="姓名" prop="name">
        <el-col :span="8">
          <span style="margin-left:16px;color:#409EFF">{{ cusInfo.name }}</span>
        </el-col>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-col :span="8">
          <el-input v-model="cusInfo.phone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="车牌" prop="plate">
        <el-col :span="8">
          <el-input v-model="cusInfo.plate"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="汽车品牌" prop="brand">
        <el-col :span="8">
          <el-input v-model="cusInfo.brand"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('UpdateCus')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateVip } from "@/api/customers.js";
import { getCustomersList } from "@/api/customers.js";
export default {
  name: "UpdateCus",
  props: ["cusInfo"],
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
      }, 1000);
    };
    return {
      labelPosition: "right",
      rules: {
        name: [{ required: true, message: "请选择会员", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        plate: [{ required: true, message: "请输入会员车牌", trigger: "blur" }],
        brand: [
          { required: true, message: "请输入会员汽车品牌", trigger: "blur" }
        ]
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
          updateVip(this.cusInfo)
            .then(this.$emit("isUpdated"))
            .catch();
          this.$message({
            message: "会员信息更新成功！",
            type: "success",
            center: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: "会员信息更新失败！请检查信息是否填写正确！",
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
</style>