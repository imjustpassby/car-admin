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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
export default {
  name: "",
  props: [""],
  data() {
    return {
      rewardType: 'fitting',
      formData:{
        type: '',
        name: '',
        point: 0,
      },
      rules:{
        type: [{required: true, message: "请选择奖品类型"}],
        name: [{required: true, message: "请选择奖品"}],
        point: [{required: true, message: "请填写积分"}]
      },
      options:[
      ],
      storageData: [
        {
          name: "米其林轮胎19寸",
          date: "2018-02-02",
          count: "12",
          buyPrice: "120",
          sellPrice: "200"
        },
        {
          name: "导航仪",
          date: "2018-03-03",
          count: "10",
          buyPrice: "500",
          sellPrice: "888"
        },
        {
          name: "挡风玻璃",
          date: "2018-04-04",
          count: "3",
          buyPrice: "600",
          sellPrice: "1200"
        }
      ]
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.getOptions();
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
          this.$message({
            message: "添加奖品成功！",
            type: "success",
            center: true,
            duration: 2000
          });
        } else {
          this.$message({
            message: "添加奖品失败！请检查信息是否填写正确！",
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
.content-margin {
  margin: 0 12px;
}
.el-select{
  width: 100%;
}
</style>