<template>
  <div class="transactions">
    <h2 class="title">Liste des transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Montant</th>
          <th>Payeur</th>
          <th>Receveur</th>
          <th>Status</th>
          <th>Détails</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="transaction-item"
          v-for="transaction in transactions"
          :key="transaction.id"
        >
          <td>{{ transaction.id }}</td>
          <td>{{ transaction.amount }}€</td>
          <td>{{ getUserFullname(transaction.payer) }}</td>
          <td>{{ getUserFullname(transaction.receiver) }}</td>
          <td>{{ transaction.status }}</td>
          <td>
            <a :href="`/transactions/${transaction.id}`">
              Consulter la transaction
            </a>
          </td>
        </tr>
      </tbody>
    </table>
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
export default class Transactions extends Vue {
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
