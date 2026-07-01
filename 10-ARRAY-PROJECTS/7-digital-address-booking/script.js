const addressBook = {
    contacts: [],
    isEditing: false,
    editingEmail: null,
    handleContactForm: function (name, email, phone) {
        console.log(name, email, phone);
        if (this.isEditing) {
            this.updateContact(name, email, phone);
        } else {
            this.addContact(name, email, phone);
        }
    },
    addContact: function (name, email, phone) {
        const contact = {
            id: Date.now(),
            contactName: name,
            contactEmail: email,
            contactPhone: phone,
        };
        this.contacts.push(contact);
        this.renderContacts();
        this.resetContact(contact);
    },
    editContact: function (email) {
        const contactToEdit = this.contacts.find(
            (contact) => contact.contactEmail == email
        );
        for (a in contactToEdit) {
            if (a !== "id") {
                document.getElementById(a).value = contactToEdit[a];
            }
            if (a === "contactEmail") {
                document.getElementById(a).setAttribute("readOnly", true);
            }
        }
        this.isEditing = true;
        this.editingEmail = email;
        document.getElementById("contactSubmitButton").innerHTML =
            "Update Contact ";
    },
    updateContact: function (contactName, contactEmail, contactPhone) {
        this.contacts = this.contacts.map((contact) =>
            contact.contactEmail === contactEmail
                ? { ...contact, contactName, contactPhone }
                : contact
        );
        this.renderContacts();
        this.resetContact({ contactName, contactEmail, contactPhone });
        this.isEditing = false;
        this.editingEmail = null;
    },
    deleteContact: function (contactEmail) {
        this.contacts = this.contacts.filter((contact) => {
            return contact.contactEmail !== contactEmail;
        });
        this.renderContacts();
    },
    searchContact: function (query) {
        const userInput = query.toLowerCase();
        return this.contacts.filter((contact) => {
            return (
                contact.contactName.includes(userInput) ||
                contact.contactEmail.includes(userInput)
            );
        });
    },
    sortContact: function () { },
    renderContacts: function () {
        document.querySelector("#contactList").innerHTML = "";
        this.contacts.forEach((contact) => {
            const myDiv = document.createElement("div");
            myDiv.className = "bg-white p-4 rounded shadow";
            myDiv.innerHTML = `
        <p class="font-semibold">Name : ${contact.contactName}</p>
        <p class="text-sm text-gray-600">Email : ${contact.contactEmail}</p>
        <p class="text-sm text-gray-600">Phone : ${contact.contactPhone}</p>
       <div  class="mt-4">
        <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onclick = "addressBook.editContact('${contact.contactEmail}')">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick = "addressBook.deleteContact('${contact.contactEmail}')">Delete</button>
       <div>
        `;
            document.querySelector("#contactList").appendChild(myDiv);
        });
    },
    resetContact: function (contact) {
        for (a in contact) {
            if (a !== "id") {
                document.getElementById(a).value = "";
            }
        }
    },
};

const { resetContact } = addressBook;
document.getElementById("contactForm").onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();

    addressBook.handleContactForm(name, email, phone);
};

document.getElementById("searchInput").addEventListener("input", function (e) {
    console.log(e.target.value);
    const query = e.target.value.trim();
    addressBook.contacts = addressBook.searchContact(query);
    addressBook.renderContacts();
});
