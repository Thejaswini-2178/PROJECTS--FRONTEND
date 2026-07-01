const userManagement = {
    users: [],
    isEditing: false,
    editingEmail: null,

    // Handle Add or Update User
    handleUserForm(name, email, role) {
        if (this.isEditing) {
            this.updateUser(name, email, role);
        } else {
            this.addUser(name, email, role);
        }
    },

    // Add a new user
    addUser(name, email, role) {
        if (!this.validateEmail(email)) {
            alert("Invalid email address!");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            role,
            preferences: {},
        };

        this.users.push(newUser);
        this.renderUsers();
        this.resetForm();
    },

    // Update an existing user
    updateUser(name, email, role) {
        this.users = this.users.map((user) =>
            user.email === email ? { ...user, name, role } : user
        );
        this.renderUsers();
        this.resetForm();
    },

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Delete a user
    deleteUser(email, requesterRole) {
        if (requesterRole !== "Admin") {
            alert("Only Admins can delete users!");
            return;
        }

        this.users = this.users.filter((user) => user.email !== email);
        this.renderUsers();
    },

    // Edit user
    editUser(email) {
        const user = this.users.find((user) => user.email === email);
        if (user) {
            document.getElementById("userName").value = user.name;
            document.getElementById("userEmail").value = user.email;
            document.getElementById("userEmail").setAttribute("readonly", "true"); // Prevent email editing
            document.getElementById("userRole").value = user.role;
            document.getElementById("userSubmitButton").textContent = "Update User";

            this.isEditing = true;
            this.editingEmail = email;
        }
    },

    // Reset the form
    resetForm() {
        document.getElementById("userName").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userEmail").removeAttribute("readonly"); // Allow email input for new user
        document.getElementById("userRole").value = "Subscriber";
        document.getElementById("userSubmitButton").textContent = "Add User";

        this.isEditing = false;
        this.editingEmail = null;
    },

    // Render user list
    renderUsers() {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Clear existing list

        this.users.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.className = "bg-white p-4 rounded shadow";

            userDiv.innerHTML = `
          <p class="font-semibold">${user.name} (${user.role})</p>
          <p class="text-sm text-gray-600">${user.email}</p>
          <div class="mt-4">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onclick="userManagement.editUser('${user.email}')"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onclick="deleteUserPrompt('${user.email}')"
            >
              Delete
            </button>
          </div>
        `;

            userList.appendChild(userDiv);
        });
    },
};

// Handle Add / Update User form submission
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const role = document.getElementById("userRole").value;

    userManagement.handleUserForm(name, email, role);
});

// Prompt for deleting a user
function deleteUserPrompt(email) {
    const role = prompt("Enter your role (Admin/Subscriber):", "Subscriber");
    userManagement.deleteUser(email, role);
}
