import NoteForm from "../components/NoteForm/Note Form";
import { createNote } from "../services/noteService";
import type { NoteFormData } from "../types/note";

const NotesPage = () => {
  const handleAddNote = async (data: NoteFormData) => {
    try {
      const newNote = await createNote(data);
      console.log("Створено нотатку:", newNote);
    } catch (error) {
      console.error(" Помилка при створенні нотатки:", error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <NoteForm onSubmit={handleAddNote} />
    </div>
  );
};

export default NotesPage;
