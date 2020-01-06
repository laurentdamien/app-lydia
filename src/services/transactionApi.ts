import Config from "@/config/config";
import axios, { AxiosPromise } from "axios";
import { ITransaction } from "@/model/transaction";

export function getTransactions(): AxiosPromise<[ITransaction]> {
  return axios.get(Config.API_TRANSACTIONS);
}
