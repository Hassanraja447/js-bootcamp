const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function(note) {
  return note.id === noteId;
});
if (note === undefined) {
  location.assign("/index.html");
}
document.querySelector("#note-title").value = note.title;
document.querySelector("#note-body").value = note.body;

document.querySelector("#note-title").addEventListener("input", function(e) {
  note.title = e.target.value;
  saveNotes(notes);
});
document.querySelector("#note-body").addEventListener("input", function(e) {
  note.body = e.target.value;
  saveNotes(notes);
});

document.querySelector("#remove-note").addEventListener("click", function() {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", function(e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(function(note) {
      return note.id === noteId;
    });
    if (note === undefined) {
      location.assign("/index.html");
    }
    document.querySelector("#note-title").value = note.title;
    document.querySelector("#note-body").value = note.body;
  }
});
