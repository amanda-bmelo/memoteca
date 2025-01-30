
const ui = {
  async renderThoughts(thoughtsList) {
    const listThoughts = document.getElementById("list-thoughts")
    listThoughts.innerHTML = ""

    try {
      const thoughts = thoughtsList || await api.searchThoughts()
      thoughts.forEach(ui.addThoughtToList)
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

    const thoughtDate = document.createElement("div")
    const formattedDate = thought.date.toLocaleDateString('pt-BR')
    thoughtDate.textContent = formattedDate
    thoughtDate.classList.add("thought-date")

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

    const buttonFavorite = document.createElement("button")
    buttonFavorite.classList.add("button-favorite")
    buttonFavorite.onclick = async () => {
      try {
        await api.updateFavorite(thought.id, !thought.favorite)
        ui.renderThoughts()
      } catch (error) {
        alert("Error updating thought")
      }
    }

    const iconFavorite = document.createElement("img")
    iconFavorite.src = thought.favorite ? "assets/images/icone-favorito.png" : "assets/images/icone-favorito_outline.png"
    iconFavorite.alt = "Favoritar"
    buttonFavorite.appendChild(iconFavorite)
    
    const icons = document.createElement("div")
    icons.classList.add("icons")
    icons.appendChild(buttonFavorite)
    icons.appendChild(buttonEdit)
    icons.appendChild(buttonDelete)

    li.appendChild(iconQuotation)
    li.appendChild(thoughtContent)
    li.appendChild(thoughtAuthorship)
    li.appendChild(thoughtDate)
    li.appendChild(icons)
    listThoughts.appendChild(li)
  },

  async fillForm(thoughtId) {
    const thought = await api.searchThoughtById(thoughtId)
    document.getElementById("thought-id").value = thought.id
    document.getElementById("thought-content").value = thought.content
    document.getElementById("thought-authorship").value = thought.authorship
    document.getElementById("thought-date").value = thought.date.toLocaleDateString('pt-BR').split('/').reverse().join('-')
  },

  async deleteThought(thoughtId) {
    try {
      await api.deleteThought(thoughtId)
      ui.renderThoughts()
    }
    catch {
      alert("Error deleting thought")
    }
  },

}
