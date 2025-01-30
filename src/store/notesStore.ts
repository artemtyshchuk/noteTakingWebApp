import { makeAutoObservable } from "mobx";
import { NoteTypes } from "types/types";

class NotesStore {
  notes: NoteTypes[] = [];
  selectedNote: NoteTypes | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setNote(note: NoteTypes[]) {
    this.notes = note;
  }

  addNote(note: NoteTypes) {
    this.notes.unshift(note);
  }

  setSelectedNote(note: NoteTypes | null) {
    if (this.selectedNote) {
      this.selectedNote = null;
    }
    this.selectedNote = note;
    console.log("Selected note:", this.selectedNote);
  }

  updateNote(noteId: string, updatedFields: Partial<NoteTypes>) {
    const noteIndex = this.notes.findIndex((note) => note.firestoreId === noteId);
    if (noteIndex !== -1) {
      this.notes[noteIndex] = { ...this.notes[noteIndex], ...updatedFields };
    }
  }
  

  deleteNote(noteId: string) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.selectedNote = null;
  }
}

export const notesStore = new NotesStore();
