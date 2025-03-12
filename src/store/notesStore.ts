import { makeAutoObservable, runInAction } from "mobx";
import { NoteTypes } from "types/types";

class NotesStore {
  notes: NoteTypes[] = [];
  selectedNote: NoteTypes | null = null;
  searchNoteQuery: string = '';
  
  constructor() {
    makeAutoObservable(this);
  }

  setNote(note: NoteTypes[]) {
    this.notes = note;
  }

  addNote(note: NoteTypes) {
    runInAction(() => {
      this.notes.unshift(note);
    });
  }

  setSelectedNote(note: NoteTypes | null) {
    if (this.selectedNote) {
      this.selectedNote = null;
    }
    this.selectedNote = note;
    console.log("Selected note:", this.selectedNote);
  }

  updateNote(noteId: string, updatedFields: Partial<NoteTypes>) {
    runInAction(() => {
      this.notes = this.notes.map((note) =>
        note.id === noteId ? { ...note, ...updatedFields } : note
      );
    });
  }

  deleteNote(noteId: string) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.selectedNote = null;
  }

  setSearchNoteQuery(query: string) {
    this.searchNoteQuery = query
  }
}

export const notesStore = new NotesStore();
