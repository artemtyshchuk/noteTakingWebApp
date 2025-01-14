import { makeAutoObservable } from "mobx";
import { NoteTypes } from "types/types";

class NotesStore {
  notes: NoteTypes[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setNote(note: NoteTypes[]) {
    this.notes = note;
  }

  addNote(note: NoteTypes) {
    this.notes.unshift(note);
  }
}

export const notesStore = new NotesStore();
