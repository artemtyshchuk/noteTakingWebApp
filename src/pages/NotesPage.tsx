import styles from "./Pages.module.scss";
import { NotesList } from "components/NotesList/NotesList";
import { Header } from "components/Header/Header";
import { Menu } from "components/Menu/Menu";
import { VerticalDivider } from "components/Dividers/Dividers";
import { NoteActionButtons } from "components/NoteActionButtons/NoteActionButtons";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation, useParams } from "react-router";
import { MobileMenu } from "components/MobileMenu/MobileMenu";

interface NotesPageProps {
  isArchived: boolean;
}

const NotesPage = observer(({ isArchived }: NotesPageProps) => {
  const isNotePage = notesStore.selectedNote?.id !== undefined;

  const location = useLocation();
  const { tagName } = useParams();

  return (
    <>
      <div className={styles.notePageDesctopContainer}>
        <Menu />
        <VerticalDivider top="0" left="18%" />
        <div className={styles.notePageDesctopContentContainer}>
          <div className={styles.headerContainer}>
            <Header />
          </div>
          <NotesList isArchived={isArchived} />
          <VerticalDivider
            top="81px"
            left="38%"
            height={"calc(100% - 81px)"}
            minHeight={"calc(100vh - 81px)"}
          />

          <div className={styles.outletContainer}>
            <Outlet />
          </div>

          <VerticalDivider
            top="81px"
            left="80%"
            height={"calc(100% - 81px)"}
            minHeight={"calc(100vh - 81px)"}
          />
          <div className={styles.noteActionButtonsContainer}>
            {notesStore.selectedNote && <NoteActionButtons />}
          </div>
        </div>
      </div>

      <div className={styles.notePageMobileContainer}>
        <Menu />
        <div className={styles.notePageMobileContentContainer}>
          {isNotePage ? (
            <>
              <Outlet />
            </>
          ) : (
            <>
              {!(location.pathname === `/tags/${tagName}`) && <Header />}
              <NotesList isArchived={isArchived} />
            </>
          )}
        </div>
      </div>

      <MobileMenu />
    </>
  );
});

export const AllNotesPage = () => <NotesPage isArchived={false} />;
export const ArchivedPage = () => <NotesPage isArchived={true} />;
