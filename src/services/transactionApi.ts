import Config from "@/config/config";
import axios, { AxiosPromise } from "axios";
import { ITransaction } from "@/model/transaction";

export function getTransactions(): AxiosPromise<[ITransaction]> {
  return axios.get(Config.API_TRANSACTIONS);
}

export function getTransaction(id: string): AxiosPromise<ITransaction> {
  return axios.get(Config.API_TRANSACTIONS + "/" + id);
}
