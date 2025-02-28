let mySavedTasks = []
const addButtonInput = document.getElementById("add-task-button")
const cancelButtonInput = document.getElementById("cancel-button")
const addTools = document.getElementById("add-tools")

addTools.style.display = "none"

// Displays add task functionality when add button is pressed
addButtonInput.addEventListener("click", function() {
  const taskButton = document.getElementById("add-task-button")
  
  addTools.style.display = addTools.style.display === "none" ? "block" : "none";

  if (addTools.style.display == "block") {
    taskButton.innerHTML = `CANCEL`
  } else {
    taskButton.innerHTML = `ADD +`
  }

  renderTasks(mySavedTasks)
})