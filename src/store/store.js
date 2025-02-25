// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

// Function to load state from localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem("notesAppState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
}

// Function to save state to localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("notesAppState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState, // Initialize store with state from localStorage (if available)
});

// Subscribe to store updates and save the notes slice to localStorage
store.subscribe(() => {
  saveState({
    notes: store.getState().notes,
  });
});

export default store;
