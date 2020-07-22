<template>
  <el-container>
    <el-aside style="width:230px;">

      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding: 0;">

        <!-- 这离放二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import LayoutAside from '@/components/home/layout-aside'
// import LayoutHeader from '@/components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': LayoutAside,
  //   'layout-header': LayoutHeader
  // }
}
</script>

<style>
</style>
