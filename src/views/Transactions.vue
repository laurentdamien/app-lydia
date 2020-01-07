<template>
  <div class="transactions">
    <div v-if="transactions">
      <h2 class="title">Liste des transactions</h2>
      <div class="table-filters">
        <div class="table-filters__item">
          <label for="filter-status">Status :</label>
          <select
            id="filter-status"
            name="filter-status"
            class="table-filters__select"
            @change="updateTableStatus"
          >
            <option value="all">Tous</option>
            <option value="accepted">Accepté</option>
            <option value="pending">En attente</option>
            <option value="declined">Refusé</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th class="table-id">Id</th>
            <th class="table-user">Payeur</th>
            <th class="table-user">Receveur</th>
            <th class="table-amount">Montant</th>
            <th class="table-status">Status</th>
            <th class="table-details">Détails</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="transaction-item"
            v-for="transaction in getTransactionsByStatus(status)"
            :key="transaction.id"
          >
            <td>{{ transaction.id }}</td>
            <td>{{ usersAPI.getUserFullname(transaction.payer) }}</td>
            <td>{{ usersAPI.getUserFullname(transaction.receiver) }}</td>
            <td>{{ transaction.amount }}€</td>
            <td>
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
              <img v-else :src="`${baseUrl}/error.svg`" alt="Refusé" title="Refusé" />
            </td>
            <td>
              <a :href="`/transactions/${transaction.id}`">Consulter la transaction</a>
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
import * as TransactionsAPI from "@/services/transactionApi";
import * as UsersAPI from "@/services/usersApi";
import { ITransaction } from "@/model/transaction";

@Component({
  components: {}
})
export default class Transactions extends Vue {
  public usersAPI: any = UsersAPI;
  public transactions: [ITransaction] = null;
  public status: string = "all";

  public getUserFullname(user) {
    return user.firstname + " " + user.lastname;
  }

  public updateTableStatus(event) {
    this.status = event.target.value;
  }

  public getTransactionsByStatus(status) {
    if (status === "all") {
      return this.transactions;
    }

    return this.transactions.filter(transaction => {
      return transaction.status === status;
    });
  }

  private created() {
    TransactionsAPI.getTransactions().then(transactions => {
      this.transactions = transactions.data;
    });
  }
}
</script>

<style lang="scss" scoped>
.table {
  &-id {
    width: 40px;
  }

  &-user,
  &-amount {
    min-width: 100px;
  }

  &-status {
    width: 70px;
  }

  &-details {
    width: 200px;
  }
}
</style>
