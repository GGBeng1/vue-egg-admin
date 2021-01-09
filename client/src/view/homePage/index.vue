<template>
  <div class="home">
    <homeHeader :open.sync="open"></homeHeader>
    <div class="layout">
      <homeSide class="homeSide"></homeSide>
      <div class="main">
        <topBar></topBar>
        <homeMain class="homeMain"></homeMain>
      </div>
    </div>
    <userInfo :open.sync="open"></userInfo>
  </div>
</template>

<script>
import homeHeader from './components/header'
import homeMain from './components/main'
import homeSide from './components/side'
import userInfo from './components/userinfo'
import topBar from './components/topBar'
import { getHomeList } from '@/http/api.js'
export default {
  components: {
    homeHeader,
    homeMain,
    homeSide,
    userInfo,
    topBar
  },
  data () {
    return {
      // 是否显示用户信息
      open: false
    }
  },
  methods: {
    async init () {
      const res = await getHomeList()
      const { data, code } = res.data
      if (code == 200) {
        this.$store.commit('setUserInfo', data)
        const token = JSON.parse(window.localStorage.getItem('token'))
        if (token) {
          this.$store.commit('setUserToken', token)
        }
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .layout {
    height: calc(100% - 50px);
    display: flex;
    .main {
      width: 100%;
    }
    .homeMain {
      flex: 1;
    }
  }
}
</style>
