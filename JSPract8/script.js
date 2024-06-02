const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const task = prompt('Enter a new TODO:');
  if (task) {
    const todo = {
      id: Date.now(),
      text: task,
      checked: false
    };
    todos.push(todo);
    render();
    saveTodos();
    console.log('Saved TODOs:', todos);
  }
}

function renderTodo(todo) {
  const checkedClass = todo.checked ? 'text-success text-decoration-line-through' : '';
  const checkedAttribute = todo.checked ? 'checked' : '';

  return `
    <li class="list-group-item" id="todo-${todo.id}">
      <input type="checkbox" class="form-check-input me-2" ${checkedAttribute} onclick="checkTodo(${todo.id})" />
      <label class="${checkedClass}">${todo.text}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  updateCounter();
}

function updateCounter() {
  const itemCount = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;

  itemCountSpan.textContent = itemCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  saveTodos();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    saveTodos();
  }
}

loadTodos();
render();
