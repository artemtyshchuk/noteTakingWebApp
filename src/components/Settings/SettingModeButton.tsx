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
  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Предотвращаем всплытие события
    //обратить внимание на этот момент
    e.preventDefault();
    if (onChange) {
      onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    //onClick={handleClick}
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
        name={title}
        checked={checked}
        onChange={onChange}
        // onClick={(e) => e.stopPropagation()}
      />
      <span className={styles.settingModeButtonBackground} />
    </label>
  );
};
