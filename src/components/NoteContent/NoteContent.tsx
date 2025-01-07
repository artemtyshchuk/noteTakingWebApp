import { EmptyState } from "./EmptyState";
import styles from "./NoteContent.module.scss";

interface NoteContentProps {}

export const NoteContent = ({}: NoteContentProps) => {
  return (
    <div className={styles.noteContent}>
      <EmptyState />
    </div>
  );
};
