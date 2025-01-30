import { ThemeType } from "types/types";
import styles from "./ColorTheme.module.scss";

interface ColorModeButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  title: string;
  description: string;
  value: ThemeType;
}

export const ColorModeButton = ({
  icon,
  title,
  description,
  value,
  checked,
  onChange,
}: ColorModeButtonProps) => {
  return (
    <label className={styles.colorModeButton}>
      <div className={styles.colorModeButtonIcon}>
        <img className={styles.themeIcon} src={icon} alt={icon} />
      </div>
      <div className={styles.colorModeButtonTextContainer}>
        <p className={styles.colorModeButtonTitle}>{title}</p>
        <p className={styles.colorModeButtonDescription}>{description}</p>
      </div>
      <input
        className={styles.colorModeButtonInput}
        type="radio"
        value={value}
        name="colorTheme"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.colorModeButtonBackground} />
    </label>
  );
};
