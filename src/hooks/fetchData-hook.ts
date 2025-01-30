import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { notesStore } from "store/notesStore";
import { getNotesByUserId } from "utils/firebase";

export const useFetchNotes = () => {
  const { user } = useUser();

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        try {
          const notes = await getNotesByUserId(user.id);
          notesStore.setNote(notes);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };

    fetchNotes();
  }, [user]);
};
