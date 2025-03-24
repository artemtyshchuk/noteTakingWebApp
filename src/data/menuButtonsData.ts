import homeIcon from "assets/images/icon-home.svg";
import searchIcon from "assets/images/icon-search.svg";
import archivedIcon from "assets/images/icon-archive.svg";
import tagsIcon from "assets/images/icon-tag.svg";
import settingsIcon from "assets/images/icon-settings.svg";
import { MenuButtonsDataTypes } from "types/types";

export const menuButtonsData: MenuButtonsDataTypes[] = [
  {
    text: "Home",
    icon: homeIcon,
    path: "/",
  },
  {
    text: "Search",
    icon: searchIcon,
    path: "/search",
  },
  {
    text: "Archived",
    icon: archivedIcon,
    path: "/archived",
  },
  {
    text: "Tags",
    icon: tagsIcon,
    path: "/tags",
  },
  {
    text: "Settings",
    icon: settingsIcon,
    path: "/settings",
  },
];
