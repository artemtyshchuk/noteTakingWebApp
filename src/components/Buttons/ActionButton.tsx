import styles from "./buttons.module.scss";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  text: string;
  handleAction: () => void;
}

export const ActionButton = ({ icon, text, handleAction }: ActionButtonProps) => {

  return (
    <button className={styles.actionButton} onClick={handleAction}>
      <img  className={styles.actionButtonIcon} src={icon} alt={icon} />
      {text}
    </button>
  );
};
