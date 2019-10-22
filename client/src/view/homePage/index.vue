<template>
  <div class="home">
    <homeHeader :open.sync="open"></homeHeader>
    <div class="layout">
      <homeSide class="homeSide"></homeSide>
      <homeMain class="homeMain"></homeMain>
    </div>
    <userInfo :open.sync="open"></userInfo>
  </div>
</template>

<script>
import homeHeader from "./components/header";
import homeMain from "./components/main";
import homeSide from "./components/side";
import userInfo from "./components/userinfo";
import { getHomeList } from "@/http/api.js";
export default {
  components: {
    homeHeader,
    homeMain,
    homeSide,
    userInfo
  },
  data() {
    return {
      //是否显示用户信息
      open: false
    };
  },
  methods: {
    async init() {
      let res = await getHomeList();
      // console.log(res);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .layout {
    height: calc(100% - 50px);
    display: flex;
    .homeMain {
      flex: 1;
    }
  }
}
</style>