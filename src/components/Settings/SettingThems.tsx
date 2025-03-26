import { SettingModeButton } from "./SettingModeButton";
import styles from "./SettingThems.module.scss";
import { DesignModeTypes, FontType, ThemeType } from "types/types";

interface SettingThemesProps<T extends ThemeType | FontType> {
  selectedTheme: T;
  setSelectedTheme: (theme: T) => void;
  settingThemesTitle: string;
  settingThemesDescription: string;
  colorModes: DesignModeTypes[];
}

export const SettingThemes = <T extends ThemeType | FontType>({
  selectedTheme,
  setSelectedTheme,
  settingThemesTitle,
  settingThemesDescription,
  colorModes,
}: SettingThemesProps<T>) => {
  
  return (
    <div className={styles.settingThemes}>
      <p className={styles.settingThemesTitle}>{settingThemesTitle}</p>
      <p className={styles.settingThemesDescription}>
        {settingThemesDescription}
      </p>

      <div className={styles.themeButtonsContainer}>
        {colorModes.map((item) => (
          <SettingModeButton
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            value={item.title}
            checked={selectedTheme === item.title}
            onChange={() => setSelectedTheme(item.title as T)}
          />
        ))}
      </div>
    </div>
  );
};
