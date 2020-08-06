<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>

    <!-- 表格组件 -->
    <el-table :data="list">
      <!-- 使用el-table-column作为列 -->
      <!-- prop 表示显示的字段 label表示表头 -->
      <el-table-column prop="title" width="550" label="标题"></el-table-column>
      <el-table-column :formatter="formaterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 可以放组件 -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <!-- 文本内容要根据 当前行里面的评论状态决定显示还是隐藏 -->
          <el-button
            @click="openOrclose(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev, pager, next" :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页组件需要的参数 单独放置一个对象
      page: {
        // 默认总数
        total: 0,
        // 默认页码是第几页
        currentPage: 1,
        //  每页显示条目个数 默认值是10
        pageSize: 10
      },
      list: [],
      loading: false
    }
  },
  methods: {
    // 捕获页码的改变事件 监听页码改变事件current-change  将最新的页码赋值给当前页面 然后重新加载数据
    changePage (newPage) {
      // alert(newPage)
      // newPage是最新的切换页码
      this.page.currentPage = newPage
      // 重新拉去数据
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then((result) => {
        // console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    formaterBool (row, column, cellvalue, index) {
      // row 代表当前的一行数据
      // column代表当前的列信息
      // cellvalue 代表当前的单元格的值
      // index代表当前的索引
      return cellvalue ? '正常' : '关闭'
    },
    openOrclose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          // query 参数
          params: {
            // 参数的文章id
            article_id: row.id.toString()
            // 前端传字符串到后端 只要和原数字一样就行 后端会自动将字符串转换成大数字类型
          },
          data: {
            // 是打开还是关闭  此状态和评论状态相反
            allow_comment: !row.comment_status
          }
        })
          .then(() => {
            this.$message.success(`${mess}评论成功`)
            // 重新拉取数据
            this.getComment()
          })
          .catch(() => {
            this.$message.error(`${mess}评论失败`)
          })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
