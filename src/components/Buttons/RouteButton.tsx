import styles from "./buttons.module.scss";
import arrowRight from "assets/images/icon-chevron-right.svg";
import { observer } from "mobx-react-lite";
import HomeIcon from "assets/images/icon-home.svg?react";
import ArchiveIcon from "assets/images/icon-archive.svg?react";

interface RouteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive: boolean;
  home?: boolean;
  archive?: boolean;
  handleAction: () => void;
}

export const RouteButton = observer(
  ({ text, handleAction, isActive, home, archive }: RouteButtonProps) => {
    return (
      <button
        className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
        onClick={handleAction}
      >
        <div className={styles.buttonContainer}>
          {home && <HomeIcon className={styles.icon} />}
          {archive && <ArchiveIcon className={styles.strokeOrientedIcon} />}
          <p className={styles.routeButtonText}>{text}</p>
        </div>
        <img className={styles.arrowRight} src={arrowRight} alt="arrow" />
      </button>
    );
  }
);
