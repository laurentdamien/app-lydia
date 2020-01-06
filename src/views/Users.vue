<template>
  <div class="users">
    <div v-if="users">
      <h2 class="title">Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Nom / Société</th>
            <th>Solde</th>
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
            <td>
              {{ usersAPI.getUserFullname(user) }}
            </td>
            <td>{{ user.currentBallance }}€</td>
            <td>
              <router-link :to="{ name: 'user', params: { id: user.id } }">
                Consulter le profil
              </router-link>
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

  public setImgDefault(event) {
    event.target.src = Config.DEFAULT_IMAGE_USER;
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
}
</style>
