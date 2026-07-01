// Initial collection of books
let books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
    { title: "1984", author: "George Orwell", available: true },
    { title: "Moby Dick", author: "Herman Melville", available: true },
];

// Display books dynamically
function displayBooks() {
    const bookList = document.getElementById('books');
    bookList.innerHTML = ""; // Clear the existing list
    books.forEach(book => {
        bookList.innerHTML += `
        <div>
          ${book.title} by ${book.author} - ${book.available ? "Available" : "Not Available"}
        </div>
      `;
    });
}

// Add a new book using push()
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    if (title && author) {
        books.push({ title, author, available: true }); // Add book
        displayBooks();
    } else {
        alert("Please enter both title and author.");
    }
}

// Borrow a book using find() and splice()
function borrowBook() {
    const title = document.getElementById('borrowTitle').value;
    const book = books.find(b => b.title === title && b.available); // Find available book
    if (book) {
        book.available = false; // Update status to unavailable
        displayBooks();
    } else {
        alert("This book is either not available or not in the library.");
    }
}

// Return a book by finding and updating its status
function returnBook() {
    const title = document.getElementById('returnTitle').value;
    const book = books.find(b => b.title === title && !b.available); // Find borrowed book
    if (book) {
        book.available = true; // Update status to available
        displayBooks();
    } else {
        alert("This book was not borrowed or doesn't exist.");
    }
}

// List available books using filter()
function listAvailableBooks() {
    const availableBooks = books.filter(b => b.available); // Filter out available books
    const bookList = document.getElementById('books');
    bookList.innerHTML = ""; // Clear the list
    availableBooks.forEach(book => {
        bookList.innerHTML += `
        <div>
          ${book.title} by ${book.author} - Available
        </div>
      `;
    });
}

// List all books and sort alphabetically by title using sort()
function listAllBooks() {
    const sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
    const bookList = document.getElementById('books');
    bookList.innerHTML = ""; // Clear the list
    sortedBooks.forEach(book => {
        bookList.innerHTML += `
        <div>
          ${book.title} by ${book.author} - ${book.available ? "Available" : "Not Available"}
        </div>
      `;
    });
}

// Initial display of books when the page loads
displayBooks();
