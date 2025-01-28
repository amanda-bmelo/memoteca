URL = 'http://localhost:3000/thoughts/'

const api = {
  async searchThoughts() {
    try {
      const response = await fetch(URL)
      return await response.json()
    }
    catch {
      alert('Error fetching thoughts')
      throw error
    }
  },

  async searchThoughtById(thoughtId) {
    try {
      const response = await fetch(URL + thoughtId)
      return await response.json()
    }
    catch {
      alert('Error fetching thought by id')
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
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thought)
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
        method: "DELETE"
      })
      return await response.json()
    }
    catch {
      alert('Error deleting thought')
      throw error
    }
  }
}
