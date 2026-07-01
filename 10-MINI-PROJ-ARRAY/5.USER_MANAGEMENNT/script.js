let users = [
    { name: "Alice", email: "alice@example.com", role: "Admin" },
    { name: "Bob", email: "bob@example.com", role: "Subscriber" },
];

function displayUsers() {
    // Sort users alphabetically by name using sort()
    users.sort((a, b) => a.name.localeCompare(b.name));

    // Update the UI with the sorted user list
    document.getElementById('users').innerHTML = users.map(user => `
      <div>
        ${user.name} (${user.role}) - ${user.email}
        <button onclick="editUser('${user.email}')">Edit</button>
        <button onclick="deleteUser('${user.email}')">Delete</button>
      </div>
    `).join('');
}

// Add a new user using push()
function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    if (name && email) {
        users.push({ name: name, email: email, role: role }); // Push new user to the array
        displayUsers();
    } else {
        alert("Please enter both name and email.");
    }
}

// Edit an existing user's details using find()
function editUser(email) {
    const user = users.find(u => u.email === email); // Find user by email
    if (user) {
        const newName = prompt("Enter new name", user.name);
        const newRole = prompt("Enter new role", user.role);

        // Update only if user provided a new value
        if (newName) user.name = newName;
        if (newRole) user.role = newRole;
        displayUsers();
    }
}

// Delete a user using filter()
function deleteUser(email) {
    users = users.filter(u => u.email !== email); // Remove user from the array
    displayUsers();
}

// Check if all users have valid email addresses using every()
function checkEmails() {
    const valid = users.every(user => user.email.includes('@')); // Check if every email is valid
    alert(valid ? "All emails are valid." : "Some emails are invalid.");
}

// Count the number of Admins using reduce()
function countAdmins() {
    const adminCount = users.reduce((count, user) => user.role === 'Admin' ? count + 1 : count, 0);
    alert(`Number of Admins: ${adminCount}`); // Display the number of Admins
}

// Initial display of users
displayUsers();
