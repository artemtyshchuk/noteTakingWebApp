import styles from "./buttons.module.scss";
import tagIcon from "assets/images/icon-tag.svg";
import arrowRight from "assets/images/icon-chevron-right.svg";
import { useLocation, useNavigate } from "react-router";

interface TagButtonProps {
  text: string;
}

const TagButton = ({ text }: TagButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === `/tags/${text}`;

  const handleClickTagButton = () => {
    const path = location.pathname.includes("archived")
      ? `/archived/tags/${text}`
      : `/tags/${text}`;
    navigate(path);
  };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
      onClick={handleClickTagButton}
    >
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={tagIcon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <img className={styles.arrowRight} src={arrowRight} alt="arrow" />
    </button>
  );
};

export default TagButton;
