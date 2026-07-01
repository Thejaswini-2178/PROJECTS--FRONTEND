class User {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
const users = [];
function renderUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const listItem = document.createElement("li");
        let content = "<strong>" + user.name + "</strong> (" + user.role + ")<br> Email:" + user.email;;
        listItem.innerHTML = content;
        userList.appendChild(listItem);  // need to explain
    }
}
document.getElementById("userForm").addEventListener("submit", (e) => {  // need to explain
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    if (name && email) {
        users.push(new User(name, email, role));
        renderUsers();
        e.target.reset();
    }
})
