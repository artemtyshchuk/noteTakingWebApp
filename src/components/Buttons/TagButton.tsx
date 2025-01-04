import styles from "./buttons.module.scss";
import tagIcon from "../../assets/images/icon-tag.svg";
import arrowRight from "../../assets/images/icon-chevron-right.svg";
import { useState } from "react";

interface TagButtonProps {
  text: string;
}

export const TagButton = ({ text }: TagButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <button
      className={`${styles.button} ${isHover ? styles.buttonHover : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={tagIcon} alt="tagIcon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      {isHover && <img src={arrowRight} alt="arrow" />}
    </button>
  );
};
