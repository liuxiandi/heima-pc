<template>
  <div class="second_home">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3723735161,3499796594&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3463297378,2800532660&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=94929661,172192544&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2244546120,2806054669&fm=26&gp=0.jpg'
      ]
    }
  }
}
</script>

<style>
.second_home {
  height: calc(100vh - 60px);
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595424172917&di=d90bffeca1da93c26a651fee9c0da6d0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F28%2F20160828025842_SxYkf.jpeg");
  background-size: cover;
}
</style>
