import { SettingsButton } from "components/Buttons/SettingButton";
import styles from "./SettingButtonsList.module.scss";
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

  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className={styles.settingButtonsList}>
      <SettingsButton
        sunIcon
        text="Color Theme"
        path="/settings/color-theme"
        onClick={() => navigate("/settings/color-theme")}
      />
      <SettingsButton
        fontIcon
        text="Font Theme"
        path="/settings/font-theme"
        onClick={() => navigate("/settings/font-theme")}
      />
      {user?.passwordEnabled && (
        <SettingsButton
          lockIcon
          text="Change Password"
          path="/settings/change-password"
          onClick={() => openUserProfile()}
        />
      )}

      <HorizontalDivider margin="8px 0" />

      <SettingsButton
        logoutIcon
        text={isSignedIn ? "Logout" : "Login"}
        onClick={handleLoginLogoutButton}
      />
      {isSignedIn && (
        <div className={styles.whoIsLoginContainer}>
          <p className={styles.whoIsLoginText}>You are logged in as:</p>
          <p className={styles.whoIsLoginEmail}>
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
      )}
    </div>
  );
};
