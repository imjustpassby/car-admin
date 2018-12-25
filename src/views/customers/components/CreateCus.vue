<template>
  <div>
    <el-form
      :model="newCus"
      :rules="rules"
      ref="createCus"
      :label-position="labelPosition"
      label-width="120px"
    >
      <span class="form-item">新会员加入</span>
      <el-form-item label="姓名" prop="name">
        <el-col :span="8">
          <el-input v-model="newCus.name"></el-input>
        </el-col>
      </el-form-item>
      
      <el-form-item label="电话" prop="phone">
        <el-col :span="8">
          <el-input v-model="newCus.phone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="车牌" prop="plate">
        <el-col :span="8">
          <el-input v-model="newCus.plate"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="汽车品牌" prop="brand">
        <el-col :span="8">
          <el-input v-model="newCus.brand"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="newCus.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="充值金额" prop="balance">
        <el-col :span="8">
          <el-input-number v-model="newCus.balance" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>
      
      <el-form-item>
        <el-button type="warning" round @click="createCus('createCus')">加入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
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
      labelPosition: "right",
      rules: {
        name: [
          {
            required: true,
            message: "请输入会员姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
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
        plate: [
          {
            required: true,
            message: "请输入会员车牌",
            trigger: "blur"
          }
        ],
        brand: [
          {
            required: true,
            message: "请输入会员汽车品牌",
            trigger: "blur"
          }
        ],
        balance: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: "blur"
          }
        ]
      },
      newCus: {
        name: null,
        phone: null,
        plate: null,
        brand: null,
        date: null,
        balance: 0
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    createCus(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //create staff method
          this.$message({
            message: "新会员加入成功！",
            type: "success",
            center: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: "新会员加入失败！请检查信息是否填写正确！",
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
