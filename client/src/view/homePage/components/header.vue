<template>
  <div class="header">
    <div class="logo">
      GGBeng
      <i
        class="el-icon-s-fold"
        style="color:#ffd04b;margin-left:20px;cursor:pointer;"
        v-if="!isCollapse"
        @click="changeIsCollapse"
      ></i>
      <i
        class="el-icon-s-unfold"
        style="color:#fff;margin-left:20px;cursor:pointer;"
        v-if="isCollapse"
        @click="changeIsCollapse"
      ></i>
    </div>
    <div class="userInfo">
      <div style="margin-right:20px">
        <el-avatar :src="avatarUrl" :size="35"></el-avatar>
      </div>
      <div>
        <el-dropdown trigger="click" size="small">
          <span style="color: #fff;cursor: pointer;">
            {{ userMsg.nickname
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlerRejectUserInfo"
              >个人信息</el-dropdown-item
            >
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
import { mapState, mapMutations } from "vuex";
import axios from "@/http/axios";
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseUrl: axios.defaults.baseURL
    };
  },
  computed: {
    ...mapState({
      userMsg: state => state.userMsg,
      isCollapse: state => state.isCollapse
    }),
    avatarUrl() {
      return this.baseUrl + this.userMsg.avatarUrl;
    }
  },
  methods: {
    ...mapMutations(["changeIsCollapse"]),
    handlerLoginOut() {
      window.localStorage.clear();
      this.$store.commit("clearUserMsg");
      this.$router.replace({
        path: "/"
      });
    },
    handlerRejectUserInfo() {
      this.$emit("update:open", true);
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
  padding: 0px 10px;
  .logo {
    color: #fff;
    font-size: 20px;
    height: 50px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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