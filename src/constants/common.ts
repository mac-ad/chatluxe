export const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;
export const CHAT_API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

export const API_URLS = {
  REGISTER_USER: `${API_BASE}/users`,
  LOGIN_USER: `${API_BASE}/users/login`,
  SELF: `${API_BASE}/users/me`,
  ALL: `${API_BASE}/users/`,
  SEND_FRIEND_REQUEST: `${CHAT_API_BASE}/friendship/send-friend-request`,
  CREATE_OR_GET_CONVERSATION: `${CHAT_API_BASE}/conversations/c`,
  GET_ALL_CONVERSATIONS: `${CHAT_API_BASE}/conversations`,
  GET_CONVERSATION_DETAIL: `${CHAT_API_BASE}/conversations`,
  DELETE_CONVERSATION: `${CHAT_API_BASE}/conversations`,
  SEND_MESSAGE: `${CHAT_API_BASE}/messages`,
  GET_ALL_MESSAGES: `${CHAT_API_BASE}/messages`,

};
