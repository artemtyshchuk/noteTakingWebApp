import React from "react";
import styles from "./NotesList.module.scss";

interface MessageForUserProps {
  text: React.ReactNode;
  transparentBackground?: boolean;
}

const MessageForUser = ({
  text,
  transparentBackground,
}: MessageForUserProps) => {
  return (
    <div
      className={styles.emptyListContainer}
      style={transparentBackground ? { backgroundColor: "transparent" } : {}}
    >
      <p className={styles.emptyListText}>{text}</p>
    </div>
  );
};

export default MessageForUser;
