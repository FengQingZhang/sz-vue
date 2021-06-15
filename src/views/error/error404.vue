<template>
  <div class="error_box">
    <div class= "container">
      <img alt="404" src="../../assets/error/404.png" />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a @click="back" class="btn btn-primary btn_blue">返回主页</a>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
export default {
  name: "error404",
  methods: {
    back() {
      this.clearTab();
      this.$router.push("/index");
    },
    ...mapActions({
      clearTab:"clearTab",
    }),
  },
};
</script>
<style scoped>
.error_box {
  width:100%;
  height:100%;
  display:flex;
  justify-content: center;
  align-items: center;
  background: no-repeat url("../../assets/index/foot.jpg");
  background-size: 100% 100%;
}
h1,
h2,
h3,
h4,
h5,
p,
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  width: 50%;
  height: 50%;
}
.container {
  text-align: center;
}
 img {
  display: block;
  margin: auto;
}
 h2 {
  font-size: 32px;
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  padding-top: 33px;
  padding-bottom: 25px;
}
 p {
  font-size: 14px;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  padding-bottom: 35px;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn_blue {
  display: inline-block;
  height: 56px;
  line-height: 56px;
  text-align: center;
  border-radius: 3px;
  background: #7caced;
  color: #fff;
  letter-spacing: 5px;
  border: 0;
  font-size: 18px;
  padding: 0;
  text-decoration: none;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-property: background;
  transition-property: background;
}
 a {
  display: block;
  margin: auto;
  width: 220px;
  height: 56px;
}
</style>