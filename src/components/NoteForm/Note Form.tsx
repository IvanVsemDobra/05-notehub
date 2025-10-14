import { useState } from "react";
import css from "./NoteForm.module.css";
import type { NoteFormData } from "../../types/note";

interface NoteFormProps {
  onSubmit: (values: NoteFormData) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    tag: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    onSubmit(formData);
    setFormData({ title: "", content: "", tag: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter title..."
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
          placeholder="Enter note content..."
        />
      </label>

      <label className={css.label}>
        Tag
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter tag..."
        />
      </label>

      <button type="submit" className={css.button}>
        Create note
      </button>
    </form>
  );
};

export default NoteForm;
