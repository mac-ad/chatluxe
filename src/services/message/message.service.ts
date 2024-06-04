import { API_URLS } from "@/constants/common";
import apiHandler from "@/utils/apiHandler";

interface IMessageSend {
  signal?: AbortController;
  conversationId: string;
  payload:
    | {
        text: string;
      }
    | FormData;
}

interface IGetMessages {
  signal?: AbortController;
  conversationId: string;
}

const sendMessage = ({ signal, conversationId, payload }: IMessageSend) => {
  let url = API_URLS.SEND_MESSAGE;
  return apiHandler.post({
    requestURL: `${url}/${conversationId}`,
    payload: payload,
    stringify: payload instanceof FormData ? false : true,
  });
};

const getAll = ({ signal, conversationId }: IGetMessages) => {
  let url = API_URLS.GET_ALL_MESSAGES;
  return apiHandler.get({
    requestURL: `${url}/${conversationId}`,
  });
};

export default { sendMessage, getAll };
