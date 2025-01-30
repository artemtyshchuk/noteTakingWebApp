import { NotesList } from "components/NotesList/NotesList";
import { Header } from "components/Header/Header";
import { Menu } from "components/Menu/Menu";
import { NoteContent } from "components/NoteContent/NoteContent";
import { VerticalDivider } from "components/Dividers/Dividers";
import { NoteActionButtons } from "components/NoteActionButtons/NoteActionButtons";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";

export const AllNotesPage = observer(() => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Menu />
      <VerticalDivider top="0" left="18%" />
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "24.4% 51.2% 24.4%",
          gridTemplateRows: "81px 1fr",
        }}
      >
        <div style={{ gridColumn: "1/4" }}>
          <Header />
        </div>
        <NotesList />
        <VerticalDivider
          top="81px"
          left="38%"
          height={"calc(100% - 81px)"}
          minHeight={"calc(100vh - 81px)"}
        />
        <NoteContent />
        <VerticalDivider
          top="81px"
          left="80%"
          height={"calc(100% - 81px)"}
          minHeight={"calc(100vh - 81px)"}
        />
        {notesStore.selectedNote && <NoteActionButtons />}
      </div>
    </div>
  );
});
