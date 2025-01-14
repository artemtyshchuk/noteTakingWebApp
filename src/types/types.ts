export type StateTypes = "idle" | "empty";

export type NoteTypes = {
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
};
