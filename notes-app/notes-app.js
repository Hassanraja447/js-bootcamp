const notes = [
  {
    title: "Work on habits",
    body: "Eat better, Exercise"
  },
  {
    title: "Coding practise",
    body: "Code daily for at least one hour"
  },
  {
    title: "Work progress",
    body: "Keep track of all the work"
  }
];
const filters = {
  searchText: ""
};
const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#notes").innerHTML = "";
  filteredNotes.forEach(function(note) {
    const noteEl = document.createElement("p");
    noteEl.textContent = note.title;
    document.querySelector("#notes").appendChild(noteEl);
  });
};
renderNotes(notes, filters);
document.querySelector("#create-note").addEventListener("click", function(e) {
  console.log("The button was clicked");
});

document.querySelector("#remove-all").addEventListener("click", function() {
  document.querySelectorAll(".note").forEach(function(note) {
    note.remove();
  });
});

document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});
