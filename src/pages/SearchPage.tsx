import { Menu } from "components/Menu/Menu";
import styles from "./Pages.module.scss";
import { SearchInput } from "components/Header/SearchInput";
import { useState, useEffect } from "react";
import { MobileMenu } from "components/MobileMenu/MobileMenu";
import { NotesList } from "components/NotesList/NotesList";
import { notesStore } from "store/notesStore";
import { Outlet, useLocation } from "react-router-dom";

export const SearchPage = () => {
  const [search, setSearch] = useState<string>(notesStore.searchNoteQuery);
  const location = useLocation();
  const isNoteEditorOpen = location.pathname.includes("/note/");

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    notesStore.setSearchNoteQuery(searchValue);
  };

  useEffect(() => {
    setSearch(notesStore.searchNoteQuery);
  }, []);

  return (
    <div className={styles.notePageMobileContainer}>
      <Menu />

      <div className={styles.searchPageMobileContentContainer}>
        {isNoteEditorOpen ? (
          <Outlet />
        ) : (
          <>
            <p className={styles.headerText}>Search</p>
            <SearchInput handleSearch={handleSearch} initialValue={search} />
            {search && (
              <>
                <p className={styles.searchResultsNotesListHeaderText}>
                  {`All notes matching "${search}" are displayed below.`}
                </p>
                <div className={styles.searchResultsNotesListContainer}>
                  <NotesList isArchived={false || true} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <MobileMenu />
    </div>
  );
};
