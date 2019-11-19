<template>
  <div class="home">
    <homeHeader :open.sync="open"></homeHeader>
    <div class="layout">
      <homeSide class="homeSide"></homeSide>
      <div class="main">
        <topBar class="topBar"></topBar>
        <homeMain class="homeMain"></homeMain>
      </div>
    </div>
    <userInfo :open.sync="open"></userInfo>
  </div>
</template>

<script>
import homeHeader from "./components/header";
import homeMain from "./components/main";
import homeSide from "./components/side";
import topBar from "./components/topBar";
import userInfo from "./components/userinfo";
import { getHomeList } from "@/http/api.js";
export default {
  components: {
    homeHeader,
    homeMain,
    homeSide,
    userInfo,
    topBar
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
      let { code, data } = res.data;
      if (code == 200) {
        this.$store.commit("setUserInfo", data);
      }
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
    .main {
      height: 100%;
      flex: 1;
      .tabBar {
        height: 40px;
      }
      .homeMain {
        box-sizing: border-box;
        height: calc(100% - 40px);
      }
    }
  }
}
</style>