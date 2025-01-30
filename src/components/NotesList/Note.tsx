import { Tag } from "components/Tag/Tag";
import { HorizontalDivider } from "components/Dividers/Dividers";
import styles from "./NotesList.module.scss";
import { stateStore } from "store/statesStore";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";

interface NoteProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
  noteTitle: string;
  tag: string[];
  noteDate: string;
  newNote?: boolean;
}

export const Note = observer(
  ({ noteTitle, tag, noteDate, newNote, id }: NoteProps) => {
    const handleClick = () => {
      stateStore.setNoteContent("success");
      const selectedNote = notesStore.notes.find((note) => note.id === id);
      if (selectedNote) {
        notesStore.setSelectedNote(selectedNote);
      }
      if (notesStore.selectedNote) {
        stateStore.setNoteContent("idle");
        stateStore.setNoteContent("success");
      }
    };

    return (
      <button
        key={id}
        className={`${styles.completeNote} ${newNote ? styles.newNote : ""}`}
        onClick={handleClick}
      >
        <div style={{ padding: "8px" }}>
          <p className={styles.noteTitle}>
            {noteTitle === "" ? "Untitled Note" : noteTitle}
          </p>

          <Tag tag={tag} onDeleteTag={() => {}} />

          <p className={styles.noteDate}>{noteDate}</p>
        </div>
        <HorizontalDivider margin="8px 0 0 0" />
      </button>
    );
  }
);
