import { useLocation } from "react-router";
import styles from "./buttons.module.scss";
import arraowIcon from "assets/images/icon-chevron-right.svg";

interface SettingsButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: string;
  path?: string;
}

export const SettingsButton = ({
  text,
  icon,
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
        <img className={styles.icon} src={icon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <img className={styles.arrowRight} src={arraowIcon} alt="arrow" />
    </button>
  );
};
