<template>
  <div class="side">
    <el-menu
      class="side-nav"
      :collapse="isCollapse"
      :default-active="defaultActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      @select="handlerSelect"
    >
      <el-submenu
        :index="index + ''"
        v-for="(item, index) in menuList"
        :key="index + 'zz'"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="ele.path"
          v-for="(ele, i) in item.children"
          :key="index + '-' + i"
          >{{ ele.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      defaultActive: "",
      menuList: [
        {
          name: "Excel",
          icon: "el-icon-s-order",
          children: [
            {
              name: "导出Excel",
              path: "/home/tableExport"
            },
            {
              name: "上传Excel",
              path: "/home/tableUpload"
            }
          ]
        }, {
          name: "图表",
          icon: "el-icon-s-data",
          children: [
            {
              name: "线",
              path: "/home/lineChart"
            }, {
              name: "面",
              path: "/home/areaChart"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isCollapse: state => state.isCollapse,
      tabsList: state => state.tabsList
    })
  },
  methods: {
    handlerSelect(indexPath) {
      window.localStorage.setItem("defaultActive", indexPath);
      // console.log('indexPath', indexPath)
      // console.log('tabsList', this.tabsList)
      console.log('return', this.isActive(this.tabsList, indexPath))
      this.$store.commit('tabsList', this.isActive(this.tabsList, indexPath))
    },
    // 判断tabsList里是否有当前所点击菜单
    isActive(arr, path) {
      let obj = {}
      arr && arr.forEach((item, index) => {
        console.log('arr', arr)
        if (path !== item.path) {
          obj = {
            name: 'add',
            closable: true,
            type: 'info',
            path: path
          }
        }
      })
      return obj
    }
  },
  created() {
    let res = window.localStorage.getItem("defaultActive");
    if (res) {
      this.defaultActive = res;
      this.$router.push(res);
    }
  }
};
</script>

<style lang="scss" scoped>
.side {
  height: 100%;
  .side-nav {
    height: 100%;
  }
  .side-nav:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>