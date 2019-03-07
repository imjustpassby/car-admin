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
          <el-table v-loading="listLoading" :data="vipTable" highlight-current-row>
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
          <el-input-number
            v-model.number="vipRefill.totalPrice"
            :min="0"
            :precision="2"
            :step="0.1"
          ></el-input-number>
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
import { currency } from "@/utils/currency";
import { newOrder } from "@/api/order";
import { getCustomersList, refill } from "@/api/customers.js";
export default {
  name: "VipRefill",
  props: [""],
  data() {
    return {
      listLoading: false,
      isSubmit: false,
      labelPosition: "right",
      vipPhone: null,
      isVip: false,
      rules: {
        date: [{ required: true, message: "请选择日期" }]
      },
      customersData: [],
      vipInfo: {},
      vipRefill: {
        orderType: "会员充值",
        cusInfo: {},
        date: null,
        services: ["会员充值"],
        content: [],
        fittings: [],
        totalPrice: 0
      }
    };
  },

  filters: {
    currency
  },

  components: {},

  computed: {
    vipTable() {
      let vip = [];
      vip[0] = this.vipInfo;
      this.vipRefill.cusInfo = this.vipInfo;
      return vip;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getVipInfo() {
      this.listLoading = true;
      getCustomersList()
        .then(res => {
          this.customersData = res.result;
          this.listLoading = false;
          let hasItem = false;
          this.customersData.forEach(item => {
            if (item.phone == this.vipPhone) {
              hasItem = true;
              this.isVip = true;
              this.vipInfo = item;
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
        })
        .catch();
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
            if (!this.isSubmit) {
              this.isSubmit = true;
              newOrder(this.vipRefill)
                .then()
                .catch();
              refill({
                id: this.vipInfo.id,
                total: this.vipRefill.totalPrice
              })
                .then()
                .catch();
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