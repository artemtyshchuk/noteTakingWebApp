import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { NoteEditor } from "components/NoteContent/NoteEditor";
import { notesStore } from "store/notesStore";

export const NotePage = observer(() => {
  const { id } = useParams<{ id: string }>();

  const note = notesStore.notes.find((n) => n.id === id);

  if (!note) {
    return <div>Note not found</div>;
  }

  notesStore.setSelectedNote(note);

  return <NoteEditor />;
});
