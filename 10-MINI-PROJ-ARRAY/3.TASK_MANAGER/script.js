let pendingTasks = [];
let inProgressTasks = [];
let completedTasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        pendingTasks.push({ name: task, immutable: false });
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Task cannot be empty!');
    }
};

const moveTask = (task, from, to) => {
    const taskIndex = from.findIndex((t) => t.name === task.name);
    if (taskIndex > -1) {
        from.splice(taskIndex, 1);
        to.push(task);
        renderTasks();
    }
};

const deleteTask = (task, from) => {
    const taskIndex = from.findIndex((t) => t.name === task.name);
    if (taskIndex > -1) {
        from.splice(taskIndex, 1);
        renderTasks();
    }
};

const renderTasks = () => {
    const categories = {
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
    };

    Object.keys(categories).forEach((category) => {
        const taskContainer = document.getElementById(`${category}Tasks`);
        taskContainer.innerHTML = '';
        categories[category].forEach((task) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
          <span>${task.name}</span>
          <div>
            ${category !== 'completed' ? `<button onclick="moveTask(findTask('${task.name}', '${category}'), ${category}Tasks, ${category === 'pending' ? 'inProgressTasks' : 'completedTasks'})">Next</button>` : ''}
            <button onclick="deleteTask(findTask('${task.name}', '${category}'), ${category}Tasks)">Done</button>
          </div>
        `;
            taskContainer.appendChild(taskElement);
        });
    });
};

const findTask = (taskName, category) => {
    const categories = {
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
    };
    return categories[category].find((task) => task.name === taskName);
};

renderTasks();
