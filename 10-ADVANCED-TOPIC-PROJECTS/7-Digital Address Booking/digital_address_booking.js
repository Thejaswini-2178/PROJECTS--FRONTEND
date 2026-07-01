// Contacts data
let contacts = [];

// Fetch contacts from server
const fetchContacts = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();
        contacts = data.map((contact) => ({
            id: contact.id,
            name: contact.name,
            email: contact.email,
        }));
        renderContacts();
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
};

// Add contact
document.getElementById("add-contact-btn").addEventListener("click", () => {
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;

    if (!name || !email) {
        alert("Both name and email are required!");
        return;
    }

    const newContact = {
        id: Date.now(),
        name,
        email,
    };

    contacts.push(newContact);
    renderContacts();

    // Clear input fields
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
});

// Render contacts
const renderContacts = () => {
    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = "";

    contacts.map((contact) => {
        const contactElement = document.createElement("div");
        contactElement.className =
            "p-4 border rounded flex justify-between items-center";

        contactElement.innerHTML = `
      <div>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
      </div>
      <div>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mb-2" 
          onclick="editContact(${contact.id})">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" 
          onclick="deleteContact(${contact.id})">Delete</button>
      </div>
    `;

        contactsContainer.appendChild(contactElement);
    });
};

// Edit contact
const editContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
        const newName = prompt("Enter new name:", contact.name);
        const newEmail = prompt("Enter new email:", contact.email);

        if (newName) contact.name = newName;
        if (newEmail) contact.email = newEmail;

        renderContacts();
    }
};

// Delete contact
const deleteContact = (id) => {
    contacts = contacts.filter((c) => c.id !== id);
    renderContacts();
};

// Search contacts with regular expressions
document.getElementById("search").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const regex = new RegExp(searchTerm, "i");
    const filteredContacts = contacts.filter(
        (contact) => regex.test(contact.name) || regex.test(contact.email)
    );
    renderContacts(filteredContacts);
});

// Bulk updates using Web Workers
if (window.Worker) {
    const bulkUpdateWorker = new Worker(
        URL.createObjectURL(
            new Blob(
                [
                    `
    onmessage = function(e) {
      const updatedContacts = e.data.map(contact => ({
        ...contact,
        email: contact.email.replace('@example.com', '@updated.com')
      }));
      postMessage(updatedContacts);
    };
  `,
                ],
                { type: "application/javascript" }
            )
        )
    );

    document.getElementById("bulk-update-btn").addEventListener("click", () => {
        bulkUpdateWorker.postMessage(contacts);
        bulkUpdateWorker.onmessage = (event) => {
            contacts = event.data;
            renderContacts();
        };
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", fetchContacts);
