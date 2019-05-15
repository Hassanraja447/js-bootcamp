let todos = [];
// Check if data already exist
const todosJSON = localStorage.getItem("todos");
if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}
const filters = {
  searchText: "",
  hideCompleted: false
};
const renderTodos = function(todos, filters) {
  let filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#todos").innerHTML = "";
  let incompleteTodo = todos.filter(function(todo) {
    return !todo.completed;
  });
  const leftTodo = document.createElement("h2");
  leftTodo.textContent = `You have ${incompleteTodo.length} todos left`;
  document.querySelector("#todos").appendChild(leftTodo);
  if (filters.hideCompleted) {
    filteredTodos = filteredTodos.filter(function(todo) {
      return !todo.completed;
    });
  }
  filteredTodos.forEach(function(todo) {
    const todoEl = document.createElement("p");
    todoEl.textContent = todo.text;
    document.querySelector("#todos").appendChild(todoEl);
  });
};
renderTodos(todos, filters);
/// Search todos
document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#form-todo").addEventListener("submit", function(e) {
  e.preventDefault();
  let newTodo = {
    text: e.target.elements.addTodo.value,
    completed: false
  };
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos, filters);
  e.target.elements.addTodo.value = "";
});

document
  .querySelector("#hide-completed")
  .addEventListener("change", function(e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
