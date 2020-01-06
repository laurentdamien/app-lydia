<template>
  <div id="app">
    <app-header></app-header>
    <section class="content-container">
      <left-sidebar></left-sidebar>
      <router-view class="content-wrapper"></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import "@/assets/styles/reset.scss";
import "@/assets/styles/animations.scss";
import "@/assets/styles/fonts.scss";
import "@/assets/styles/base.scss";

import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import LeftSidebar from "@/components/LeftSidebar.vue";

@Component({
  components: {
    "app-header": Header,
    "left-sidebar": LeftSidebar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.content {
  &-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: $header-height;

    .left-sidebar {
      position: fixed;
      top: $header-height;
      left: 0;
      width: grid(3);
      height: calc(100vh - #{$header-height});
      overflow: auto;

      @media screen and (max-width: $width_S) {
        top: $header-mobile-height;
        height: calc(100vh - #{$header-mobile-height});
      }
    }
  }

  &-wrapper {
    width: grid(9);
    margin-left: grid(3);
    padding: 40px 60px;
    animation: fadeIn 0.3s ease-in-out;
    animation-fill-mode: both;
  }
}
</style>
