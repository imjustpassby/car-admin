<template>
  <div>
    <el-table :data="rewardTable" style="width: 100%;" highlight-current-row>
      <el-table-column prop="name" label="配件名" fit align="center"></el-table-column>
      <el-table-column prop="point" label="积分" fit align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input-number v-model="scope.row.point" class="edit-input" size="small"></el-input-number>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >取消</el-button>
          </template>
          <span v-else>{{scope.row.point}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >Ok</el-button>
          <div v-else>
            <el-button size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      rewardTable: [
        {
          name: "导航仪",
          point: 8000,
          originalPoint: 8000,
          edit: false
        },
        {
          name: "洗车服务",
          point: 500,
          originalPoint: 500,
          edit: false
        }
      ],
      cusData: [
        {
          name: "胡凯莉1",
          phone: "13313313311",
          plate: "粤A11111",
          brand: "法拉利",
          date: "2018-12-20",
          balance: "1000",
          point: "145"
        },
        {
          name: "胡凯莉2",
          phone: "13313222222",
          plate: "粤B22222",
          brand: "日产",
          date: "2018-11-30",
          balance: "1200",
          point: "567"
        },
        {
          name: "胡凯莉3",
          phone: "13313313333",
          plate: "粤C33333",
          brand: "奔驰",
          date: "2018-10-07",
          balance: "800",
          point: "898"
        },
        {
          name: "胡凯莉4",
          phone: "13313313344",
          plate: "粤D44444",
          brand: "宝骏",
          date: "2018-08-07",
          balance: "500",
          point: "444"
        },
        {
          name: "胡凯莉5",
          phone: "13313313355",
          plate: "粤R99991",
          brand: "保时捷",
          date: "2018-01-07",
          balance: "10000",
          point: "666"
        }
      ]
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该奖品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //delete method
          this.rewardTable.splice(index, 1);
          this.$message({
            type: "success",
            message: "奖品信息删除成功!",
            center: true,
            duration: 2000
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true,
            duration: 2000
          });
        });
    },
    cancelEdit(row) {
      row.point = row.originalPoint;
      row.edit = false;
      this.$message({
        message: "取消操作",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalPoint = row.point;
      this.$message({
        message: "更新成功",
        type: "success"
      });
    }
  }
};
</script>
<style scoped>
.edit-input-number {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.el-table {
  border: 1px solid #ebeef5;
  border-radius: 0;
  padding: 0;
}
</style>