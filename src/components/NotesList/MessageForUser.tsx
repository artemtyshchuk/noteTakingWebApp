import styles from "./NotesList.module.scss";

interface MessageForUserProps {
  text: string;
  transparentBackground?: boolean;
}

export const MessageForUser = ({ text, transparentBackground }: MessageForUserProps) => {
  return (
    <div
      className={styles.emptyListContainer}
      style={transparentBackground ? { backgroundColor: "transparent" } : {}}
    >
      <p className={styles.emptyListText}>{text}</p>
    </div>
  );
};
