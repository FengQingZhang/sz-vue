<template>
  <el-form
    ref="form"
    style="display: inline"
    :model="this.form"
    label-width="80px"
    id="toolbar"
  >
    <el-form-item label="关键字">
      <el-input
        size="small"
        v-model="form.keywords"
        style="width: 140px"
      ></el-input>
    </el-form-item>
    <el-form-item id="button">
      <el-button size="medium" type="info" @click="onReset()">重置</el-button>
      <el-button size="medium" type="success" @click="onClickSearch()"
        >查询</el-button
      >
      <el-button
        v-if="this.search_type != 19"
        size="medium"
        type="primary"
        @click="onCreate()"
        >添加</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import global from "../api/index";
const constForm = {
  keywords: "",
  page: 1,
  size: 10,
  totalRow: 0,
  search_type: "",
};
export default {
  name: "common-search",
  props: ["form_type", "search_type"],
  data() {
    return {
      form: {
        keywords: "",
        page: 1,
        size: 10,
        totalRow: 0,
        search_type: "",
      },
       //动态切换搜索表单form_type: "",
      //发给后台的查询类型search_type: "", 
    }
  },
  methods: {
    onClickSearch() {
      this.form.search_type = this.search_type;
      let that = this;
      global
        .post("/common/search",that.form)
        .then((res) => {
          that.$emit("returnData", res.data.data);
        })
        .catch((error) => {
          that.$message.error(error);
        });
    },
    onCreate() {
      this.$emit("add");
    },
    onReset() {
      this.form = Object.assign({}, constForm);
    },
  },
};
</script>
<style scoped>
#toolbar {
  width: 100%;
  overflow: auto;
  display: block;
}
#toolbar > * {
  float: left;
  margin: 0;
  height: 50px;
}
#toolbar #button {
  float: right;
  margin: 0 0 0 -60px;
}
#toolbar #button div {
  margin: 0;
}
</style>