import styles from "./Menu.module.scss";
import { RouteButton } from "components/Buttons/RouteButton";
import logo from "assets/images/logo.svg";
import logoDark from "assets/images/logo-darkTheme.svg";
import iconHome from "assets/images/icon-home.svg";
import iconArchive from "assets/images/icon-archive.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { TagsList } from "./TagsList";

export const Menu = observer(() => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );

  useFetchNotes();

  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme);
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.menu}>
      <div
        className={styles.logoContainer}
        onClick={() => {
          navigate("/"), (notesStore.selectedNote = null);
        }}
      >
        <img
          className={styles.logo}
          src={theme === "Dark Mode" ? logoDark : logo}
          alt="logo"
        />
      </div>
      <div className={styles.buttonsContainer}>
        <RouteButton
          text="All Notes"
          icon={iconHome}
          isActive={
            isActiveRoute("/") &&
            !isActiveRoute("/archived") &&
            !isActiveRoute("/settings")
          }
          handleAction={() => {
            navigate("/"), (notesStore.selectedNote = null);
          }}
        />
        <RouteButton
          text="Archived Notes"
          icon={iconArchive}
          isActive={isActiveRoute("/archived") && !isActiveRoute("/settings")}
          handleAction={() => {
            navigate("/archived"), (notesStore.selectedNote = null);
          }}
        />
        <HorizontalDivider margin="8px 0" />
        <p className={styles.menuText}>Tags</p>
        <TagsList />
      </div>
    </div>
  );
});
