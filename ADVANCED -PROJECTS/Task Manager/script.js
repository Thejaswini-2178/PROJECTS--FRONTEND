const taskManager = {
    tasks: {
        pending: [],
        inProgress: [],
        completed: [],
    },

    // Add a new task
    addTask(taskName) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false,
            date: new Date(),
        };
        this.tasks.pending.push(newTask);
        this.renderTasks();
    },

    // Move task between categories
    moveTask(taskId, fromCategory, toCategory) {
        const taskIndex = this.tasks[fromCategory].findIndex(
            (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
            const [task] = this.tasks[fromCategory].splice(taskIndex, 1);
            if (toCategory === "completed") task.completed = true;
            this.tasks[toCategory].push(task);
            this.renderTasks();
        }
    },

    // Remove a task
    removeTask(taskId, category) {
        this.tasks[category] = this.tasks[category].filter(
            (task) => task.id !== taskId
        );
        this.renderTasks();
    },

    // Render tasks in their respective categories
    renderTasks() {
        // Helper function to render tasks
        const
            renderCategory = (category, containerId) => {
                const container = document.getElementById(containerId);
                container.innerHTML = ""; // Clear existing tasks

                this.tasks[category].forEach((task) => {
                    const taskItem = document.createElement("li");
                    taskItem.className =
                        "flex justify-between items-center bg-gray-100 p-3 rounded";

                    taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
              ${category !== "completed"
                            ? `<button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onclick="taskManager.moveTask(${task.id}, '${category}', '${category === "pending" ? "inProgress" : "completed"}')">Move</button>`
                            : ""
                        }
              <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="taskManager.removeTask(${task.id}, '${category}')">Remove</button>
            </div>
          `;

                    container.appendChild(taskItem);
                });
            };

        renderCategory("pending", "pendingTasks");
        renderCategory("inProgress", "inProgressTasks");
        renderCategory("completed", "completedTasks");
    },
};

// Add event listener for adding tasks
document.getElementById("addTaskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const taskName = document.getElementById("taskName").value;
    taskManager.addTask(taskName);
    e.target.reset();
});