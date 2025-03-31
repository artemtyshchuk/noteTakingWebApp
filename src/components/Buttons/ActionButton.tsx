import styles from "./buttons.module.scss";
import ArchiveIcon from "assets/images/icon-archive.svg?react";
import DeleteIcon from "assets/images/icon-delete.svg?react";
import RestoreIcon from "assets/images/icon-restore.svg?react";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  archiveIcon?: boolean;
  deleteIcon?: boolean;
  restoreIcon?: boolean;
  handleAction: () => void;
}

export const ActionButton = ({
  archiveIcon,
  deleteIcon,
  restoreIcon,
  text,
  handleAction,
}: ActionButtonProps) => {
  return (
    <button className={styles.actionButton} onClick={handleAction}>
      {archiveIcon && <ArchiveIcon className={styles.strokeOrientedIcon} />}
      {deleteIcon && <DeleteIcon className={styles.strokeOrientedIcon} />}
      {restoreIcon && <RestoreIcon className={styles.icon} />}
      <span className={styles.actionButtonText}>{text}</span>
    </button>
  );
};
