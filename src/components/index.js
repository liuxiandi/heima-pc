// > Vue.use 是全局注册的方式 会调用 对象中的一个**`install`**方法,并且传入 Vue对象作为参数

// 我们需要把目前的组件引入注册形式 改成 Vue.use 的形式

// > 首先我们需要一个公共的注册的js文件, 这个文件负责 注册我们自己开发的所有的组件

// 在components文件夹下 新建一个**`index.js`**文件,作为公共的注册文件

// > 这个文件要完成所有的组件的注册 , 全局注册

// 需要使用vue.use的方法去注册
// vue.use会调用对象里面的install方法 install方法的第一个参数是Vue对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'

export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-header', LayoutHeader) // 注册头部组件
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
  }
}
