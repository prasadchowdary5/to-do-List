// script.js
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

const addTaskButton = document.getElementById('add-task-button');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        saveTasksToLocalStorage();
        newTaskInput.value = '';
    }
}

function createTaskItem(taskText, status = 'pending') {
    const li = document.createElement('li');
    li.className = status;

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(li, span));
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));
    li.appendChild(deleteButton);

    li.addEventListener('click', () => toggleTaskStatus(li));

    return li;
}

function editTask(li, span) {
    const newTaskText = prompt('Edit Task:', span.textContent);
    if (newTaskText !== null) {
        span.textContent = newTaskText;
        saveTasksToLocalStorage();
    }
}

function deleteTask(li) {
    li.remove();
    saveTasksToLocalStorage();
}

function toggleTaskStatus(li) {
    li.classList.toggle('completed');
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.childNodes.forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            status: task.className
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.status);
            taskList.appendChild(taskItem);
        });
    }
}
