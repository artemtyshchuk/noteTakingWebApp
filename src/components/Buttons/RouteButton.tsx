import styles from "./buttons.module.scss";
import arrowRight from "assets/images/icon-chevron-right.svg";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { notesStore } from "store/notesStore";
import { stateStore } from "store/statesStore";

interface RouteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: string;
  isActive: boolean;
  handleAction: () => void;
}

export const RouteButton = observer(
  ({ text, icon, handleAction, isActive }: RouteButtonProps) => {
    const navigate = useNavigate();

    const clickRouteButton = () => {
      notesStore.setSelectedNote(null);
      stateStore.setNoteContent("idle");
      handleAction();
      navigate("/"); 
    };

    return (
      <button
        className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
        onClick={clickRouteButton}
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
