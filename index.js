let mySavedTasks = ["Create schematic of Chrome Extension", "Fill out job application", "Finish coding assignment"]
const addButtonInput = document.getElementById("add-task-button")
const cancelButtonInput = document.getElementById("cancel-button")
const addTools = document.getElementById("add-tools")
const tasksList = document.getElementById("tasks-list")

addTools.style.display = "none"

renderTasks(mySavedTasks)

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

// Renders the list of tasks to the screen
function renderTasks(savedTasks) {
  let tasks = ""
  for (const task of savedTasks) {
    tasks += `
      <div class='task'>
        <input type='checkbox' class='check' id='${task}'>
        <label for='${task}'>${task}</label>
      </div>
    `
  }

  tasksList.innerHTML = tasks
}