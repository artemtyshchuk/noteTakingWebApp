import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NoteTypes } from "types/types";
import {
  addNoteToFirestore,
  archiveNoteInFirestore,
  deleteNoteFromFirestore,
  getNotesByUserId,
  restoreNoteInFirestore,
} from "utils/firebase";

export const useNotes = (userId: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery<NoteTypes[], Error>({
    queryKey: ["notes", userId],
    queryFn: () => getNotesByUserId(userId),
    enabled: !!userId,
  });

  const mutationAddNote = useMutation<NoteTypes, Error, NoteTypes>({
    mutationFn: (note) => addNoteToFirestore(note, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });

  const mutationDeleteNote = useMutation<string, Error, string>({
    mutationFn: (noteId) => deleteNoteFromFirestore(noteId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });

  const mutationArchiveNote = useMutation<string, Error, string>({
    mutationFn: (noteId) => archiveNoteInFirestore(noteId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });

  const mutationRestoreNote = useMutation<string, Error, string>({
    mutationFn: (noteId) => restoreNoteInFirestore(noteId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });

  return {
    data,
    mutationAddNote,
    mutationDeleteNote,
    mutationArchiveNote,
    mutationRestoreNote,
  };
};
