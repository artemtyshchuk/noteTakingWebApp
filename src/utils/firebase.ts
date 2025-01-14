import { NoteTypes } from 'types/types';
import { db, collection, addDoc, getDocs } from '../../firebaseconfig'; 
import { query, where } from 'firebase/firestore';

export const addNoteToFirestore = async (note: NoteTypes, userId: string) => {
  try {
    console.log("User ID:", userId);
    const noteWithUserId = {
      ...note,
      userId,
    };

    const docRef = await addDoc(collection(db, "notes"), noteWithUserId);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getNotesByUserId = async (userId: string): Promise<(NoteTypes & { id: string })[]> => {
  try {
    console.log("Fetching notes for user ID:", userId);

    const q = query(collection(db, "notes"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const notes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as NoteTypes),
    }));

    console.log("Fetched notes:", notes);
    return notes;
  } catch (e) {
    console.error("Error fetching notes: ", e);
    throw e;
  }
};