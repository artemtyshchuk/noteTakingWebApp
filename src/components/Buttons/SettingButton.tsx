import styles from "./buttons.module.scss";
import arraowIcon from "assets/images/icon-chevron-right.svg";

interface SettingsButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: string;
}

export const SettingsButton = ({
  text,
  icon,
  onClick,
}: SettingsButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={icon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <img className={styles.arrowRight} src={arraowIcon} alt="arrow" />
    </button>
  );
};
