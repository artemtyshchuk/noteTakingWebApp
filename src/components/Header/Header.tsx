import styles from "./Header.module.scss";
import settingsIcon from "assets/images/icon-settings.svg";
import searchIcon from "assets/images/icon-search.svg";
import { stateStore } from "store/statesStore";
import { observer } from "mobx-react-lite";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const Header = observer(() => {
  const [search, setSearch] = useState<string>(notesStore.searchNoteQuery);

  const navigate = useNavigate();
  const location = useLocation();

  const clickRouteButton = () => {
    stateStore.setNoteContent("idle");
    notesStore.setSelectedNote(null);
    navigate("/settings");
  };

  useEffect(() => {
    const delayQuery = setTimeout(() => {
      notesStore.setSearchNoteQuery(search);
    }, 300);

    return () => {
      clearTimeout(delayQuery);
    };
  }, [search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const headerTitle = () => {
    if (search) {
      return (
        <>
            <span className={styles.searchingResultsText}>Showing results for: </span>
            {notesStore.searchNoteQuery}
        </>
      );
    } else if (location.pathname === "/settings") {
      return "Settings";
    } else if (location.pathname.includes("archived")) {
      return "Archived Notes";
    } else {
      return "All Notes";
    }
  };

  return (
    <div className={styles.header}>
      <div>
        <p className={styles.headerText}>{headerTitle()}</p>
      </div>

      <div className={styles.leftSideHeader}>
        <label className={styles.searchField}>
          <img className={styles.searchIcon} src={searchIcon} alt="search" />
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="Search by title, content, or tags…"
            onChange={handleInputChange}
          />
        </label>
        <button className={styles.settingsButton} onClick={clickRouteButton}>
          <img
            className={styles.settingsIcon}
            src={settingsIcon}
            alt="settings"
          />
        </button>
      </div>

      <span className={styles.horizontalDivider} />
    </div>
  );
});
