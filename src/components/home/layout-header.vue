<template>
  <el-row type="flex" align="middle" class='layout-header'>
  <el-col class="left" :span="12">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col class="right" :span="12">
      <el-row type='flex' align="middle" justify="end">
          <img :src="userInfo.photo" alt="">
           <el-dropdown trigger='click' @command="clickMenu">
               <!-- 显示的内容 -->
               <span>{{userInfo.name}}</span>
               <i class="el-icon-caret-bottom"></i>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件-->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>

                </el-dropdown-menu>
           </el-dropdown>
      </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      // alert('点击了菜单' + command)
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/liuxiandi/heima-pc'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
    //   获取用户的个人信息
    this.$axios({
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      } // 请求头参数 headers放置请求头参数
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
        height: 60px;
        .left {
            i {
                font-size: 15px;
            }
            span {
                margin-left: 10px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
            i {
                font-size: 15px;
                margin-left: 5px;
            }
        }
    }
</style>
