const movieBookingSystem = {
    seats: [], //for storing and traking and displaying purpose we are using this

    // Initialize seats dynamically
    initializeSeats(rows, cols) {
        this.seats = []; //when ever the function calls it will newly initilize the seats property inside the object and sets the new configuration for the new rows &clm
        const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j <= cols; j++) {
                this.seats.push({
                    number: `${rowLetters[i]}${j}`, // Seat number (e.g., A1, B2)
                    isBooked: false, // All seats are available initially
                });
            }
        }
        this.renderSeats();

    },

    // Render seats
    renderSeats() {
        const seatArrangement = document.getElementById("seatArrangement");
        seatArrangement.innerHTML = ""; // Clear existing layout

        this.seats.forEach((seat) => {
            const seatDiv = document.createElement("div");
            seatDiv.className = `seat ${seat.isBooked ? "seat-booked" : "seat-available"
                }`;
            seatDiv.textContent = seat.number;

            // Add click functionality
            seatDiv.onclick = () => {
                if (!seat.isBooked) {
                    const confirmBooking = confirm(`Book seat ${seat.number}?`);
                    if (confirmBooking) {
                        seat.isBooked = true; // Mark seat as booked
                        this.renderSeats(); // Re-render seats
                    }
                } else {
                    alert(`Seat ${seat.number} is already booked.`);
                }
            };

            seatArrangement.appendChild(seatDiv);
        });
    },
};
// Initialize the theater with 5 rows and 10 columns
movieBookingSystem.initializeSeats(5, 10);