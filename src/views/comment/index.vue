<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>

    <!-- 表格组件 -->
    <el-table :data="list">
      <!-- 使用el-table-column作为列 -->
      <!-- prop 表示显示的字段 label表示表头 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formaterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 可以放组件 -->
         <el-button size="small" type="text">修改</el-button>
          <el-button size="small" type="text">关闭</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then((result) => {
        // console.log(result)
        this.list = result.data.results
      })
    },
    formaterBool (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
