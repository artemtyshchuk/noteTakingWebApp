import styles from "./Menu.module.scss";
import { RouteButton } from "components/Buttons/RouteButton";
import logo from "assets/images/logo.svg";
import logoDark from "assets/images/logo-darkTheme.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { notesStore } from "store/notesStore";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { TagsList } from "./TagsList";

export const Menu = observer(() => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );

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
          navigate("/"),
            (notesStore.selectedNote = null),
            notesStore.setSearchNoteQuery("");
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
          isActive={
            isActiveRoute("/") &&
            !isActiveRoute("/archived") &&
            !isActiveRoute("/settings")
          }
          handleAction={() => {
            navigate("/"),
              (notesStore.selectedNote = null),
              notesStore.setSearchNoteQuery("");
          }}
          home
        />
        <RouteButton
          text="Archived Notes"
          isActive={isActiveRoute("/archived") && !isActiveRoute("/settings")}
          handleAction={() => {
            navigate("/archived"),
              (notesStore.selectedNote = null),
              notesStore.setSearchNoteQuery("");
          }}
          archive
        />
        <HorizontalDivider margin="8px 0" />
        <p className={styles.menuText}>Tags</p>
        <TagsList />
      </div>
    </div>
  );
});
