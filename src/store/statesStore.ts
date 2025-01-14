import { makeAutoObservable } from "mobx";
import { StateTypes } from "types/types";

class StateStore {
  noteContent: StateTypes = "idle";

  constructor() {
    makeAutoObservable(this);
  }

  setNoteContent(noteContent: StateTypes) {
    this.noteContent = noteContent;
  }
}

export const stateStore = new StateStore();
