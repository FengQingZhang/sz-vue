import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Home from '../views/home.vue'
import Menu from '../views/setup/menu.vue'
import Role from '../views/setup/role.vue'
import global from '../api/index'
import app from '../main'
import store from '../vuex/store'
import Error from '../views/error/error404.vue'

Vue.use(Router)
export const path = {
  login: '/',
  index: '/index',
  home: '/home',
  menu: '/setup/menu',
  role: '/setup/role',
}

const router = new Router({
  routes: [
    {
      path: path.login,
      name: 'login',
      component: Login,
    },
    {
      path: path.index,
      name: 'index',
      components: {
        default: Index,
      },
      meta: {
        requireAuth: true,//跳转时是否需要检查token的标识
      },
      children: [
        {
          path: path.home,
          name: 'home',
          component: Home,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: path.menu,
          name: 'menu',
          component: Menu,
          meta: {
            requireAuth: true
          }
        },
        {
          path: path.role,
          name: 'role',
          component: Role,
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path:"*",
      name:"error",
      component:Error,
      meta:{
        requireAuth:false
      }
    }
  ]
})


// 每次跳转页面前，检查是否已经登录
router.beforeEach((to, from, next) => {
  //当跳转页时login时清空标签栏
  if (to.name == "login") {
    //清空标签栏
    store.dispatch('clearTab');
  }
  if (to.meta.requireAuth) {
    global.post("/user/check_login").then(function (res, req) {
      if(res.data.state=="ok"){
        if(res.data.data)
          localStorage.setItem("jwt",res.headers.jwtheadername);
        next();
      }else{
        store.dispatch('clearTab');
        app.$message(res.data.msg);
        next({ name: 'login' });
      }
    }).catch(error => {
      //清空标签栏
      store.dispatch('clearTab');
      app.$message(error.message);
      next({ name: 'login' });
    });
  } else {
    next()
  }

});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;