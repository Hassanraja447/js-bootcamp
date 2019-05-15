const todos = [
  {
    text: "order cat food",
    completed: false
  },
  {
    text: "Complete coding challenge",
    completed: true
  },
  {
    text: "Play football",
    completed: false
  },
  {
    text: "Go to gym",
    completed: true
  },
  {
    text: "Walk",
    completed: true
  }
];
const filters = {
  searchText: ""
};
const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#todos").innerHTML = "";
  let incompleteTodo = todos.filter(function(todo) {
    return !todo.completed;
  });
  const leftTodo = document.createElement("h2");
  leftTodo.textContent = `You have ${incompleteTodo.length} todos left`;
  document.querySelector("#todos").appendChild(leftTodo);

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

  renderTodos(todos, filters);
  e.target.elements.addTodo.value = "";
});
