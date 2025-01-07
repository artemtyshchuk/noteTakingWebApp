import { EmptyNoteList } from "./EmptyNoteList";
import { Note } from "./Note";
import styles from "./NotesList.module.scss";
interface NotesListProps {}

export const NotesList = ({}: NotesListProps) => {
  return (
    <div className={styles.notesList}>
      <button className={styles.newNoteButton}>+ Create New Note</button>

      {/* <EmptyNoteList /> */}

      <div className={styles.notesL}>
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
      </div>
    </div>
  );
};
