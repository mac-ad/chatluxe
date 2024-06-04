import { IconOnlyNavItems, NavEnum } from "@/constants/nav";
import { User, logInResponse } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export interface GlobalStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  theme: ThemeEnum;
  add: Function;
  toggleTheme: Function;
  isAuthenticated: boolean;
  logUser: Function;
  logOutUser: Function;
  loading: boolean;
  currentNav: NavEnum;
}

export const useGlobalStore = create<GlobalStoreState>()((set, get) => ({
  isAuthenticated: false,
  loading: true,
  currentNav: IconOnlyNavItems[0]?.key,
  refreshToken: null,
  accessToken: null,
  user: null,
  theme: ThemeEnum.DARK,
  toggleTheme: () => {
    set((state: GlobalStoreState) => {
      return {
        ...state,
        theme:
          state.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT,
      };
    });
  },
  add: (key: string, value: string) => {
    set((state: any) => {
      return { ...state, [key]: value };
    });
  },
  logUser: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => {
    console.log("data = ", data);
    localStorage.setItem("accessToken", data?.accessToken);
    localStorage.setItem("refreshToken", data?.refreshToken);

    set((state: GlobalStoreState) => ({
      ...state,
      user: data?.user,
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      isAuthenticated: true,
      loading: false,
    }));
  },
  logOutUser: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set((state: GlobalStoreState) => ({
      ...state,
      isAuthenticated: false,
      user: null,
      loading: false,
    }));
  },
}));
