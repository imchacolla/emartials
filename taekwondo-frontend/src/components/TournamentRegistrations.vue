<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <!-- Botón de retorno -->
          <button 
            @click="$router.push('/tournaments')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Volver a torneos"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:block">Torneos</span>
          </button>
          
          <div class="bg-green-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Inscripciones del Torneo</h1>
            <p class="text-gray-600">{{ tournament?.name || 'Cargando...' }}</p>
          </div>
        </div>
        
        <div class="flex gap-4">
          <button 
            @click="openRegisterModal"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nueva Inscripción
          </button>
          
          <button 
            @click="generateBrackets"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            :disabled="!canGenerateBrackets"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6"/>
            </svg>
            Generar Brackets
          </button>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-gray-800">{{ totalRegistrations }}</div>
          <div class="text-gray-600 text-sm">Total Inscripciones</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ confirmedRegistrations }}</div>
          <div class="text-green-700 text-sm">Confirmadas</div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ categoriesWithRegistrations.length }}</div>
          <div class="text-blue-700 text-sm">Categorías con Inscripciones</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ totalMatches }}</div>
          <div class="text-purple-700 text-sm">Combates Programados</div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Buscar Competidor</label>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Nombre del competidor..."
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
          <select 
            v-model="selectedCategory"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Todos los estados</option>
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Vista</label>
          <select 
            v-model="viewMode"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="list">Lista de Inscripciones</option>
            <option value="categories">Por Categorías</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Vista de Lista -->
    <div v-if="viewMode === 'list'" class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">ID</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Competidor</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Club</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Categoría</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Fecha</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading" class="text-gray-800">
              <td colspan="7" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span class="ml-3">Cargando inscripciones...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredRegistrations.length === 0" class="text-gray-800">
              <td colspan="7" class="px-6 py-8 text-center">
                <div class="text-gray-500">
                  <p>No se encontraron inscripciones</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="registration in paginatedRegistrations" :key="registration.id" class="text-gray-800 hover:bg-gray-50">
              <td class="px-6 py-4">{{ registration.id }}</td>
              <td class="px-6 py-4">
                <div>
                  <div class="font-medium">{{ registration.competitor.firstName }} {{ registration.competitor.lastName }}</div>
                  <div class="text-gray-500 text-sm">{{ registration.competitor.country }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">{{ registration.competitor.club?.name || 'Sin club' }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="font-medium">{{ registration.category.name }}</div>
                  <div class="text-gray-500">{{ registration.category.style }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusColor(registration.status)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusText(registration.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">{{ formatDate(registration.registrationDate) }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click="editRegistration(registration)"
                    class="text-blue-600 hover:text-blue-700 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteRegistration(registration)"
                    class="text-red-600 hover:text-red-700 p-1"
                    title="Eliminar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="text-gray-700 text-sm">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredRegistrations.length) }} de {{ filteredRegistrations.length }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
          >
            Anterior
          </button>
          <span class="px-3 py-1 bg-green-600 text-white rounded">{{ currentPage }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Vista por Categorías -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="category in categoriesWithRegistrations" :key="category.id" class="bg-white shadow-lg rounded-lg border border-gray-200">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.style }} • {{ category.gender }}</p>
              <p class="text-xs text-gray-500">Edad: {{ category.minAge }}-{{ category.maxAge }} años • Peso: {{ category.minWeight }}-{{ category.maxWeight }}kg</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-green-600">{{ category.registrations.length }}</div>
              <div class="text-xs text-gray-500">{{ category.maxParticipants ? `/${category.maxParticipants}` : '' }}</div>
            </div>
          </div>
          
          <div class="space-y-2 mb-4">
            <div v-for="registration in category.registrations.slice(0, 5)" :key="registration.id" class="flex justify-between items-center py-1">
              <div class="text-sm">
                <span class="font-medium">{{ registration.competitor.firstName }} {{ registration.competitor.lastName }}</span>
                <span class="text-gray-500 ml-2">{{ registration.competitor.club?.name }}</span>
              </div>
              <span :class="getStatusColor(registration.status)" class="px-2 py-1 text-xs rounded-full">
                {{ getStatusText(registration.status) }}
              </span>
            </div>
            <div v-if="category.registrations.length > 5" class="text-sm text-gray-500 text-center">
              +{{ category.registrations.length - 5 }} más...
            </div>
          </div>
          
          <div class="flex gap-2">
            <button 
              @click="viewCategoryDetails(category)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Ver Detalles
            </button>
            <button 
              @click="goToMatches(category.id)"
              class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              :disabled="category.registrations.length < 2"
            >
              Ver Combates
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Nueva Inscripción -->
    <div v-if="showRegisterModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white shadow-xl border border-gray-200 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Nueva Inscripción</h3>
        
        <form @submit.prevent="saveRegistration" class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Competidor</label>
            <select v-model="form.competitorId" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Seleccionar competidor</option>
              <option v-for="competitor in competitors" :key="competitor.id" :value="competitor.id">
                {{ competitor.firstName }} {{ competitor.lastName }} - {{ competitor.club?.name }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
            <select v-model="form.categoryId" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Seleccionar categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.style }})
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Notas (opcional)</label>
            <textarea v-model="form.notes" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" rows="3"></textarea>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button type="submit" :disabled="saving" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50">
              {{ saving ? 'Guardando...' : 'Inscribir' }}
            </button>
            <button type="button" @click="closeRegisterModal" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Props y router
const route = useRoute()
const router = useRouter()
const tournamentId = ref(parseInt(route.params.id))

// State
const tournament = ref(null)
const registrations = ref([])
const categories = ref([])
const competitors = ref([])
const loading = ref(false)
const saving = ref(false)

// Filtros
const searchTerm = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const viewMode = ref('categories')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modals
const showRegisterModal = ref(false)
const editingRegistration = ref(null)

// Form
const form = ref({
  competitorId: '',
  categoryId: '',
  notes: ''
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed
const filteredRegistrations = computed(() => {
  let filtered = registrations.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(r => 
      `${r.competitor.firstName} ${r.competitor.lastName}`.toLowerCase().includes(search) ||
      r.competitor.club?.name?.toLowerCase().includes(search)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(r => r.categoryId === parseInt(selectedCategory.value))
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(r => r.status === selectedStatus.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredRegistrations.value.length / itemsPerPage.value))

const paginatedRegistrations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRegistrations.value.slice(start, end)
})

const totalRegistrations = computed(() => registrations.value.length)
const confirmedRegistrations = computed(() => registrations.value.filter(r => r.status === 'CONFIRMED').length)

const categoriesWithRegistrations = computed(() => {
  return categories.value.map(category => ({
    ...category,
    registrations: registrations.value.filter(r => r.categoryId === category.id && (r.status === 'CONFIRMED' || r.status === 'PENDING'))
  })).filter(category => category.registrations.length > 0)
})

const canGenerateBrackets = computed(() => {
  return categoriesWithRegistrations.value.some(cat => cat.registrations.length >= 2)
})

const totalMatches = computed(() => {
  // Estimar número de matches basado en inscripciones confirmadas
  return categoriesWithRegistrations.value.reduce((total, category) => {
    const competitors = category.registrations.length
    if (competitors >= 2) {
      // Número aproximado de matches en bracket de eliminación
      return total + (competitors - 1)
    }
    return total
  }, 0)
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getStatusColor = (status) => {
  const colors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CONFIRMED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'PENDING': 'Pendiente',
    'CONFIRMED': 'Confirmada', 
    'CANCELLED': 'Cancelada'
  }
  return texts[status] || status
}

const resetForm = () => {
  form.value = {
    competitorId: '',
    categoryId: '',
    notes: ''
  }
}

const openRegisterModal = () => {
  resetForm()
  editingRegistration.value = null
  showRegisterModal.value = true
}

const closeRegisterModal = () => {
  showRegisterModal.value = false
  editingRegistration.value = null
  resetForm()
}

const saveRegistration = async () => {
  try {
    saving.value = true

    const registrationData = {
      ...form.value,
      tournamentId: parseInt(tournamentId.value),
      competitorId: parseInt(form.value.competitorId),
      categoryId: parseInt(form.value.categoryId)
    }

    const response = await fetch(`${API_BASE}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear inscripción')
    }

    await loadRegistrations()
    closeRegisterModal()
    
  } catch (err) {
    console.error('Error saving registration:', err)
    alert(err.message || 'Error al guardar inscripción')
  } finally {
    saving.value = false
  }
}

const deleteRegistration = async (registration) => {
  if (!confirm(`¿Eliminar la inscripción de "${registration.competitor.firstName} ${registration.competitor.lastName}"?`)) return

  try {
    const response = await fetch(`${API_BASE}/api/registrations/${registration.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error(`Error ${response.status}`)
    await loadRegistrations()
    
  } catch (err) {
    console.error('Error deleting registration:', err)
    alert('Error al eliminar inscripción')
  }
}

const generateBrackets = async () => {
  console.log('generateBrackets función llamada')
  if (!confirm('¿Generar brackets para todas las categorías con inscripciones confirmadas?')) {
    console.log('Usuario canceló la generación de brackets')
    return
  }

  try {
    console.log('Enviando petición para generar brackets para torneo:', tournamentId.value)
    const response = await fetch(`${API_BASE}/api/registrations/tournament/${tournamentId.value}/generate-brackets`, {
      method: 'POST'
    })

    console.log('Respuesta recibida, status:', response.status)
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error en respuesta:', errorData)
      throw new Error(errorData.message || 'Error al generar brackets')
    }

    const result = await response.json()
    console.log('Resultado de brackets:', result)
    alert(`Brackets generados exitosamente para ${result.data.categories.length} categorías`)
    
    // Ir a vista de combates
    console.log('Redirigiendo a:', `/tournament-matches/${tournamentId.value}`)
    router.push(`/tournament-matches/${tournamentId.value}`)
    
  } catch (err) {
    console.error('Error generating brackets:', err)
    alert(err.message || 'Error al generar brackets')
  }
}

const goToMatches = (categoryId) => {
  router.push(`/tournament-matches/${tournamentId.value}?category=${categoryId}`)
}

const viewCategoryDetails = (category) => {
  selectedCategory.value = category.id.toString()
  viewMode.value = 'list'
}

const loadTournament = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/tournaments/${tournamentId.value}`)
    if (response.ok) {
      const data = await response.json()
      tournament.value = data.data
    }
  } catch (err) {
    console.error('Error loading tournament:', err)
  }
}

const loadRegistrations = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/api/registrations?tournamentId=${tournamentId.value}&limit=1000`)
    if (response.ok) {
      const data = await response.json()
      registrations.value = data.data.registrations
    } else {
      console.error('Error en respuesta:', response.status)
    }
  } catch (err) {
    console.error('Error loading registrations:', err)
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/categories?tournamentId=${tournamentId.value}&limit=1000`)
    if (response.ok) {
      const data = await response.json()
      categories.value = data.data.categories.filter(c => c.isActive)
    }
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

const loadCompetitors = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/competitors?limit=1000`)
    if (response.ok) {
      const data = await response.json()
      competitors.value = data.data.competitors
    }
  } catch (err) {
    console.error('Error loading competitors:', err)
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadTournament(),
    loadRegistrations(),
    loadCategories(),
    loadCompetitors()
  ])
})
</script>