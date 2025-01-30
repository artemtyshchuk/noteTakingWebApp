import styles from "./Tag.module.scss";

interface TagProps {
  tag: string[];
  deleteTagButton?: boolean;
  onDeleteTag: (tag: string) => void;
}

export const Tag = ({ tag, deleteTagButton, onDeleteTag }: TagProps) => {
  return (
    <div className={styles.tagsContainer}>
      {tag.map((tagItem, index) => (
        <div
          key={index}
          onClick={() => onDeleteTag(tagItem)}
          className={`${styles.tag} ${deleteTagButton ? styles.shake : ""}`}
        >
          <p className={styles.tagText}>{tagItem}</p>
        </div>
      ))}
    </div>
  );
};
