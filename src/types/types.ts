export type StateTypes = "idle" | "empty" | "loading" | "error" | "success";

export type ArchivedStateTypes = "archived" | "unarchived";
export type NoteTypes = {
  id: string;
  firestoreId?: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
};

export type ThemeType = "Light Mode" | "Dark Mode" | "System";
export type FontType = 'Sans-serif' | 'Serif' | 'Monospace'

export type DesignModeTypes = {
  icon: string;
  title: ThemeType | FontType;
  description: string;
};

