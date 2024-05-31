import { API_URLS } from "@/constants/common";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";
import apiHandler from "@/utils/apiHandler";

interface IRegister {
  signal?: AbortSignal;
  payload: RegisterPayload;
}

interface ILogin {
  signal?: AbortSignal;
  payload: LoginPayload;
}

const register = ({ signal, payload }: IRegister) => {
  let url = API_URLS.REGISTER_USER;
  return apiHandler.post({
    requestURL: url,
    payload: payload,
  });
};

const login = ({ signal, payload }: ILogin) => {
  let url = API_URLS.LOGIN_USER;
  return apiHandler.post({
    requestURL: url,
    payload: payload,
  });
};

const getSelf = ({ signal }: { signal?: AbortSignal }) => {
  let url = API_URLS.SELF;
  return apiHandler.get({
    requestURL: url,
  });
};

const getAll = ({ signal }: { signal?: AbortSignal }) => {
  let url = API_URLS.ALL;
  return apiHandler.get({
    requestURL: url,
  });
};

export default { register, login, getSelf, getAll };
