<template>
  <div>
    <el-form
      :model="staffSalary"
      :rules="rules"
      ref="updateSalary"
      :label-position="labelPosition"
      label-width="120px"
    >
      <el-form-item label="员工姓名" prop="name">
        <span style="margin-left:16px;color:#409EFF">{{ staffSalary.name }}</span>
      </el-form-item>
      <el-form-item label="基本工资" prop="baseSalary">
        <el-input v-model.number="staffSalary.baseSalary" type="number"></el-input>
      </el-form-item>
      <el-form-item label="福利" prop="welfare">
        <el-input v-model.number="staffSalary.welfare" type="number"></el-input>
      </el-form-item>
      <el-form-item label="额外" prop="extra">
        <el-input v-model.number="staffSalary.extra" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="saveSalary('updateSalary')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["staffSalary"],
  data() {
    return {
      labelPosition: "right",
      rules:{
        baseSalary: [
          { required: true, message: "不能为空且为数字" },
        ],
        welfare: [
          { required: true, message: "不能为空且为数字" },
        ],
        extra: [
          { required: true, message: "不能为空且为数字" },
        ]
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods:{

    saveSalary(formName) {
    //save info method

    this.$refs[formName].validate((valid) => {
        if (valid) {    
            this.$message({
            message: "工资修改成功！",
            type: "success",
            center: true,
            duration: 2000
            });
        } else {
            this.$message({
            message: "工资修改失败！请检查信息是否填写正确！",
            type: "error",
            center: true,
            duration: 2000
            });
            return false;
        }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 50%;
}
.el-button {
  width: 100px;
}
</style>