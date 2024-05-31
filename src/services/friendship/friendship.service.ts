import { API_URLS } from "@/constants/common";
import apiHandler from "@/utils/apiHandler";

interface ISendFriendRequest {
  signal?: AbortController;
  payload: {
    user_id: string;
  };
}

const sendFriendRequest = ({ signal, payload }: ISendFriendRequest) => {
  let url = API_URLS.SEND_FRIEND_REQUEST;
  return apiHandler.post({
    requestURL: url,
    payload: payload,
  });
};

export default { sendFriendRequest };
