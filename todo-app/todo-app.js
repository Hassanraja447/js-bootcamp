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

// You have 2 todos left (p element)
// List all the todos
// todos.forEach(function(todo) {
//   const todoEl = document.createElement("p");
//   todoEl.textContent = todo.text;
//   document.querySelector("body").appendChild(todoEl);
// });

document.querySelector("#add-todo").addEventListener("click", function(e) {
  console.log("Add todo ...");
});

/// Listen for input changes
document.querySelector("#new-todo").addEventListener("input", function(e) {
  console.log(e.target.value);
});
/// Search todos
document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});
