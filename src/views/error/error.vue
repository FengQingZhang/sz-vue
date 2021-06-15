<template>
  <div class="error">
    <h1><img src="../../assets/error/404.png" alt="404">404</h1>
    <span> &nbsp;&nbsp;&nbsp;页面走丢了！！！</span>
    <div style="margin-top:20px">
        <el-button  type="warning">返回首页</el-button>
    </div>
    
  </div>
</template>
<script>
export default {
   name:"404",
   data(){
       return{
           src:'../assets/error/404.png'
       }
   }
}
</script>
<style  scoped>
    .error{
       justify-content: center;
       align-items: center;
       text-align: center;
       width: 100%;
    }
    .error h1{
        font-size: 10rem;
        color: #f89706;
        margin-bottom: 40px;
    }
    .error span{
        font-size: 2.1rem;
        margin-top: 5px;
    }
</style>