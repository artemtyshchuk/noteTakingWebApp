import { observer } from "mobx-react-lite";
import { EmptyState } from "./EmptyState";
import styles from "./NoteContent.module.scss";
import { stateStore } from "store/statesStore";

interface NoteContentProps {}

export const NoteContent = observer(({}: NoteContentProps) => {
  const { noteContent } = stateStore;

  const renderContent = () => {
    switch (noteContent) {
      case "idle":
        return "";
      case "empty":
        return <EmptyState />;
    }
  };

  return <div className={styles.noteContent}>{renderContent()}</div>;
});
