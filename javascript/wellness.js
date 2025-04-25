const today = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

renderDate(today)

// Renders the current date at the top of the extension
function renderDate(today) {
  const dateBar = document.getElementById("wellness-date-bar")
  const dayOfTheWeek = today.getDay()
  const month = today.getMonth()
  const day = today.getDate()

  let dayOfTheWeekWord = daysOfTheWeek[dayOfTheWeek]
  let monthWord = months[month]

  dateBar.innerHTML = `${dayOfTheWeekWord}, ${monthWord} ${day}`
}