<template>
  <div>
    homePage
  </div>
</template>

<script>
import { getHomeList } from "@/http/api.js";
export default {
  methods: {
    async init() {
      let res = await getHomeList();
      // console.log(res);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
</style>