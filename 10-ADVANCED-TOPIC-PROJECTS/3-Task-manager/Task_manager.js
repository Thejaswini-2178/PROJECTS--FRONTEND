

// Task categories
const categories = {
    pending: [],
    inProgress: [],
    completed: [],
};

// Save to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(categories));
};

// Load tasks from localStorage
const loadFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        Object.assign(categories, JSON.parse(storedTasks));
    }
};

// Render tasks dynamically
const renderTasks = () => {
    document.getElementById("pending-tasks").innerHTML = categories.pending
        .map(
            (task, index) =>
                `<div class="p-2 border rounded bg-gray-100 flex justify-between">
            <span>${task.name}</span>
            <button class="text-blue-500" onclick="moveTask(${index}, 'pending', 'inProgress')">Start</button>
          </div>`
        )
        .join("");

    document.getElementById("in-progress-tasks").innerHTML = categories.inProgress
        .map(
            (task, index) =>
                `<div class="p-2 border rounded bg-gray-100 flex justify-between">
            <span>${task.name}</span>
            <button class="text-green-500" onclick="moveTask(${index}, 'inProgress', 'completed')">Complete</button>
          </div>`
        )
        .join("");

    document.getElementById("completed-tasks").innerHTML = categories.completed
        .map(
            (task) =>
                `<div class="p-2 border rounded bg-gray-100">
            <span>${task.name}</span>
          </div>`
        )
        .join("");
};

// Add task
document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskName = document.getElementById("task-name").value;
    if (taskName) {
        const task = { name: taskName, status: "pending" };
        categories.pending.push(task);
        saveToLocalStorage();
        renderTasks();
        document.getElementById("task-name").value = "";
    }
});

// Move task between categories
const moveTask = (index, fromCategory, toCategory) => {
    const task = categories[fromCategory].splice(index, 1)[0];
    task.status = toCategory;
    categories[toCategory].push(task);
    saveToLocalStorage();
    renderTasks();
};

// Fetch and update tasks
const fetchTasks = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        data.slice(0, 10).forEach((task) => {
            categories.pending.push({ name: task.title, status: "pending" });
        });
        saveToLocalStorage();
        renderTasks();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    renderTasks();
    fetchTasks();
});

