<template>
    <el-container class="logindiv">
        <el-main class="box">
            <div class="childrenBox infobox">
                <div class="descbox">
                    <div style="font-family:fantasy;">
                        <div class="label-container" style="width:65%;height:30px">
                            <img src="../assets/login/sz.png" alt="" style="width:35px;height:35px;margin-left:10px">
                            <div style="font-size:1.814rem"><br>市政管理系统</div>
                        </div>
                        <br>
                        <div style="margin-left:10px;font-size:20px;margin-top:20px">
                            一个方便的系统
                        </div>
                        <div style="margin-left:10px;margin-top:40px;font-size:16px;">
                            道路检测数据轻松掌握，地图展示效果直观
                        </div>
                    </div>
                </div>
            </div>
            <div class="childrenBox formbox">
                <div class="lognbox">
                    <h1 class="formname">登录</h1>
                    <el-form style="margin-top:80px">
                        <el-form-item>
                            <el-input type="text" size="large" v-model="user.username" placeholder="账号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-checkbox v-model="checked" style="color:#D3DCE6;">记住我</el-checkbox>
                        </el-col>
                        <el-col :span="17">
                            <div style="float: right;">
                                <el-link type="info" style="color:#D3DCE6;">忘记密码</el-link>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:30px">
                        <el-button type="warning" style="width:350px" @click="login">登录</el-button>
                    </el-row>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import global from '../api/index'

    export default {
        name: "login",
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                input:'',
                url: '',
                fit: 'cover',
                checked: false,
                myWidth: document.body.clientWidth,
                myHeight: document.body.clientWidth,
            }
        },
        methods: {
            login() {
                let that = this;
                if (this.user.username == "") {
                    this.$message("用户名不能为空");
                    return false
                }
                if (this.user.password == "") {
                    this.$message("密码不能为空");
                    return false
                }
                let index = this.$layer.loading({content:'登录中，请稍候'});
                setTimeout(
                    that.login_request(index,that)
                ,3000)
                
            },
            login_request(index,that){
                global.post("/login", {
                    username: this.user.username,
                    password: this.user.password
                }).then(function (res, req) {
                        //that.$store.commit('setJwt', res.headers.jwtheadername);
                        localStorage.setItem("jwt",res.headers.jwtheadername);
                        that.$layer.close(index);
                        that.$router.push('/index');
                }).catch(error=>{
                    that.$layer.close(index);
                    that.$message.error(error.message);
                });
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 10%;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 10%;
    }

    .el-main {
        line-height: 80%;
    }

    .box {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: row;
    }

    .childrenBox {
        width: 500px;
        height: 500px;
        box-shadow: 2px 2px 10px #909090; /*opera或ie9*/
    }

    .infobox {
        background: no-repeat url("../assets/login/descbg.jpg");
        color: #333;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .formbox {
        background-color: rgba(0, 0, 0, 0.5) !important;
        color: #eee0e0;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .lognbox {
        width: 350px;
        height: 414px;
        color: #eee0e0;;
    }

    .descbox {
        width: 350px;
        height: 414px;
        color: #eee0e0;
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .descbox h1 h2 span {
        color: #f3eded;
    }

    .formname {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Liberation Sans", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, SimSun, "WenQuanYi Zen Hei Sharp", sans-serif;
        line-height: 1.33em;
        margin: calc(2rem - 0.165em) 0em 1rem;
        font-weight: bold;
        float: left;
    }

    .logindiv {
        background: no-repeat url("../assets/login/login_background.jpg");
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
    }

    .label-container {
        width: auto;
        display: flex;
    }
</style>
