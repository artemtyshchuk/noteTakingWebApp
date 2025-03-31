import styles from "./ModalWindow.module.scss";
import { createPortal } from "react-dom";

interface ModalWindowProps {
  icon: string;
  title: string;
  description: string;
  confirmButtonText: string;
  closeModal: () => void;
  confirmAction: () => void;
}

export const ModalWindow = ({
  icon,
  title,
  description,
  confirmButtonText,
  closeModal,
  confirmAction,
}: ModalWindowProps) => {
  return createPortal(
    <div className={styles.modalWindowBackground} onClick={() => closeModal()}>
      <div
        className={styles.modalWindow}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalWindowTopContent}>
          <div className={styles.modalWindowIconWrapper}>
            <img className={styles.modalWindowIcon} src={icon} alt="title" />
          </div>
          <div className={styles.modalWindowTextContainer}>
            <p className={styles.modalWindowTitle}>{title}</p>
            <p className={styles.modalWindowDescription}>{description}</p>
          </div>
        </div>

        <span className={styles.horizontalDivider} />

        <div className={styles.modalWindowBottomContent}>
          <button
            className={styles.modalWindowCancelButton}
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            style={
              confirmButtonText === "Delete Note"
                ? { backgroundColor: "#FB3748" }
                : { backgroundColor: "#335CFF" }
            }
            className={styles.modalWindowConfirmButton}
            onClick={() => confirmAction()}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
