
const inputArea = document.getElementById("InputArea");
const listContainer = document.getElementById("ListContainer");
const addBtn = document.getElementById("addBtn");

function addTask() {
  const taskText = inputArea.value.trim();
  if (taskText === "") {
    alert("Please enter a valid task!");
    return;
  }

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  li.appendChild(taskSpan);

  const prioritySelect = document.createElement("select");
  const priorities = ["Low", "Medium", "High"];
  priorities.forEach(priority => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });
  li.appendChild(prioritySelect);

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  li.appendChild(dueDateInput);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  li.appendChild(deleteBtn);

  listContainer.appendChild(li);

  inputArea.value = "";

  editBtn.addEventListener("click", () => editTask(li, taskSpan, prioritySelect, dueDateInput));
  deleteBtn.addEventListener("click", () => deleteTask(li));
}

function editTask(li, taskSpan, prioritySelect, dueDateInput) {
  const newTaskText = prompt("Edit your task:", taskSpan.textContent);
  if (newTaskText !== null) {
    taskSpan.textContent = newTaskText;
  }

  const newPriority = prompt("Edit priority (Low, Medium, High):", prioritySelect.value);
  if (newPriority && ["Low", "Medium", "High"].includes(newPriority)) {
    prioritySelect.value = newPriority;
  }

  const newDueDate = prompt("Edit due date (YYYY-MM-DD):", dueDateInput.value);
  if (newDueDate) {
    dueDateInput.value = newDueDate;
  }
}

function deleteTask(li) {
  if (confirm("Are you sure you want to delete this task?")) {
    li.remove();
  }
}

addBtn.addEventListener("click", addTask);
inputArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
