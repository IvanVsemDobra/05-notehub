import { useState } from "react";
import css from "./App.module.css";
import NoteFormModal from "../Modal/NoteFormModal";
import { createNote } from "../../services/noteService";
import type { NoteFormData } from "../../types/note";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNote = async (values: NoteFormData) => {
    try {
      const newNote = await createNote(values);
      console.log("Створено нотатку:", newNote);
    } catch (error) {
      console.error("Помилка при створенні нотатки:", error);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNote}
      />
    </div>
  );
}
