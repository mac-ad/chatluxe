import { jwtDecode } from "jwt-decode";

export const checkIfTokenExpired = async (token: string) => {
  if (token && token !== "undefined") {
    const decoded: any = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  }
  return true;
};
