const inputArea = document.getElementById("InputArea");
const listContainer = document.getElementById("ListContainer");

function addTask() {
    if (inputArea.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `${inputArea.value} <span>&times;</span>`;
        
        listContainer.appendChild(li);
        
        // Scroll smoothly to the bottom
        listContainer.scrollTo({ top: listContainer.scrollHeight, behavior: "smooth" });

        // Add event listeners
        li.addEventListener("click", toggleTask);
        li.querySelector("span").addEventListener("click", removeTask);

        inputArea.value = '';  // Clear input
        saveData();
    }
}

// Mark task as completed
function toggleTask(event) {
    event.target.classList.toggle("checked");
    saveData();
}

// Remove task when clicking the "×" button
function removeTask(event) {
    event.stopPropagation(); // Prevent toggling task
    event.target.parentElement.remove();
    saveData();
}

// Save tasks in localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function showData() {
    listContainer.innerHTML = localStorage.getItem("tasks") || '';
    
    // Reattach event listeners after reloading
    document.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", toggleTask);
        li.querySelector("span").addEventListener("click", removeTask);
    });
}

// Add task when Enter key is pressed
inputArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

showData();
