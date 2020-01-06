<template>
  <div class="user">
    <div v-if="user">
      <router-link :to="{ name: 'users' }" class="back">Retour</router-link>
      <h2 class="title">{{ usersAPI.getUserFullname(user) }}</h2>
      <div class="user-content">
        <img
          :src="user.image"
          @error="setImgDefault"
          :alt="`Photo de ${usersAPI.getUserFullname(user)}`"
        />
        <div class="user-informations">
          <div class="user-current-ballance">
            Solde : {{ user.currentBallance }}€
          </div>
          <div v-if="!user.isPro">Né le {{ user.dob }} à {{ user.pob }}</div>
          <div v-if="user.isPro && user.dob">Créée le {{ user.dob }}</div>
          <div v-if="user.isPro && user.pob">A {{ user.pob }}</div>
          <div>
            Status de l'utilisateur :
            {{ user.isPro ? "Professionnel" : "Particulier" }}
          </div>
          <div>Fraudeur : {{ user.isFraudster ? "Oui" : "Non" }}</div>
        </div>
      </div>
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
export default class User extends Vue {
  public usersAPI: any = UsersAPI;
  public user: IUser = null;

  public setImgDefault(event) {
    event.target.src = Config.DEFAULT_IMAGE_USER;
  }

  private created() {
    const id = this.$router.currentRoute.params.id;

    UsersAPI.getUser(id).then(user => {
      this.user = user.data;
    });
  }
}
</script>

<style lang="scss" scoped>
.user {
  &-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    > img {
      display: block;
      width: 250px;
      height: auto;
      margin-right: 50px;
    }
  }

  &-current-ballance {
    font-family: $font-bold;
    font-size: 22px;
    margin-bottom: 20px;

    ~ div:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
