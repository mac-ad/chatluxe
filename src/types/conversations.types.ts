import { IMessageShort } from "./messages.types";

export interface Participant {
  _id: string;
  avatar: {
    url: string;
    _id: string;
  };
  username: string;
}
export interface IRecieverDetail extends Participant {}

export interface Conversation {
  _id: string | null;
  isGroupConversation: boolean | null;
  participants: Participant[] | null;
  name?: string;
  admin: Participant | null;
  createdAt: string | null;
  updatedAt: string | null;
  __v: number | null;
}

export interface IChatItem {
  _id: string;
  isGroupConversation: boolean;
  participants: Participant[] | [];
  admin: string;
  name?: string;
  lastMessage: IMessageShort | null;
  recieverDetail?: IRecieverDetail;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserItem {
  _id: string;
  isGroupConversation: boolean;
  participants: string[];
  admin: string;
  lastMessage: string | undefined | null;
  recieverDetail: IRecieverDetail;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
