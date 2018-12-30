<template>
  <div>
    <el-form
      :model="formData"
      ref="addReward"
      :rules="rules"
      label-position="right"
      label-width="120px"
    >
      <span class="form-item">添加奖品</span>
      <el-form-item label="奖品类型" prop="type">
        <el-radio-group v-model="formData.type" >
          <el-radio label="商品类" @change="rewardType = 'fitting'"></el-radio>
          <el-radio label="服务类" @change="rewardType = 'service'"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="奖品设置" prop="name">
        <div v-if="rewardType == 'fitting'">
          <el-col :span="8">
            <el-select v-model="formData.name" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </div>
        <div v-else>
          <el-col :span="8">
            <el-input v-model="formData.name"></el-input>
          </el-col>
        </div>
      </el-form-item>

      <el-form-item label="积分" prop="point">
        <el-col :span="8">
          <el-input-number v-model.number="formData.point" :min="0" :step="1"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('addReward')">完成</el-button>
        <el-button round @click="resetForm('addReward')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getStorageList} from '@/api/storage.js'
import {currency} from '@/utils/currency'
export default {
  name: "AddReward",
  props: [""],
  data() {
    return {
      isSubmit: false,
      rewardType: 'fitting',
      formData:{
        type: '',
        name: '',
        point: 0,
        originalPoint: 0,
        edit: false
      },
      rules:{
        type: [{required: true, message: "请选择奖品类型"}],
        name: [{required: true, message: "请选择奖品"}],
        point: [{required: true, message: "请填写积分"}]
      },
      options:[
      ],
      storageData: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getStorageList().then(res=>{
      this.storageData = res.result;
      this.getOptions();
    }).catch();
  },

  methods: {
    getOptions(){
      this.storageData.forEach(item=>{
        let sellPrice = currency(item.sellPrice,'¥');
        let option = {
          value: item.name,
          label: `${item.name}，售价 ${sellPrice} 元`
        };
        this.options.push(option);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isSubmit){
            this.isSubmit = true;
            this.formData.originalPoint = this.formData.point;
            this.$message({
              message: "添加奖品成功！",
              type: "success",
              center: true,
              duration: 3000
            });
          }else{
            this.$message({
              message: "请点击重置按钮再提交新表单！",
              type: "error",
              center: true,
              duration: 3000
            });
          }
        } else {
          this.$message({
            message: "添加奖品失败！请检查信息是否填写正确！",
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
.content-margin {
  margin: 0 12px;
}
.el-select{
  width: 100%;
}
</style>