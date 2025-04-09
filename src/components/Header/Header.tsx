import styles from "./Header.module.scss";
import SettingsIcon from "assets/images/icon-settings.svg?react";
import { observer } from "mobx-react-lite";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate } from "react-router";
import { SearchInput } from "./SearchInput";

export const Header = observer(() => {

  const navigate = useNavigate();
  const location = useLocation();

  const searchResult = notesStore.searchNoteQuery;

  const clickRouteButton = () => {
    notesStore.setSelectedNote(null);
    notesStore.setSearchNoteQuery("");
    navigate("/settings");
  };

  const headerTitle = () => {
    if (searchResult) {
      return (
        <>
          <span className={styles.searchingResultsText}>
            Showing results for:{" "}
          </span>
          {searchResult}
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

  const isActive = location.pathname === "/settings";

  return (
    <>
      <div className={styles.header}>
        <>
          <p className={styles.headerText}>{headerTitle()}</p>
        </>

        <div
          className={`${styles.leftSideHeader} ${
            isActive ? styles.leftSideHeaderActive : ""
          }`}
        >
          <SearchInput />
          <button className={styles.settingsButton} onClick={clickRouteButton}>
            <SettingsIcon className={styles.settingsIcon} />
          </button>
        </div>

        <span className={styles.horizontalDivider} />
      </div>
    </>
  );
});
