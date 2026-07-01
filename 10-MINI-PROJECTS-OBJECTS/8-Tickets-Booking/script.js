        document.getElementById("main").addEventListener("click", function (event) {
            if (event.target !== event.currentTarget && event.target.tagName == "DIV") {
                var checkedBox = event.target
                checkedBox.classList.add="booked"
                if (!checkedBox.classList.contains("booked")) {
                    document.getElementById("message").textContent = "Tickets " + checkedBox.textContent + " is alredy booked"
                    document.getElementById("message").style.color = "red"
                }
                else {
                    checkedBox.classList.add("booked")
                    document.getElementById("message").textContent = "Tickets " + checkedBox.textContent + "  is booked sucessfully"
                    document.getElementById("message").style.color = "green"
                }
            }
        })
  