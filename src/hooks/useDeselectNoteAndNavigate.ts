import { useLocation, useNavigate, useParams } from "react-router";
import { notesStore } from "store/notesStore";

export const useDeselectNoteAndNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tagName } = useParams();

  return () => {
    notesStore.setSelectedNote(null);

    if (location.pathname.includes("archived")) {
      navigate("/archived");
    } else if (location.pathname.includes("search")) {
      navigate("/search");
    } else if (tagName && location.pathname.includes("note")) {
      navigate(`/tags/${tagName}`);
    } else if (tagName) {
      navigate("/tags");
    } else if (location.pathname.includes("color-theme")) {
      navigate("/settings");
    } else if (location.pathname.includes("font-theme")) {
      navigate("/settings");
    } else {
      navigate("/");
    }
  };
};
