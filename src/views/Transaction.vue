<template>
  <div class="transaction">
    <div v-if="transaction">
      <router-link :to="{ name: 'transactions' }" class="back">
        Retour
      </router-link>
      <h2 class="title">Transaction N°{{ transaction.id }}</h2>
      <div class="transaction-date">Le {{ convertDate(transaction.date) }}</div>
      <div class="transaction-content">
        <div class="transaction-user">
          {{ usersAPI.getUserFullname(transaction.payer) }}
        </div>
        <div class="transaction-amount">
          <div class="transaction-message">"{{ transaction.message }}"</div>
          <span>{{ transaction.amount }}€</span>
          <img
            v-if="transaction.status === 'accepted'"
            :src="`${baseUrl}/check.svg`"
            alt="Validé"
            title="Validé"
          />
          <img
            v-else-if="transaction.status === 'pending'"
            :src="`${baseUrl}/waiting.svg`"
            alt="En attente"
            title="En attente"
          />
          <img
            v-else
            :src="`${baseUrl}/error.svg`"
            alt="Refusé"
            title="Refusé"
          />
          <div class="transaction-amount__arrow"></div>
        </div>
        <div class="transaction-user">
          {{ usersAPI.getUserFullname(transaction.receiver) }}
        </div>
      </div>
      <div class="transaction-status">
        Transaction {{ transaction.isPro ? "professionnelle" : "particulière" }}
      </div>
    </div>
    <img v-else class="loader" :src="`${baseUrl}/loading.gif`" alt="loader" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Config from "@/config/config";
import * as TransactionsAPI from "@/services/transactionApi";
import * as UsersAPI from "@/services/usersApi";
import { ITransaction } from "@/model/transaction";

@Component({
  components: {}
})
export default class Transaction extends Vue {
  public usersAPI: any = UsersAPI;
  public transaction: ITransaction = null;

  public pad(s) {
    return s < 10 ? "0" + s : s;
  }

  public convertDate(date) {
    const d = new Date(date);
    const updateDate = [
      this.pad(d.getDate()),
      this.pad(d.getMonth() + 1),
      d.getFullYear()
    ].join("/");
    const time = this.pad(d.getHours()) + "h" + this.pad(d.getHours());

    return updateDate + " à " + time;
  }

  private created() {
    const id = this.$router.currentRoute.params.id;

    TransactionsAPI.getTransaction(id).then(transaction => {
      this.transaction = transaction.data;
    });
  }
}
</script>

<style lang="scss" scoped>
.transaction {
  text-align: center;

  &-content {
    @include flexRowCenter;
    align-items: center;
    margin-bottom: 20px;

    > div {
      flex: 1;
    }
  }

  &-date {
    font-family: $font-regular;
    font-size: 16px;
    margin-bottom: 20px;
  }

  &-message {
    font-family: $font-regular;
    font-style: italic;
    font-size: 16px;
    white-space: nowrap;
  }

  &-user {
    font-family: $font-medium;
    font-size: 18px;

    &:first-child {
      text-align: right;
    }

    &:last-child {
      text-align: left;
    }
  }

  &-amount {
    position: relative;
    margin: 0 20px;
    padding-top: 10px;

    span {
      font-family: $font-bold;
      font-size: 26px;
      color: $color-main;
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      display: inline-block;
      padding: 0 10px 5px;
    }

    img {
      position: relative;
      z-index: 2;
      display: block;
      margin: 0 auto;
    }

    &__arrow {
      background-color: $color-main;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 1px;

      &::before,
      &::after {
        content: "";
        background-color: $color-main;
        position: absolute;
        right: -1px;
        display: block;
        width: 10px;
        height: 1px;
      }

      &::before {
        top: -4px;
        transform: rotate(45deg);
      }

      &::after {
        top: 4px;
        transform: rotate(-45deg);
      }
    }
  }

  &-status {
    font-size: 18px;
  }
}
</style>
