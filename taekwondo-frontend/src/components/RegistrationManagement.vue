<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <!-- Botón de retorno -->
          <button 
            @click="$router.push('/')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Volver al menú principal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:block">Menú</span>
          </button>
          
          <div class="bg-green-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestión de Inscripciones</h1>
            <p class="text-gray-600">Inscribir competidores en categorías de torneos</p>
          </div>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nueva Inscripción
        </button>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-gray-800">{{ registrations.length }}</div>
          <div class="text-gray-600 text-sm">Total</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ confirmedCount }}</div>
          <div class="text-green-700 text-sm">Confirmadas</div>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</div>
          <div class="text-yellow-700 text-sm">Pendientes</div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ paidCount }}</div>
          <div class="text-blue-700 text-sm">Pagadas</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Buscar</label>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Nombre del competidor..."
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Torneo</label>
          <select 
            v-model="selectedTournament"
            @change="loadCategories"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Todos los torneos</option>
            <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
          </select>
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
            <option value="">Todos</option>
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">ID</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Competidor</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Torneo</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Categoría</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Club</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Pago</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Fecha</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading" class="text-gray-800">
              <td colspan="9" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span class="ml-3">Cargando inscripciones...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredRegistrations.length === 0" class="text-gray-800">
              <td colspan="9" class="px-6 py-8 text-center">
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
                  <div class="text-gray-500 text-sm">{{ registration.competitor.gender === 'MALE' ? 'Masculino' : 'Femenino' }} • {{ getAge(registration.competitor.birthDate) }} años • {{ registration.competitor.weight }}kg</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="font-medium">{{ registration.tournament.name }}</div>
                  <div class="text-gray-500">{{ formatDate(registration.tournament.startDate) }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="font-medium">{{ registration.category.name }}</div>
                  <div class="text-gray-500">{{ registration.category.style }} • {{ getGenderText(registration.category.gender) }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  {{ registration.competitor.club?.name || 'Sin club' }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusColor(registration.status)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusText(registration.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="getPaymentColor(registration.paymentStatus)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getPaymentText(registration.paymentStatus) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  {{ formatDate(registration.registrationDate) }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click="editRegistration(registration)"
                    class="text-yellow-600 hover:text-yellow-700 p-1"
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

    <!-- Modal de creación/edición -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white shadow-xl border border-gray-200 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <h3 class="text-xl font-bold text-gray-800 mb-6">{{ editingRegistration ? 'Editar Inscripción' : 'Nueva Inscripción' }}</h3>
        
        <form @submit.prevent="saveRegistration" class="space-y-4">
          <div v-if="!editingRegistration" class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Torneo</label>
              <select 
                v-model="form.tournamentId" 
                @change="loadCategoriesForForm"
                required 
                class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Seleccionar torneo</option>
                <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
              <select 
                v-model="form.categoryId" 
                required 
                class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Seleccionar categoría</option>
                <option v-for="category in formCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Competidor</label>
              <select 
                v-model="form.competitorId" 
                required 
                class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Seleccionar competidor</option>
                <option v-for="competitor in competitors" :key="competitor.id" :value="competitor.id">
                  {{ competitor.firstName }} {{ competitor.lastName }} - {{ competitor.gender === 'MALE' ? 'M' : 'F' }} - {{ getAge(competitor.birthDate) }}años - {{ competitor.weight }}kg
                </option>
              </select>
            </div>
          </div>
          
          <div v-if="editingRegistration" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
              <select 
                v-model="form.status" 
                class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="PENDING">Pendiente</option>
                <option value="CONFIRMED">Confirmada</option>
                <option value="CANCELLED">Cancelada</option>
              </select>
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Estado de Pago</label>
              <select 
                v-model="form.paymentStatus" 
                class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="PENDING">Pendiente</option>
                <option value="PAID">Pagado</option>
                <option value="REFUNDED">Reembolsado</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Notas</label>
            <textarea 
              v-model="form.notes" 
              class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="3"
            ></textarea>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button 
              type="submit" 
              :disabled="saving" 
              class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : (editingRegistration ? 'Actualizar' : 'Crear') }}
            </button>
            <button 
              type="button" 
              @click="closeModal" 
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
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

// State
const registrations = ref([])
const tournaments = ref([])
const categories = ref([])
const formCategories = ref([])
const competitors = ref([])
const loading = ref(false)
const saving = ref(false)

// Filters
const searchTerm = ref('')
const selectedTournament = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal
const showModal = ref(false)
const editingRegistration = ref(null)

// Form
const form = ref({
  competitorId: '',
  categoryId: '',
  tournamentId: '',
  status: 'PENDING',
  paymentStatus: 'PENDING',
  notes: ''
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed
const confirmedCount = computed(() => registrations.value.filter(r => r.status === 'CONFIRMED').length)
const pendingCount = computed(() => registrations.value.filter(r => r.status === 'PENDING').length)
const paidCount = computed(() => registrations.value.filter(r => r.paymentStatus === 'PAID').length)

const filteredRegistrations = computed(() => {
  let filtered = registrations.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(r => 
      r.competitor.firstName.toLowerCase().includes(search) ||
      r.competitor.lastName.toLowerCase().includes(search) ||
      r.category.name.toLowerCase().includes(search) ||
      r.tournament.name.toLowerCase().includes(search)
    )
  }

  if (selectedTournament.value) {
    filtered = filtered.filter(r => r.tournamentId === parseInt(selectedTournament.value))
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

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getAge = (birthDate) => {
  return new Date().getFullYear() - new Date(birthDate).getFullYear()
}

const getGenderText = (gender) => {
  const texts = {
    'MALE': 'Masculino',
    'FEMALE': 'Femenino',
    'MIXED': 'Mixto'
  }
  return texts[gender] || gender
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

const getPaymentColor = (status) => {
  const colors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'PAID': 'bg-green-100 text-green-800',
    'REFUNDED': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getPaymentText = (status) => {
  const texts = {
    'PENDING': 'Pendiente',
    'PAID': 'Pagado',
    'REFUNDED': 'Reembolsado'
  }
  return texts[status] || status
}

const resetForm = () => {
  form.value = {
    competitorId: '',
    categoryId: '',
    tournamentId: '',
    status: 'PENDING',
    paymentStatus: 'PENDING',
    notes: ''
  }
}

const openCreateModal = () => {
  resetForm()
  editingRegistration.value = null
  showModal.value = true
}

const editRegistration = (registration) => {
  editingRegistration.value = registration
  form.value = {
    competitorId: registration.competitorId,
    categoryId: registration.categoryId,
    tournamentId: registration.tournamentId,
    status: registration.status,
    paymentStatus: registration.paymentStatus,
    notes: registration.notes || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingRegistration.value = null
  resetForm()
}

const saveRegistration = async () => {
  try {
    saving.value = true

    let response
    if (editingRegistration.value) {
      response = await fetch(`${API_BASE}/api/registrations/${editingRegistration.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
    } else {
      response = await fetch(`${API_BASE}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
    }

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Error ${response.status}: ${errorData}`)
    }

    await loadRegistrations()
    closeModal()
    
  } catch (err) {
    console.error('Error saving registration:', err)
    alert('Error al guardar la inscripción: ' + err.message)
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
  }
}

const loadRegistrations = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/api/registrations`)
    if (response.ok) {
      const data = await response.json()
      registrations.value = data.data.registrations
    }
  } catch (err) {
    console.error('Error loading registrations:', err)
  } finally {
    loading.value = false
  }
}

const loadTournaments = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/tournaments`)
    if (response.ok) {
      const data = await response.json()
      tournaments.value = data.data.tournaments
    }
  } catch (err) {
    console.error('Error loading tournaments:', err)
  }
}

const loadCategories = async () => {
  try {
    let url = `${API_BASE}/api/categories`
    if (selectedTournament.value) {
      url += `?tournamentId=${selectedTournament.value}`
    }
    
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      categories.value = data.data.categories
    }
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

const loadCategoriesForForm = async () => {
  try {
    if (!form.value.tournamentId) {
      formCategories.value = []
      return
    }
    
    const response = await fetch(`${API_BASE}/api/categories?tournamentId=${form.value.tournamentId}`)
    if (response.ok) {
      const data = await response.json()
      formCategories.value = data.data.categories
    }
  } catch (err) {
    console.error('Error loading form categories:', err)
  }
}

const loadCompetitors = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/competitors`)
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
    loadRegistrations(),
    loadTournaments(),
    loadCategories(),
    loadCompetitors()
  ])
})
</script>