import styles from "./NoteContent.module.scss";
import goBackIcon from "assets/images/icon-arrow-left.svg";
import { GoBackButton } from "components/Buttons/GoBackButton";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { NoteActionButtons } from "components/NoteActionButtons/NoteActionButtons";
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";
import { notesStore } from "store/notesStore";
import { NoteTypes } from "types/types";

interface SaveCancelButtonsContainersProps {
  note: NoteTypes;
  handleSave: () => void;
  handleCancel: () => void;
  openModal: () => void;
}

export const SaveCancelDesctopButtons = ({
  note,
  handleSave,
  handleCancel,
  openModal,
}: SaveCancelButtonsContainersProps) => {
  return (
    <div className={styles.buttonsDesctopContainer}>
      <button className={styles.saveButton} onClick={handleSave}>
        Save Note
      </button>
      <button
        className={styles.cancelButton}
        onClick={
          note.title || note.content ? () => handleCancel() : () => openModal()
        }
      >
        Cancel
      </button>
    </div>
  );
};

export const SaveCancelMobileButtons = ({
  note,
  handleSave,
  handleCancel,
  openModal,
}: SaveCancelButtonsContainersProps) => {
  const deselectNoteAndNavigate = useDeselectNoteAndNavigate();

  return (
    <div className={styles.buttonsMobileContainer}>
      <div className={styles.topButtonsContainer}>
        <div className={styles.buttonsMobileContainerLeft}>
          <div className={styles.goBackButtonContainer}>
            <GoBackButton />
          </div>
        </div>

        <div className={styles.buttonsMobileContainerRight}>
          {notesStore.selectedNote && <NoteActionButtons />}
          <button
            className={styles.cancelButton}
            onClick={
              note.title || note.content
                ? () => handleCancel()
                : () => openModal()
            }
          >
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Note
          </button>
        </div>
      </div>
      <HorizontalDivider margin="16px 0" />
    </div>
  );
};
