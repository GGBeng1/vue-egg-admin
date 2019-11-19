<template>
  <div class="top-bar">
    <!-- <ul class="tabs-list" v-for="" :key="index">
      <li>{{ item.name }}</li>
    </ul> -->
    <el-tag
      v-for="(item, index) in tabsList"
      :key="index"
      :closable="item.closable"
      :type="item.type"
      effect="plain"
      @click="toggleTab"
      @close="closeTab"
    >
      {{ item.name }}
    </el-tag>
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
      tabsList: state => state.tabsList,
      defaultActive: state => state.defaultActive
    })
  },
  mounted() {},
  methods: {
    toggleTab(e) {
      this.tabsList.forEach((item, index) => {
        // 让所有标签样式的重置
        item.type = "info";
        if (item.name.trim() === e.target.innerText.trim()) {
          // 跳转到当前点击的路由页面
          this.$router.push(item.path);
        }
      });
      // 关联菜单栏的被激活状态
      this.$store.commit("defaultActive", this.$route.path);
      // 设置当前点击标签样式
      this.$store.commit("changeColor", e.target.innerText);
    },
    closeTab(e) {
      console.log("close", e.target);
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
  .el-tag {
    margin-right: 5px;
    cursor: pointer;
  }
  .tabs-list {
    height: 100%;
    li {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding: 0px 10px;
      border-radius: 3px;
      color: #999;
      font-size: 14px;
      border: 1px solid #ccc;
    }
  }
}
</style>
