<template>
  <div style="margin: 0 auto; width: 99%">
    <common-search
      ref="commoneSearch"
      :form_type="1"
      :search_type="'role'"
      @returnData="getData"
      @add="add"
    >
    </common-search>
    <el-table :data="tableData" stripe style="margin-top: 5rem">
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="code" label="角色编码"></el-table-column>
      <el-table-column prop="des" label="角色描述"></el-table-column>
      <el-table-column id="but" label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="del(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="allot(scope.row)" type="text" size="small"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow"
      style="text-align: right"
    >
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sumbit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonSearch from "../../component/CommonSearch.vue";
import global from "../../api/index";
const default_form = {
  id:'',
  name: "",
  code: "",
  des: "",
};
export default {
  name: "role",
  components: {
    CommonSearch,
  },
  data() {
    return {
      page: 1,
      totalRow: 0,
      size: 10,
      tableData: [],
      keywords: "",
      stripe: true,
      title: "",
      form: {
        id:'',
        name: "",
        code: "",
        des: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    getData(data) {
      this.tableData = data.list;
      this.totalRow = data.total;
      this.page = data.pager;
    },
    touch_search() {
      this.$refs.commoneSearch.form.size = this.size;
      this.$refs.commoneSearch.form.page = this.page;
      this.$refs.commoneSearch.onClickSearch();
    },
    handleSizeChange(val) {
      this.size = val;
      this.touch_search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.touch_search();
    },
    indexMethod(index) {
      return index + 1;
    },
    //编辑
    edit(val) {
      this.title = "编辑";
      this.form.id = val.id;
      this.form.name = val.name;
      this.form.code = val.code;
      this.form.des = val.des;
      this.dialogFormVisible = true;
    },
    //删除
    del(val) {
      console.log(val);
    },
    //分配权限
    allot(val) {
      console.log(val);
    },
    add() {
      this.form = Object.assign({}, default_form);
      this.title = "添加";
      this.dialogFormVisible = true;
    },
    sumbit() {
      let that = this;
      this.$confirm("是否确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
         if(that.title=='编辑'){
           global.put("/role",that.form).then((res)=>{
              that.$message.success("修改成功");
              that.touch_search();
              that.dialogFormVisible = false;
           }).catch((error)=>{
              console.log(error);
              that.$message.error(error.message);
           })
         }else{
           global.post("/role",that.form).then((res)=>{
             that.$message.success("添加成功");
             that.touch_search();
             that.dialogFormVisible = false;
           }).catch((error)=>{
             that.$message.error(error.message);
           })
         }
        })
        .catch(() => {
          that.dialogFormVisible = false;
        });
    },
  },
  mounted() {
    this.touch_search();
  },
};
</script>
<style scoped>
</style>