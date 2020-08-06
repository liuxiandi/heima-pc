import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址

// 对axios返回的数据进行自定义处理 用JSONBig.parse代替原来的json
// transformResponse中要返回处理的结果
// transformResponse是所有请求字符串 转化成对象的入口 在这个位置处理就相当于所有接口都处理了
axios.defaults.transformResponse = [function (data) {
  // data是响应回来的字符串
  return data ? JSONBig.parse(data) : {}
}]
// 在请求拦截器中对所有接口进行统一注入token
axios.interceptors.request.use(function (config) {
  // 成功时执行  第一个 参数 会有一个config  config 就是所有的axios的请求信息
  // 在第一个函数中 需要将配置进行返回  返回的配置 会作为 请求参数进行请求
//     在返回之前 就是我们统一注入token的最佳时间
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数是响应体
  // 在拦截器中 需要将数据返回 将数据进行解构
  return response.data ? response.data : {}
  // 成功的时候执行
}, function (error) {
  // 失败的时候执行
  if (error.response.status === 401) {
    // 删除钥匙
    localStorage.removeItem('user-token')
    // 直接导入路由实例对象 使用跳转方式和组件中的this.$router是一样的
    // 跳回登录页
    // this.$router 是错误的  this不是组件实例
    router.push('./login')
  }

  // 进行错误处理
  return Promise.reject(error)
})

export default axios
