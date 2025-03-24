import { Menu } from "components/Menu/Menu";
import styles from "./Pages.module.scss";
import { TagsList } from "components/Menu/TagsList";
import { MobileMenu } from "components/MobileMenu/MobileMenu";

export const TagsPage = () => {


  return (
    <div className={styles.notePageMobileContainer}>
      <Menu />
      <div className={styles.searchPageMobileContentContainer}>
        <p className={styles.headerText}>Tags</p>
        <div className={styles.tagsPageTagsListContainer}>
          <TagsList withDivider />
        </div>
      </div>
      <MobileMenu />
    </div>
  );
};
