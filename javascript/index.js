let mySavedTasks = []
const expandButtonInput = document.getElementById("expand-options-button")
const doneButtonInput = document.getElementById("done-button")
const addButtonInput = document.getElementById("add-task-button")
const clearButtonInput = document.getElementById("clear-button")
const addTextInput = document.getElementById("add-text-input")
const saveTaskButtonInput = document.getElementById("save-task-button")
const saveTabButtonInput = document.getElementById("save-tab-button")
const addTools = document.getElementById("add-tools")
const tasksList = document.getElementById("tasks-list")
const taskOptions = document.getElementById("task-options")
const addTaskButton = document.getElementById("add-task-button")

const today = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const localTasks = JSON.parse(localStorage.getItem("myTasks"))

addTools.style.display = "none"
taskOptions.style.display = "none"


renderDate(today)
renderIntro(today)
renderTasks(mySavedTasks)

if (localTasks) {
  mySavedTasks = localTasks
  renderTasks(mySavedTasks)
}

// Expands the options that the user can do with the list
expandButtonInput.addEventListener("click", function() {
  taskOptions.style.display = taskOptions.style.display === "none" ? "block" : "none"
  expandButtonInput.innerHTML = taskOptions.style.display === "block" ? `-` : `+`

  if (expandButtonInput.innerHTML === `+`) {
    addTools.style.display = "none"
    addTaskButton.innerHTML = `ADD`
  }
})

// Removes the tasks that have been checked off
doneButtonInput.addEventListener("click", function() {
  let checkedBoxes = document.getElementsByClassName("check")
  let checkedCount = 0

  for (let i = checkedBoxes.length - 1; i >= 0; i--) {
    if (checkedBoxes[i].checked) {
      mySavedTasks.splice(i, 1)
      checkedCount++
    }
  }

  if (checkedCount == 0) {
    alert("Please check finished applications before clicking DONE.")
    return
  }

  localStorage.setItem("myTasks", JSON.stringify(mySavedTasks))
  renderTasks(mySavedTasks)
})

// Displays add task functionality when add button is pressed
addButtonInput.addEventListener("click", function() {
  
  addTools.style.display = addTools.style.display === "none" ? "block" : "none"
  addTaskButton.innerHTML = addTools.style.display === "block" ? `CANCEL` : `ADD`

  renderTasks(mySavedTasks)
})

// Clears the entire list of tasks
clearButtonInput.addEventListener("click", function() {
  mySavedTasks = []
  localStorage.setItem("myTasks", JSON.stringify(mySavedTasks))
  renderTasks(mySavedTasks)
})

// Saves the task that the user wants to add to the list
saveTaskButtonInput.addEventListener("click", function() {
  const taskDescription = addTextInput.value
  if (taskDescription.length == 0) {
    alert("The task description cannot be empty. Please try again.")
    return
  }

  mySavedTasks.push([taskDescription, "none"])
  localStorage.setItem("myTasks", JSON.stringify(mySavedTasks))
  addTextInput.value = ""

  renderTasks(mySavedTasks)
})

// Saves the task with a link to the associated current tab to the list
saveTabButtonInput.addEventListener("click", function() {
  const taskDescription = addTextInput.value
  if (taskDescription.length == 0) {
    alert("The task description cannot be empty. Please try again.")
    return
  }

  let queryOptions = {active: true, currentWindow: true}
  chrome.tabs.query(queryOptions, (tab) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
    
    const currentURL = tab[0].url
    mySavedTasks.push([taskDescription, currentURL])
    localStorage.setItem("myTasks", JSON.stringify(mySavedTasks))
    addTextInput.value = ""

    renderTasks(mySavedTasks)
  })
})

// Renders the current date at the top of the extension
function renderDate(today) {
  const dateBar = document.getElementById("date-bar")
  const dayOfTheWeek = today.getDay()
  const month = today.getMonth()
  const day = today.getDate()

  let dayOfTheWeekWord = daysOfTheWeek[dayOfTheWeek]
  let monthWord = months[month]

  dateBar.innerHTML = `${dayOfTheWeekWord}, ${monthWord} ${day}`
}

// Renders the introduction text on the top, greeting the user
function renderIntro(today) {
  const intro = document.getElementById("content-title")
  const hours = today.getHours()

  if (hours >= 4 && hours <= 11) {  // morning
    intro.innerHTML = `Good Morning!`
  } else if (hours >= 12 && hours <= 17) {
    intro.innerHTML = `Good Afternoon!`
  } else if (hours >= 18 && hours <= 21) {
    intro.innerHTML = `Good Evening!`
  } else {
    intro.innerHTML = `Hello!`
  }
}

// Renders the list of tasks to the screen
function renderTasks(savedTasks) {
  if (savedTasks.length == 0) {
    tasksList.innerHTML = `<p>There are no tasks to complete today!</p>`
    return
  }

  let tasks = ""
  tasksList.style.textAlign = "left"
  for (const task of savedTasks) {
    if (task[1] == "none") {
      tasks += `
        <div class='task'>
          <input type='checkbox' class='check' id='${task[0]}'>
          <label for='${task[0]}'>${task[0]}</label>
        </div>
      `
    } else {
      tasks += `
        <div class='task'>
          <input type='checkbox' class='check' id='${task[1]}'>
          <label for='${task[1]}'>${task[0]} <a target='_blank' href=${task[1]}>[link]</a></label>
        </div>
      `
    }
  }

  tasksList.innerHTML = tasks
}