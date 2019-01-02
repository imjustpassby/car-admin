<template>
  <div>
    <el-form
      :model="staffInfo"
      :rules="rules"
      ref="createStaff"
      :label-position="labelPosition"
      label-width="120px"
    >
      <span class="form-item">新员工加入</span>
      <el-form-item label="员工姓名" prop="name">
        <el-col :span="8">
          <el-input v-model.trim="staffInfo.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="入职日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="staffInfo.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-col :span="8">
          <el-input v-model.trim="staffInfo.sex"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-col :span="8">
          <el-input v-model.trim="staffInfo.phone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="职位" prop="position">
        <el-col :span="8">
          <el-input v-model.trim="staffInfo.position"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-col :span="8">
          <el-input v-model.trim="staffInfo.address"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="基本工资" prop="baseSalary">
        <el-col :span="8">
          <el-input-number v-model.number="staffInfo.baseSalary" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="福利" prop="welfare">
        <el-col :span="8">
          <el-input-number v-model.number="staffInfo.welfare" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="额外" prop="extra">
        <el-col :span="8">
          <el-input-number v-model.number="staffInfo.extra" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="createStaff('createStaff')">完成</el-button>
        <el-button round @click="resetForm('createStaff')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { newStaff } from "@/api/staff.js";
export default {
  name: "CreateStaff",
  props: [""],
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error("格式有误,请输入11位电话。"));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      isSubmit: false,
      labelPosition: "right",
      rules: {
        name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请输入员工性别",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择入职日期",
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
        position: [
          {
            required: true,
            message: "请输入员工职位",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入员工地址",
            trigger: "blur"
          }
        ],
        baseSalary: [
          {
            required: true,
            message: "不能为空且为数字"
          }
        ],
        welfare: [
          {
            required: true,
            message: "不能为空且为数字"
          }
        ],
        extra: [
          {
            required: true,
            message: "不能为空且为数字"
          }
        ]
      },
      staffInfo: {
        date: "",
        name: "",
        sex: "",
        phone: "",
        position: "",
        address: "",
        baseSalary: 0,
        welfare: 0,
        extra: 0,
        total: 0
      }
    };
  },

  components: {},

  computed: {
    total() {
      return (
        parseFloat(this.staffInfo.baseSalary) +
        parseFloat(this.staffInfo.welfare) +
        parseFloat(this.staffInfo.extra)
      );
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    createStaff(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isSubmit) {
            this.isSubmit = true;
            this.staffInfo.total = this.total;
            newStaff(this.staffInfo)
              .then(res => {
                this.$emit("isCreated");
                this.$message({
                  message: "员工信息新增成功！",
                  type: "success",
                  center: true,
                  duration: 3000
                });
              })
              .catch();
          } else {
            this.$message({
              message: "请点击重置按钮再创建新的表单！",
              type: "error",
              center: true,
              duration: 3000
            });
          }
        } else {
          this.$message({
            message: "员工信息新增失败！请检查信息是否填写正确！",
            type: "error",
            center: true,
            duration: 3000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.isSubmit = false;
    }
  }
};
</script>

<style scoped>
</style>
