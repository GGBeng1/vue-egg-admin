<template>
  <div>
    <homeHeader></homeHeader>
    <div>
      <homeMain></homeMain>
      <homeSide></homeSide>
    </div>
  </div>
</template>

<script>
import homeHeader from "./components/header";
import homeMain from "./components/main";
import homeSide from "./components/side";
import { getHomeList } from "@/http/api.js";
export default {
  components: {
    homeHeader,
    homeMain,
    homeSide
  },
  data() {
    return {};
  },
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