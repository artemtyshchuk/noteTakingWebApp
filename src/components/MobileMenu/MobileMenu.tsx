import { MobileMenuButton } from "components/Buttons/MobileMenuButton";
import styles from "./MobileMenu.module.scss";
import { menuButtonsData } from "data/menuButtonsData";

export const MobileMenu = () => {
  return (
    <div className={styles.mobileMenuContainer}>
      {menuButtonsData.map((item, index) => (
        <div key={item.text}>
          <MobileMenuButton
            icon={item.icon}
            text={item.text}
            path={item.path}
          />
          {index < menuButtonsData.length - 1 && (
            <div className={styles.divider} />
          )}
        </div>
      ))}
    </div>
  );
};
