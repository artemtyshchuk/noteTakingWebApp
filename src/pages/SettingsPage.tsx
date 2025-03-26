import { GoBackButton } from "components/Buttons/GoBackButton";
import styles from "./Pages.module.scss";
import { VerticalDivider } from "components/Dividers/Dividers";
import { Header } from "components/Header/Header";
import { Menu } from "components/Menu/Menu";
import { MobileMenu } from "components/MobileMenu/MobileMenu";
import { SettingButtonsList } from "components/SettingButtonsList/SettingButtonsList";
import { Outlet, useLocation } from "react-router";

export const SettingsPage = () => {
  const location = useLocation();
  return (
    <>
      <div className={styles.notePageDesctopContainer}>
        <Menu />
        <VerticalDivider top="0" left="18%" />
        <div className={styles.settingsPageContentContainer}>
          <div className={styles.settingsPageHeaderContainer}>
            <Header />
          </div>
          <SettingButtonsList />
          <VerticalDivider
            top="81px"
            left="38%"
            height={"calc(100% - 81px)"}
            minHeight={"calc(100vh - 81px)"}
          />
          
          <div className={styles.settingsPageOutletContainer}>
            <Outlet />
          </div>
        </div>
      </div>

      <div className={styles.notePageMobileContainer}>
        <Menu />
        <div className={styles.notePageMobileContentContainer}>
          {location.pathname === "/settings" ? (
            <>
              <p className={styles.headerText}>Settings</p>
            </>
          ) : (
            <div className={styles.notePageMobileOutletContainer}>
              <GoBackButton />
            </div>
          )}

          {location.pathname === "/settings" ? (
            <>
              <SettingButtonsList />
            </>
          ) : (
            <>
              <Outlet />
            </>
          )}
        </div>
        <MobileMenu />
      </div>
    </>
  );
};
