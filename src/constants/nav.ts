export enum NavEnum {
  CHATS = "CHATS",
  PEOPLE = "PEOPLE",
  REQUESTS = "REQUESTS",
  SETTINGS = "SETTINGS",
  THEME = "THEME",
}

export interface IconOnlyNavItem {
  name: string;
  icon: string;
  key: NavEnum;
}

export const IconOnlyNavItems: IconOnlyNavItem[] = [
  {
    name: "chats",
    icon: "solar:chat-line-bold",
    key: NavEnum.CHATS,
  },
  {
    name: "people",
    icon: "ic:round-people",
    key: NavEnum.PEOPLE,
  },
  //   {
  //     name: "requests",
  //     icon: "mdi:people-add",
  //     key: NavEnum.REQUESTS,
  //   },
  {
    name: "themeToggle",
    icon: "",
    key: NavEnum.THEME,
  },
  {
    name: "settings",
    icon: "solar:settings-bold",
    key: NavEnum.SETTINGS,
  },
];
