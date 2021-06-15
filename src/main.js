import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cookies from 'vue-cookies';
import store from './vuex/store';
import layer from 'vue-layer';
import 'vue-layer/lib/vue-layer.css';


Vue.use(cookies)
Vue.use(Element)
Vue.prototype.$layer = layer(Vue);
var vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vue;
