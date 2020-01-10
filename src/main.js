// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//图片预览插件
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts; //引入组件
Vue.use(ElementUI);
//引入g2
import G2 from '@antv/g2'
//引入 data-set模块
import DataSet from '@antv/data-set';
Vue.prototype.DataSet=DataSet;
Vue.use(G2);
//图片预览
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer);
// 这里是插件的默认设置
Viewer.setDefaults({
  zIndexInline: 9999
})
//引入jquery
import $ from 'jquery'
//引入axios
import axios from 'axios';
/*
* 创建axios实例
* */
/* 引入qs*/
import Qs from 'qs';
//定义全局定时器
Vue.prototype.timer=null;
/*
* 配置axios*/
//上传文件的路径
Vue.prototype.baseUrl='http://101.37.65.219/web/onlinework/file';
//获取缓存中的token
//localStorage.getItem('token')
let tokens=localStorage.getItem('token');
//获取缓存中的个人信息
const a=JSON.parse(localStorage.getItem('personal'));
Vue.prototype.persoanalMsg=a;
const server=axios.create({
  baseURL:'http://101.37.65.219',//http://101.37.65.219
  // http://192.168.0.107:9001
  timeout: 30000,
  // withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded',"X-Requested-With": "XMLHttpRequest","token":tokens },
  transformRequest: [data => {
    data = Qs.stringify(data);
    return data;
  }]
});

// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        localStorage.clear();
        router.replace({
          path: '/',
        });
        break
    }
  }
  // // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.axios=server;
Vue.use(vueSwiper);
Vue.config.productionTip = false;
//创建一个新的axios请求
Vue.prototype.$http = axios.create({
  baseURL:' http://101.37.65.219',//http://118.31.247.144:1027
  // http://192.168.0.103:9001
  // timeout: 20000
});

//引入自定义组件 place
import place from './place';
Vue.use(place);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
