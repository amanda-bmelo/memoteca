
const thoughtsSet = new Set()

async function addKeysToThoughtsSet() {
  try {
    const thoughts = await api.searchThoughts()
    thoughts.forEach(thought => {
      const keyThought = 
      `${thought.content.trim().toLowerCase()}${thought.authorship.trim().toLowerCase()}`
      thoughtsSet.add(keyThought)
    })
  } catch (error) {
    alert('Error while adding keys from thoughts')
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderThoughts()
  addKeysToThoughtsSet()

  const formThought = document.getElementById("thought-form")
  formThought.addEventListener("submit", manipulateSubmissionForm)

  formThought.addEventListener("reset", ui.resetForm)

  const inputSearch = document.getElementById("field-search")
  inputSearch.addEventListener("input", manipulateSearch)

  const buttonSearch = document.getElementById("search-icon")
  buttonSearch.addEventListener("click", manipulateSearch)
})

async function manipulateSubmissionForm(event) {
  event.preventDefault()
  const id = document.getElementById("thought-id").value
  console.log(id)
  const content = document.getElementById("thought-content").value
  const authorship = document.getElementById("thought-authorship").value
  const date = document.getElementById("thought-date").value

  if (!validateDate(date)) {
    alert("Registration of future dates is not allowed. Please select another date.")
    return
  }

  const keyNewThought = `${content.trim().toLowerCase()}${authorship.trim().toLowerCase()}`

  if (thoughtsSet.has(keyNewThought)) {
    alert("This thought has already been registered.")
    return
  }

  
  try {
    if (id) {
      await api.editThought({ id, content, authorship, date })
    } else {
      await api.saveThought({ content, authorship, date })
    }
      ui.renderThoughts()
  }
  catch {
      alert("Error saving thought")
  }
}

async function manipulateSearch(event) {
  event.preventDefault()
  const searchTerm = document.getElementById("field-search").value
  try {
    const filteredThoughts = await api.searchThoughtByTerm(searchTerm)
    ui.renderThoughts(filteredThoughts)
  }
  catch {
    alert("Error searching thoughts")
  }
}

function validateDate(date) {
  const dateNow = new Date()
  const dateInput = new Date(date)
  return dateInput <= dateNow
}
