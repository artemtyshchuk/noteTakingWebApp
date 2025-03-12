import { Tag } from "components/Tag/Tag";
import { HorizontalDivider } from "components/Dividers/Dividers";
import styles from "./NotesList.module.scss";
import { stateStore } from "store/statesStore";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface NoteProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
  noteTitle: string;
  tag: string[];
  noteDate: string;
  newNote?: boolean;
}

export const Note = observer(
  ({ noteTitle, tag, noteDate, newNote, id }: NoteProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
      stateStore.setNoteContent("success");

      const selectedNote = notesStore.notes.find((note) => note.id === id);

      if (!selectedNote) return;

      notesStore.setSelectedNote(selectedNote);

      const currentPath = window.location.pathname;

      // Проверяем, находится ли текущий путь в архиве и есть ли тег
      const isArchived = currentPath.includes("/archived");
      const tagNameMatch = currentPath.match(/\/tags\/([^/]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1] : null;

      // Формируем новый путь
      let newPath = `/note/${id}`;

      if (tagName) {
        newPath = `/tags/${tagName}${newPath}`;
      }

      if (isArchived) {
        newPath = `/archived${newPath}`;
      }

      // Навигация по новому пути
      navigate(newPath, { replace: true });
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
