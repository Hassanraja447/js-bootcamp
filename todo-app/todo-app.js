let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(todos, filters);
/// Search todos
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#form-todo").addEventListener("submit", e => {
  e.preventDefault();
  let newTodo = {
    id: uuidv4(),
    text: e.target.elements.addTodo.value,
    completed: false
  };
  todos.push(newTodo);
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.addTodo.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
