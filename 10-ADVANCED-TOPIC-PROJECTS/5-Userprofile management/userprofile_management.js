
// User data
let users = [];

// Fetch users from API
const fetchUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        users = data.slice(0, 5).map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: "Subscriber",
            metadata: { createdAt: new Date() }, // Using a regular property instead of Symbol
        }));
        renderUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Validate input fields
const validateInput = (username, email) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        alert(
            "Invalid username! Must be 3-20 characters long and contain no special characters."
        );
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email address!");
        return false;
    }

    return true;
};

// Add a new user
document.getElementById("add-user-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    if (!validateInput(username, email)) return;

    const newUser = {
        id: Date.now(),
        username,
        email,
        role,
        metadata: { createdAt: new Date() }, // Using a regular property
    };

    users.push(newUser);
    renderUsers();

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
});

// Update user preferences
const updateUserRole = (id, newRole) => {
    const user = users.find((user) => user.id === id);
    if (user) {
        user.role = newRole;
        renderUsers();
    }
};

// Delete a user
const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    renderUsers();
};

// Render users dynamically
const renderUsers = () => {
    const userList = document.getElementById("users");
    userList.innerHTML = "";

    users.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.className =
            "p-4 border rounded flex justify-between items-center";

        userElement.innerHTML = `
      <div>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><small><strong>Created At:</strong> ${user.metadata.createdAt.toLocaleString()}</small></p>
      </div>
      <div>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mb-2" 
          onclick="updateUserRole(${user.id}, 'Admin')">Make Admin</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" 
          onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;

        userList.appendChild(userElement);
    });
};

// Initialize application
document.addEventListener("DOMContentLoaded", fetchUsers);
