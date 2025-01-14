import styles from "./Menu.module.scss";
import { RouteButton } from "components/Buttons/RouteButton";
import logo from "assets/images/logo.svg";
import iconHome from "assets/images/icon-home.svg";
import iconArchive from "assets/images/icon-archive.svg";
import { TagButton } from "components/Buttons/TagButton";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";
import { observer } from "mobx-react-lite";

export const Menu = observer(() => {
  useFetchNotes();

  const uniqTags = Array.from(
    new Set(notesStore.notes.flatMap((note) => note.tags))
  );

  return (
    <div className={styles.menu}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <RouteButton text="All Notes" icon={iconHome} />
        <RouteButton text="Archived Notes" icon={iconArchive} />
        <HorizontalDivider margin="8px 0" />
        <p className={styles.menuText}>Tags</p>
        {uniqTags.map((tag) => (
          <TagButton key={tag} text={tag} />
        ))}
        <TagButton text="Cooking" />
        <TagButton text="Dev" />
        <TagButton text="Fitness" />
        <TagButton text="Health" />
        <TagButton text="Cooking" />
      </div>
    </div>
  );
});
