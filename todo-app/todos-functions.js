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
// Remove todos from the list 
const removeTodo = function(id){
  const todoIndex = todos.findIndex(function(todo){
    return todo.id === id
  })
  if(todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}
// Toggle todo when checkbox is checked/unchecked
const toggleTodo = function(id){
  const todo = todos.find(function(todo){
    return todo.id === id
  })
  if (todo){
    todo.completed = !todo.completed
  }
}
// Generate todos DOM
const generateTodoDOM = function(todo) {
  const todoEl = document.createElement("div");
  const textEl = document.createElement("span");
  const checkbox = document.createElement("input");

  // Checkbox input DOM element
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed
  todoEl.appendChild(checkbox);
checkbox.addEventListener('change', function(){
  toggleTodo(todo.id)
  renderTodos(todos, filters)
})

  // Setup todo text and button
  textEl.textContent = todo.text;
  todoEl.appendChild(textEl);

  // Setup the remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', function(){
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

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
