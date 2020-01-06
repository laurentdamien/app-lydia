<template>
  <header class="header">
    <div class="section-container">
      <router-link tag="h1" to="/" class="header-title"
        >Lydia - Back office</router-link
      >
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "Header",
  components: {}
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $header-height;

  &-title {
    font-family: $font-bold;
    font-size: 24px;
    color: $color-main;
    display: inline-block;
    cursor: pointer;
  }

  @media screen and (max-width: $width_S) {
    height: $header-mobile-height;
  }
}
</style>
