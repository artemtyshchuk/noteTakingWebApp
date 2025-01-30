import { observer } from "mobx-react-lite";
import { stateStore } from "store/statesStore";
import { MessageForUser } from "./MessageForUser";
import { Note } from "./Note";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";

interface NotesListProps {}

export const NotesList = observer(({}: NotesListProps) => {
  useFetchNotes();

  const handleCreateNewNote = () => {
    notesStore.setSelectedNote(null);
    stateStore.setArchivedContent(false);
    stateStore.setNoteContent("empty");
  };

  const filteredNotes = notesStore.notes.filter(
    (note) => stateStore.archivedContent === note.isArchived
  );

  const isEmpty = filteredNotes.length === 0;

  return (
    <div className={styles.notesList}>
      <button className={styles.newNoteButton} onClick={handleCreateNewNote}>
        + Create New Note
      </button>

      {stateStore.archivedContent && (
        <MessageForUser
          text="All your archived notes are stored here. You can restore or delete them anytime."
          transparentBackground
        />
      )}

      {!stateStore.archivedContent && isEmpty && (
        <MessageForUser text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
      )}

      {stateStore.noteContent === "empty" && (
        <Note id="" noteTitle="" tag={[]} noteDate="" newNote />
      )}

      <div className={styles.scrollableContainer}>
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            noteTitle={note.title}
            tag={note.tags}
            noteDate={note.lastEdited}
          />
        ))}
      </div>
    </div>
  );
});
