<template>
  <div class="header">
    <div class="logo">
      GGBeng
    </div>
    <div class="userInfo">
      <div style="margin-right:20px">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          :size="35"
        ></el-avatar>
      </div>
      <div>
        <el-dropdown trigger="click" size="small">
          <span style="color: #fff;cursor: pointer;">
            {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlerLoginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      nickname: state => state.userMsg.nickname
    })
  },
  methods: {
    handlerLoginOut() {
      window.localStorage.clear();
      this.$store.commit("clearUserMsg");
      this.$router.replace({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  background-color: rgb(84, 92, 100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    color: #fff;
    font-size: 30px;
  }
  .userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
<style lang='scss'>
.el-popper[x-placement^="bottom"] {
  margin-top: 16px;
}
</style>