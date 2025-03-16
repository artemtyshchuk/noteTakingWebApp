import { NotesList } from "components/NotesList/NotesList";
import { Header } from "components/Header/Header";
import { Menu } from "components/Menu/Menu";
import { VerticalDivider } from "components/Dividers/Dividers";
import { NoteActionButtons } from "components/NoteActionButtons/NoteActionButtons";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router";

interface NotesPageProps {
  isArchived: boolean;
}

const NotesPage = observer(({ isArchived }: NotesPageProps) => {
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
        <NotesList isArchived={isArchived} />
        <VerticalDivider
          top="81px"
          left="38%"
          height={"calc(100% - 81px)"}
          minHeight={"calc(100vh - 81px)"}
        />

        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "20px 16px",
            gridColumn: "2/3",
            gridRow: "2/3",
          }}
        >
          <Outlet />
        </div>

        <VerticalDivider
          top="81px"
          left="80%"
          height={"calc(100% - 81px)"}
          minHeight={"calc(100vh - 81px)"}
        />
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            gridColumn: "3/4",
            gridRow: "2/3",
          }}
        >
          {notesStore.selectedNote && <NoteActionButtons />}
        </div>
      </div>
    </div>
  );
});

export const AllNotesPage = () => <NotesPage isArchived={false} />;
export const ArchivedPage = () => <NotesPage isArchived={true} />;
