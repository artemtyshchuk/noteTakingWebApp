import { observer } from "mobx-react-lite";
import styles from "./NotesList.module.scss";
import { notesStore } from "store/notesStore";
import { useLocation, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { lazy, Suspense } from "react";
import { FixedSizeList as List } from "react-window";
import { GoBackButton } from "components/Buttons/GoBackButton";
import { useGetWindowHeight } from "hooks/useGetWindowHeight";
import { useClerk, useUser } from "@clerk/clerk-react";
import { SkeletonLoading } from "components/SkeletonLoading/SkeletonLoading";
import { useNotes } from "hooks/useNotes";

const MessageForUser = lazy(() => import("./MessageForUser"));
const Note = lazy(() => import("./Note"));

interface NotesListProps {
  isArchived: boolean;
}

export const NotesList = observer(({ isArchived }: NotesListProps) => {
  const { user } = useUser();
  const { data } = useNotes(user?.id || "");

  const { containerRef, containerHeight } = useGetWindowHeight();

  const skeletonHeight = 88;
  const skeletonCount = Math.ceil(containerHeight / skeletonHeight);

  const navigate = useNavigate();
  const location = useLocation();

  const { tagName } = useParams();

  const searchQuery = notesStore.searchNoteQuery.toLowerCase();

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleCreateNewNote = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    notesStore.setSearchNoteQuery("");

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

  const filteredNotes = [...(data || [])]
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

  const skeletonList = () => {
    return (
      <div className={styles.noteSkeletonContainer}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonLoading key={index} height={88} />
        ))}
      </div>
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
        <MessageForUser
          text="All your archived notes are stored here. You can restore or delete them anytime."
          transparentBackground
        />
      )}
      {location.pathname === "/archived" && isEmpty && (
        <MessageForUser text={messageToCreateNewNote()} />
      )}
      {location.pathname === "/" && isEmpty && (
        <MessageForUser text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
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
          <Suspense fallback={skeletonList()}>
            <List
              className={styles.lazyList}
              height={containerHeight - 50}
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
});
