<template>
  <div class="transactions">
    <h2 class="title">Transaction numéro</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Config from "@/config/config";
import * as TransactionsAPI from "@/services/transactionApi";
import { ITransaction } from "@/model/transaction";

@Component({
  components: {}
})
export default class Transaction extends Vue {
  public transactions: [ITransaction] = null;

  public created() {
    TransactionsAPI.getTransactions().then(transactions => {
      this.transactions = transactions.data;
    });
  }

  public getUserFullname(user) {
    return user.firstname + " " + user.lastname;
  }
}
</script>
