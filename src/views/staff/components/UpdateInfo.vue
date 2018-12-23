<template>
  <div>
    <el-form :model="staffInfo" :rules="rules" ref="updateInfo" :label-position="labelPosition" label-width="120px">
      <span class="form-item">员工信息更新</span>
      <el-form-item label="员工姓名" prop="name">
        <span style="margin-left:16px;color:#409EFF">{{ staffInfo.name }}</span>
      </el-form-item>
      <el-form-item label="入职日期" prop="date">
        <el-date-picker
        v-model="staffInfo.date"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="staffInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="staffInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="staffInfo.position"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="staffInfo.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="saveInfo('updateInfo')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["staffInfo"],
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 1000)
    };
    return {
      labelPosition: "right",
      rules:{
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          sex: [
            {required: true, message: '请输入员工性别', trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择入职日期', trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'},
          ],
          position: [
            {required: true, message: '请输入员工职位', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入员工地址', trigger: 'blur'}
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
    saveInfo(formName) {
      //save info method

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "员工信息修改成功！",
            type: "success",
            center: true,
            duration: 2000
          });
        } else {
          this.$message({
            message: "员工信息修改失败！请检查信息是否填写正确！",
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
<style scoped>
.el-input {
  width: 50%;
}
.el-button{
  width: 100px;
}
</style>