import { FontType, ThemeType } from "types/types";
import styles from "./SettingThems.module.scss";

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
  return (
    <label className={styles.settingModeButton}>
      <div className={styles.settingModeButtonIcon}>
        <img className={styles.themeIcon} src={icon} alt={icon} />
      </div>
      <div className={styles.settingModeButtonTextContainer}>
        <p className={styles.settingModeButtonTitle}>{title}</p>
        <p className={styles.settingModeButtonDescription}>{description}</p>
      </div>
      <input
        className={styles.settingModeButtonInput}
        type="radio"
        value={value}
        name="colorTheme"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.settingModeButtonBackground} />
    </label>
  );
};
