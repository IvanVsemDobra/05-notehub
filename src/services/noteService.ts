import axios from "axios";
import type { Note, NoteFormData } from "../types/note";

const PER_PAGE = 12;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  results: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems?: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = PER_PAGE,
  search = ""
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (newNote: NoteFormData): Promise<Note> => {
  const { data } = await api.post("/notes", newNote);
  return data;
};

export const editNote = async (
  id: string,
  values: NoteFormData
): Promise<Note> => {
  const { data } = await api.patch(`/notes/${id}`, values);
  return data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
