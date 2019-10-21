<template>
  <div class="side">
    <el-menu
      default-active="1"
      class="side-nav"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <el-submenu
        :index="index + 'cc'"
        v-for="(item, index) in menuList"
        :key="index + 'zz'"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="item.path"
          v-for="(ele, i) in item.children"
          :key="index + '-' + i"
          >{{ ele.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
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
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.side {
  .side-nav:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>