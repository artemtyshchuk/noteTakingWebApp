import styles from "./Header.module.scss";
import settingsIcon from "assets/images/icon-settings.svg";
import searchIcon from "assets/images/icon-search.svg";
import { stateStore } from "store/statesStore";
import { observer } from "mobx-react-lite";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate } from "react-router";

export const Header = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickRouteButton = () => {
    stateStore.setNoteContent("idle");
    notesStore.setSelectedNote(null);
    navigate("/settings");
  };

  return (
    <div className={styles.header}>
      <div>
        <p className={styles.headerText}>
          {location.pathname === "/settings"
            ? "Settings"
            : stateStore.archivedContent
            ? "Archived Notes"
            : "All Notes"}
        </p>
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
