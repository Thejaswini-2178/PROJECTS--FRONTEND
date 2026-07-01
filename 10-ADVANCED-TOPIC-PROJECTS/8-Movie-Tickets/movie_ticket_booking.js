// Step 1: Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    const movieSearchInput = document.getElementById("movie-search");
    const moviesContainer = document.getElementById("movies");
    const seatsContainer = document.getElementById("seats");
    const confirmBookingBtn = document.getElementById("confirm-booking");
    const cancelBookingBtn = document.getElementById("cancel-booking");

    // let theater;

    // Step 2: Fetch movies first so we can render them
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:3001/movies");
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const movies = await response.json();
            console.log(movies)
            return movies;
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    };

    // Step 3: Create the theater layout with rows and columns of seats
    const createTheater = (rows, cols) => {
        const seats = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({ booked: false }))
        );
        return {
            bookSeat: (row, col) => {
                if (!seats[row][col].booked) {
                    seats[row][col].booked = true;
                    return true;
                }
                return false;
            },
            cancelSeat: (row, col) => {
                if (seats[row][col].booked) {
                    seats[row][col].booked = false;
                    return true;
                }
                return false;
            },
            getSeats: () => seats,
        };
    };

    // Step 4: Render the list of movies dynamically
    const renderMovies = (movies) => {
        moviesContainer.innerHTML = "";
        movies.forEach((movie) => {
            const li = document.createElement("li");
            li.textContent = `${movie.title} - ${movie.genre} 
                    (${movie.duration} min, Rating: ${movie.rating})`;
            moviesContainer.appendChild(li);
        });
    };

    // Step 5: Function to render the theater seats
    const renderSeats = () => {
        seatsContainer.innerHTML = "";
        theater.getSeats().forEach((row, rowIndex) => {
            row.forEach((seat, colIndex) => {
                const seatButton = document.createElement("button");
                seatButton.className = `p-2 rounded ${seat.booked ? "bg-red-500" : "bg-green-500"}`;
                seatButton.textContent = `${rowIndex + 1}-${colIndex + 1}`;
                seatButton.title = seat.booked ? "Booked" : "Available";
                seatButton.addEventListener("click", () => toggleSeat(rowIndex, colIndex));
                seatsContainer.appendChild(seatButton);
            });
        });
    };

    // Step 6: Function to toggle seat booking
    const toggleSeat = (row, col) => {
        const seat = theater.getSeats()[row][col];
        if (seat.booked) {
            theater.cancelSeat(row, col);
        } else {
            theater.bookSeat(row, col);
        }
        renderSeats();
    };

    // Step 7: Confirm booking button functionality
    confirmBookingBtn.addEventListener("click", () => {
        alert("Booking confirmed!");
    });

    // Step 8: Cancel booking button functionality
    cancelBookingBtn.addEventListener("click", () => {
        theater.getSeats().forEach((row, rowIndex) =>
            row.forEach((_, colIndex) => theater.cancelSeat(rowIndex, colIndex))
        );
        renderSeats();
    });

    // Step 9: Filter movies based on the search input
    movieSearchInput.addEventListener("input", async (event) => {
        const query = event.target.value.toLowerCase();
        const movies = await fetchMovies();

        const filteredMovies = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query)
        );

        renderMovies(filteredMovies);
    });

    // Step 10: Initialize the theater and render everything
    theater = createTheater(5, 10);
    renderSeats();

    // Fetch and display movies
    const movies = await fetchMovies();
    renderMovies(movies);
});
