<template>
  <!-- el-card布局 -->
  <el-card>
    <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
    <bread-crumb slot="header">
      <!-- 具名插槽 template不生成任何实质标签-->
      <template slot="title">素材管理</template>
    </bread-crumb>

    <!-- 放置标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTap">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url">
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏素材" name="second">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url">
          </el-card>
        </div>
        </el-tab-pane>
    </el-tabs>

    <!-- 分页组件 -->
    <el-row type='flex' justify="center" style='height:80px' align="middle">
          <!-- 放置分页组件
            total  总条数
            current-page 当前页码
            page-size 每页多少条
          -->
          <el-pagination background
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
            layout="prev, pager, next"
          ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',

      //   定义一个数组 接受全部素材的数据 和 收藏素材数据
      list: [],
      //  定义一个对象放置分页的数据
      page: {
        // 当前默认总数
        total: 0,
        // 默认第几页
        currentPage: 1,
        // 每页多少条数据
        pageSize: 8
      }
    }
  },
  methods: {
    // 页码切换时会执行 然后通过 @current-change="changePage" 在分页组件中监听
    changePage (newPage) {
      // 页码切换时 会传入一个新页 然后把newPage给到currentPage
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签事件
    changeTap () {
      // 将页码重置为第一页 因为分类变了数据也变了
      this.page.currentPage = 1
      // 根据当前activeName 来决定是获取的那个数据
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // 如果this.activeName === 'second' 那么为true 获取收藏的数据  如果点击的是全部数据那么this.activeName === 'second'为false 获取全部的数据
          collect: this.activeName === 'second',
          per_page: this.page.pageSize,
          page: this.page.currentPage
        },
        //   data参数放的是body参数
        data: {}
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
  .img-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-card {
          width: 150px;
          height: 150px;
          margin: 20px 30px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
          }
          .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
  }
</style>
