// Get saved todos from local storage
const getSavedTodos = function() {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Generate todos DOM
const generateTodoDOM = function(todo) {
  const todoEl = document.createElement("p");
  todoEl.textContent = todo.text;
  return todoEl;
};
// Generate Summary DOM
const generateSummaryDOM = function(todos) {
  let incompleteTodo = todos.filter(function(todo) {
    return !todo.completed;
  });
  const Summary = document.createElement("h2");
  Summary.textContent = `You have ${incompleteTodo.length} todos left`;
  return Summary;
};
// Render application with todos
const renderTodos = function(todos, filters) {
  let filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#todos").innerHTML = "";
  const Summary = generateSummaryDOM(todos);
  document.querySelector("#todos").appendChild(Summary);
  if (filters.hideCompleted) {
    filteredTodos = filteredTodos.filter(function(todo) {
      return !todo.completed;
    });
  }
  filteredTodos.forEach(function(todo) {
    const todoEl = generateTodoDOM(todo);
    document.querySelector("#todos").appendChild(todoEl);
  });
};
