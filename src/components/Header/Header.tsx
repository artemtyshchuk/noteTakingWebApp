import styles from "./Header.module.scss";
import settingsIcon from "../../assets/images/icon-settings.svg";
import searchIcon from "../../assets/images/icon-search.svg";

interface HeaderProps {
  headerText: string;
}

export const Header = ({ headerText }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.headerText}>{headerText}</p>
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
        <button className={styles.settingsButton}>
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
};
