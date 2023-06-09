import Vue from 'vue'
import App from './App'
import store from "./store/store.js"

// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http

// 请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options) {
  // 展示loading效果
  uni.showLoading({
    title: "数据加载中..."
  })
  // 判断访问的是否为有权限的接口 包含/my是有权限的接口
  if (options.url.indexOf('/my/') !== -1) {
    // 访问有权限的接口 需要添加请求头信息 注入token
    options.header = {
      Authorization: store.state.user.token
    }
  }

}

//响应拦截器
$http.afterRequest = function() {
  //关闭loading效果
  uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  // 将 store 挂载到 Vue 实例上
  store
})
app.$mount()
