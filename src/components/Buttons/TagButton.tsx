import styles from "./buttons.module.scss";
import tagIcon from "assets/images/icon-tag.svg";
import arrowRight from "assets/images/icon-chevron-right.svg";

interface TagButtonProps {
  text: string;
}

export const TagButton = ({ text }: TagButtonProps) => {
  return (
    <button className={styles.button}>
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={tagIcon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <img className={styles.arrowRight} src={arrowRight} alt="arrow" />
    </button>
  );
};
