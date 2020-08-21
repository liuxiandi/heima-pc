<template>
  <el-card>
    <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
    <bread-crumb slot="header">
      <!-- 具名插槽 template不生成任何实质标签-->
      <template slot="title">内容列表</template>
    </bread-crumb>

    <el-form style="padding-left: 50px;">
      <el-form-item label="文章状态：">
        <el-radio-group v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道类型:">
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期范围:">
        <el-date-picker
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="searchForm.dateRange"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 页面主题结构 -->
    <el-card>
      <el-row class="totle" type="flex" align="middle">
      <span>共找到1000条符合条件的内容</span>
    </el-row>

    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag :type="item.status | filterType" class="tag" style="width: 60px;">{{item.status | filterStauts}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span><i class="el-icon-edit"></i>删除</span>
        <span><i class="el-icon-delete"></i>修改</span>
      </div>
    </div>
    </el-card>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null // 表示没有任何的频道
      },
      channels: [],
      dateRange: [],
      list: [],
      defaultImg: require('../../assets/img/xiujing.jpg')
    }
  },
  filters: {
    filterStauts (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    filterType (value) {
      switch (value) {
        case 1:
          return 'info'
        case 2:
          return 'warning'
        case 3:
          return 'success'
        case 4:
          return 'danger'
      }
    }
  },

  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    getArticles () {
      this.$axios({
        url: '/articles',
        method: 'get'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
  .totle {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 150px;
        height: 100px;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100px;
        justify-content: space-around;
        margin-left: 10px;
        .date {
          color: #999;
          font-size:12px;
        }
        .tag {
          color: #999;
          font-size:12px;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
         margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
