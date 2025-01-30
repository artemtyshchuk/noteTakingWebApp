import styles from "./Menu.module.scss";
import { RouteButton } from "components/Buttons/RouteButton";
import logo from "assets/images/logo.svg";
import logoDark from "assets/images/logo-darkTheme.svg";
import iconHome from "assets/images/icon-home.svg";
import iconArchive from "assets/images/icon-archive.svg";
import { TagButton } from "components/Buttons/TagButton";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";
import { observer } from "mobx-react-lite";
import { stateStore } from "store/statesStore";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const Menu = observer(() => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );

  useFetchNotes();

  const navigate = useNavigate();

  const uniqTags = Array.from(
    new Set(
      notesStore.notes
        .filter((note) =>
          stateStore.archivedContent ? note.isArchived : !note.isArchived
        )
        .flatMap((note) => note.tags)
    )
  );

  

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
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={theme === "Dark Mode" ? logoDark : logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <RouteButton
          text="All Notes"
          icon={iconHome}
          isActive={!stateStore.archivedContent}
          handleAction={() => stateStore.setArchivedContent(false)}
        />
        <RouteButton
          text="Archived Notes"
          icon={iconArchive}
          isActive={stateStore.archivedContent === true}
          handleAction={() => stateStore.setArchivedContent(true)}
        />
        <HorizontalDivider margin="8px 0" />
        <p className={styles.menuText}>Tags</p>
        <div className={styles.scrollableContainer}>
          {uniqTags.map((tag) => (
            <TagButton key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
});
