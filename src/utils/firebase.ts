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
  onSnapshot,
} from "firebase/firestore";

export const addNoteToFirestore = async (note: NoteTypes, userId: string) => {
  const noteRef = doc(db, "notes", note.id);
  await setDoc(noteRef, { ...note, userId }, { merge: true });
  return note;
};

export const getNotesByUserId = async (
  userId: string
): Promise<NoteTypes[]> => {
  const q = query(collection(db, "notes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    firestoreId: doc.id,
  })) as NoteTypes[];
};


export const deleteNoteFromFirestore = async (
  noteId: string,
  userId: string
) => {
  const noteRef = doc(db, "notes", noteId);
  const noteSnapshot = await getDoc(noteRef);

  if (!noteSnapshot.exists()) {
    throw new Error("Note not found");
  }

  const noteData = noteSnapshot.data();

  if (noteData?.userId !== userId) {
    throw new Error("You are not authorized to delete this note");
  }

  await deleteDoc(noteRef);
  return noteId;
};

export const archiveNoteInFirestore = async (
  noteId: string,
  userId: string
) => {
  const noteRef = doc(db, "notes", noteId);
  const noteSnapshot = await getDoc(noteRef);

  if (!noteSnapshot.exists()) {
    throw new Error("Note not found");
  }

  const noteData = noteSnapshot.data();

  if (noteData?.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  await updateDoc(noteRef, { isArchived: true });
  return noteId;
};

export const restoreNoteInFirestore = async (
  noteId: string,
  userId: string
) => {
  const noteRef = doc(db, "notes", noteId);
  const noteSnapshot = await getDoc(noteRef);

  if (!noteSnapshot.exists()) {
    throw new Error("Note not found");
  }

  const noteData = noteSnapshot.data();
  if (noteData?.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  await updateDoc(noteRef, { isArchived: false });
  return noteId;
};


