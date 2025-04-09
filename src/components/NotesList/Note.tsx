import statusIcon from "assets/images/icon-status.svg";
import { Tag } from "components/Tag/Tag";
import { HorizontalDivider } from "components/Dividers/Dividers";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { useModal } from "hooks/useModal";
import { ModalWindow } from "components/ModalWindow/ModalWindow";
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";
import { useUser } from "@clerk/clerk-react";
import { useNotes } from "hooks/useNotes";

interface NoteProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
  noteTitle: string;
  tag: string[];
  noteDate: string;
  newNote?: boolean;
}

const Note = observer(
  ({ noteTitle, tag, noteDate, newNote, id }: NoteProps) => {
    const navigate = useNavigate();


    const { user } = useUser();
    const { data } = useNotes(user?.id || "");

    const { closeModal, isModalOpen, openModal } = useModal();

    const deselectNoteAndNavigate = useDeselectNoteAndNavigate();

    const currentNote = notesStore.selectedNote;

    if (!data) throw new Error("No data");
    const selectedNote = data.find((note) => note.id === id);

    const handleClick = () => {
      if (!selectedNote) return;

      if (currentNote && !currentNote.title && !currentNote.content) {
        openModal();
        return;
      }

      notesStore.setSelectedNote(selectedNote);

      const currentPath = window.location.pathname;

      const isArchived = currentPath.includes("/archived");
      const tagNameMatch = currentPath.match(/\/tags\/([^/]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1] : null;
      const searchIncludes = currentPath.includes("/search");

      let newPath = `/note/${id}`;

      if (tagName) {
        newPath = `/tags/${tagName}${newPath}`;
      }

      if (isArchived) {
        newPath = `/archived${newPath}`;
      }

      if (searchIncludes) {
        newPath = `/search${newPath}`;
      }

      navigate(newPath, { replace: true });
    };

    const confirmAction = () => {
      closeModal();
      deselectNoteAndNavigate();
      notesStore.deleteNote(currentNote?.id as string);
    };

    const isActive = notesStore.selectedNote?.id === id;

    return (
      <>
        <button
          key={id}
          className={`${styles.completeNote} ${newNote ? styles.newNote : ""} ${
            isActive ? styles.activeNote : ""
          }`}
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

        {isModalOpen && (
          <ModalWindow
            icon={statusIcon}
            title="Discard changes?"
            description="You have unsaved changes. Are you sure you want to discard them?"
            confirmButtonText="Discard"
            closeModal={closeModal}
            confirmAction={confirmAction}
          />
        )}
      </>
    );
  }
);

export default Note;
