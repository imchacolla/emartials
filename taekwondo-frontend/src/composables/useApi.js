import { ref } from 'vue'

const API_BASE = 'http://localhost:3000'

export const useApi = () => {
  const loading = ref(false)
  const error = ref(null)

  const handleRequest = async (request) => {
    try {
      loading.value = true
      error.value = null
      const response = await request()
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (err) {
      error.value = err.message
      console.error('API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tournament API
  const tournaments = {
    getAll: () => handleRequest(() => fetch(`${API_BASE}/tournaments`)),
    getById: (id) =>
      handleRequest(() => fetch(`${API_BASE}/tournaments/${id}`)),
    create: (data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/tournaments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    update: (id, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/tournaments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    delete: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/tournaments/${id}`, { method: 'DELETE' }),
      ),
  }

  // Competitor API
  const competitors = {
    getAll: () => handleRequest(() => fetch(`${API_BASE}/competitors`)),
    getById: (id) =>
      handleRequest(() => fetch(`${API_BASE}/competitors/${id}`)),
    create: (data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/competitors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    update: (id, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/competitors/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    delete: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/competitors/${id}`, { method: 'DELETE' }),
      ),
  }

  // Match API
  const matches = {
    getAll: () => handleRequest(() => fetch(`${API_BASE}/matches`)),
    getById: (id) => handleRequest(() => fetch(`${API_BASE}/matches/${id}`)),
    create: (data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    start: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches/${id}/start`, { method: 'POST' }),
      ),
    pause: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches/${id}/pause`, { method: 'POST' }),
      ),
    resume: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches/${id}/resume`, { method: 'POST' }),
      ),
    end: (id, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches/${id}/end`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    updateScore: (id, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/matches/${id}/score`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
  }

  // Category API
  const categories = {
    getAll: () => handleRequest(() => fetch(`${API_BASE}/categories`)),
    getById: (id) => handleRequest(() => fetch(`${API_BASE}/categories/${id}`)),
    create: (data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    update: (id, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/categories/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    delete: (id) =>
      handleRequest(() =>
        fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' }),
      ),
  }

  // Configuration API
  const configuration = {
    getAll: () => handleRequest(() => fetch(`${API_BASE}/configuration`)),
    getByKey: (key) =>
      handleRequest(() => fetch(`${API_BASE}/configuration/${key}`)),
    set: (key, data) =>
      handleRequest(() =>
        fetch(`${API_BASE}/configuration/${key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ),
    bulkUpdate: (configs) =>
      handleRequest(() =>
        fetch(`${API_BASE}/configuration/bulk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ configurations: configs }),
        }),
      ),
  }

  return {
    loading,
    error,
    tournaments,
    competitors,
    matches,
    categories,
    configuration,
  }
}
