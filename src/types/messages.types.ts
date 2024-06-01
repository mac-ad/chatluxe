import { UserShort } from "./auth.types";
import { IUserItem } from "./conversations.types";

export interface IMessageItem {
  _id: string;
  sender: UserShort;
  text: string;
  seenBy: UserShort[] | [];
  conversation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessageShort {
  _id: string;
  sender: UserShort;
  text: string;
}
