<template>
  <div class="index-background">
    <el-container class="container">
      <el-header>
        <div class="index-title">
          <div style="width: 210px; height: 60px; margin-left: -2px">
            <img
              src="../assets/index/logo.png"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="index-title-text">
            <span v-text="title"></span>
          </div>
        </div>
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="transparent"
          text-color="#BFBFBF"
          active-text-color="#ffd04b"
          @select="handleSelect"
          router
        >
          <el-menu-item :index="path.home" v-autoClick>首页</el-menu-item>
          <template v-for="(menu, index) in menus">
            <!-- 主菜单如果有子菜单，输出el-submenu -->
            <el-submenu
              v-if="menu.submenu != undefined"
              :key="menu.id"
              :index="index.toString()"
            >
              <template slot="title">{{ menu.name }}</template>
              <!-- 判断子菜单下是否还有子菜单 -->
              <template v-for="(second, secondindex) in menu.submenu">
                <el-submenu
                  v-if="second.submenu != undefined"
                  :key="second.id"
                  :index="index + '-' + secondindex"
                >
                  <template slot="title">{{ second.name }}</template>
                  <template v-for="thrid in second.submenu">
                    <el-menu-item :key="thrid.id" :index="thrid.url">{{
                      thrid.name
                    }}</el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :key="second.id" :index="second.url">
                  {{ second.name }}
                </el-menu-item>
              </template>
            </el-submenu>
            <!-- 如果没有子菜单直接输出文字 -->
            <el-menu-item v-else :key="menu.id" :index="menu.url">{{
              menu.name
            }}</el-menu-item>
          </template>
        </el-menu>
        <!-- 选项卡 -->
        <self-tab-bar style="marign-top: 10px"></self-tab-bar>
      </el-header>
      <el-main style="display: flex; padding: 0">
        <router-view></router-view>
      </el-main>
      <!-- <el-footer class="foot-background"></el-footer> -->
    </el-container>
  </div>
</template>
<script>
import { path } from "../router/index";
import global from "../api/index";
import { mapActions, mapState } from "vuex";
import SelfTabBar from "../component/TabBar.vue";
const menuMap = new Map();
export default {
  name: "index",
  components: {
    SelfTabBar,
  },
  directives: {
    autoClick: {
      inserted: function (el) {
        el.click();
      },
    },
  },
  data() {
    return {
      title: "自定义系统名",
      menus: [],
      activeIndex: "/home",
      path,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == null || key == 0) {
        this.$router.push("/home");
        return false;
      } else if (key.indexOf("/") < 0) {
        return false;
      }
      let tabBar = {
        url: key,
        name: menuMap.get(key),
      };
      if (this.tabList.length != 0) {
        let flag = this.tabList.some((iiem) => {
          if (iiem.url == key) {
            return true;
          }
        });
        if (!flag) {
          this.addTab(tabBar);
        }
      } else {
        this.addTab(tabBar);
      }
    },
    getMenusMap(menus) {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].url) {
          menuMap.set(menus[i].url, menus[i].name);
        } else if (menus[i].submenu) {
          this.getMenusMap(menus[i].submenu);
        }
      }
    },
    ...mapActions({
      addTab: "addTab",
    }),
  },
  computed: mapState({
    tabList: "tabList",
  }),
  created() {
    let that = this;
    global
      .get("/menu")
      .then(function (res, req) {
        that.menus = res.data.data;
        that.getMenusMap(that.menus);
        if (that.addTab.length == 0) {
          let tabBar = {
            url: "/home",
            name: "首页",
          };
          that.$store.commit('ADDTAB',tabBar)
        }
      })
      .catch((error) => {
        that.$message.error(error.message);
      });
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.container {
  height: 100%;
}
.el-header,
.el-footer {
  line-height: 10%;
  width: 100%;
}
.el-main {
  height: 80%;
  width: 100%;
  line-height: 80%;
  margin-top: 7rem;
}
.index-title {
  background: no-repeat url("../assets/index/title.png");
  width: 100%;
  height: 98%;
  background-size: 100% 104%;
}
.foot-background {
  background: no-repeat url("../assets/index/foot.jpg");
  width: 100%;
  height: 10%;
  background-size: 100% 100%;
}
.index-title-text {
  color: #00ccff;
  font-family: YouYuan;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 5px;
  margin-top: -2.2%;
}
.index-background {
  background: no-repeat url("../assets/index/index_background.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 18%;
  z-index: 1;
}
</style>