import styles from "./Menu.module.scss";
import { RouteButton } from "../../components/Buttons/RouteButton";
import logo from "../../assets/images/logo.svg";
import iconHome from "../../assets/images/icon-home.svg";
import iconArchive from "../../assets/images/icon-archive.svg";
import { TagButton } from "../../components/Buttons/TagButton";
import { HorizontalDivider } from "../../components/Dividers/Dividers";

export const Menu = () => {
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

        <TagButton text="Cooking" />
        <TagButton text="Dev" />
        <TagButton text="Fitness" />
        <TagButton text="Health" />
        <TagButton text="Cooking" />
      </div>
    </div>
  );
};
