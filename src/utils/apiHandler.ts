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
};
