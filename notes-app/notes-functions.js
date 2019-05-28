"use strict";

// Get saved notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
// Remove notes from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};
// Generate note DOM
const generatedNoteDOM = note => {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");

  textEl.setAttribute("href", `edit.html#${note.id}`);
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });
  // Setup the delete button
  button.textContent = "x";
  noteEl.appendChild(button);
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  noteEl.appendChild(textEl);
  return noteEl;
};
// Sort notes in one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetically") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};
// Render notes to the application
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  document.querySelector("#notes").innerHTML = "";
  filteredNotes.forEach(note => {
    const noteEl = generatedNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
/// Generate Last edited time

const generateLastEdited = timestamp => {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
