// Get saved todos from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON ? JSON.parse(todosJSON) : [];
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
// Remove todos from the list
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};
// Toggle todo when checkbox is checked/unchecked
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
// Generate todos DOM
const generateTodoDOM = todo => {
  const todoEl = document.createElement("div");
  const textEl = document.createElement("span");
  const checkbox = document.createElement("input");

  // Checkbox input DOM element
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos(todos, filters);
  });

  // Setup todo text and button
  textEl.textContent = todo.text;
  todoEl.appendChild(textEl);

  // Setup the remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};
// Generate Summary DOM
const generateSummaryDOM = todos => {
  let incompleteTodo = todos.filter(todo => !todo.completed);
  const Summary = document.createElement("h2");
  Summary.textContent = `You have ${incompleteTodo.length} todos left`;
  return Summary;
};
// Render application with todos
const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  document.querySelector("#todos").innerHTML = "";
  const Summary = generateSummaryDOM(todos);
  document.querySelector("#todos").appendChild(Summary);
  if (filters.hideCompleted) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }
  filteredTodos.forEach(todo => {
    const todoEl = generateTodoDOM(todo);
    document.querySelector("#todos").appendChild(todoEl);
  });
};
