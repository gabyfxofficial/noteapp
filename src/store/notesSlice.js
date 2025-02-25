// src/store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // Example notes
  { id: 1, title: "Note 1", content: "Content of note 1..." },
  { id: 2, title: "Note 2", content: "Content of note 2..." },
];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, content } = action.payload;
      const note = state.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
