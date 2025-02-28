let mySavedTasks = []
const addButtonInput = document.getElementById("add-task-button")
const addTextInput = document.getElementById("add-text-input")
const saveTaskButtonInput = document.getElementById("save-task-button")
const saveTabButtonInput = document.getElementById("save-tab-button")
const addTools = document.getElementById("add-tools")
const tasksList = document.getElementById("tasks-list")

addTools.style.display = "none"

renderTasks(mySavedTasks)

// Displays add task functionality when add button is pressed
addButtonInput.addEventListener("click", function() {
  const taskButton = document.getElementById("add-task-button")
  
  addTools.style.display = addTools.style.display === "none" ? "block" : "none"
  taskButton.innerHTML = addTools.style.display === "block" ? `CANCEL` : `ADD +`

  renderTasks(mySavedTasks)
})

saveTaskButtonInput.addEventListener("click", function() {
  const taskDescription = addTextInput.value
  if (taskDescription.length == 0) {
    alert("The task description cannot be empty. Please try again.")
    return;
  }

  mySavedTasks.push(taskDescription)
  addTextInput.value = ""

  renderTasks(mySavedTasks)
})

saveTabButtonInput.addEventListener("click", function() {
  console.log("save tab button clicked")
})

// Renders the list of tasks to the screen
function renderTasks(savedTasks) {
  if (savedTasks.length == 0) {
    tasksList.innerHTML = `<p>There are no tasks to complete today!</p>`
    tasksList.style.textAlign = "center"
    return
  }

  let tasks = ""
  tasksList.style.textAlign = "left"
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