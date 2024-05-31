import { API_URLS } from "@/constants/common";
import apiHandler from "@/utils/apiHandler";

interface ICreateOrGetConversation {
  signal?: AbortSignal;
  param: string;
}
interface IGetAllConversations {
  signal?: AbortController;
}

interface IGetChatDetail {
  signal?: AbortController;
  id: string;
}

interface IDeleteChat {
  signal?: AbortController;
  id: string;
}

const createOrGetConversation = ({
  signal,
  param,
}: ICreateOrGetConversation) => {
  let url = API_URLS.CREATE_OR_GET_CONVERSATION;
  return apiHandler.post({
    requestURL: `${url}/${param}`,
    payload: {},
    signal,
  });
};

const getAll = ({ signal }: IGetAllConversations) => {
  let url = API_URLS.GET_ALL_CONVERSATIONS;
  return apiHandler.get({
    requestURL: `${url}`,
  });
};

const getDetail = ({ signal, id }: IGetChatDetail) => {
  let url = API_URLS.GET_ALL_CONVERSATIONS;
  return apiHandler.get({
    requestURL: `${url}`,
  });
};

const deleteChat = ({ signal, id }: IDeleteChat) => {
  let url = API_URLS.DELETE_CONVERSATION;
  return apiHandler.deleteReq({
    requestURL: `${url}/${id}`,
  });
};

export default { createOrGetConversation, getAll, deleteChat };
