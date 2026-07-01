var seats = [];

function renderSeats() {
    var seating = document.getElementById('seating');
    seating.innerHTML = '';
    seats.forEach(function (seat) {
        var seatDiv = document.createElement('div');
        seatDiv.className = 'seat ' + seat.type + (seat.booked ? ' booked' : '');
        seatDiv.innerHTML = seat.id;
        seating.appendChild(seatDiv);

    });
}

function addSeat(type) {
    var id = 'S' + (seats.length + 1);
    seats.push({ id: id, type: type, booked: false });
    renderSeats();
}

function bookSeat() {
    var seatId = document.getElementById('seat-id').value;
    var seat = seats.find(function (s) {
        return s.id === seatId;
    });
    if (seat && !seat.booked) {
        seat.booked = true;
        renderSeats();
        alert('Seat ' + seatId + ' booked successfully!');
    } else {
        alert('Seat not available or already booked!');
    }
}

function cancelSeat() {
    var seatId = document.getElementById('seat-id').value;
    var seat = seats.find(function (s) {
        return s.id === seatId;
    });
    if (seat && seat.booked) {
        seat.booked = false;
        renderSeats();
        alert('Seat ' + seatId + ' booking canceled!');
    } else {
        alert('Seat not booked yet!');
    }
}
