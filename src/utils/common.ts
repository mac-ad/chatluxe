import { jwtDecode } from "jwt-decode";

export const checkIfTokenExpired = async (token: string) => {
  if (token && token !== "undefined") {
    const decoded: any = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  }
  return true;
};

export const convertTimeToHHMM = (timeString: string) => {
  const date = new Date(timeString);
  const hours = date.getHours() % 24; // Get 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading zero
  const isAfternoon = date.getHours() >= 12; // Check for AM or PM

  return `${hours}:${minutes} ${isAfternoon ? "PM" : "AM"}`;
};
