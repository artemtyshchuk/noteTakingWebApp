import styles from "./NoteContent.module.scss";
import tagIcon from "assets/images/icon-tag.svg";
import clockIcon from "assets/images/icon-clock.svg";
import statusIcon from "assets/images/icon-status.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import React, { useEffect, useState } from "react";
import { Tag } from "components/Tag/Tag";
import { stateStore } from "store/statesStore";
import { notesStore } from "store/notesStore";
import { NoteTypes } from "types/types";
import { format } from "date-fns";
import { addNoteToFirestore } from "utils/firebase";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";

const dateFormat = () => format(new Date(), "dd MMM yyyy");

export const NoteEditor = () => {
  const { user } = useUser();

  const selectedNote = notesStore.selectedNote;

  const [newNote, setNewNote] = useState<NoteTypes>(
    selectedNote || {
      id: uuidv4(),
      title: "",
      tags: ["General"],
      content: "",
      lastEdited: dateFormat(),
      isArchived: false,
    }
  );

  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    if (selectedNote) {
      setNewNote({ ...selectedNote });
    } else {
      setNewNote({
        id: uuidv4(),
        title: "",
        tags: ["General"],
        content: "",
        lastEdited: dateFormat(),
        isArchived: false,
      });
    }
  }, [selectedNote]);

  const handleNoteChange = (
    field: keyof NoteTypes,
    value: string[] | string | boolean
  ) => {
    setNewNote((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    event?.preventDefault();

    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      const updatedTags = [...newNote.tags, tagInput.trim()];
      handleNoteChange("tags", updatedTags);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = newNote.tags.filter((tag) => tag !== tagToDelete);
    handleNoteChange("tags", updatedTags);
  };

  const handleSaveNote = async () => {
    const uniqueTags = [...new Set(newNote.tags)];

    try {
      const updatedNote = { ...newNote, tags: uniqueTags };

      if (selectedNote) {
        notesStore.updateNote(newNote.id, updatedNote);
      } else {
        notesStore.addNote(updatedNote);
      }

      await addNoteToFirestore(updatedNote, user?.id as string);

      notesStore.setSelectedNote(null);
      setNewNote({
        id: uuidv4(),
        title: "",
        tags: ["General"],
        content: "",
        lastEdited: dateFormat(),
        isArchived: false,
      });
      stateStore.setNoteContent("idle");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleCancelNote = () => {
    notesStore.setSelectedNote(null);
    stateStore.setNoteContent("idle");
    setNewNote({
      id: uuidv4(),
      title: "",
      tags: ["General"],
      content: "",
      lastEdited: dateFormat(),
      isArchived: false,
    });
  };

  return (
    <>
      <label className={styles.titleInputContainer}>
        <input
          value={newNote.title}
          onChange={(e) => handleNoteChange("title", e.target.value)}
          className={styles.titleInput}
          type="text"
          id="title"
          name="title"
          placeholder="Enter a title..."
        />
      </label>

      <label className={styles.tagInputContainer}>
        <img className={styles.contentIcon} src={tagIcon} alt="tagIcon" />
        <p className={styles.tagText}>Tags</p>
        {newNote.tags.length > 0 &&
          newNote.tags.map((tag, index) => (
            <Tag
              key={tag}
              tag={[tag]}
              deleteTagButton
              onDeleteTag={handleDeleteTag}
            />
          ))}
        <form onSubmit={handleTagSubmit}>
          <input
            className={styles.tagInput}
            autoComplete="off"
            type="text"
            id="tags"
            name="tags"
            value={tagInput}
            maxLength={8}
            disabled={newNote.tags.length >= 3}
            placeholder={
              newNote.tags.length <= 2
                ? "Add tags (e.g. Work, Planning)"
                : "Maximum of 3 tags"
            }
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={handleTagSubmit}
          />
        </form>
      </label>

      {notesStore.selectedNote?.isArchived && (
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
        <p className={styles.whenSaved}>
          {notesStore.selectedNote
            ? notesStore.selectedNote.lastEdited
            : "Not yet saved"}
        </p>
      </div>

      <HorizontalDivider margin="16px 0" />

      <textarea
        value={newNote.content}
        className={styles.noteTextArea}
        name="note-content"
        id="note-content"
        placeholder="Start typing your note here…"
        onChange={(e) => handleNoteChange("content", e.target.value)}
      />

      <HorizontalDivider margin="16px 0" />

      <div className={styles.buttonsContainer}>
        <button className={styles.saveButton} onClick={handleSaveNote}>
          Save Note
        </button>
        <button className={styles.cancelButton} onClick={handleCancelNote}>
          Cancel
        </button>
      </div>
    </>
  );
};
