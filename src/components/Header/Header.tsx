import styles from "./Header.module.scss";
import settingsIcon from "assets/images/icon-settings.svg";
import { observer } from "mobx-react-lite";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

export const Header = observer(() => {
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const clickRouteButton = () => {
    notesStore.setSelectedNote(null);
    notesStore.setSearchNoteQuery("");
    setSearch("");
    navigate("/settings");
  };

  const headerTitle = () => {
    if (search) {
      return (
        <>
          <span className={styles.searchingResultsText}>
            Showing results for:{" "}
          </span>
          {notesStore.searchNoteQuery}
        </>
      );
    } else if (location.pathname === "/settings") {
      return "Settings";
    } else if (location.pathname.includes("archived")) {
      return "Archived Notes";
    } else if (location.pathname.includes("font-theme")) {
      return "Font Theme";
    } else if (location.pathname.includes("color-theme")) {
      return "Color Theme";
    } else {
      return "All Notes";
    }
  };

  return (
    <>
      <div className={styles.header}>
        <>
          <p className={styles.headerText}>{headerTitle()}</p>
        </>

        <div className={styles.leftSideHeader}>
          <SearchInput handleSearch={(search: string) => setSearch(search)} />
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
    </>
  );
});
