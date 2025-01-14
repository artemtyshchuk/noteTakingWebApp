import { observer } from "mobx-react-lite";
import { stateStore } from "store/statesStore";
import { EmptyNoteList } from "./EmptyNoteList";
import { Note } from "./Note";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";

interface NotesListProps {}

export const NotesList = observer(({}: NotesListProps) => {

  useFetchNotes()

  return (
    <div className={styles.notesList}>
      <button
        className={styles.newNoteButton}
        onClick={() => stateStore.setNoteContent("empty")}
      >
        + Create New Note
      </button>

      {notesStore.notes.length === 0 && <EmptyNoteList />}

      <>
        {stateStore.noteContent === "empty" && (
          <Note noteTitle="" tag={[]} noteDate="" newNote />
        )}

        {notesStore.notes.map((note, index) => (
          <Note
            noteTitle={note.title}
            tag={note.tags}
            noteDate={note.lastEdited}
            key={index}
          />
        ))}

        <Note
          noteTitle="Favorite Pasta Recipes"
          tag={["Cooking", "Recipes"]}
          noteDate="25 Oct 2024"
        />

        <Note
          noteTitle="Japan Travel Planning"
          tag={["Travel", "Personal"]}
          noteDate="25 Oct 2024"
        />

        <Note
          noteTitle="Weekly Workout Plan"
          tag={["dev", "React"]}
          noteDate="25 Oct 2024"
        />
      </>
    </div>
  );
});
