const todos = JSON.parse(localStorage.getItem('todos')) || [];
const nameInput = document.querySelector('.name');
const newTodoForm = document.querySelector('.new-todo-form');

const username = localStorage.getItem('username') || '';

nameInput.value = username;

nameInput.addEventListener('change', (e) => {
  localStorage.setItem('username', e.target.value);
});

const displayTodos = () => {
  const todoList = document.querySelector('.todo-list');

  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const content = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const actions = document.createElement('div');
    const button = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;

    span.classList.add('circle');
    span.setAttribute('data-testid', 'todoItem');

    if (todo.category === 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('salt');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    button.classList.add('delete');
    button.setAttribute('data-testid', 'btnDeleteTodo');

    content.innerHTML = `<input type="text" value="${todo.content}">`;
    button.innerHTML = '🗑';

    label.appendChild(input);
    label.appendChild(span);
    todoItem.appendChild(label);
    todoItem.appendChild(content);

    if (todo.done) {
      actions.appendChild(button);
      todoItem.appendChild(actions);

      todoItem.classList.add('done');
      todoItem.classList.add('todo__item--completed');
    }

    todoList.appendChild(todoItem);

    input.addEventListener('click', (e) => {
      console.log('todos Click');
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
        todoItem.classList.add('todo__item--completed');
      } else {
        todoItem.classList.remove('done');
        todoItem.classList.remove('todo__item--completed');
      }

      displayTodos();
    });

    button.addEventListener('click', () => {
      console.log('Delete Click');
      const newTodos = todos.filter((td) => td !== todo);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      document.location.reload();
    });
  });
};

newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Submit');

  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
    createdAt: new Date().getTime(),
  };

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  e.target.reset();

  displayTodos();
});

displayTodos();
