<template>
  <div class="main">
    <topBar></topBar>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import topBar from "./topBar.vue";
export default {
  name: "mainView",
  components: {
    topBar
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  overflow: hidden;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
