import styles from "./buttons.module.scss";
import tagIcon from "assets/images/icon-tag.svg";
import arrowRight from "assets/images/icon-chevron-right.svg";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate } from "react-router";
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";

interface TagButtonProps {
  text: string;
}

export const TagButton = ({ text }: TagButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickTagButton = () => {
    const path = location.pathname.includes("archived")
      ? `/archived/tags/${text}` // Архивные заметки по тегу
      : `/tags/${text}`; // Все заметки по тегу
    navigate(path);
  };

  return (
    <button className={styles.button} onClick={handleClickTagButton}>
      <div className={styles.buttonContainer}>
        <img className={styles.icon} src={tagIcon} alt="icon" />
        <p className={styles.routeButtonText}>{text}</p>
      </div>
      <img className={styles.arrowRight} src={arrowRight} alt="arrow" />
    </button>
  );
};
