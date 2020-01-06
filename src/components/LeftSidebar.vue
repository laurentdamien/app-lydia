<template>
  <div class="left-sidebar">
    <ul class="left-sidebar__menu">
      <li class="left-sidebar__menu-item">
        <router-link :to="{ name: 'transactions' }">Transactions</router-link>
      </li>
      <li class="left-sidebar__menu-item">
        <router-link :to="{ name: 'users' }">Utilisateurs</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class LeftSidebar extends Vue {}
</script>

<style lang="scss" scoped>
.left-sidebar {
  background-color: #ffffff;
  border-right: 1px solid #cccccc;
  padding: 40px 20px;

  &__menu {
    text-align: left;

    &-item {
      display: block;
      margin-bottom: 10px;

      > a {
        @include underlineHover(2px, $color-main);
        font-family: $font-bold;
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: $color-main;
        max-width: 100%;

        &.router-link-active::after {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
