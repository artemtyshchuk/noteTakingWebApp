import { useLocation, useNavigate } from "react-router";
import { notesStore } from "store/notesStore";

export const useDeselectNoteAndNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    notesStore.setSelectedNote(null);
    navigate(location.pathname.includes("archived") ? "/archived" : "/");
  };
};
