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
          
          <div class="bg-purple-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestión de Torneos</h1>
            <p class="text-gray-600">Administra torneos del sistema</p>
          </div>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nuevo Torneo
        </button>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-gray-800">{{ tournaments.length }}</div>
          <div class="text-gray-600 text-sm">Total</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ activeCount }}</div>
          <div class="text-green-700 text-sm">Activos</div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ inProgressCount }}</div>
          <div class="text-blue-700 text-sm">En Progreso</div>
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-orange-600">{{ completedCount }}</div>
          <div class="text-orange-700 text-sm">Completados</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Buscar</label>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Nombre del torneo..."
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todos los estados</option>
            <option value="DRAFT">Borrador</option>
            <option value="OPEN_REGISTRATION">Registro Abierto</option>
            <option value="REGISTRATION_CLOSED">Registro Cerrado</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Año</label>
          <select 
            v-model="selectedYear"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todos los años</option>
            <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
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
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Nombre</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Fechas</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Lugar</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Participantes</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading" class="text-gray-800">
              <td colspan="7" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span class="ml-3">Cargando torneos...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredTournaments.length === 0" class="text-gray-800">
              <td colspan="7" class="px-6 py-8 text-center">
                <div class="text-gray-500">
                  <p>No se encontraron torneos</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="tournament in paginatedTournaments" :key="tournament.id" class="text-gray-800 hover:bg-gray-50">
              <td class="px-6 py-4">{{ tournament.id }}</td>
              <td class="px-6 py-4">
                <div>
                  <div class="font-medium">{{ tournament.name }}</div>
                  <div class="text-gray-500 text-sm">{{ tournament.description || 'Sin descripción' }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div>{{ formatDate(tournament.startDate) }}</div>
                  <div v-if="tournament.endDate" class="text-gray-500">a {{ formatDate(tournament.endDate) }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div>{{ tournament.venue }}</div>
                  <div class="text-gray-500">{{ tournament.city }}, {{ tournament.country }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusColor(tournament.status)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusText(tournament.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div>{{ tournament._count?.registrations || 0 }} registrados</div>
                  <div class="text-gray-500">Máx: {{ tournament.maxParticipants || 'Sin límite' }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-1">
                  <button 
                    @click="viewTournament(tournament)"
                    class="text-blue-600 hover:text-blue-700 p-1"
                    title="Ver detalles"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="goToRegistrations(tournament)"
                    class="text-green-600 hover:text-green-700 p-1"
                    title="Gestionar inscripciones"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                  </button>
                  <button 
                    @click="goToMatches(tournament)"
                    class="text-purple-600 hover:text-purple-700 p-1"
                    title="Ver combates"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6"/>
                    </svg>
                  </button>
                  <button 
                    @click="editTournament(tournament)"
                    class="text-yellow-600 hover:text-yellow-700 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteTournament(tournament)"
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
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredTournaments.length) }} de {{ filteredTournaments.length }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
          >
            Anterior
          </button>
          <span class="px-3 py-1 bg-purple-600 text-white rounded">{{ currentPage }}</span>
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

    <!-- Modals -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto shadow-xl border border-gray-200">
        <h3 class="text-xl font-bold text-gray-800 mb-6">{{ editingTournament ? 'Editar Torneo' : 'Nuevo Torneo' }}</h3>
        
        <form @submit.prevent="saveTournament" class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
            <input v-model="form.name" type="text" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Descripción</label>
            <textarea v-model="form.description" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Fecha Inicio</label>
              <input v-model="form.startDate" type="date" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Fecha Fin</label>
              <input v-model="form.endDate" type="date" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            </div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Sede</label>
            <input v-model="form.venue" type="text" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Ciudad</label>
              <input v-model="form.city" type="text" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">País</label>
              <input v-model="form.country" type="text" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            </div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
            <select v-model="form.status" required class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="DRAFT">Borrador</option>
              <option value="OPEN_REGISTRATION">Registro Abierto</option>
              <option value="REGISTRATION_CLOSED">Registro Cerrado</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="COMPLETED">Completado</option>
            </select>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button type="submit" :disabled="saving" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50">
              {{ saving ? 'Guardando...' : (editingTournament ? 'Actualizar' : 'Crear') }}
            </button>
            <button type="button" @click="closeModal" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal && selectedTournament" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeViewModal">
      <div class="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto shadow-xl border border-gray-200">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Detalles del Torneo</h3>
          <button @click="closeViewModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Información General</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-600 text-sm">Nombre:</span>
                <p class="text-gray-800 font-medium">{{ selectedTournament.name }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Descripción:</span>
                <p class="text-gray-800">{{ selectedTournament.description || 'Sin descripción' }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Organizador:</span>
                <p class="text-gray-800">{{ selectedTournament.organizer?.firstName }} {{ selectedTournament.organizer?.lastName }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Estado:</span>
                <span :class="getStatusColor(selectedTournament.status)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2">
                  {{ getStatusText(selectedTournament.status) }}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Detalles del Evento</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-600 text-sm">Fecha de Inicio:</span>
                <p class="text-gray-800">{{ formatDate(selectedTournament.startDate) }}</p>
              </div>
              <div v-if="selectedTournament.endDate">
                <span class="text-gray-600 text-sm">Fecha de Fin:</span>
                <p class="text-gray-800">{{ formatDate(selectedTournament.endDate) }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Sede:</span>
                <p class="text-gray-800">{{ selectedTournament.venue }}</p>
              </div>
              <div v-if="selectedTournament.address">
                <span class="text-gray-600 text-sm">Dirección:</span>
                <p class="text-gray-800">{{ selectedTournament.address }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Ubicación:</span>
                <p class="text-gray-800">{{ selectedTournament.city }}, {{ selectedTournament.country }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-8 mt-6">
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Participación</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-600 text-sm">Participantes Registrados:</span>
                <p class="text-gray-800">{{ selectedTournament._count?.registrations || 0 }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Máximo de Participantes:</span>
                <p class="text-gray-800">{{ selectedTournament.maxParticipants || 'Sin límite' }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Categorías:</span>
                <p class="text-gray-800">{{ selectedTournament._count?.categories || 0 }}</p>
              </div>
              <div v-if="selectedTournament.registrationDeadline">
                <span class="text-gray-600 text-sm">Límite de Registro:</span>
                <p class="text-gray-800">{{ formatDate(selectedTournament.registrationDeadline) }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Información Adicional</h4>
            <div class="space-y-3">
              <div v-if="selectedTournament.registrationFee">
                <span class="text-gray-600 text-sm">Cuota de Inscripción:</span>
                <p class="text-gray-800">${{ selectedTournament.registrationFee }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Torneo Público:</span>
                <p class="text-gray-800">{{ selectedTournament.isPublic ? 'Sí' : 'No' }}</p>
              </div>
              <div>
                <span class="text-gray-600 text-sm">Creado:</span>
                <p class="text-gray-800">{{ formatDate(selectedTournament.createdAt) }}</p>
              </div>
              <div v-if="selectedTournament.livestreamUrl">
                <span class="text-gray-600 text-sm">Transmisión en Vivo:</span>
                <a :href="selectedTournament.livestreamUrl" target="_blank" class="text-blue-600 hover:text-blue-700">Ver Stream</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 pt-4 border-t border-gray-200">
          <div class="flex space-x-4">
            <button 
              @click="editTournament(selectedTournament); closeViewModal()"
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
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
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// State
const tournaments = ref([])
const loading = ref(false)
const saving = ref(false)

// Filters
const searchTerm = ref('')
const selectedStatus = ref('')
const selectedYear = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modals
const showModal = ref(false)
const showViewModal = ref(false)
const editingTournament = ref(null)
const selectedTournament = ref(null)

// Form
const form = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  venue: '',
  address: '',
  city: '',
  country: '',
  status: 'DRAFT',
  maxParticipants: null,
  registrationFee: null,
  registrationDeadline: '',
  isPublic: true
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed
const activeCount = computed(() => tournaments.value.filter(t => ['OPEN_REGISTRATION', 'REGISTRATION_CLOSED'].includes(t.status)).length)
const inProgressCount = computed(() => tournaments.value.filter(t => t.status === 'IN_PROGRESS').length)
const completedCount = computed(() => tournaments.value.filter(t => t.status === 'COMPLETED').length)

const availableYears = computed(() => {
  const years = tournaments.value.map(t => new Date(t.startDate).getFullYear())
  return [...new Set(years)].sort((a, b) => b - a)
})

const filteredTournaments = computed(() => {
  let filtered = tournaments.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(search) ||
      t.venue.toLowerCase().includes(search) ||
      t.city?.toLowerCase().includes(search)
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(t => t.status === selectedStatus.value)
  }

  if (selectedYear.value) {
    filtered = filtered.filter(t => new Date(t.startDate).getFullYear() === parseInt(selectedYear.value))
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTournaments.value.length / itemsPerPage.value))

const paginatedTournaments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTournaments.value.slice(start, end)
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getStatusColor = (status) => {
  const colors = {
    'DRAFT': 'bg-gray-100 text-gray-800',
    'OPEN_REGISTRATION': 'bg-green-100 text-green-800',
    'REGISTRATION_CLOSED': 'bg-yellow-100 text-yellow-800',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800',
    'COMPLETED': 'bg-purple-100 text-purple-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'DRAFT': 'Borrador',
    'OPEN_REGISTRATION': 'Registro Abierto',
    'REGISTRATION_CLOSED': 'Registro Cerrado',
    'IN_PROGRESS': 'En Progreso',
    'COMPLETED': 'Completado',
    'CANCELLED': 'Cancelado'
  }
  return texts[status] || status
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    venue: '',
    address: '',
    city: '',
    country: '',
    status: 'DRAFT',
    maxParticipants: null,
    registrationFee: null,
    registrationDeadline: '',
    isPublic: true
  }
}

const openCreateModal = () => {
  console.log('Abriendo modal de crear torneo...') // Debug
  resetForm()
  editingTournament.value = null
  showModal.value = true
  console.log('Modal abierto, showModal:', showModal.value) // Debug
}

const editTournament = (tournament) => {
  editingTournament.value = tournament
  form.value = {
    name: tournament.name,
    description: tournament.description || '',
    startDate: tournament.startDate ? tournament.startDate.split('T')[0] : '',
    endDate: tournament.endDate ? tournament.endDate.split('T')[0] : '',
    venue: tournament.venue,
    address: tournament.address || '',
    city: tournament.city || '',
    country: tournament.country || '',
    status: tournament.status,
    maxParticipants: tournament.maxParticipants,
    registrationFee: tournament.registrationFee,
    registrationDeadline: tournament.registrationDeadline ? tournament.registrationDeadline.split('T')[0] : '',
    isPublic: tournament.isPublic
  }
  showModal.value = true
}

const viewTournament = (tournament) => {
  selectedTournament.value = tournament
  showViewModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingTournament.value = null
  resetForm()
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedTournament.value = null
}

const saveTournament = async () => {
  console.log('Iniciando saveTournament...') // Debug
  try {
    saving.value = true

    // Validar campos requeridos
    if (!form.value.name || !form.value.startDate || !form.value.venue) {
      alert('Por favor completa todos los campos requeridos: Nombre, Fecha de inicio y Sede')
      return
    }

    const tournamentData = {
      name: form.value.name,
      description: form.value.description || '',
      startDate: new Date(form.value.startDate).toISOString(),
      endDate: form.value.endDate ? new Date(form.value.endDate).toISOString() : undefined,
      venue: form.value.venue,
      address: form.value.address || '',
      city: form.value.city || '',
      country: form.value.country || '',
      organizerId: 2, // ID fijo del organizador por ahora
      status: form.value.status || 'DRAFT',
      maxParticipants: form.value.maxParticipants ? parseInt(form.value.maxParticipants) : undefined,
      registrationFee: form.value.registrationFee ? parseFloat(form.value.registrationFee) : undefined,
      registrationDeadline: form.value.registrationDeadline ? new Date(form.value.registrationDeadline).toISOString() : undefined,
      isPublic: form.value.isPublic
    }

    // Eliminar campos undefined para evitar problemas
    Object.keys(tournamentData).forEach(key => {
      if (tournamentData[key] === undefined) {
        delete tournamentData[key]
      }
    })

    console.log('Datos a enviar:', tournamentData) // Debug

    let response
    if (editingTournament.value) {
      response = await fetch(`${API_BASE}/api/tournaments/${editingTournament.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournamentData)
      })
    } else {
      response = await fetch(`${API_BASE}/api/tournaments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournamentData)
      })
    }

    console.log('Respuesta:', response) // Debug

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error response:', errorData)
      throw new Error(`Error ${response.status}: ${errorData}`)
    }

    await loadTournaments()
    closeModal()
    
  } catch (err) {
    console.error('Error saving tournament:', err)
  } finally {
    saving.value = false
  }
}

const deleteTournament = async (tournament) => {
  if (!confirm(`¿Eliminar el torneo "${tournament.name}"?`)) return

  try {
    const response = await fetch(`${API_BASE}/api/tournaments/${tournament.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error(`Error ${response.status}`)
    await loadTournaments()
    
  } catch (err) {
    console.error('Error deleting tournament:', err)
  }
}

const goToRegistrations = (tournament) => {
  router.push(`/tournament-registrations/${tournament.id}`)
}

const goToMatches = (tournament) => {
  router.push(`/tournament-matches/${tournament.id}`)
}

const loadTournaments = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/api/tournaments`)
    if (response.ok) {
      const data = await response.json()
      tournaments.value = data.data.tournaments
    }
  } catch (err) {
    console.error('Error loading tournaments:', err)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await loadTournaments()
})
</script>