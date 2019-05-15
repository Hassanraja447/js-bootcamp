// Get saved notes from local storage

const getSavedNotes = function() {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

const saveNotes = function(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};
// Generate note DOM

const generatedNoteDOM = function(note) {
  const noteEl = document.createElement("p");
  if (note.title.length > 0) {
    noteEl.textContent = note.title;
  } else {
    noteEl.textContent = "Unnamed note";
  }

  return noteEl;
};

// Render notes to the application

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#notes").innerHTML = "";
  filteredNotes.forEach(function(note) {
    const noteEl = generatedNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
