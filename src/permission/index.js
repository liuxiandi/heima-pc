// 新建一个permission文件，在permission新建一个权限的js

import router from '@/router'

// 注册全局前置守卫
// 回调函数会在路由发生改变之前执行
// next有三种场景
router.beforeEach(function (to, from, next) {
  // 判断需要拦截哪些页面 如果页面地址是以/home开头的 需要判断有没有token
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
