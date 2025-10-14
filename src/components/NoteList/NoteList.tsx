import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

import Modal from "../Modal/Modal";

import { useModal } from "../../hooks/useModal";

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

export default function NoteList({ notes, onSelectNote }: NoteListProps) {
  const [isOpen, open, close] = useModal();

  const queryClient = useQueryClient();

  const mutaion = useMutation({
    mutationFn: deleteNote,
    // mutationFn: (id: Node["id"]) => deleteNode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <button className={css.edit} onClick={() => onSelectNote(note)}>
                Edit
              </button>
              <button
                className={css.delete}
                onClick={() => mutaion.mutate(note.id)}
              >
                Delete
              </button>
              <button onClick={open}>Show Details</button>
            </div>
          </li>
        ))}
      </ul>
      {isOpen && <Modal onClose={close}>Details INFO</Modal>}
    </>
  );
}
