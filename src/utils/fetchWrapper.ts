import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { checkIfTokenExpired } from "./common";
import customToast from "./customToast";

// let isRefreshing: boolean = false;
// let tokenQueue: any[] = [];

export const fetchWrapper = async (url: string, options: any = {}) => {
  const origin = window.location.origin;
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken === "undefined") {
    accessToken = null;
  }

  if (accessToken && (await checkIfTokenExpired(accessToken))) {
    // remove accessToken from local storage
    localStorage.removeItem("accessToken");
    customToast.success({
      content: "You are logged out of your session",
    });
    window.location.href = window.location.origin + "/";
    //
    // remove user from local state zustand
  }

  // if (!accessToken || (await checkIfTokenExpired(accessToken))) {
  //   if (isRefreshing) {
  //     return new Promise((resolve, reject) => {
  //       tokenQueue.push((newToken: any) => {
  //         const updatedHeaders = {
  //           Authorization: newToken ? `Bearer ${newToken}` : null,
  //         };
  //         options.headers = {
  //           ...options.headers,
  //           ...updatedHeaders,
  //         };
  //         fetch(url, options).then(resolve).catch(reject);
  //       });
  //     });
  //   }

  //   isRefreshing = true;

  // refresh the token from token refreshing endpoint

  // }

  const headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
    credentials: "include",
    // withCredentials: true,
    // credentials: true,
  };

  options.headers = {
    ...options.headers,
    ...headers,
  };

  return await fetch(url, options);
};
