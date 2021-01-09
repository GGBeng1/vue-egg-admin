<template>
  <div class="page-404">
    <div class="text">
      <div>404!页面没找到！</div>
      <el-button @click="handlerGohome" type="text">点击回到主页</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  methods: {
    handlerGohome () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.page-404 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  .text {
    background-image: url("../../assets/img/404.png");
    background-repeat: no-repeat;
    background-size: 278px;
    background-position: center center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    font-size: 38px;
    padding-left: 50px;
    padding-top: 200px;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>
