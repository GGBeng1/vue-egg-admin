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
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tabsList: state => state.tabsList
    })
  },
  mounted() {
    // console.log('tabsList', this.$store.state.tabsList)
  }
}
</script>

<style lang="scss">
.top-bar {
  width: 100%;
  height: 40px;
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