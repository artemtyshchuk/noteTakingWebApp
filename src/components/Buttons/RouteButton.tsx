import styles from "./buttons.module.scss";
import arrowRight from "assets/images/icon-chevron-right.svg";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router";


interface RouteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: string;
  isActive: boolean;
  handleAction: () => void;
}

export const RouteButton = observer(
  ({ text, icon, handleAction, isActive }: RouteButtonProps) => {

    return (
      <button
        className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
        onClick={handleAction}
      >
        <div className={styles.buttonContainer}>
          <img className={styles.icon} src={icon} alt="icon" />
          <p className={styles.routeButtonText}>{text}</p>
        </div>
        <img className={styles.arrowRight} src={arrowRight} alt="arrow" />
      </button>
    );
  }
);
