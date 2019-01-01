<template>
  <div>
    <el-form
      :model="staffSalary"
      :rules="rules"
      ref="updateSalary"
      :label-position="labelPosition"
      label-width="120px"
    >
      <span class="form-item">工资更新</span>
      <el-form-item label="员工姓名" prop="name">
        <span style="margin-left:16px;color:#409EFF">{{ staffSalary.name }}</span>
      </el-form-item>
      
      <el-form-item label="基本工资" prop="baseSalary">
        <el-col :span="8">
          <el-input-number v-model.number="staffSalary.baseSalary" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="福利" prop="welfare">
        <el-col :span="8">
          <el-input-number v-model.number="staffSalary.welfare" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="额外" prop="extra">
        <el-col :span="8">
          <el-input-number v-model.number="staffSalary.extra" :min="0" :precision="2" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="saveSalary('updateSalary')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateStaff} from '@/api/staff.js'
export default {
  name: "UpdateSalary",
  props: ["staffSalary"],
  data() {
    return {
      labelPosition: "right",
      rules: {
        baseSalary: [{ required: true, message: "不能为空且为数字" }],
        welfare: [{ required: true, message: "不能为空且为数字" }],
        extra: [{ required: true, message: "不能为空且为数字" }]
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    saveSalary(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateStaff(this.staffSalary).then().catch();
          this.$emit("isUpdated");
          this.$message({
            message: "工资修改成功！",
            type: "success",
            center: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: "工资修改失败！请检查信息是否填写正确！",
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
<style lang="scss" scoped>
</style>