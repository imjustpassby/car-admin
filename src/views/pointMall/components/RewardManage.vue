<template>
  <div>
    <el-table :data="rewardTable" style="width: 100%;" highlight-current-row>
      <el-table-column prop="name" label="奖品" fit align="center"></el-table-column>
      <el-table-column prop="type" label="类型" fit align="center"></el-table-column>
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
import {getRewardList} from '@/api/pointMall.js'
export default {
  name: "RewardManage",
  props: [""],
  data() {
    return {
      rewardTable: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    getRewardList().then(res=>{
      this.rewardTable = res.result;
    }).catch();
  },

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
.edit-input {
  position: absolute;
  left: 15px;
  top: 10px;
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