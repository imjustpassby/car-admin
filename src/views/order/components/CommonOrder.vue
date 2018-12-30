<template>
  <div>
    <el-form
      :model="commonOrder"
      ref="commonOrder"
      :rules="rules"
      :label-position="labelPosition"
      label-width="120px"
    >
      <span class="form-item">车辆信息</span>
      <el-form-item label="车牌" required>
        <el-col :span="8">
          <el-input v-model="commonOrder.cusInfo[0].plate"></el-input>
        </el-col>
      </el-form-item>
      
      <el-form-item label="汽车品牌" required>
        <el-col :span="8">
          <el-input v-model="commonOrder.cusInfo[0].brand"></el-input>
        </el-col>
      </el-form-item>

      <span class="form-item">业务选择</span>
      <el-form-item label="日期" prop="date">
        <el-col :span="8">
          <el-date-picker
          v-model="commonOrder.date"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="请选择业务" prop="services">
        <el-col :span="21">
          <el-select v-model="commonOrder.services" multiple placeholder="请选择业务（可多选）">
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

        <el-col :span="21" style="margin-top:16px;">
          <el-table :data="fittingTable" :summary-method="getSummaries" show-summary highlight-current-row>
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
        <el-button type="warning" round @click="submitForm('commonOrder')">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getStorageList} from '@/api/storage.js'
import { currency } from "@/utils/currency";
export default {
  name: "CommonOrder",
  props: [""],
  data() {
    return {
      isSubmit: false,
      labelPosition: "right",
      rules: {
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
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
      fittings: [],
      commonOrder: {
        orderType: "普通客户",
        cusInfo: [
          {
            name: "普通客户",
            phone: null,
            plate: null,
            brand: null,
            date: null,
            balance: null,
            point: null
          }
        ],
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
            name: "",
            sellPrice: null,
            count: null,
            total: null
          };
          if (fitting == item.name) {
            arrItem.name = item.name;
            arrItem.sellPrice = item.sellPrice;
            arrItem.count = 1;
            arrItem.total =
              parseFloat(arrItem.sellPrice) * parseInt(arrItem.count);
            arr.push(arrItem);
          }
        });
      }
      this.commonOrder.fittings = arr;
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
      this.commonOrder.totalPrice = parseFloat(money);
      return money;
    }
  },

  watch: {},

  beforeMount() {},

  mounted() {
    getStorageList().then(res=>{
      this.storageData = res.result;
    }).catch();
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
          duration: 2000
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isSubmit){
            this.isSubmit = true;
            this.commonOrder.content = this.content;
            this.$alert("订单提交完成！", "完成", {
              confirmButtonText: "确定",
              callback: () => {
                this.$message({
                  type: "success",
                  message: "订单提交完成！",
                  center: true,
                  duration: 3000
                });
              }
            });
          } else {
            this.$message({
            message: "请刷新页面再提交新的表单！",
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