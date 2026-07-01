let books = [];

function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();

    if (title && author) {
        const newBook = { title, author, isAvailable: true };
        books.push(newBook)
        clearInput()
        listBooks()
    }
}

function clearInput() {
    document.getElementById("title").value = "";
    document.getElementById("title").value = "";
}

function listBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const listItem = document.createElement("li");
        const bookDetails = Object.entries(book)
            .map(([key, value]) => `${key}: ${value}`)
            .join(",")

        listItem.innerHTML = `${bookDetails}
           <button onclick="lendBook(${index})" ${!book.isAvailable ? 'disabled' : ''}>Lend</button>
           <button onclick="returnBook(${index})" ${book.isAvailable ? 'disabled' : ''}>Return</button>
        `;
        bookList.appendChild(listItem)
    })
}

function lendBook(index) {
    if (books[index].isAvailable) {
        books[index].isAvailable = false;
        listBooks()
    } else {
        alert("this book is already lent out")
    }
}

function returnBook(index) {
    if (!books[index].isAvailable) {
        books[index].isAvailable = true
        listBooks()
    } else {
        alert("this book is already available")
    }
}

