
document.addEventListener("DOMContentLoaded", () => {
  ui.renderThoughts()

  const formThought = document.getElementById("thought-form")
  formThought.addEventListener("submit", manipulateSubmissionForm)

  formThought.addEventListener("reset", ui.resetForm)
})

async function manipulateSubmissionForm(event) {
  event.preventDefault()
  const id = document.getElementById("thought-id").value
  console.log(id)
  const content = document.getElementById("thought-content").value
  const authorship = document.getElementById("thought-authorship").value
  
  try {
    if (id) {
      await api.editThought({ id, content, authorship })
    } else {
      await api.saveThought({ content, authorship })
    }
      ui.renderThoughts()
  }
  catch {
      alert("Error saving thought")
  }
}

