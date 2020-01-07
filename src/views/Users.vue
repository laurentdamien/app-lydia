<template>
  <div class="users">
    <div v-if="users">
      <h2 class="title">Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th @click="sortUsersBy('id')" class="th-filter">
              Id
              <span
                class="th-filter__arrows"
                :class="[filter === 'id' ? {'asc': isAscSort, 'desc': !isAscSort} : {}]"
              ></span>
            </th>
            <th>Photo</th>
            <th>Nom / Société</th>
            <th @click="sortUsersBy('currentBallance')" class="th-filter">
              Solde
              <span
                class="th-filter__arrows"
                :class="[filter === 'currentBallance' ? {'asc': isAscSort, 'desc': !isAscSort} : {}]"
              ></span>
            </th>
            <th>Profil</th>
          </tr>
        </thead>
        <tbody>
          <tr class="user-item" v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td class="user-photo">
              <img
                :src="user.image"
                @error="setImgDefault"
                :alt="`Photo de ${usersAPI.getUserFullname(user)}`"
              />
            </td>
            <td>{{ usersAPI.getUserFullname(user) }}</td>
            <td>{{ user.currentBallance }}€</td>
            <td>
              <router-link :to="{ name: 'user', params: { id: user.id } }">Consulter le profil</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <img v-else class="loader" :src="`${baseUrl}/loading.gif`" alt="loader" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Config from "@/config/config";
import * as UsersAPI from "@/services/usersApi";
import { IUser } from "@/model/user";

@Component({
  components: {}
})
export default class Users extends Vue {
  public usersAPI: any = UsersAPI;
  public users: [IUser] = null;

  public filter: string = "";
  public isAscSort: boolean = true;

  public setImgDefault(event) {
    event.target.src = Config.DEFAULT_IMAGE_USER;
  }

  public sortUsersBy(newFilter) {
    this.isAscSort =
      this.filter !== "" && this.filter !== newFilter ? true : !this.isAscSort;
    this.filter = newFilter;

    this.users.sort((a, b) => {
      if (this.isAscSort) {
        return a[newFilter] - b[newFilter];
      } else {
        return b[newFilter] - a[newFilter];
      }
    });
  }

  private created() {
    UsersAPI.getUsers().then(users => {
      this.users = users.data;
    });
  }
}
</script>

<style lang="scss" scoped>
.users {
  .user {
    &-photo img {
      display: block;
      width: 80px;
      height: auto;
      margin: 0 auto;
    }
  }

  .th-filter {
    cursor: pointer;

    &__arrows {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 10px;
      height: 20px;
      margin-left: 5px;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
      }

      &::before {
        top: 0;
        border-bottom: 8px solid #ffffff;
      }

      &::after {
        bottom: 0;
        border-top: 8px solid #ffffff;
      }

      &.asc {
        &::before {
          display: none;
        }

        &::after {
          bottom: initial;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      &.desc {
        &::before {
          top: 50%;
          transform: translateY(-50%);
        }

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
