import { ActionButton } from "components/Buttons/ActionButton";
import styles from "./NoteActionButtons.module.scss";
import archiveIcon from "assets/images/icon-archive.svg";
import deleteIcon from "assets/images/icon-delete.svg";
import restoreIcon from "assets/images/icon-restore.svg";
import { notesStore } from "store/notesStore";
import {
  archiveNoteInFirestore,
  deleteNoteFromFirestore,
  restoreNoteInFirestore,
} from "utils/firebase";
import { stateStore } from "store/statesStore";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";

export const NoteActionButtons = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const deselectNoteAndNavigate = useDeselectNoteAndNavigate();

  const handleDeleteNote = async () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId) {
      console.error("No selected note or firestoreId is missing");
      return;
    }

    try {
      await deleteNoteFromFirestore(
        notesStore.selectedNote.firestoreId!,
        user?.id as string
      );
      notesStore.deleteNote(notesStore.selectedNote.id);
      console.log("Note deleted locally and from Firestore");
      stateStore.setNoteContent("idle");
      deselectNoteAndNavigate();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleArchiveNote = async () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId) {
      console.error("No selected note or firestoreId is missing");
      return;
    }

    try {
      const noteId = notesStore.selectedNote.firestoreId;
      const userId = user?.id as string;

      await archiveNoteInFirestore(noteId, userId);
      notesStore.updateNote(noteId, { isArchived: true });
      stateStore.setNoteContent("idle");
      deselectNoteAndNavigate();
    } catch (error) {
      console.error("Failed to archive note:", error);
    }
  };

  const handleRestoreNote = async () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId) {
      console.error("No selected note or firestoreId is missing");
      return;
    }

    try {
      const noteId = notesStore.selectedNote.firestoreId!;
      const userId = user?.id as string;
      await restoreNoteInFirestore(noteId, userId);
      notesStore.updateNote(noteId, { isArchived: false });
      stateStore.setNoteContent("idle");
      deselectNoteAndNavigate();
    } catch (error) {
      console.error("Failed to restore note:", error);
    }
  };

  return (
    <div className={styles.noteActionButtons}>
      {notesStore.selectedNote && notesStore.selectedNote.isArchived ? (
        <>
          <ActionButton
            icon={restoreIcon}
            text="Restore Note"
            handleAction={handleRestoreNote}
          />
          <ActionButton
            icon={deleteIcon}
            text="Delete Note"
            handleAction={handleDeleteNote}
          />
        </>
      ) : (
        <>
          <ActionButton
            icon={archiveIcon}
            text="Archive Note"
            handleAction={handleArchiveNote}
          />
          <ActionButton
            icon={deleteIcon}
            text="Delete Note"
            handleAction={handleDeleteNote}
          />
        </>
      )}
    </div>
  );
};
