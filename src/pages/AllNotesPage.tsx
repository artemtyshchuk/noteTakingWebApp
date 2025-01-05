import { Header } from "../components/Header/Header";
import { Menu } from "../components/Menu/Menu";

export const AllNotesPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Menu />
      <Header headerText="All Notes" />
    </div>
  );
};
