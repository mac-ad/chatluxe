"use client";
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState<null | number>(null);
  const [height, setHeight] = useState<null | number>(null);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
};
