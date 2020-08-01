import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入权限模块
import '@/permission'
// 引入ElementUI
import ElementUI from 'element-ui'
// 引入element-UI样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import Components from '@/components'
import axios from '@/utils/request'
Vue.config.productionTip = false
// vue.use相当于全局注册 一旦全局注册任何位置都可与使用组件 Vue.use实际上会调用element-ui对象
// 里面的一个install方法 并且传入当前的vue 对象
Vue.use(ElementUI)
Vue.use(Components)

Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
