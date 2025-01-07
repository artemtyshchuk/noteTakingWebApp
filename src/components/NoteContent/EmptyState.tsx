import styles from "./NoteContent.module.scss";
import tagIcon from "../../assets/images/icon-tag.svg";
import clockIcon from "../../assets/images/icon-clock.svg";
import { HorizontalDivider } from "../../components/Dividers/Dividers";
import React, { useState } from "react";
import { Tag } from "../../components/Tag/Tag";

interface EmptyStateProps {}

export const EmptyState = ({}: EmptyStateProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <>
      <label>
        <input
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
        {tags.length > 0 &&
          tags.map((tag, index) => (
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
            disabled={tags.length >= 3}
            placeholder={
              tags.length <= 2
                ? "Add tags separated by commas (e.g. Work, Planning)"
                : "Maximum of 3 tags"
            }
            onChange={handleTagInputChange}
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
      />

      <HorizontalDivider margin="16px 0" />

      <div className={styles.buttonsContainer}>
        <button className={styles.saveButton}>Save Note</button>
        <button className={styles.cancelButton}>Cancel</button>
      </div>
    </>
  );
};
