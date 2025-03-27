import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import tagIcon from "assets/images/icon-tag.svg";
import clockIcon from "assets/images/icon-clock.svg";
import statusIcon from "assets/images/icon-status.svg";
import goBackIcon from "assets/images/icon-arrow-left.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { Tag } from "components/Tag/Tag";
import { notesStore } from "store/notesStore";
import { NoteTypes } from "types/types";
import { format } from "date-fns";
import { addNoteToFirestore } from "utils/firebase";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import styles from "./NoteContent.module.scss";
import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";
import { useModal } from "hooks/useModal";
import { ModalWindow } from "components/ModalWindow/ModalWindow";
import { NoteActionButtons } from "components/NoteActionButtons/NoteActionButtons";
import {
  SaveCancelDesctopButtons,
  SaveCancelMobileButtons,
} from "./SaveCancelButtonsContainers";

const dateFormat = () => format(new Date(), "dd MMM yyyy");

interface NoteEditorProps {
  isNewNote?: boolean;
}

export const NoteEditor = ({}: NoteEditorProps) => {
  const [note, setNote] = useState<NoteTypes | null>(null);
  const [tagInput, setTagInput] = useState<string>("");

  const { user } = useUser();

  const { noteId } = useParams();

  const { closeModal, isModalOpen, openModal } = useModal();

  const deselectNoteAndNavigate = useDeselectNoteAndNavigate();

  useEffect(() => {
    if (noteId) {
      const foundNote = notesStore.notes.find((n) => n.id === noteId);

      if (foundNote) {
        setNote(foundNote);
      } else {
        const newNote = {
          id: noteId || uuidv4(),
          title: "",
          tags: ["General"],
          content: "",
          lastEdited: "Not yet saved",
          isArchived: false,
        };
        notesStore.addNote(newNote);
        setNote(newNote);
      }
    }
  }, [noteId, notesStore.notes]);

  if (!note) {
    return <p>Note not found</p>;
  }

  const handleChange = (
    field: keyof NoteTypes,
    value: string | boolean | string[]
  ) => {
    setNote((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleTagSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (tagInput.trim() && !note!.tags.includes(tagInput.trim())) {
      handleChange("tags", [...note!.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    handleChange(
      "tags",
      note!.tags.filter((tag) => tag !== tagToDelete)
    );
  };

  const handleSave = async () => {
    if (!note || !note.title || !note.content)
      return alert("Please enter a title and content for the note.");

    const updatedNote = {
      ...note,
      lastEdited: dateFormat(),
      tags: note.tags.length > 0 ? note.tags : ["General"],
    };
    notesStore.updateNote(note.id, updatedNote);

    try {
      await addNoteToFirestore(updatedNote, user?.id as string);

      deselectNoteAndNavigate();
    } catch (error) {
      console.error("Error saving note to Firestore:", error);
    }
  };

  const handleCancel = () => {
    if (note && !note.title && !note.content) {
      notesStore.deleteNote(note.id);
    }

    deselectNoteAndNavigate();
  };

  return (
    <div className={styles.noteEditor}>
      <SaveCancelMobileButtons
        note={note}
        handleSave={handleSave}
        handleCancel={handleCancel}
        openModal={openModal}
      />

      <label className={styles.titleInputContainer}>
        <input
          value={note.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={styles.titleInput}
          type="text"
          placeholder="Enter a title..."
        />
      </label>

      <label className={styles.tagInputContainer}>
        <img className={styles.contentIcon} src={tagIcon} alt="tagIcon" />
        <p className={styles.tagText}>Tags</p>
        <div className={styles.tagsContainer}>
          {note.tags.map((tag) => (
            <Tag
              key={tag}
              tag={[tag]}
              deleteTagButton
              onDeleteTag={handleDeleteTag}
            />
          ))}
        </div>

        <form onSubmit={handleTagSubmit}>
          <input
            style={note.tags.length === 3 ? { display: "none" } : {}}
            className={styles.tagInput}
            autoComplete="off"
            type="text"
            id="tags"
            name="tags"
            value={tagInput}
            maxLength={14}
            disabled={note.tags.length >= 3}
            placeholder={
              note.tags.length <= 2
                ? "Add tags (e.g. Work, Planning)"
                : "Maximum of 3 tags"
            }
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={handleTagSubmit}
          />
        </form>
      </label>

      {note.isArchived && (
        <div className={styles.tagInputContainer}>
          <img
            className={styles.contentIcon}
            src={statusIcon}
            alt="statusIcon"
          />
          <p className={styles.lastEdited}>Status</p>
          <p className={styles.whenSaved}>Archived</p>
        </div>
      )}

      <div className={styles.tagInputContainer}>
        <img className={styles.contentIcon} src={clockIcon} alt="clockIcon" />
        <p className={styles.lastEdited}>Last edited</p>
        <p className={styles.whenSaved}>{note.lastEdited}</p>
      </div>

      <HorizontalDivider margin="16px 0" />

      <textarea
        value={note.content}
        className={styles.noteTextArea}
        placeholder="Start typing your note here…"
        onChange={(e) => handleChange("content", e.target.value)}
      />

      <HorizontalDivider margin="16px 0" />

      <SaveCancelDesctopButtons
        note={note}
        handleCancel={handleCancel}
        handleSave={handleSave}
        openModal={openModal}
      />

      {isModalOpen && (
        <ModalWindow
          icon={statusIcon}
          title="Discard changes?"
          description="You have unsaved changes. Are you sure you want to discard them?"
          confirmButtonText="Discard"
          closeModal={closeModal}
          confirmAction={handleCancel}
        />
      )}
    </div>
  );
};
