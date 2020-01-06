import Config from "@/config/config";
import axios, { AxiosPromise } from "axios";
import { IUser } from "@/model/user";

export function getUsers(): AxiosPromise<[IUser]> {
  return axios.get(Config.API_USERS);
}

export function getUser(id: string): AxiosPromise<IUser> {
  return axios.get(Config.API_USERS + "/" + id);
}

export function getUserFullname(user: IUser): string {
  const firstname = user.firstname ? user.firstname : "";
  const lastname = user.lastname ? user.lastname : "";

  return user.businessName
    ? user.businessName
    : (firstname + " " + lastname).trim();
}
