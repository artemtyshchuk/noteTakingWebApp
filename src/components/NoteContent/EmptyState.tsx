import styles from "./NoteContent.module.scss";
import tagIcon from "assets/images/icon-tag.svg";
import clockIcon from "assets/images/icon-clock.svg";
import { HorizontalDivider } from "components/Dividers/Dividers";
import React, { useState } from "react";
import { Tag } from "components/Tag/Tag";
import { stateStore } from "store/statesStore";
import { notesStore } from "store/notesStore";
import { NoteTypes } from "types/types";
import { format } from "date-fns";
import { addNoteToFirestore } from "utils/firebase";
import { useUser } from "@clerk/clerk-react"; 

const dateFormat = format(new Date(), "dd MMM yyyy");

interface EmptyStateProps {}

export const EmptyState = ({}: EmptyStateProps) => {
  const { user } = useUser();

  const [newNote, setNewNote] = useState<NoteTypes>({
    title: "",
    tags: ["General"],
    content: "",
    lastEdited: dateFormat,
    isArchived: false,
  });

  const [tagInput, setTagInput] = useState<string>("");

  const handleNoteChange = (
    field: keyof NoteTypes,
    value: string[] | string | boolean
  ) => {
    setNewNote({ ...newNote, [field]: value });
  };

  // tags
  const handleTagSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    event?.preventDefault();

    if (tagInput.trim()) {
      const updatedTag = [...newNote.tags, tagInput.trim()];
      handleNoteChange("tags", updatedTag);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = newNote.tags.filter((tag) => tag !== tagToDelete);
    handleNoteChange("tags", updatedTags);
  };

  //save / cancel
  const handleSaveNote = async () => {
    notesStore.addNote(newNote);
    await addNoteToFirestore(newNote, user?.id as string);
    setNewNote({
      title: "",
      tags: [],
      content: "",
      lastEdited: dateFormat,
      isArchived: false,
    });
    stateStore.setNoteContent("idle");
  };

  const handleCancelNote = () => {
    setNewNote({
      title: "",
      tags: [],
      content: "",
      lastEdited: dateFormat,
      isArchived: false,
    });
    stateStore.setNoteContent("idle");
  };

  return (
    <>
      <label className={styles.titleInputContainer}>
        <input
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
              key={index}
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
                ? "Add tags separated by commas (e.g. Work, Planning)"
                : "Maximum of 3 tags"
            }
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={handleTagSubmit}
          />
        </form>
      </label>

      <div className={styles.tagInputContainer}>
        <img className={styles.contentIcon} src={clockIcon} alt="clockIcon" />
        <p className={styles.lastEdited}>Last edited</p>
        <p className={styles.whenSaved}>Not yet saved</p>
      </div>

      <HorizontalDivider margin="16px 0" />

      <textarea
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
