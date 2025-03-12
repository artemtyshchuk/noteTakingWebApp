import { observer } from "mobx-react-lite";
import { NoteEditor } from "./NoteEditor";
import styles from "./NoteContent.module.scss";
import { stateStore } from "store/statesStore";

// interface NoteContentProps {}

// export const NoteContent = observer(({}: NoteContentProps) => {
//   const { noteContent } = stateStore;

//   const renderContent = () => {
//     switch (noteContent) {
//       case "idle":
//         return null;
//       case "empty":
//         return <NoteEditor />;
//       case "success":
//         return <NoteEditor />;
//       default:
//         return null;
//     }
//   };

//   return <div className={styles.noteContent}>{renderContent()}</div>;
// });
