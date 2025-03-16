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
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";
import { useState } from "react";
import { ModalWindow } from "components/ModalWindow/ModalWindow";

interface ModalConfig {
  icon: string;
  title: string;
  description: string;
  confirmButtonText: string;
  confirmAction: () => void;
}

export const NoteActionButtons = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const { user } = useUser();
  const deselectNoteAndNavigate = useDeselectNoteAndNavigate();

  const openModal = (config: ModalConfig) => setModalConfig(config);

  const closeModal = () => setModalConfig(null);

  const handleDeleteNote = () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId)
      return;

    openModal({
      icon: deleteIcon,
      title: "Delete Note",
      description:
        "Are you sure you want to permanently delete this note? This action cannot be undone.",
      confirmButtonText: "Delete Note",
      confirmAction: async () => {
        try {
          await deleteNoteFromFirestore(
            notesStore.selectedNote!.firestoreId!,
            user?.id as string
          );
          notesStore.deleteNote(notesStore.selectedNote!.id);
          stateStore.setNoteContent("idle");
          deselectNoteAndNavigate();
        } catch (error) {
          console.error("Failed to delete note:", error);
        }
      },
    });
  };

  const handleArchiveNote = async () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId)
      return;

    openModal({
      icon: archiveIcon,
      title: "Archive Note",
      description:
        "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
      confirmButtonText: "Archive Note",
      confirmAction: async () => {
        try {
          const noteId = notesStore.selectedNote!.firestoreId!;
          const userId = user?.id as string;

          await archiveNoteInFirestore(noteId, userId);
          notesStore.updateNote(noteId, {
            isArchived: true,
          });
          stateStore.setNoteContent("idle");
          deselectNoteAndNavigate();
        } catch (error) {
          console.error("Failed to archive note:", error);
        }
      },
    });
  };

  const handleRestoreNote = async () => {
    if (!notesStore.selectedNote || !notesStore.selectedNote.firestoreId)
      return;

    openModal({
      icon: restoreIcon,
      title: "Restore Note",
      description:
        "Are you sure you want to restore this note? You can find it in the Notes section.",
      confirmButtonText: "Restore Note",
      confirmAction: async () => {
        try {
          const noteId = notesStore.selectedNote!.firestoreId!;
          const userId = user?.id as string;

          await restoreNoteInFirestore(noteId, userId);
          notesStore.updateNote(noteId, { isArchived: false });
          stateStore.setNoteContent("idle");
          deselectNoteAndNavigate();
        } catch (error) {
          console.error("Failed to restore note:", error);
        }
      },
    });
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

      {modalConfig && (
        <ModalWindow
          icon={modalConfig.icon}
          title={modalConfig.title}
          description={modalConfig.description}
          confirmButtonText={modalConfig.confirmButtonText}
          closeModal={() => setModalConfig(null)}
          confirmAction={async () => {
            modalConfig.confirmAction();
            closeModal();
          }}
        />
      )}
    </div>
  );
};
