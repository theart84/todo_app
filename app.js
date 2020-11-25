const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: false,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: false,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  if (arrOfTasks.length === 0)
    taskEmpty();
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task
    return acc;
  }, {});

  //Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const allTaskBtn = document.querySelector('.btn-allTask');
  const undoneTaskBtn = document.querySelector('.btn-undoneTask');
  const themeSelect = document.getElementById('themeSelect');
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
  themeSelect.value = localStorage.getItem('app_theme');

  //events
  setTheme(lastSelectedTheme);
  renderOfTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onDoneHandler);
  allTaskBtn.addEventListener('click', showAllTaskHandler);
  undoneTaskBtn.addEventListener('click', showUndoneTaskHandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);

  function renderOfTasks(taskList) {
    if (!taskList) {
      console.error(`Передайте список задач!`)
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function onDeleteHandler({target}) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId
      const confirm = deleteTask(id);
      deleteTaskFromHtml(confirm, parent);
    }
  }

  function onDoneHandler({target}) {
    if (target.classList.contains('done-btn')) {
      const parent = target.closest('[data-task-id]');
      parent.style.backgroundColor = '#e5ebf1';
      const id = parent.dataset.taskId
      const confirm = changeCompletedStatus(id);
      if (undoneTaskBtn.dataset.undoneChecked === 'on') {
        deleteTaskFromHtml(confirm, parent);
      }
      if (undoneTaskBtn.dataset.undoneChecked === 'off') {
        const sortObject = sortDoneTask(objOfTasks);
        listContainer.innerHTML = '';
        renderOfTasks(sortObject);
      }
      changeBackgroundColorInElement(confirm, parent);
      changeButtonName(confirm, target);
    }
  }

  function showAllTaskHandler() {
    allTaskBtn.dataset.alltaskChecked = 'on';
    undoneTaskBtn.dataset.undoneChecked = 'off';
    const sortObject = sortDoneTask(objOfTasks);
    listContainer.innerHTML = '';
    renderOfTasks(sortObject);
  }

  function showUndoneTaskHandler() {
    undoneTaskBtn.dataset.undoneChecked = 'on';
    allTaskBtn.dataset.alltaskChecked = 'off';
    const {...undoneTask} = objOfTasks;
    for (let key in undoneTask) {
      if (undoneTask[key].completed) {
        delete undoneTask[key];
      }
    }
    listContainer.innerHTML = '';
    renderOfTasks(undoneTask);
  }

  function listItemTemplate({_id, title, completed, body = {}}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id)
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';
    btnDel.classList.add('btn', 'btn-danger', 'delete-btn');
    const btnDone = document.createElement('button');
    btnDone.textContent = 'Done';
    btnDone.style.marginRight = '20px';
    btnDone.classList.add('btn', 'btn-success', 'ml-auto', 'done-btn');
    if (completed) {
      li.style.backgroundColor = '#e5ebf1';
      btnDone.textContent = 'Undone';
    }
    li.appendChild(span);
    li.appendChild(article);
    li.appendChild(btnDone);
    li.appendChild(btnDel);

    return li;
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert(`Введите данные в title и body`);
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    }
    objOfTasks[newTask._id] = newTask;
    if (!isEmpty(objOfTasks)) {
      const warningElementRow = document.querySelector('.taskEmpty');
      if (warningElementRow !== null) {
        warningElementRow.remove();
      }
    }
    return {...newTask};
  }

  function deleteTask(id) {
    const {title} = objOfTasks[id]
    const isConfirm = confirm(`Вы точно хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id]
    if (isEmpty(objOfTasks)) {
      taskEmpty();
    }
    return isConfirm;
  }

  function deleteTaskFromHtml(confirm, el) {
    if (!confirm) return;
    el.remove()
  }

  function changeButtonName(confirm, button) {
    if (confirm) {
      button.textContent = 'Undone';
    } else {
      button.textContent = 'Done';
    }
  }

  function changeBackgroundColorInElement(confirm, el) {
    if (!confirm) {
      el.style.backgroundColor = '#ffffff';
      return;
    }
    el.style.backgroundColor = '#e5ebf1';
  }

  function changeCompletedStatus(id) {
    if (!objOfTasks[id].completed) {
      objOfTasks[id].completed = true;
      return true;
    }
    objOfTasks[id].completed = false;
    return false;
  }

  function taskEmpty() {

    const itemContainer = document.querySelector('.form-section .container');
    const warningElementRow = document.createElement('div');
    const warningElement = document.createElement('div');
    warningElementRow.classList.add('row', 'taskEmpty');
    warningElement.classList.add('card', 'mx-auto');
    warningElement.style.textAlign = 'center';
    warningElement.style.marginTop = '20px';
    warningElement.style.padding = '10px';
    warningElement.style.width = '730px';
    warningElement.style.border = '1px solid rgba(0,0,0,.125)';
    warningElement.style.borderRadius = '0.25rem';
    warningElement.textContent = 'Список задач пустой!';
    warningElementRow.appendChild(warningElement)
    itemContainer.appendChild(warningElementRow);
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  function sortDoneTask(obj) {
    const result = {};
    Object.keys(obj).sort((prev, next) => {
      if (obj[prev].completed) {
        return 1;
      } else {
        return -1;
      }
    }).forEach(function (item) {
      result[item] = obj[item]
    });
    return result;
  }

  sortDoneTask(objOfTasks);

  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Вы действительно хотите изменить тему: ${selectedTheme}`);
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }

  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    })
  }

})(tasks);