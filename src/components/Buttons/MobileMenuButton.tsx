import styles from "./buttons.module.scss";
import { MenuButtonsDataTypes } from "types/types";
import { useLocation, useNavigate } from "react-router";
import { notesStore } from "store/notesStore";

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
    navigate(path);
  };

  return (
    <button
      className={`${styles.mobileMenuButton} ${
        isActive() ? styles.mobileMenuButtonActive : ""
      }`}
      onClick={handleClick}
    >
      <img className={styles.mobileMenuButtonIcon} src={icon} alt={text} />
      <p className={styles.mobileMenuButtonText}>{text}</p>
    </button>
  );
};
