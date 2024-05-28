"use client";

import { GlobalStoreState, useGlobalStore } from "@/store/store";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface IThemeContext {
  setTheme: Dispatch<SetStateAction<string>>;
  theme: string;
}

export const ThemeContext = createContext<IThemeContext>({
  setTheme: () => {},
  theme: "",
});

interface IThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const theme = useGlobalStore((state: GlobalStoreState) => state.theme);

  return <div className={theme}>{children}</div>;
};
