<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    let info = JSON.parse(localStorage.getItem("userMsg"));
    if (info) {
      this.$store.commit("setUserMsg", info);
    }
  }
};
</script>

<style>
#app {
  height: 100%;
}
</style>
