var contacts = [];

function addContact() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    if (name && email && phone) {
        contacts.push({ name: name, email: email, phone: phone });
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        displayContacts();
    } else {
        alert("Please fill all fields.");
    }
}

function searchContacts() {
    var query = document.getElementById("search").value.toLowerCase();
    var filteredContacts = contacts.filter(function (contact) {
        return contact.name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query);
    });
    displayContacts(filteredContacts);
}

function deleteContact(email) {
    contacts = contacts.filter(function (contact) {
        return contact.email !== email;
    });
    displayContacts();
}

function displayContacts(filteredContacts) {
    var list = document.getElementById("contact-list");
    list.innerHTML = "";
    var contactsToDisplay = filteredContacts || contacts;

    contactsToDisplay.forEach(function (contact) {
        var li = document.createElement("li");
        li.textContent = contact.name + " - " + contact.email + " - " + contact.phone;

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = function () {
            deleteContact(contact.email);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}
