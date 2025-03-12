import { ColorTheme } from "components/ColorTheme/ColorTheme";
import { VerticalDivider } from "components/Dividers/Dividers";
import { Header } from "components/Header/Header";
import { Menu } from "components/Menu/Menu";
import { SettingButtonsList } from "components/SettingButtonsList/SettingButtonsList";
import { Outlet } from "react-router";

export const SettingsPage = () => {
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Menu />
        <VerticalDivider top="0" left="18%" />
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "24.4% 51.2% 24.4%",
            gridTemplateRows: "81px 1fr",
          }}
        >
          <div style={{ gridColumn: "1/4" }}>
            <Header />
          </div>
          <SettingButtonsList />
          <VerticalDivider
            top="81px"
            left="38%"
            height={"calc(100% - 81px)"}
            minHeight={"calc(100vh - 81px)"}
          />

          <div style={{ position: "relative" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
