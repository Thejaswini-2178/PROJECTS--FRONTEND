const libraryManagement = {
    books: [],
    renderBooks() {
        const bookList = document.getElementById("bookList");
        bookList.innerHTML = ""; // Clear existing list

        this.books.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "bg-white p-4 rounded shadow";


            bookDiv.innerHTML = `
              <p class="font-semibold">${book.title} by ${book.author}</p>
              <p class="text-sm text-gray-600">${book.isAvailable ? "Available" : "Borrowed"
                }</p>
              <div class="mt-4">
                ${book.isAvailable
                    ? `<button
                        class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        onclick="libraryManagement.borrowBook(${book.id})"
                      >
                        Borrow
                      </button>`
                    : `<button
                        class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        onclick="libraryManagement.returnBook(${book.id})"
                      >
                        Return
                      </button>`
                }
              </div>
            `
            bookList.appendChild(bookDiv);
        });
    },
};