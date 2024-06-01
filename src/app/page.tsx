"use client";

import AuthArea from "@/components/AuthArea/AuthArea";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import App from "./app";
import userService from "@/services/user/user.service";

export default function Home() {
  const { isAuthenticated, add, loading, user, logUser, accessToken } =
    useGlobalStore((state: GlobalStoreState) => state);

  const getOwnProfile = async () => {
    try {
      const res = await userService.getSelf({});
      add("isAuthenticated", true);
      add("user", res.data);
      add("loading", false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log("inside");
    // see if token is stored in localstore to restore the session
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      add("loading", true);

      // if access token is available then fetch user profile
      // and then do according to response
      // if response is errror that accessToken is expired or invalid then immediately log user out
      // otherwise set user store with profile got and log user back in
      getOwnProfile();
      add("accessToken", accessToken);
      add("refreshToken", refreshToken);
    }
  }, [accessToken]);

  useEffect(() => {
    add("loading", false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated)
    return (
      <div className="flex dark:bg-[#101B20] dark:text-white h-full w-full ">
        <AuthArea />
      </div>
    );

  return <App />;
}
