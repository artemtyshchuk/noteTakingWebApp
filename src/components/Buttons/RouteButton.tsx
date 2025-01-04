import styles from "./buttons.module.scss";
import arrowRight from "../../assets/images/icon-chevron-right.svg";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface RouteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: string;
}

export const RouteButton = observer(({ text, icon }: RouteButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <button
      className={`${styles.button} ${
        isHover ? styles.buttonHover : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={icon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      {isHover && <img src={arrowRight} alt="arrow" />}
    </button>
  );
});
