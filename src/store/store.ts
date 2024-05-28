import { create } from "zustand";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export interface GlobalStoreState {
  theme: ThemeEnum;
  add: Function;
  toggleTheme: Function;
}

export const useGlobalStore = create<GlobalStoreState>()((set) => ({
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
}));
