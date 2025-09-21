var inputBox = document.getElementById("task");
var items = document.getElementById("items");

function addTask() {
    if (inputBox.value === "") {
        alert("Please Enter your task; it is mandatory.");
    } else {
        var li = document.createElement("LI");
        li.innerHTML = inputBox.value;

        // Creating the cross icon in span
        var span = document.createElement("SPAN");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        items.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

items.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {

        var allItems = items.getElementsByTagName("li");
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("checked");
        }
        e.target.classList.add("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", items.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        items.innerHTML = savedData;
    }
}

showTask();
