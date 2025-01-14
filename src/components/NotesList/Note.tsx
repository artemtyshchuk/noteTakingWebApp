import { Tag } from "components/Tag/Tag";
import { HorizontalDivider } from "components/Dividers/Dividers";
import styles from "./NotesList.module.scss";

interface NoteProps {
  noteTitle: string;
  tag: string[];
  noteDate: string;
  newNote?: boolean;
}

export const Note = ({ noteTitle, tag, noteDate, newNote }: NoteProps) => {
  return (
    <div className={`${styles.completeNote} ${newNote ? styles.newNote : ""}`}>
      <div style={{ padding: "8px" }}>
        <p className={styles.noteTitle}>{noteTitle === '' ? 'Untitled Note' : noteTitle}</p>

        <Tag tag={tag} onDeleteTag={() => {}} />

        <p className={styles.noteDate}>{noteDate}</p>
      </div>
      <HorizontalDivider margin="8px 0 0 0" />
    </div>
  );
};
