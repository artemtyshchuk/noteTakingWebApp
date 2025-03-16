import { observer } from "mobx-react-lite";
import { stateStore } from "store/statesStore";
import { MessageForUser } from "./MessageForUser";
import { Note } from "./Note";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";
import { useLocation, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

interface NotesListProps {
  isArchived: boolean;
}

export const NotesList = observer(({ isArchived }: NotesListProps) => {
  useFetchNotes();

  const navigate = useNavigate();
  const location = useLocation();
  const { tagName } = useParams();
  const searchQuery = notesStore.searchNoteQuery.toLowerCase();

  const handleCreateNewNote = () => {
    const newNoteId = uuidv4();
    notesStore.setSelectedNote({
      id: newNoteId,
      title: "",
      tags: [],
      content: "",
      lastEdited: new Date().toISOString(),
      isArchived: false,
    });
    navigate(`/note/${newNoteId}`);
  };

  const filteredNotes = [...notesStore.notes]
    .sort((a, b) => {
      const dateA = new Date(a.lastEdited);
      const dateB = new Date(b.lastEdited);
      return dateB.getTime() - dateA.getTime();
    })
    .filter((note) => note.isArchived === isArchived)
    .filter((note) => (tagName ? note.tags.includes(tagName) : true))
    .filter((note) => {
      const tags = note.tags || [];
      const title = note.title || "";
      const content = note.content || "";

      const searchQueryLower = (searchQuery?.trim() || "").toLowerCase();

      return (
        tags.some((tag) => tag.toLowerCase().includes(searchQueryLower)) ||
        title.includes(searchQueryLower) ||
        content.includes(searchQueryLower)
      );
    });

  const isEmpty = filteredNotes.length === 0;

  const messageToCreateNewNote = () => {
    return (
      <>
        No notes have been archived yet. Move notes here for safekeeping, or{" "}
        <button
          className={styles.createNoteButton}
          onClick={() => navigate("/")}
        >
          create a new note
        </button>
        .
      </>
    );
  };

  return (
    <div className={styles.notesList}>
      {!location.pathname.includes("archived") && (
        <button
          className={styles.newNoteButton}
          onClick={handleCreateNewNote}
          disabled={
            stateStore.noteContent === "empty" ||
            filteredNotes.some((note) => !note.title)
          }
        >
          + Create New Note
        </button>
      )}

      {location.pathname.includes("archived") && (
        <MessageForUser
          text="All your archived notes are stored here. You can restore or delete them anytime."
          transparentBackground
        />
      )}

      {location.pathname === "/archived" && isEmpty && (
        <MessageForUser text={messageToCreateNewNote()} />
      )}

      {location.pathname === "/" && isEmpty && (
        <MessageForUser text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
      )}

      {/* {stateStore.noteContent === "empty" && (
        <Note id="" noteTitle="" tag={[]} noteDate="" newNote />
      )} */}

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
