let tasks = [];
const listEl = document.getElementById('task-list');
tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    listEl.innerHTML = '';

    tasks
        .sort((a, b) => a.completed - b.completed)
        .forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;
        li.className = task.completed ? 'completed' : '';
        
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            save();
            renderTasks();
        });

        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.addEventListener('click', e => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            renderTasks();
        });

        li.appendChild(del);
        listEl.appendChild(li);
        });
}

document.getElementById('task-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const desc = input.value.trim();
    if (!desc) return;

    tasks.push({ id: Date.now(), description: desc, completed: false });
    save();
    renderTasks();
    input.value = '';
});