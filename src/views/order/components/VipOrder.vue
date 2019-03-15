<template>
  <div>
    <el-form
      :model="vipOrder"
      ref="vipOrder"
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

      <span class="form-item">业务选择</span>
      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
            v-model="vipOrder.date"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="请选择业务" prop="services">
        <el-col :span="21">
          <el-select v-model="vipOrder.services" multiple placeholder="请选择业务（可多选）">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <span class="form-item">项目花费</span>
      <el-form-item v-for="(item, index) in content" :label="'项目' + (index+1)" :key="item.key">
        <el-col :span="8">
          <el-input v-model="item.item"></el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <span>金额</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="item.cost" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            round
            class="content-margin"
            @click.prevent="removeContent(item)"
          >删除</el-button>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="addContent">添加项目</el-button>
      </el-form-item>

      <span class="form-item">配件清单</span>
      <el-form-item label="请选择配件" prop="fitting">
        <el-col :span="21">
          <el-select v-model="fittings" multiple placeholder="请选择配件（可多选）">
            <el-option
              v-for="item in storageData"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="配件信息">
        <el-col :span="21">
          <el-table
            :data="fittingTable"
            :summary-method="getSummaries"
            show-summary
            highlight-current-row
          >
            <el-table-column label="配件名" prop="name" fit align="center"></el-table-column>
            <el-table-column label="销售单价" prop="sellPrice" fit align="center">
              <template slot-scope="scope">{{scope.row.sellPrice | currency('¥')}}</template>
            </el-table-column>
            <el-table-column label="数量" prop="count" fit align="center">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="1"
                  v-model="scope.row.count"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="库存数量" prop="leftCount" fit align="center"></el-table-column>
            <el-table-column label="总价" prop="total" fit align="center">
              <template slot-scope="scope">{{scope.row.total | currency('¥')}}</template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>

      <span class="form-item">订单总价</span>
      <el-form-item>
        <el-col :span="4" :offset="17" class="total-price">{{totalPrice | currency('¥')}}</el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="submitForm('vipOrder')">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStorageList, descFitting } from "@/api/storage.js";
import { getCustomersList, changeBalance } from "@/api/customers.js";
import { newOrder } from "@/api/order";
import { currency } from "@/utils/currency";
import { Message, MessageBox } from "element-ui";
export default {
  name: "VipOrder",
  props: [""],
  data() {
    return {
      listLoading: false,
      isSubmit: false,
      isVip: false,
      labelPosition: "right",
      vipPhone: null,
      rules: {
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        services: [
          { required: true, message: "业务选择不能为空", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "汽车美容",
          label: "汽车美容"
        },
        {
          value: "汽车维修",
          label: "汽车维修"
        },
        {
          value: "配件购买",
          label: "配件购买"
        },
        {
          value: "汽车保养",
          label: "汽车保养"
        },
        {
          value: "汽车检测",
          label: "汽车检测"
        },
        {
          value: "汽车改装",
          label: "汽车改装"
        }
      ],
      content: [
        {
          item: "",
          cost: 0,
          key: 1545468633009
        }
      ],
      storageData: [],
      customersData: [],
      vipInfo: {},
      fittings: [],
      vipOrder: {
        orderType: "会员消费",
        cusInfo: {},
        date: null,
        services: [],
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
    fittingTable() {
      let arr = [];
      for (let fitting of this.fittings) {
        this.storageData.forEach((item, index) => {
          let arrItem = {
            id: null,
            name: "",
            sellPrice: null,
            count: null,
            total: null
          };
          if (fitting == item.name) {
            arrItem.id = item.id;
            arrItem.name = item.name;
            arrItem.sellPrice = item.sellPrice;
            arrItem.count = 1;
            arrItem.leftCount = item.count;
            arrItem.total =
              parseFloat(arrItem.sellPrice) * parseInt(arrItem.count);
            arr.push(arrItem);
          }
        });
      }
      this.vipOrder.fittings = arr;
      return arr;
    },
    totalPrice() {
      let money = 0;
      this.fittingTable.forEach(item => {
        money += parseFloat(item.total);
      });
      this.content.forEach(item => {
        money += parseFloat(item.cost);
      });
      money *= 0.95;
      this.vipOrder.totalPrice = parseFloat(money.toFixed(2));
      return money;
    },
    vipTable() {  
      let vip = [];
      vip[0] = this.vipInfo;
      this.vipOrder.cusInfo = this.vipInfo;
      return vip;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    getStorageList()
      .then(res => {
        let list = [];
        res.result.forEach(item=>{
          if (item.count > 0) {
            list.push(item);
          }
        })
        this.storageData = list;
      })
      .catch();
  },

  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, cur) => {
            const value = Number(cur);
            if (!isNaN(value)) {
              return prev + cur;
            } else {
              return prev;
            }
          }, 0);
          switch (column.property) {
            case "count":
              sums[index] += " 个";
              break;
            case "total":
              sums[index] = currency(sums[index], "¥");
              break;
            default:
              sums[index] = "";
              break;
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    addContent() {
      this.content.push({
        item: "",
        cost: 0,
        key: Date.now()
      });
    },
    removeContent(item) {
      if (this.content.length == 1) {
        this.$message({
          message: "不能继续删除！请填写完整项目信息！",
          type: "error",
          center: true,
          duration: 3000
        });
      } else {
        var index = this.content.indexOf(item);
        if (index !== -1) {
          this.content.splice(index, 1);
        }
      }
    },
    handleEdit(index, row) {
      this.fittingTable[index].count = row.count;
      this.fittingTable[index].total =
        parseFloat(row.sellPrice) * parseInt(row.count);
    },
    submitForm(formName) {
      if (!this.isVip) {
        this.$message({
          message: "请选择会员！",
          type: "error",
          center: true,
          duration: 3000
        });
        return false;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (!this.isSubmit) {
              this.vipOrder.content = this.content;
              this.checkBalance();
            } else {
              this.$message({
                message: "请刷新页面再提交新表单！",
                type: "error",
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
    },
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
              duration: 3000
            });
          }
        })
        .catch();
    },
    checkBalance() {
      let lack =
        parseFloat(this.vipOrder.cusInfo.balance) -
        parseFloat(this.vipOrder.totalPrice);
      let money = currency(-lack, "¥");
      if (lack < 0) {
        MessageBox.confirm(
          `该会员余额不足，请提醒充值 ${money} 元。完成本次订单后请转移到“会员充值”页面。`,
          "余额不足",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            changeBalance({
              id: this.vipInfo.id,
              total: this.vipOrder.totalPrice.toFixed(2)
            })
              .then()
              .catch();
            newOrder(this.vipOrder)
              .then()
              .catch();
            descFitting(this.vipOrder.fittings)
              .then()
              .catch();
            this.isSubmit = true;
            this.isVip = false;
            this.$message({
              type: "warning",
              message: `本次订单提交完成，请转移到 "会员充值" 页面。`,
              center: true,
              duration: 3000
            });
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "订单未提交！",
              center: true,
              duration: 3000
            });
          });
      } else {
        MessageBox.confirm("确认订单！", "请确认提交订单！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            changeBalance({
              id: this.vipInfo.id,
              total: this.vipOrder.totalPrice.toFixed(2)
            })
              .then()
              .catch();
            newOrder(this.vipOrder)
              .then()
              .catch();
            descFitting(this.vipOrder.fittings)
              .then()
              .catch();
            this.isVip = false;
            this.isSubmit = true;
            this.$message({
              type: "success",
              message: "订单提交完成！",
              center: true,
              duration: 3000
            });
          })
          .catch(() => {
            this.$message({
              type: "success",
              message: "订单未提交！",
              center: true,
              duration: 3000
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.content-margin {
  margin: 0 12px;
}
.total-price {
  color: orange;
  font-size: 30px;
}
</style>