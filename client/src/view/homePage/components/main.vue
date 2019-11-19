<template>
  <div class="main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
<<<<<<< HEAD
import topBar from "./topBar.vue";
=======
>>>>>>> 957af349fa0677b07cb5448e7cc35f25d5f9e547
export default {
  name: "mainView"
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
