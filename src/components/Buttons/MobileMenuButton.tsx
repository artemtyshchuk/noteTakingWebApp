import styles from "./buttons.module.scss";
import { MenuButtonsDataTypes } from "types/types";
import { useLocation, useNavigate } from "react-router";
import { notesStore } from "store/notesStore";

import HomeIcon from "assets/images/icon-home.svg?react";
import SearchIcon from "assets/images/icon-search.svg?react";
import ArchivedIcon from "assets/images/icon-archive.svg?react";
import TagsIcon from "assets/images/icon-tag.svg?react";
import SettingsIcon from "assets/images/icon-settings.svg?react";

interface MobileMenuButtonProps extends MenuButtonsDataTypes {}

const pathMatchRules: Record<string, (pathname: string) => boolean> = {
  "/": (pathname) => pathname === "/",
  "/search": (pathname) => pathname.startsWith("/search"),
  "/archived": (pathname) => pathname.startsWith("/archived"),
  "/tags": (pathname) => pathname.startsWith("/tags"),
  "/settings": (pathname) => pathname.startsWith("/settings"),
};

export const MobileMenuButton = ({
  icon,
  text,
  path,
}: MobileMenuButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = () => {
    const matchRule = pathMatchRules[path];
    return matchRule
      ? matchRule(location.pathname)
      : location.pathname.includes(path);
  };

  const handleClick = () => {
    notesStore.setSearchNoteQuery("");
    notesStore.setSelectedNote(null);
    navigate(path);
  };

  return (
    <button
      className={`${styles.mobileMenuButton} ${
        isActive() ? styles.mobileMenuButtonActive : ""
      }`}
      onClick={handleClick}
    >
      {icon === "homeIcon" && <HomeIcon className={styles.icon} />}
      {icon === "searchIcon" && <SearchIcon className={styles.icon} />}
      {icon === "archivedIcon" && (
        <ArchivedIcon className={styles.strokeOrientedIcon} />
      )}
      {icon === "tagsIcon" && (
        <TagsIcon className={styles.strokeOrientedIcon} />
      )}
      {icon === "settingsIcon" && <SettingsIcon className={styles.icon} />}
      <p className={styles.mobileMenuButtonText}>{text}</p>
    </button>
  );
};
