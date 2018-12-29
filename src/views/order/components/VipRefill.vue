<template>
  <div>
    <el-form 
    :model="vipRefill"
    ref="vipRefill" 
    :rules="rules" 
    :label-position="labelPosition" 
    label-width="120px"
    >
      <span class="form-item">会员选择</span>
      <el-form-item label="请选择会员">
        <el-col :span="8">
          <el-input placeholder="请输入会员手机" v-model="vipPhone"></el-input>
        </el-col>
        <el-button
          type="primary"
          circle
          class="content-margin"
          icon="el-icon-search"
          @click="getVipInfo"
        ></el-button>
      </el-form-item>
      
      <el-form-item label="会员信息">
        <el-col :span="21">
          <el-table :data="vipTable">
            <el-table-column prop="name" label="姓名" fit align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" fit align="center"></el-table-column>
            <el-table-column prop="plate" label="车牌" fit align="center"></el-table-column>
            <el-table-column prop="brand" label="汽车品牌" fit align="center"></el-table-column>
            <el-table-column prop="date" label="日期" fit align="center"></el-table-column>
            <el-table-column prop="balance" label="余额" fit align="center">
              <template slot-scope="scope">{{ scope.row.balance | currency('¥') }}</template>
            </el-table-column>
            <el-table-column prop="point" label="积分" width="120" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-form-item>

      <span class="form-item">会员充值</span>
      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="vipRefill.date"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="充值金额" required>
        <el-col :span="8">
          <el-input-number v-model.number="vipRefill.totalPrice" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-col>
      </el-form-item>

      <span class="form-item">订单总价</span>
      <el-form-item>
        <el-col :span="4" :offset="17" class="total-price">{{vipRefill.totalPrice | currency('¥')}}</el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('vipRefill')">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
export default {
  name: "VipRefill",
  props: [""],
  data() {
    return {
      isSubmit: false,
      labelPosition: "right",
      vipPhone: null,
      isVip: false,
      rules:{
        date: [{ required: true, message: "请选择日期" }]
      },
      customersData: [
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-07-07",
          balance: "1000",
          point: "145"
        },
        {
          name: "胡凯莉2",
          phone: "13313313322",
          plate: "粤B22222",
          brand: "日产",
          date: "2018-07-07",
          balance: "1200",
          point: "567"
        },
        {
          name: "胡凯莉3",
          phone: "13313313333",
          plate: "粤C33333",
          brand: "奔驰",
          date: "2018-07-07",
          balance: "800",
          point: "898"
        },
        {
          name: "胡凯莉4",
          phone: "13313313344",
          plate: "粤D44444",
          brand: "宝骏",
          date: "2018-07-07",
          balance: "500",
          point: "444"
        },
        {
          name: "胡凯莉5",
          phone: "13313313355",
          plate: "粤R99991",
          brand: "保时捷",
          date: "2018-07-07",
          balance: "10000",
          point: "666"
        }
      ],
      vipInfo: {
        name: null,
        phone: null,
        plate: null,
        brand: null,
        date: null,
        balance: null,
        point: null
      },
      vipRefill: {
        orderType:'会员充值',
        cusInfo: [],
        date: null,
        services: ["会员充值"],
        content: [],
        fittings: [],
        totalPrice: 0
      }
    };
  },

  filters:{
    currency
  },

  components: {},

  computed: {
    vipTable() {
      let vip = [];
      vip[0] = this.vipInfo;
      this.vipRefill.cusInfo = vip;
      return vip;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getVipInfo() {
      let hasItem = false;
      this.customersData.forEach(item => {
        if (item.phone == this.vipPhone) {
          hasItem = true;
          this.isVip = true;
          this.vipInfo.name = item.name;
          this.vipInfo.phone = item.phone;
          this.vipInfo.plate = item.plate;
          this.vipInfo.brand = item.brand;
          this.vipInfo.date = item.date;
          this.vipInfo.balance = item.balance;
          this.vipInfo.point = item.point;
        }
      });
      if (hasItem) {
        this.$message({
          message: "已列出该会员信息！",
          type: "success",
          center: true,
          duration: 3000
        });
      } else {
        this.$message({
          message: "没有该会员！请检查手机号是否填写正确！",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },
    submitForm(formName) {
      if (!this.isVip) {
        this.$message({
          message: "请选择会员！",
          type: "error",
          center: true,
          duration: 2000
        });
        return false;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (!this.isSubmit){
              this.isSubmit = true;
              this.$message({
                message: "会员余额充值成功！",
                type: "success",
                center: true,
                duration: 3000
              });
            } else {
              this.$message({
                message: "请刷新页面再提交新表单！",
                type: "success",
                center: true,
                duration: 3000
              });
            }
          } else {
            this.$message({
              message: "订单提交失败！请检查信息是否填写正确！",
              type: "error",
              center: true,
              duration: 3000
            });
            return false;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.content-margin {
  margin: 0 12px;
}
.total-price {
  color: orange;
  font-size: 30px;
}
</style>