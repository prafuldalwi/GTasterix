
function renderTodos() {
    todoList.innerHTML = state.todos
      .map(todo => `<li>${todo.text}</li>`)
      .join('');
  }






items.forEach(item => {
    const div = document.createElement('div');
    container.appendChild(div);
  });
  


const fragment = document.createDocumentFragment();

items.forEach(item => {
  const div = document.createElement('div');
  fragment.appendChild(div);
});

container.appendChild(fragment);