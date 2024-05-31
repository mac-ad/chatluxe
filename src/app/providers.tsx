"use client";

import { MyThemeSwitcher } from "@/lib/context/theme-context";
// import { ThemeProvider } from "@/lib/context/theme-context";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const theme = useGlobalStore((state: GlobalStoreState) => state.theme);
  const { theme, setTheme } = useTheme();
  return (
    <NextUIProvider>
      {/* <ThemeProvider>{children}</ThemeProvider> */}
      <MyThemeSwitcher>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </MyThemeSwitcher>
    </NextUIProvider>
  );
}
