import { Menu } from "components/Menu/Menu";
import styles from "./Pages.module.scss";
import { SearchInput } from "components/Header/SearchInput";
import { useState, useEffect } from "react";
import { MobileMenu } from "components/MobileMenu/MobileMenu";
import Note from "components/NotesList/Note";
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

  // Синхронизируем локальное состояние со store при монтировании
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
                <p>{`All notes matching "${search}" are displayed below.`}</p>
                <div>
                  <NotesList
                    isArchived={false || true}
                    listHeight={window.innerHeight - 270}
                  />
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
