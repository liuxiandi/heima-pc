<template>
  <el-row type="flex" align="middle" class='layout-header'>
  <el-col class="left" :span="12">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col class="right" :span="12">
      <el-row type='flex' align="middle" justify="end">
          <img src="../../assets/img/22.png" alt="">
           <el-dropdown trigger='click'>
               <!-- 显示的内容 -->
               <span>旁白先生</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件-->
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>

                </el-dropdown-menu>
           </el-dropdown>
      </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {

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
        }
    }
</style>
