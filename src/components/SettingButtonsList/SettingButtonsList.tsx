import { SettingsButton } from "components/Buttons/SettingButton";
import styles from "./SettingButtonsList.module.scss";
import sunIcon from "assets/images/icon-sun.svg";
import fontIcon from "assets/images/icon-font.svg";
import lockIcon from "assets/images/icon-lock.svg";
import logoutIcon from "assets/images/icon-logout.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export const SettingButtonsList = () => {
  const navigate = useNavigate();
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const handleLoginLogoutButton = async () => {
    if (!isSignedIn) {
      openSignIn();
    }
    try {
      await signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={styles.settingButtonsList}>
      <SettingsButton
        icon={sunIcon}
        text="Color Theme"
        onClick={() => navigate("/settings/color-theme")}
      />
      <SettingsButton
        icon={fontIcon}
        text="Font Theme"
        onClick={() => navigate("/settings/font-theme")}
      />
      <SettingsButton
        icon={lockIcon}
        text="Change Password"
        onClick={() => navigate("/settings/change-password")}
      />
      <HorizontalDivider margin="8px 0" />

      <SettingsButton
        icon={logoutIcon}
        text={isSignedIn ? "Logout" : "Login"}
        onClick={handleLoginLogoutButton}
      />
    </div>
  );
};
