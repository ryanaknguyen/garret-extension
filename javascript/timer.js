const timerStartButtonInput = document.getElementById("timer-start-button")
const timerResetButtonInput = document.getElementById("timer-reset-button")

const today = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let intervalId

renderDate(today)

// Renders the current date at the top of the extension
function renderDate(today) {
  const dateBar = document.getElementById("timer-date-bar")
  const dayOfTheWeek = today.getDay()
  const month = today.getMonth()
  const day = today.getDate()

  let dayOfTheWeekWord = daysOfTheWeek[dayOfTheWeek]
  let monthWord = months[month]

  dateBar.innerHTML = `${dayOfTheWeekWord}, ${monthWord} ${day}`
}

// Perform the countdown when the start button is clicked
timerStartButtonInput.addEventListener("click", function() {
  let min = 25
  let sec = 0
  
  if (timerStartButtonInput.innerHTML == "START") {
    timerStartButtonInput.innerHTML = "STOP"

    intervalId = setInterval(function() {
      const timeRemaining = document.getElementById("time-remaining")
      timeRemaining.innerHTML = min + ":" + sec

      if (min == 0 && sec == 0) {
        clearInterval(intervalId)
        console.log("done")
      }

      if (sec < 10) {
        timeRemaining.innerHTML = min + ":0" + sec
      } else {
        timeRemaining.innerHTML = min + ":" + sec
      }

      if (sec == 0) {
        sec = 59
        min--
      } else {
        sec--
      }
    }, 1000)
  } else {
    timerStartButtonInput.innerHTML = "START"
    clearInterval(intervalId)
  }
})

timerResetButtonInput.addEventListener("click", function() {
  const timeRemaining = document.getElementById("time-remaining")
  timeRemaining.innerHTML = "25:00"
  clearInterval(intervalId)
})