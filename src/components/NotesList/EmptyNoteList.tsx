import styles from './NotesList.module.scss'

export const EmptyNoteList = () => {
  return (
    <div className={styles.emptyListContainer}>
    <p className={styles.emptyListText}>
      You don’t have any notes yet. Start a new note to capture your
      thoughts and ideas.
    </p>
  </div>
  );
};