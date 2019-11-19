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
      menuList: []
    };
  },
  computed: {
    ...mapState({
      isCollapse: state => state.isCollapse,
      tabsList: state => state.tabsList,
      defaultActive: state => state.defaultActive
    })
  },
  methods: {
    handlerAddMenuList(options, basePath) {
      let arr = this._.cloneDeep(options);
      arr.forEach(item => {
        item.icon = item.meta.icon;
        if (!item.children || item.children.length == 0) {
          item.path = basePath + "/" + item.path;
        } else if (item.children || item.children.length > 0) {
          item.children.forEach(i => {
            i.path = basePath + "/" + item.path + "/" + i.path;
          });
        }
      });
      this.menuList = arr;
    },
    handlerSelect(path, index, v) {
      let namesList = this.getNamesList(this.tabsList);
      if (!namesList.includes(v.$el.innerText)) {
        this.$store.commit("tabsList", [
          {
            name: v.$el.innerText,
            closable: true,
            type: "success",
            path: path
          }
        ]);
      } else {
        this.$store.commit("changeColor", v.$el.innerText);
      }
    },
    // 拿name进行对比
    getNamesList(arr) {
      let result = [];
      arr.forEach((item, index) => {
        item.type = "info";
        result.push(item.name);
      });
      return result;
    }
  },
  created() {
    // this.defaultActive = this.$route.path;
    this.$store.commit("defaultActive", this.$route.path);
    let arr = this.$router.options.routes[2].children;
    let path = this.$router.options.routes[2].path;
    this.handlerAddMenuList(arr, path);
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
