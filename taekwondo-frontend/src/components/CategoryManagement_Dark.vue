<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
    <!-- Header -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="bg-white/10 p-3 rounded-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Gestión de Categorías</h1>
            <p class="text-blue-100">Administra categorías de competencia</p>
          </div>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nueva Categoría
        </button>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-white">{{ categories.length }}</div>
          <div class="text-blue-100 text-sm">Total</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-400">{{ activeCount }}</div>
          <div class="text-blue-100 text-sm">Activas</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-400">{{ inactiveCount }}</div>
          <div class="text-blue-100 text-sm">Inactivas</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-400">{{ filteredCategories.length }}</div>
          <div class="text-blue-100 text-sm">Filtradas</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-white text-sm font-medium mb-2">Buscar</label>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Nombre..."
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Torneo</label>
          <select 
            v-model="selectedTournament"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los torneos</option>
            <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Género</label>
          <select 
            v-model="selectedGender"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="MIXED">Mixto</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Estilo</label>
          <select 
            v-model="selectedStyle"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="KYORUGI">Kyorugi (Combate)</option>
            <option value="POOMSAE">Poomsae (Formas)</option>
            <option value="BREAKING">Breaking (Rompimiento)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="true">Activas</option>
            <option value="false">Inactivas</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white/10">
            <tr>
              <th class="px-6 py-4 text-left text-white font-medium">ID</th>
              <th class="px-6 py-4 text-left text-white font-medium">Nombre</th>
              <th class="px-6 py-4 text-left text-white font-medium">Torneo</th>
              <th class="px-6 py-4 text-left text-white font-medium">Edad</th>
              <th class="px-6 py-4 text-left text-white font-medium">Peso</th>
              <th class="px-6 py-4 text-left text-white font-medium">Género</th>
              <th class="px-6 py-4 text-left text-white font-medium">Estilo</th>
              <th class="px-6 py-4 text-left text-white font-medium">Participantes</th>
              <th class="px-6 py-4 text-left text-white font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-white font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="loading" class="text-white">
              <td colspan="10" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <span class="ml-3">Cargando categorías...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredCategories.length === 0" class="text-white">
              <td colspan="10" class="px-6 py-8 text-center">
                <div class="text-gray-300">
                  <p>No se encontraron categorías</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="category in paginatedCategories" :key="category.id" class="text-white hover:bg-white/5">
              <td class="px-6 py-4">{{ category.id }}</td>
              <td class="px-6 py-4">
                <div class="font-medium">{{ category.name }}</div>
                <div class="text-gray-300 text-sm" v-if="category.belt">{{ category.belt }}</div>
              </td>
              <td class="px-6 py-4">{{ category.tournament?.name || 'Sin torneo' }}</td>
              <td class="px-6 py-4">{{ category.minAge }} - {{ category.maxAge }} años</td>
              <td class="px-6 py-4">{{ category.minWeight }}kg - {{ category.maxWeight }}kg</td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getGenderColor(category.gender)">
                  {{ getGenderText(category.gender) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStyleColor(category.style)">
                  {{ getStyleText(category.style) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-center">
                  <div class="font-medium">{{ category._count?.competitors || 0 }}</div>
                  <div class="text-gray-300 text-sm" v-if="category.maxParticipants">
                    / {{ category.maxParticipants }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ category.isActive ? 'Activa' : 'Inactiva' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click="viewCategory(category)"
                    class="text-blue-400 hover:text-blue-300 p-1"
                    title="Ver detalles"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="editCategory(category)"
                    class="text-yellow-400 hover:text-yellow-300 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteCategory(category)"
                    class="text-red-400 hover:text-red-300 p-1"
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
      <div class="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-white/10">
        <div class="text-white text-sm">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }} de {{ filteredCategories.length }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50"
          >
            Anterior
          </button>
          <span class="px-3 py-1 bg-blue-600 text-white rounded">{{ currentPage }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">
            {{ editingCategory ? 'Editar Categoría' : 'Nueva Categoría' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-white text-sm font-medium mb-2">Nombre *</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Juvenil Masculino -55kg"
            >
          </div>

          <div>
            <label class="block text-white text-sm font-medium mb-2">Torneo *</label>
            <select 
              v-model="form.tournamentId"
              required
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar torneo</option>
              <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Edad Mínima *</label>
              <input 
                v-model.number="form.minAge"
                type="number" 
                min="0"
                max="100"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Edad Máxima *</label>
              <input 
                v-model.number="form.maxAge"
                type="number" 
                min="0"
                max="100"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Peso Mínimo (kg) *</label>
              <input 
                v-model.number="form.minWeight"
                type="number" 
                step="0.1"
                min="0"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Peso Máximo (kg) *</label>
              <input 
                v-model.number="form.maxWeight"
                type="number" 
                step="0.1"
                min="0"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Género *</label>
              <select 
                v-model="form.gender"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar género</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Femenino</option>
                <option value="MIXED">Mixto</option>
              </select>
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Estilo *</label>
              <select 
                v-model="form.style"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar estilo</option>
                <option value="KYORUGI">Kyorugi (Combate)</option>
                <option value="POOMSAE">Poomsae (Formas)</option>
                <option value="BREAKING">Breaking (Rompimiento)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-white text-sm font-medium mb-2">Cinturón/Grado</label>
            <input 
              v-model="form.belt"
              type="text" 
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Cinturón Negro, 1er Dan, etc."
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Máximo Participantes</label>
              <input 
                v-model.number="form.maxParticipants"
                type="number" 
                min="1"
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Cuota de Inscripción</label>
              <input 
                v-model.number="form.registrationFee"
                type="number" 
                step="0.01"
                min="0"
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="flex items-center space-x-2">
              <input 
                v-model="form.isActive"
                type="checkbox" 
                class="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
              >
              <span class="text-white text-sm">Categoría activa</span>
            </label>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button 
              type="submit"
              :disabled="saving"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {{ saving ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear') }}
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal && selectedCategory" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeViewModal">
      <div class="bg-gray-800 rounded-lg p-8 max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">Detalles de la Categoría</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Información General</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-300 text-sm">Nombre:</span>
                <p class="text-white font-medium">{{ selectedCategory.name }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Torneo:</span>
                <p class="text-white">{{ selectedCategory.tournament?.name || 'Sin torneo' }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Edad:</span>
                <p class="text-white">{{ selectedCategory.minAge }} - {{ selectedCategory.maxAge }} años</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Peso:</span>
                <p class="text-white">{{ selectedCategory.minWeight }}kg - {{ selectedCategory.maxWeight }}kg</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Género:</span>
                <p class="text-white">{{ getGenderText(selectedCategory.gender) }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Estilo:</span>
                <p class="text-white">{{ getStyleText(selectedCategory.style) }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Detalles Adicionales</h4>
            <div class="space-y-3">
              <div v-if="selectedCategory.belt">
                <span class="text-gray-300 text-sm">Cinturón/Grado:</span>
                <p class="text-white">{{ selectedCategory.belt }}</p>
              </div>
              <div v-if="selectedCategory.maxParticipants">
                <span class="text-gray-300 text-sm">Máximo Participantes:</span>
                <p class="text-white">{{ selectedCategory.maxParticipants }}</p>
              </div>
              <div v-if="selectedCategory.registrationFee">
                <span class="text-gray-300 text-sm">Cuota de Inscripción:</span>
                <p class="text-white">${{ selectedCategory.registrationFee }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Competidores Inscritos:</span>
                <p class="text-white">{{ selectedCategory._count?.competitors || 0 }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Registraciones:</span>
                <p class="text-white">{{ selectedCategory._count?.registrations || 0 }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Estado:</span>
                <span :class="selectedCategory.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ selectedCategory.isActive ? 'Activa' : 'Inactiva' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-700">
          <div class="flex space-x-4">
            <button 
              @click="editCategory(selectedCategory); closeViewModal()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Editar
            </button>
            <button 
              @click="closeViewModal"
              class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
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

// Estados reactivos
const categories = ref([])
const tournaments = ref([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const showViewModal = ref(false)
const editingCategory = ref(null)
const selectedCategory = ref(null)

// Filtros
const searchTerm = ref('')
const selectedTournament = ref('')
const selectedGender = ref('')
const selectedStyle = ref('')
const selectedStatus = ref('')

// Paginación
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Formulario
const form = ref({
  name: '',
  tournamentId: '',
  minAge: '',
  maxAge: '',
  minWeight: '',
  maxWeight: '',
  gender: '',
  style: '',
  belt: '',
  maxParticipants: '',
  registrationFee: '',
  isActive: true
})

// Computed properties
const activeCount = computed(() => categories.value.filter(c => c.isActive).length)
const inactiveCount = computed(() => categories.value.filter(c => !c.isActive).length)

const filteredCategories = computed(() => {
  return categories.value.filter(category => {
    const matchesSearch = !searchTerm.value || 
      category.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    const matchesTournament = !selectedTournament.value || 
      category.tournamentId === parseInt(selectedTournament.value)
    
    const matchesGender = !selectedGender.value || 
      category.gender === selectedGender.value
    
    const matchesStyle = !selectedStyle.value || 
      category.style === selectedStyle.value
    
    const matchesStatus = selectedStatus.value === '' || 
      category.isActive.toString() === selectedStatus.value
    
    return matchesSearch && matchesTournament && matchesGender && matchesStyle && matchesStatus
  })
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCategories.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
})

// Métodos
const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    const data = await response.json()
    if (data.success) {
      categories.value = data.data.categories
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    alert('Error al cargar las categorías')
  } finally {
    loading.value = false
  }
}

const fetchTournaments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/tournaments')
    const data = await response.json()
    if (data.success) {
      tournaments.value = data.data.tournaments
    }
  } catch (error) {
    console.error('Error fetching tournaments:', error)
  }
}

const openCreateModal = () => {
  editingCategory.value = null
  resetForm()
  showModal.value = true
}

const editCategory = (category) => {
  editingCategory.value = category
  form.value = {
    name: category.name,
    tournamentId: category.tournamentId,
    minAge: category.minAge,
    maxAge: category.maxAge,
    minWeight: category.minWeight,
    maxWeight: category.maxWeight,
    gender: category.gender,
    style: category.style,
    belt: category.belt || '',
    maxParticipants: category.maxParticipants || '',
    registrationFee: category.registrationFee || '',
    isActive: category.isActive
  }
  showModal.value = true
}

const viewCategory = (category) => {
  selectedCategory.value = category
  showViewModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCategory.value = null
  resetForm()
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedCategory.value = null
}

const resetForm = () => {
  form.value = {
    name: '',
    tournamentId: '',
    minAge: '',
    maxAge: '',
    minWeight: '',
    maxWeight: '',
    gender: '',
    style: '',
    belt: '',
    maxParticipants: '',
    registrationFee: '',
    isActive: true
  }
}

const saveCategory = async () => {
  saving.value = true
  try {
    const url = editingCategory.value 
      ? `http://localhost:3000/api/categories/${editingCategory.value.id}`
      : 'http://localhost:3000/api/categories'
    
    const method = editingCategory.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form.value,
        tournamentId: parseInt(form.value.tournamentId),
        minAge: parseInt(form.value.minAge),
        maxAge: parseInt(form.value.maxAge),
        minWeight: parseFloat(form.value.minWeight),
        maxWeight: parseFloat(form.value.maxWeight),
        maxParticipants: form.value.maxParticipants ? parseInt(form.value.maxParticipants) : null,
        registrationFee: form.value.registrationFee ? parseFloat(form.value.registrationFee) : null
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      await fetchCategories()
      closeModal()
      alert(editingCategory.value ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente')
    } else {
      alert(data.error || 'Error al guardar la categoría')
    }
  } catch (error) {
    console.error('Error saving category:', error)
    alert('Error al guardar la categoría')
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (category) => {
  if (!confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`)) {
    return
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${category.id}`, {
      method: 'DELETE'
    })
    
    const data = await response.json()
    
    if (data.success) {
      await fetchCategories()
      alert('Categoría eliminada exitosamente')
    } else {
      alert(data.error || 'Error al eliminar la categoría')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    alert('Error al eliminar la categoría')
  }
}

// Métodos de utilidad
const getGenderText = (gender) => {
  const genderMap = {
    'MALE': 'Masculino',
    'FEMALE': 'Femenino',
    'MIXED': 'Mixto'
  }
  return genderMap[gender] || gender
}

const getGenderColor = (gender) => {
  const colorMap = {
    'MALE': 'bg-blue-100 text-blue-800',
    'FEMALE': 'bg-pink-100 text-pink-800',
    'MIXED': 'bg-purple-100 text-purple-800'
  }
  return colorMap[gender] || 'bg-gray-100 text-gray-800'
}

const getStyleText = (style) => {
  const styleMap = {
    'KYORUGI': 'Kyorugi',
    'POOMSAE': 'Poomsae',
    'BREAKING': 'Breaking'
  }
  return styleMap[style] || style
}

const getStyleColor = (style) => {
  const colorMap = {
    'KYORUGI': 'bg-red-100 text-red-800',
    'POOMSAE': 'bg-green-100 text-green-800',
    'BREAKING': 'bg-orange-100 text-orange-800'
  }
  return colorMap[style] || 'bg-gray-100 text-gray-800'
}

// Lifecycle
onMounted(() => {
  fetchCategories()
  fetchTournaments()
})
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>