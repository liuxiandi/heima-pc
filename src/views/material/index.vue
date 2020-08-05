<template>
  <!-- el-card布局 -->
  <el-card>
    <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
    <bread-crumb slot="header">
      <!-- 具名插槽 template不生成任何实质标签-->
      <template slot="title">素材管理</template>
    </bread-crumb>

    <!-- 放置标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">全部素材</el-tab-pane>
      <el-tab-pane label="收藏素材" name="second">收藏素材</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      //   定义一个数组 接受全部素材的数据
      list: []
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false
        },
        //   data参数放的是body参数
        data: {}
      }).then(result => {

      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style>
</style>
