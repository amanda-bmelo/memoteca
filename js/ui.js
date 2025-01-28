
const ui = {
  async renderThoughts() {
    const listThoughts = document.getElementById("list-thoughts")
    listThoughts.innerHTML = ""

    try {
      const thoughts = await api.searchThoughts()
      thoughts.forEach(thought => {
        listThoughts.innerHTML += `
          <li class="li-thought" data-id="${thought.id}">
          <img src="assets/images/aspas-azuis.png" alt="Aspas azuis" class="icon-quotation">
          <div class="thought-content">${thought.content}</div>
          <div class="thought-authorship">${thought.authorship}</div>
          <div class="icons">
            <button class="button-edit" onclick="ui.fillForm('${thought.id}')">
              <img src="assets/images/icone-editar.png" alt="Editar">
            </button>
            <button class="button-delete" onclick="ui.deleteThought('${thought.id}')">
              <img src="assets/images/icone-excluir.png" alt="Excluir">
            </button>
          </li>
        `
      })
    }
    catch {
      alert('Error rendering thoughts')
    }
  },

  resetForm() {
    document.getElementById("thought-form").reset()
  },

  addThoughtToList(thought) {
    const listThoughts = document.getElementById("list-thoughts")
    const li = document.createElement("li")
    li.setAttribute("data-id", thought.id)
    li.classList.add("li-thought")

    const iconQuotation = document.createElement("img")
    iconQuotation.src = "assets/images/aspas-azuis.png"
    iconQuotation.alt = "Aspas azuis"
    iconQuotation.classList.add("icon-quotation")

    const thoughtContent = document.createElement("div")
    thoughtContent.textContent = thought.content
    thoughtContent.classList.add("thought-content")

    const thoughtAuthorship = document.createElement("div")
    thoughtAuthorship.textContent = thought.authorship
    thoughtAuthorship.classList.add("thought-authorship")

    const buttonEdit = document.createElement("button")
    buttonEdit.classList.add("button-edit")
    buttonEdit.onclick = () => ui.fillForm(thought.id)

    const iconEdit = document.createElement("img")
    iconEdit.src = "assets/images/icone-editar.png"
    iconEdit.alt = "Editar"
    buttonEdit.appendChild(iconEdit)

    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("button-delete")
    buttonDelete.onclick = async () => ui.deleteForm(thought.id)

    const iconDelete = document.createElement("img")
    iconDelete.src = "assets/images/icone-excluir.png"
    iconDelete.alt = "Excluir"
    buttonDelete.appendChild(iconDelete)

    const icons = document.createElement("div")
    icons.classList.add("icons")
    icons.appendChild(buttonEdit)
    icons.appendChild(buttonDelete)

    li.appendChild(iconQuotation)
    li.appendChild(thoughtContent)
    li.appendChild(thoughtAuthorship)
    li.appendChild(icons)
    listThoughts.appendChild(li)
  },

  async fillForm(thoughtId) {
    const thought = await api.searchThoughtById(thoughtId)
    document.getElementById("thought-id").value = thought.id
    document.getElementById("thought-content").value = thought.content
    document.getElementById("thought-authorship").value = thought.authorship
  },

  async deleteThought(thoughtId) {
    try {
      await api.deleteThought(thoughtId)
      ui.renderThoughts()
    }
    catch {
      alert("Error deleting thought")
    }
  }
}
