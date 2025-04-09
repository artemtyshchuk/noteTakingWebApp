import styles from "./SettingThems.module.scss";
import { FontType, ThemeType } from "types/types";
import SunIcon from "assets/images/icon-sun.svg?react";
import MoonIcon from "assets/images/icon-moon.svg?react";
import SystemThemeIcon from "assets/images/icon-system-theme.svg?react";
import SansSerifIcon from "assets/images/icon-font-sans-serif.svg?react";
import SerifIcon from "assets/images/icon-font-serif.svg?react";
import MonospaceIcon from "assets/images/icon-font-monospace.svg?react";

interface SettingModeButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  title: string;
  description: string;
  value: ThemeType | FontType;
}

export const SettingModeButton = ({
  icon,
  title,
  description,
  value,
  checked,
  onChange,
}: SettingModeButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Предотвращаем всплытие события
    //обратить внимание на этот момент
    e.preventDefault();
    if (onChange) {
      onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <label className={styles.settingModeButton}>
      <div className={styles.settingModeButtonIcon}>
        {icon === "sunIcon" && <SunIcon className={styles.strokeOrientedThemeIcon} />}
        {icon === "moonIcon" && <MoonIcon className={styles.themeIcon} />}
        {icon === "systemThemeIcon" && (
          <SystemThemeIcon className={styles.themeIcon} />
        )}
        {icon === "sansSerifIcon" && (
          <SansSerifIcon className={styles.themeIcon} />
        )}
        {icon === "serifIcon" && <SerifIcon className={styles.themeIcon} />}
        {icon === "monospaceIcon" && (
          <MonospaceIcon className={styles.themeIcon} />
        )}
      </div>
      <div className={styles.settingModeButtonTextContainer}>
        <p className={styles.settingModeButtonTitle}>{title}</p>
        <p className={styles.settingModeButtonDescription}>{description}</p>
      </div>
      <input
        className={styles.settingModeButtonInput}
        type="radio"
        value={value}
        name={title}
        checked={checked}
        onChange={onChange}
        // onClick={(e) => e.stopPropagation()}
      />
      <span className={styles.settingModeButtonBackground} />
    </label>
  );
};
