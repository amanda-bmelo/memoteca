URL = 'http://localhost:3000/thoughts/'

const converterStringToDate = (dateString) => {
  const [year, month, day] = dateString.split("-")
  return new Date(Date.UTC(year, month-1, day))
}

const api = {
  async searchThoughts() {
    try {
      const response = await fetch(URL)
      const thoughts = await response.json()

      return thoughts.map(thought => {
        return {
          ...thought,
          date: new Date(thought.date)
        }
      })
    }
    catch {
      alert('Error fetching thoughts')
      throw error
    }
  },

  async searchThoughtById(thoughtId) {
    try {
      const response = await fetch(URL + thoughtId)
      const thought = await response.json()

      return {
        ...thought,
        date: new Date(thought.date)
      }
    }
    catch {
      alert('Error fetching thought by id')
      throw error
    }
  },

  async searchThoughtByTerm(term) {
    try {
      const thoughts = await this.searchThoughts()
      const termInLowerCase = term.toLowerCase()

      const thoughtsFiltered = thoughts.filter(thought => {
          return thought.content.toLowerCase().includes(termInLowerCase) ||
          thought.authorship.toLowerCase().includes(termInLowerCase)
      })
      return thoughtsFiltered
    } catch (error) {
        alert("Error filtering thoughts")
        throw error
    }
  },

  async editThought(thought) {
    try {
      const response = await fetch(URL + thought.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(thought)
      })
      return await response.json()
    }
    catch {
      alert('Error editing thought')
      throw error
    }
  },

  async saveThought(thought) {
    try {
      const date = converterStringToDate(thought.date)
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...thought, date})
      })
      return await response.json()
    }
    catch {
      alert('Error fetching thoughts')
      throw error
    }
  },

  async deleteThought(id) {
    try {
      const response = await fetch(URL + id, {
        method: 'DELETE'
      })
      return await response.json()
    }
    catch {
      alert('Error deleting thought')
      throw error
    }
  },

  async updateFavorite(id, favorite) {
    try {
      const response = await fetch(URL + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorite })
    })
      return response.data
    } catch (error) {
      alert("Error updating favorite")
      throw error
    }
  }

}
