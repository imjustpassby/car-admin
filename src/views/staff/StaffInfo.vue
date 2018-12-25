<template>
  <div>
    <el-tabs v-model="activeCard" type="card">
      <el-tab-pane label="员工管理" name="staffManage">
          <el-table
            :data="tableData"
            style="width: 100%;"
            highlight-current-row
          >
            <el-table-column prop="date" label="入职日期" fit align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" fit align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" fit align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" fit align="center"></el-table-column>
            <el-table-column prop="position" label="职位" fit align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="修改员工信息" name="updateInfo">
        <update-info :staffInfo='staffInfo'></update-info>
      </el-tab-pane>
      <el-tab-pane label="新增员工信息" name="createStaff">
        <create-staff></create-staff>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UpdateInfo from './components/UpdateInfo'
import CreateStaff from './components/CreateStaff'
export default {
  name: "StaffInfo",
  props: [""],
  data() {
    return {
      activeCard: "staffManage",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          sex: "男",
          phone: "13345678900",
          position: "维修",
          address: "上海市普陀区金沙江路 1 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          sex: "男",
          phone: "13345678900",
          position: "维修",
          address: "上海市普陀区金沙江路 2 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          sex: "男",
          phone: "13345678900",
          position: "维修",
          address: "上海市普陀区金沙江路 3 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          sex: "男",
          phone: "13345678900",
          position: "维修",
          address: "上海市普陀区金沙江路 4 弄"
        }
      ],
      staffInfo: {
        date: "",
        name: "",
        sex: "",
        phone: "",
        position: "",
        address: ""
      }
    };
  },

  components: {
    UpdateInfo,
    CreateStaff
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      this.staffInfo = this.tableData[index];
      this.activeCard = "updateInfo";
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该员工信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          //delete method
          this.tableData.splice(index,1);
          this.$message({
            type: "success",
            message: "员工信息删除成功!",
            center: true,
            duration: 2000
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true,
            duration: 2000
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
