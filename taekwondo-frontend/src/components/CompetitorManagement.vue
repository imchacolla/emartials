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
          
          <div class="bg-blue-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestión de Competidores</h1>
            <p class="text-gray-600">Administra competidores del sistema</p>
          </div>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nuevo Competidor
        </button>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ competitors.length }}</div>
          <div class="text-blue-700 text-sm">Total</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ activeCount }}</div>
          <div class="text-green-700 text-sm">Activos</div>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ inactiveCount }}</div>
          <div class="text-yellow-700 text-sm">Inactivos</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ filteredCompetitors.length }}</div>
          <div class="text-purple-700 text-sm">Filtrados</div>
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
            placeholder="Nombre, club o categoría..."
            class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Club</label>
          <select 
            v-model="selectedClub"
            class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los clubs</option>
            <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
          <select 
            v-model="selectedCategory"
            class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">ID</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Nombre</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Club</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Categoría</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Peso</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Cinturón</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-gray-700 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading" class="text-gray-600">
              <td colspan="8" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span class="ml-3">Cargando competidores...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredCompetitors.length === 0" class="text-gray-600">
              <td colspan="8" class="px-6 py-8 text-center">
                <div class="text-gray-500">
                  <p>No se encontraron competidores</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="competitor in paginatedCompetitors" :key="competitor.id" class="text-gray-800 hover:bg-gray-50">
              <td class="px-6 py-4">{{ competitor.id }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {{ getInitials(competitor.firstName, competitor.lastName) }}
                  </div>
                  <div class="ml-3">
                    <div class="font-medium">{{ competitor.firstName }} {{ competitor.lastName }}</div>
                    <div class="text-gray-500 text-sm">{{ competitor.gender === 'MALE' ? 'Masculino' : 'Femenino' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">{{ competitor.club?.name || 'Sin club' }}</td>
              <td class="px-6 py-4">{{ competitor.category?.name || 'Sin categoría' }}</td>
              <td class="px-6 py-4">{{ competitor.weight }} kg</td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {{ competitor.belt }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="competitor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ competitor.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click="viewCompetitor(competitor)"
                    class="text-blue-600 hover:text-blue-800 p-1"
                    title="Ver detalles"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="editCompetitor(competitor)"
                    class="text-yellow-600 hover:text-yellow-800 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteCompetitor(competitor)"
                    class="text-red-600 hover:text-red-800 p-1"
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
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredCompetitors.length) }} de {{ filteredCompetitors.length }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Anterior
          </button>
          <span class="px-3 py-1 bg-blue-600 text-white rounded">{{ currentPage }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">
            {{ editingCompetitor ? 'Editar Competidor' : 'Nuevo Competidor' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveCompetitor" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Nombres *</label>
              <input 
                v-model="form.firstName"
                type="text" 
                required
                class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Apellidos *</label>
              <input 
                v-model="form.lastName"
                type="text" 
                required
                class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Género *</label>
            <select 
              v-model="form.gender"
              required
              class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar género</option>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Femenino</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Fecha de Nacimiento *</label>
            <input 
              v-model="form.birthDate"
              type="date" 
              required
              class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Peso (kg) *</label>
              <input 
                v-model.number="form.weight"
                type="number" 
                step="0.1"
                required
                class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Altura (cm) *</label>
              <input 
                v-model.number="form.height"
                type="number" 
                required
                class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Cinturón *</label>
            <select 
              v-model="form.belt"
              required
              class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar cinturón</option>
              <option value="BLANCO">Blanco</option>
              <option value="AMARILLO">Amarillo</option>
              <option value="NARANJA">Naranja</option>
              <option value="VERDE">Verde</option>
              <option value="AZUL">Azul</option>
              <option value="ROJO">Rojo</option>
              <option value="NEGRO_1DAN">Negro 1er Dan</option>
              <option value="NEGRO_2DAN">Negro 2do Dan</option>
              <option value="NEGRO_3DAN">Negro 3er Dan</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Club</label>
            <select 
              v-model="form.clubId"
              class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sin club</option>
              <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
            <select 
              v-model="form.categoryId"
              class="w-full bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sin categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="flex items-center space-x-2">
              <input 
                v-model="form.isActive"
                type="checkbox" 
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              >
              <span class="text-gray-700 text-sm">Competidor activo</span>
            </label>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button 
              type="submit"
              :disabled="saving"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {{ saving ? 'Guardando...' : (editingCompetitor ? 'Actualizar' : 'Crear') }}
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal && selectedCompetitor" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeViewModal">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Detalles del Competidor</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Información Personal</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-500 text-sm">Nombre:</span>
                <p class="text-gray-800 font-medium">{{ selectedCompetitor.firstName }} {{ selectedCompetitor.lastName }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Género:</span>
                <p class="text-gray-800">{{ selectedCompetitor.gender === 'MALE' ? 'Masculino' : 'Femenino' }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Fecha de Nacimiento:</span>
                <p class="text-gray-800">{{ formatDate(selectedCompetitor.birthDate) }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Edad:</span>
                <p class="text-gray-800">{{ calculateAge(selectedCompetitor.birthDate) }} años</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Información Deportiva</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-500 text-sm">Peso:</span>
                <p class="text-gray-800">{{ selectedCompetitor.weight }} kg</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Altura:</span>
                <p class="text-gray-800">{{ selectedCompetitor.height }} cm</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Cinturón:</span>
                <p class="text-gray-800">{{ selectedCompetitor.belt }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Club:</span>
                <p class="text-gray-800">{{ selectedCompetitor.club?.name || 'Sin club' }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Categoría:</span>
                <p class="text-gray-800">{{ selectedCompetitor.category?.name || 'Sin categoría' }}</p>
              </div>
              <div>
                <span class="text-gray-500 text-sm">Estado:</span>
                <span :class="selectedCompetitor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ selectedCompetitor.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-200">
          <div class="flex space-x-4">
            <button 
              @click="editCompetitor(selectedCompetitor); closeViewModal()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Editar
            </button>
            <button 
              @click="closeViewModal"
              class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const competitors = ref([])
const clubs = ref([])
const categories = ref([])
const loading = ref(false)
const saving = ref(false)

// Filters
const searchTerm = ref('')
const selectedClub = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modals
const showModal = ref(false)
const showViewModal = ref(false)
const editingCompetitor = ref(null)
const selectedCompetitor = ref(null)

// Form
const form = ref({
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  weight: null,
  height: null,
  belt: '',
  clubId: null,
  categoryId: null,
  isActive: true
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed
const activeCount = computed(() => competitors.value.filter(c => c.isActive).length)
const inactiveCount = computed(() => competitors.value.filter(c => !c.isActive).length)

const filteredCompetitors = computed(() => {
  let filtered = competitors.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(c => 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search) ||
      c.club?.name?.toLowerCase().includes(search) ||
      c.category?.name?.toLowerCase().includes(search)
    )
  }

  if (selectedClub.value) {
    filtered = filtered.filter(c => c.clubId === parseInt(selectedClub.value))
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(c => c.categoryId === parseInt(selectedCategory.value))
  }

  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(c => c.isActive === isActive)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredCompetitors.value.length / itemsPerPage.value))

const paginatedCompetitors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCompetitors.value.slice(start, end)
})

// Methods
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES')
}

const calculateAge = (birthDate) => {
  if (!birthDate) return 'N/A'
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    weight: null,
    height: null,
    belt: '',
    clubId: null,
    categoryId: null,
    isActive: true
  }
}

const openCreateModal = () => {
  resetForm()
  editingCompetitor.value = null
  showModal.value = true
}

const editCompetitor = (competitor) => {
  editingCompetitor.value = competitor
  form.value = {
    firstName: competitor.firstName,
    lastName: competitor.lastName,
    gender: competitor.gender,
    birthDate: competitor.birthDate ? competitor.birthDate.split('T')[0] : '',
    weight: competitor.weight,
    height: competitor.height,
    belt: competitor.belt,
    clubId: competitor.clubId,
    categoryId: competitor.categoryId,
    isActive: competitor.isActive
  }
  showModal.value = true
}

const viewCompetitor = (competitor) => {
  selectedCompetitor.value = competitor
  showViewModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCompetitor.value = null
  resetForm()
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedCompetitor.value = null
}

const saveCompetitor = async () => {
  try {
    saving.value = true

    // Convertir la fecha al formato datetime requerido por el backend
    const birthDateISO = form.value.birthDate 
      ? new Date(form.value.birthDate + 'T00:00:00.000Z').toISOString()
      : null

    const competitorData = {
      ...form.value,
      birthDate: birthDateISO,
      clubId: form.value.clubId || null,
      categoryId: form.value.categoryId || null
    }

    let response
    if (editingCompetitor.value) {
      response = await fetch(`${API_BASE}/api/competitors/${editingCompetitor.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(competitorData)
      })
    } else {
      response = await fetch(`${API_BASE}/api/competitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(competitorData)
      })
    }

    if (!response.ok) throw new Error(`Error ${response.status}`)

    await loadCompetitors()
    closeModal()
    
  } catch (err) {
    console.error('Error saving competitor:', err)
  } finally {
    saving.value = false
  }
}

const deleteCompetitor = async (competitor) => {
  if (!confirm(`¿Eliminar a ${competitor.firstName} ${competitor.lastName}?`)) return

  try {
    const response = await fetch(`${API_BASE}/api/competitors/${competitor.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error(`Error ${response.status}`)
    await loadCompetitors()
    
  } catch (err) {
    console.error('Error deleting competitor:', err)
  }
}

const loadCompetitors = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/api/competitors`)
    if (response.ok) {
      const data = await response.json()
      competitors.value = data.data.competitors
    }
  } catch (err) {
    console.error('Error loading competitors:', err)
  } finally {
    loading.value = false
  }
}

const loadClubs = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/clubs`)
    if (response.ok) {
      clubs.value = await response.json()
    }
  } catch (err) {
    console.error('Error loading clubs:', err)
  }
}

const loadCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/categories`)
    if (response.ok) {
      const data = await response.json()
      categories.value = data.data.categories
    }
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadCompetitors(),
    loadClubs(),
    loadCategories()
  ])
})
</script>