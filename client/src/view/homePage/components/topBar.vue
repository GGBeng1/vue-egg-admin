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
      @click="toggleTab(item, $event)"
      @close="closeTab(item, $event)"
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      tabsList: state => state.tabsList,
      defaultActive: state => state.defaultActive
    })
  },
  mounted () {},
  methods: {
    toggleTab (ele, e) {
      this.tabsList.forEach((item, index) => {
        // 让所有标签样式的重置
        item.type = 'info'
        if (item.path == ele.path) {
          // 跳转到当前点击的路由页面
          this.$router.push(item.path)
          // 关联菜单栏的被激活状态
          this.$store.commit('defaultActive', ele.path)
        }
      })
      // 设置当前点击标签样式
      this.$store.commit('changeColor', ele.path)
    },
    closeTab (item, e) {
      // cloleTab
      // console.log("close", item, e);
      this.$store.commit('cloleTab', item.path)
      const art = this.tabsList[this.tabsList.length - 1]
      this.$store.commit('defaultActive', art.path)
      this.$store.commit('changeColor', art.path)
      this.$router.push(art.path)
    }
  }
}
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
