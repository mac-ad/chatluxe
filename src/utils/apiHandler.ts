import { authHeader } from "./authHeader";
import { fetchWrapper } from "./fetchWrapper";
import { handleResponse } from "./handleResponse";

// async function get(requestURL: string, requestHeaders: any = {}, auth = true) {
async function get({
  requestURL,
  requestHeaders = {},
  signal,
}: {
  requestURL: string;
  requestHeaders?: Record<string, string>;
  signal?: AbortSignal;
}) {
  const requestOptions: any = {
    method: "GET",
  };

  const authHeaders: any = await authHeader();
  requestOptions.headers = authHeaders;

  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
      signal,
    })
  );
}

async function post({
  requestURL,
  requestHeaders = {},
  signal,
  payload,
  stringify = true,
}: {
  requestURL: string;
  requestHeaders?: Record<string, string>;
  signal?: AbortSignal;
  payload: any;
  stringify?: boolean;
}) {
  const requestOptions: any = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  const authHeaders: any = await authHeader();
  requestOptions.headers = {
    ...authHeaders,
    // credentials: "include",
    // withCredentials: true,
  };
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
      signal,
    })
  );
}

async function deleteReq({
  requestURL,
  requestHeaders = {},
  signal,
}: {
  requestURL: string;
  requestHeaders?: Record<string, string>;
  signal?: AbortSignal;
}) {
  const requestOptions: any = {
    method: "DELETE",
  };

  const authHeaders: any = await authHeader();
  requestOptions.headers = {
    ...authHeaders,
    withCredentials: true,
  };
  return fetchWrapper(requestURL, requestOptions).then((response) =>
    handleResponse(response, {
      ...requestOptions,
      url: requestURL,
      signal,
    })
  );
}

export default {
  get,
  post,
  deleteReq,
};
