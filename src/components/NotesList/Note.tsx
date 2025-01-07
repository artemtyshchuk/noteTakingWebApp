import { Tag } from "../../components/Tag/Tag";
import { HorizontalDivider } from "../../components/Dividers/Dividers";
import styles from "./NotesList.module.scss";

interface NoteProps {
  noteTitle: string;
  tag: string[];
  noteDate: string;
}

export const Note = ({ noteTitle, tag, noteDate }: NoteProps) => {
  return (
    <div className={styles.completeNote}>
      <div style={{ padding: "8px" }}>
        <p className={styles.noteTitle}>{noteTitle}</p>

        <Tag tag={tag} />

        <p className={styles.noteDate}>{noteDate}</p>
      </div>
      <HorizontalDivider margin="8px 0 0 0" />
    </div>
  );
};
