import { observer } from "mobx-react-lite";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { useFetchNotes } from "hooks/fetchData-hook";
import { useLocation, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { GoBackButton } from "components/Buttons/GoBackButton";
import { useGetWindowHeight } from "hooks/useGetWindowHeight";

const MessageForUser = lazy(() => import("./MessageForUser"));
const Note = lazy(() => import("./Note"));

interface NotesListProps {
  isArchived: boolean;
}

export const NotesList = observer(
  ({ isArchived }: NotesListProps) => {
    useFetchNotes();

    const { containerRef, containerHeight } = useGetWindowHeight();

    const navigate = useNavigate();
    const location = useLocation();
    const { tagName } = useParams();
    const searchQuery = notesStore.searchNoteQuery.toLowerCase();

    const handleCreateNewNote = () => {
      const newNoteId = uuidv4();
      notesStore.setSelectedNote({
        id: newNoteId,
        title: "",
        tags: [],
        content: "",
        lastEdited: new Date().toISOString(),
        isArchived: false,
      });
      navigate(`/note/${newNoteId}`);
    };

    const filteredNotes = [...notesStore.notes]
      .sort((a, b) => {
        const dateA = new Date(a.lastEdited);
        const dateB = new Date(b.lastEdited);
        return dateB.getTime() - dateA.getTime();
      })
      .filter((note) => note.isArchived === isArchived)
      .filter((note) => (tagName ? note.tags.includes(tagName) : true))
      .filter((note) => {
        const tags = note.tags || [];
        const title = note.title || "";
        const content = note.content || "";

        const searchQueryLower = (searchQuery?.trim() || "").toLowerCase();

        return (
          tags.some((tag) => tag.toLowerCase().includes(searchQueryLower)) ||
          title.includes(searchQueryLower) ||
          content.includes(searchQueryLower)
        );
      });

    const isEmpty = filteredNotes.length === 0;

    const messageToCreateNewNote = () => {
      return (
        <>
          No notes have been archived yet. Move notes here for safekeeping, or{" "}
          <button
            className={styles.createNoteButton}
            onClick={() => navigate("/")}
          >
            create a new note
          </button>
          .
        </>
      );
    };

    return (
      <div className={styles.notesList}>
        {!location.pathname.includes("archived") && (
          <button
            className={styles.newNoteButton}
            onClick={handleCreateNewNote}
            disabled={filteredNotes.some((note) => !note.title)}
          >
            <span className={styles.newNoteButtonText}>+ Create New Note</span>
          </button>
        )}

        {location.pathname.includes("archived") && (
          <Suspense fallback={<div>Loading...</div>}>
            <MessageForUser
              text="All your archived notes are stored here. You can restore or delete them anytime."
              transparentBackground
            />{" "}
          </Suspense>
        )}

        {location.pathname === "/archived" && isEmpty && (
          <Suspense fallback={<div>Loading...</div>}>
            <MessageForUser text={messageToCreateNewNote()} />
          </Suspense>
        )}

        {location.pathname === "/" && isEmpty && (
          <Suspense fallback={<div>Loading...</div>}>
            <MessageForUser text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
          </Suspense>
        )}

        {location.pathname === `/tags/${tagName}` && (
          <div className={styles.mobileHeaderFetures}>
            <GoBackButton />

            <p className={styles.notesListMobileHeaderText}>
              <span className={styles.innerColor}>Notes Tagged:</span> {tagName}
            </p>
            <p
              className={styles.notesListMobileHeaderDescription}
            >{`All notes with the ”${tagName}” tag are shown here.`}</p>
          </div>
        )}

        <div ref={containerRef} className={styles.scrollableContainer}>
          {containerHeight > 0 && (
            <Suspense fallback={<div>Loading...</div>}>
              <List
                className={styles.lazyList}
                height={containerHeight}
                itemCount={filteredNotes.length}
                itemSize={99}
                width={"100%"}
                style={{ overflowX: "hidden" }}
              >
                {({ index, style }) => {
                  const note = filteredNotes[index];
                  return (
                    <div style={style}>
                      <Note
                        key={note.id}
                        id={note.id}
                        noteTitle={note.title}
                        tag={note.tags}
                        noteDate={note.lastEdited}
                      />
                    </div>
                  );
                }}
              </List>
            </Suspense>
          )}
        </div>
      </div>
    );
  }
);
