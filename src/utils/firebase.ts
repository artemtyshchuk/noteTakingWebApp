import { NoteTypes } from "types/types";
import { db, collection, getDocs } from "../../firebaseconfig";
import {
  deleteDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { notesStore } from "store/notesStore";

export const addNoteToFirestore = async (note: NoteTypes, userId: string) => {
  if (!note.id) {
    console.error("Note must have an ID");
  }
  
  try {
    console.log("User ID:", userId);
    const noteRef = doc(db, "notes", note.id);

    await setDoc(noteRef, { ...note, userId }, { merge: true });

    notesStore.updateNote(note.id, { ...note });

    console.log("Note saved with ID:", note.id);
  } catch (e) {
    console.error("Error adding or updating document: ", e);
  }
};

export const getNotesByUserId = async (
  userId: string
): Promise<NoteTypes[]> => {
  try {
    console.log("Fetching notes for user ID:", userId);

    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const notes = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          firestoreId: doc.id,
        } as NoteTypes)
    );

    console.log("Fetched notes:", notes);
    return notes;
  } catch (e) {
    console.error("Error fetching notes: ", e);
    throw e;
  }
};

export const deleteNoteFromFirestore = async (
  noteId: string,
  userId: string
) => {
  try {
    console.log("Attempting to delete note with ID:", noteId);

    const noteRef = doc(db, "notes", noteId);
    const noteSnapshot = await getDoc(noteRef);

    if (!noteSnapshot.exists()) {
      console.log("Note not found with ID:", noteId);
      throw new Error("Note not found");
    }

    const noteData = noteSnapshot.data();
    console.log("Note data:", noteData);

    if (noteData?.userId !== userId) {
      throw new Error("You are not authorized to delete this note");
    }

    await deleteDoc(noteRef);
    console.log("Note deleted successfully!");
  } catch (e) {
    console.error("Error deleting note: ", e);
  }
};

export const archiveNoteInFirestore = async (
  noteId: string,
  userId: string
) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    const noteSnapshot = await getDoc(noteRef);

    if (!noteSnapshot.exists()) {
      console.log("Note not found with ID:", noteId);
      console.error("Note not found");
    }

    const noteData = noteSnapshot.data();

    if (noteData?.userId !== userId) {
      console.log("Unauthorized access attempt by user:", userId);
      console.error("You are not authorized to modify this note");
    }

    await updateDoc(noteRef, {
      isArchived: true,
    });

    console.log(`Note ${noteId} successfully archived`);
  } catch (error) {
    console.error("Failed to archive note:", error);
  }
};

export const restoreNoteInFirestore = async (
  noteId: string,
  userId: string
) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    const noteSnapshot = await getDoc(noteRef);

    if (!noteSnapshot.exists()) {
      console.log("Note not found with ID:", noteId);
      throw new Error("Note not found");
    }

    const noteData = noteSnapshot.data();

    if (noteData?.userId !== userId) {
      throw new Error("You are not authorized to modify this note");
    }
    await updateDoc(noteRef, {
      isArchived: false,
    });
    console.log(`Note ${noteId} successfully restored`);
  } catch (error) {
    console.log("Failed to restore note:", error);
    throw error;
  }
};
