import { makeAutoObservable } from "mobx";
import { StateTypes } from "types/types";

class StateStore {
  noteContent: StateTypes = "idle";
  archivedContent: Boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNoteContent(noteContent: StateTypes) {
    this.noteContent = noteContent;
  }

  setArchivedContent(archivedContent: boolean) {
    this.archivedContent = archivedContent;
  }
}

export const stateStore = new StateStore();
