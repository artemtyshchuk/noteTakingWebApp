import { useLocation } from "react-router";
import styles from "./buttons.module.scss";
import ArrowRightIcon from "assets/images/icon-chevron-right.svg?react";
import SunIcon from "assets/images/icon-sun.svg?react";
import FontIcon from "assets/images/icon-font.svg?react";
import LockIcon from "assets/images/icon-lock.svg?react";
import LogoutIcon from "assets/images/icon-logout.svg?react";

interface SettingsButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  sunIcon?: boolean;
  fontIcon?: boolean;
  lockIcon?: boolean;
  logoutIcon?: boolean;
  path?: string;
}

export const SettingsButton = ({
  text,
  sunIcon,
  fontIcon,
  lockIcon,
  logoutIcon,
  path,
  onClick,
}: SettingsButtonProps) => {
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <button
      className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
      onClick={onClick}
    >
      <div className={styles.buttonContainer}>
        {sunIcon && <SunIcon className={styles.strokeOrientedIcon} />}
        {fontIcon && <FontIcon className={styles.icon} />}
        {lockIcon && <LockIcon className={styles.strokeOrientedIcon} />}
        {logoutIcon && <LogoutIcon className={styles.strokeOrientedIcon} />}
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <ArrowRightIcon className={styles.arrowRight} />
    </button>
  );
};
