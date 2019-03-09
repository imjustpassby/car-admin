<template>
  <div>
    <el-button
      :loading="downloadLoading"
      style="margin:0 0 20px 0;"
      type="primary"
      icon="el-icon-download"
      @click="handleDownload"
    >导出Excel</el-button>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="员工管理" name="staffManage">
        <el-table :data="tableData" style="width: 100%;" highlight-current-row>
          <el-table-column prop="date" label="入职日期" fit align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" fit align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" fit align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" fit align="center"></el-table-column>
          <el-table-column prop="position" label="职位" fit align="center"></el-table-column>
          <el-table-column prop="address" label="地址" align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="修改员工信息" name="updateInfo">
        <update-info :staffInfo="staffInfo" v-on:isUpdated="getList"></update-info>
      </el-tab-pane>
      <el-tab-pane label="新增员工信息" name="createStaff">
        <create-staff v-on:isCreated="getList"></create-staff>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStaffList, deleteStaff } from "@/api/staff.js";
import UpdateInfo from "./components/UpdateInfo";
import CreateStaff from "./components/CreateStaff";
export default {
  name: "StaffInfo",
  props: [""],
  data() {
    return {
      activeCard: "staffManage",
      tableData: [],
      staffInfo: {},
      downloadLoading: false,
      filename: "员工信息",
      autoWidth: true,
      bookType: "xlsx"
    };
  },

  components: {
    UpdateInfo,
    CreateStaff
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      this.tableData = [];
      getStaffList()
        .then(res => {
          this.tableData = res.result;
        })
        .catch();
    },
    handleEdit(index, row) {
      this.staffInfo = row;
      this.activeCard = "updateInfo";
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该员工信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteStaff(row)
            .then(res => {
              this.getList();
              this.$message({
                type: "success",
                message: "员工信息删除成功!",
                center: true,
                duration: 2000
              });
            })
            .catch();
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
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["入职日期","姓名","性别","电话","职位","地址"];
        const filterVal = ['date', 'name', 'sex', 'phone','position','address']
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
};
</script>

<style scoped>
</style>
