<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <!-- Botón de retorno -->
          <button 
            @click="$router.push(`/tournament-registrations/${tournamentId}`)"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Volver a inscripciones"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:block">Inscripciones</span>
          </button>
          
          <div class="bg-purple-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Combates del Torneo</h1>
            <p class="text-gray-600">{{ tournament?.name || 'Cargando...' }}</p>
          </div>
        </div>
        
        <div class="flex gap-4">
          <button 
            @click="regenerateBrackets"
            class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Regenerar Brackets
          </button>
          
          <button 
            @click="openCombatView"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            :disabled="!selectedMatch"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Iniciar Combate
          </button>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-5 gap-4">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-gray-800">{{ totalMatches }}</div>
          <div class="text-gray-600 text-sm">Total Combates</div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ scheduledMatches }}</div>
          <div class="text-blue-700 text-sm">Programados</div>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ inProgressMatches }}</div>
          <div class="text-yellow-700 text-sm">En Progreso</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ completedMatches }}</div>
          <div class="text-green-700 text-sm">Completados</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ categoriesWithMatches }}</div>
          <div class="text-purple-700 text-sm">Categorías Activas</div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros y Vista</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
          <select 
            v-model="selectedCategory"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todos los estados</option>
            <option value="SCHEDULED">Programado</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Ronda</label>
          <select 
            v-model="selectedRound"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todas las rondas</option>
            <option v-for="round in rounds" :key="round" :value="round">{{ getRoundName(round) }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Vista</label>
          <select 
            v-model="viewMode"
            class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="list">Lista de Combates</option>
            <option value="brackets">Brackets</option>
            <option value="schedule">Horarios</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-2">Combate Seleccionado</label>
          <div class="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2 border">
            {{ selectedMatch ? `${selectedMatch.competitor1?.firstName} vs ${selectedMatch.competitor2?.firstName}` : 'Ninguno seleccionado' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Lista -->
    <div v-if="viewMode === 'list'" class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">
                <input type="radio" name="selectedMatch" value="" @change="selectedMatch = null" :checked="!selectedMatch" class="mr-2">
                ID
              </th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Competidor 1</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Competidor 2</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Categoría</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Ronda</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Resultado</th>
              <th class="px-6 py-4 text-left text-gray-800 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading" class="text-gray-800">
              <td colspan="8" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span class="ml-3">Cargando combates...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredMatches.length === 0" class="text-gray-800">
              <td colspan="8" class="px-6 py-8 text-center">
                <div class="text-gray-500">
                  <p>No se encontraron combates</p>
                  <p class="text-sm mt-2">Asegúrate de haber generado los brackets desde la sección de inscripciones</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="match in paginatedMatches" :key="match.id" 
                :class="[
                  'text-gray-800 hover:bg-gray-50 cursor-pointer',
                  selectedMatch?.id === match.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                ]"
                @click="selectMatch(match)"
            >
              <td class="px-6 py-4">
                <input type="radio" name="selectedMatch" :value="match.id" :checked="selectedMatch?.id === match.id" @change="selectMatch(match)" class="mr-2">
                {{ match.id }}
              </td>
              <td class="px-6 py-4">
                <div v-if="match.competitor1">
                  <div class="font-medium">{{ match.competitor1.firstName }} {{ match.competitor1.lastName }}</div>
                  <div class="text-gray-500 text-sm">{{ match.competitor1.club?.name || 'Sin club' }}</div>
                </div>
                <div v-else class="text-gray-500 italic">TBD</div>
              </td>
              <td class="px-6 py-4">
                <div v-if="match.competitor2">
                  <div class="font-medium">{{ match.competitor2.firstName }} {{ match.competitor2.lastName }}</div>
                  <div class="text-gray-500 text-sm">{{ match.competitor2.club?.name || 'Sin club' }}</div>
                </div>
                <div v-else class="text-gray-500 italic">TBD</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="font-medium">{{ match.category?.name }}</div>
                  <div class="text-gray-500">{{ match.category?.style }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="font-medium">{{ getRoundName(match.round) }}</div>
                  <div class="text-gray-500">Match {{ match.matchNumber }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getMatchStatusColor(match.status)" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getMatchStatusText(match.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div v-if="match.winnerId" class="text-sm">
                  <div class="font-medium text-green-600">Ganador:</div>
                  <div>{{ getWinnerName(match) }}</div>
                  <div class="text-gray-500">{{ match.score1 || 0 }} - {{ match.score2 || 0 }}</div>
                </div>
                <div v-else class="text-gray-500 text-sm">Pendiente</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click.stop="startMatch(match)"
                    v-if="match.status === 'SCHEDULED'"
                    class="text-green-600 hover:text-green-700 p-1"
                    title="Iniciar combate"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-3-16V3m0 0V1m0 2h1M9 7h1m4 0h1M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="viewMatchDetails(match)"
                    class="text-blue-600 hover:text-blue-700 p-1"
                    title="Ver detalles"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="editMatch(match)"
                    class="text-orange-600 hover:text-orange-700 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
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
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredMatches.length) }} de {{ filteredMatches.length }}
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

    <!-- Vista de Brackets -->
    <div v-else-if="viewMode === 'brackets'" class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div v-if="selectedCategory">
        <h3 class="text-lg font-semibold text-gray-800 mb-6 text-center">
          Bracket - {{ categories.find(c => c.id == selectedCategory)?.name }}
        </h3>
        
        <!-- Tournament Bracket Visualization -->
        <div class="overflow-x-auto">
          <div class="min-w-max p-4">
            <div class="bracket-container">
              <!-- Round 1 -->
              <div class="bracket-round">
                <h4 class="round-title">{{ getBracketRoundName(selectedCategory, 1) }}</h4>
                <div class="matches-column">
                  <div v-for="match in getMatchesByRound(selectedCategory, 1)" :key="match.id" 
                       class="bracket-match"
                       :class="selectedMatch?.id === match.id ? 'selected' : ''"
                       @click="selectMatch(match)">
                    <div class="match-header">
                      <span class="match-number">{{ match.matchNumber }}</span>
                      <span class="match-status" :class="getMatchStatusColor(match.status)">
                        {{ getMatchStatusText(match.status) }}
                      </span>
                    </div>
                    <div class="competitors">
                      <div class="competitor" :class="match.winnerId === match.competitor1Id ? 'winner' : ''">
                        <span class="competitor-name">{{ match.competitor1?.firstName }} {{ match.competitor1?.lastName }}</span>
                        <span class="score">{{ match.score1 || 0 }}</span>
                      </div>
                      <div class="competitor" :class="match.winnerId === match.competitor2Id ? 'winner' : ''">
                        <span class="competitor-name">{{ match.competitor2?.firstName || 'TBD' }} {{ match.competitor2?.lastName || '' }}</span>
                        <span class="score">{{ match.score2 || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Connection lines for Round 1 to 2 - Solo mostrar si hay ronda 2 -->
                <div class="bracket-connections" v-if="getMatchesByRound(selectedCategory, 2).length > 0">
                  <svg class="connection-svg" viewBox="0 0 100 200" preserveAspectRatio="none">
                    <!-- Simplified connection lines -->
                    <path d="M 0 25 L 50 25 L 50 100 L 100 100" stroke="#cbd5e0" stroke-width="2" fill="none"/>
                    <path d="M 0 75 L 50 75 L 50 100 L 100 100" stroke="#cbd5e0" stroke-width="2" fill="none"/>
                    <path d="M 0 125 L 50 125 L 50 100 L 100 100" stroke="#cbd5e0" stroke-width="2" fill="none"/>
                  </svg>
                </div>
              </div>

              <!-- Round 2 - Solo mostrar si existe -->
              <div class="bracket-round" v-if="getMatchesByRound(selectedCategory, 2).length > 0">
                <h4 class="round-title">{{ getBracketRoundName(selectedCategory, 2) }}</h4>
                <div class="matches-column">
                  <div v-for="match in getMatchesByRound(selectedCategory, 2)" :key="match.id" 
                       class="bracket-match"
                       :class="selectedMatch?.id === match.id ? 'selected' : ''"
                       @click="selectMatch(match)">
                    <div class="match-header">
                      <span class="match-number">{{ match.matchNumber }}</span>
                      <span class="match-status" :class="getMatchStatusColor(match.status)">
                        {{ getMatchStatusText(match.status) }}
                      </span>
                    </div>
                    <div class="competitors">
                      <div class="competitor" :class="match.winnerId === match.competitor1Id ? 'winner' : ''">
                        <span class="competitor-name">{{ getWinnerFromPreviousMatch(match.competitor1Id) || 'TBD' }}</span>
                        <span class="score">{{ match.score1 || 0 }}</span>
                      </div>
                      <div class="competitor" :class="match.winnerId === match.competitor2Id ? 'winner' : ''">
                        <span class="competitor-name">{{ getWinnerFromPreviousMatch(match.competitor2Id) || 'TBD' }}</span>
                        <span class="score">{{ match.score2 || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Connection lines for Round 2 to 3 - Solo mostrar si hay ronda 3 -->
                <div class="bracket-connections" v-if="getMatchesByRound(selectedCategory, 3).length > 0">
                  <svg class="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 25 L 50 25 L 50 50 L 100 50" stroke="#cbd5e0" stroke-width="2" fill="none"/>
                    <path d="M 0 75 L 50 75 L 50 50 L 100 50" stroke="#cbd5e0" stroke-width="2" fill="none"/>
                  </svg>
                </div>
              </div>

              <!-- Round 3 (Final) - Solo mostrar si existe -->
              <div class="bracket-round" v-if="getMatchesByRound(selectedCategory, 3).length > 0">
                <h4 class="round-title">{{ getBracketRoundName(selectedCategory, 3) }}</h4>
                <div class="matches-column">
                  <div v-for="match in getMatchesByRound(selectedCategory, 3)" :key="match.id" 
                       class="bracket-match final-match"
                       :class="selectedMatch?.id === match.id ? 'selected' : ''"
                       @click="selectMatch(match)">
                    <div class="match-header">
                      <span class="match-number">FINAL</span>
                      <span class="match-status" :class="getMatchStatusColor(match.status)">
                        {{ getMatchStatusText(match.status) }}
                      </span>
                    </div>
                    <div class="competitors">
                      <div class="competitor" :class="match.winnerId === match.competitor1Id ? 'winner champion' : ''">
                        <span class="competitor-name">{{ getWinnerFromPreviousMatch(match.competitor1Id) || 'TBD' }}</span>
                        <span class="score">{{ match.score1 || 0 }}</span>
                      </div>
                      <div class="competitor" :class="match.winnerId === match.competitor2Id ? 'winner champion' : ''">
                        <span class="competitor-name">{{ getWinnerFromPreviousMatch(match.competitor2Id) || 'TBD' }}</span>
                        <span class="score">{{ match.score2 || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Campeón -->
              <div class="bracket-round" v-if="getCategoryChampion(selectedCategory)">
                <h4 class="round-title">🏆 Campeón</h4>
                <div class="matches-column">
                  <div class="champion-card">
                    <div class="champion-header">
                      <span class="champion-title">CAMPEÓN</span>
                    </div>
                    <div class="champion-info">
                      <div class="champion-name">
                        {{ getCategoryChampion(selectedCategory)?.firstName }} 
                        {{ getCategoryChampion(selectedCategory)?.lastName }}
                      </div>
                      <div class="champion-club">
                        {{ getCategoryChampion(selectedCategory)?.club?.name || 'Club' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-8">
        <p>Selecciona una categoría para ver el bracket</p>
      </div>
    </div>

    <!-- Vista de Horarios -->
    <div v-else-if="viewMode === 'schedule'" class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Horario de Combates</h3>
      <div class="space-y-4">
        <div v-for="(dayMatches, date) in groupedByDate" :key="date" class="border border-gray-200 rounded-lg p-4">
          <h4 class="font-medium text-gray-700 mb-3">{{ formatDate(date) }}</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="match in dayMatches" :key="match.id" 
                 class="bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                 :class="selectedMatch?.id === match.id ? 'border-purple-600 bg-purple-50' : ''"
                 @click="selectMatch(match)"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium">{{ formatTime(match.scheduledDate) }}</span>
                <span :class="getMatchStatusColor(match.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ getMatchStatusText(match.status) }}
                </span>
              </div>
              <div class="text-sm">
                <div class="font-medium">{{ match.category?.name }}</div>
                <div class="text-gray-600">{{ getRoundName(match.round) }}</div>
                <div class="mt-1">
                  <div>{{ match.competitor1?.firstName }} {{ match.competitor1?.lastName }}</div>
                  <div class="text-gray-500">vs</div>
                  <div>{{ match.competitor2?.firstName || 'TBD' }} {{ match.competitor2?.lastName || '' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Props y router
const route = useRoute()
const router = useRouter()
const tournamentId = ref(route.params.id)

// State
const tournament = ref(null)
const matches = ref([])
const categories = ref([])
const loading = ref(false)
const selectedMatch = ref(null)

// Filtros
const selectedCategory = ref(route.query.category || '')
const selectedStatus = ref('')
const selectedRound = ref('')
const viewMode = ref('list')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(15)

// API Base URL
const API_BASE = 'http://localhost:3000'

// Watchers para actualizar URL cuando cambien los filtros
watch([selectedCategory, selectedStatus, selectedRound, viewMode], ([category, status, round, view]) => {
  const query = { ...route.query }
  
  if (category) {
    query.category = category
  } else {
    delete query.category
  }
  
  if (status) {
    query.status = status
  } else {
    delete query.status
  }
  
  if (round) {
    query.round = round
  } else {
    delete query.round
  }
  
  if (view && view !== 'list') {
    query.view = view
  } else {
    delete query.view
  }
  
  // Actualizar URL sin recargar la página
  router.push({ 
    path: route.path, 
    query 
  })
})

// Computed
const filteredMatches = computed(() => {
  let filtered = matches.value

  if (selectedCategory.value) {
    filtered = filtered.filter(m => m.categoryId === parseInt(selectedCategory.value))
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(m => m.status === selectedStatus.value)
  }

  if (selectedRound.value) {
    filtered = filtered.filter(m => m.round === parseInt(selectedRound.value))
  }

  return filtered.sort((a, b) => {
    // Ordenar por categoría, luego por ronda, luego por número de match
    if (a.categoryId !== b.categoryId) return a.categoryId - b.categoryId
    if (a.round !== b.round) return a.round - b.round
    return a.matchNumber - b.matchNumber
  })
})

const totalPages = computed(() => Math.ceil(filteredMatches.value.length / itemsPerPage.value))

const paginatedMatches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMatches.value.slice(start, end)
})

// Stats
const totalMatches = computed(() => matches.value.length)
const scheduledMatches = computed(() => matches.value.filter(m => m.status === 'SCHEDULED').length)
const inProgressMatches = computed(() => matches.value.filter(m => m.status === 'IN_PROGRESS').length)
const completedMatches = computed(() => matches.value.filter(m => m.status === 'COMPLETED').length)
const categoriesWithMatches = computed(() => {
  return [...new Set(matches.value.map(m => m.categoryId))].length
})

// Rounds
const rounds = computed(() => {
  return [...new Set(matches.value.map(m => m.round))].sort((a, b) => a - b)
})

// Grouped data
const groupedByDate = computed(() => {
  const groups = {}
  matches.value.forEach(match => {
    if (match.scheduledDate) {
      const date = new Date(match.scheduledDate).toDateString()
      if (!groups[date]) groups[date] = []
      groups[date].push(match)
    }
  })
  return groups
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getMatchStatusColor = (status) => {
  const colors = {
    'SCHEDULED': 'bg-blue-100 text-blue-800',
    'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getMatchStatusText = (status) => {
  const texts = {
    'SCHEDULED': 'Programado',
    'IN_PROGRESS': 'En Progreso',
    'COMPLETED': 'Completado',
    'CANCELLED': 'Cancelado'
  }
  return texts[status] || status
}

const getRoundName = (round) => {
  const names = {
    1: 'Final',
    2: 'Semifinal', 
    4: 'Cuartos de Final',
    8: 'Octavos de Final',
    16: 'Dieciseisavos de Final'
  }
  return names[round] || `Ronda ${round}`
}

// Nueva función para obtener el nombre de ronda basado en el contexto del bracket
const getBracketRoundName = (categoryId, round) => {
  const allRounds = matches.value
    .filter(m => m.categoryId === parseInt(categoryId))
    .map(m => m.round)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b)
  
  const totalRounds = allRounds.length
  const roundIndex = allRounds.indexOf(round) + 1
  
  // Si solo hay una ronda, es la final
  if (totalRounds === 1) {
    return 'Final'
  }
  
  // Si es la última ronda, es la final
  if (roundIndex === totalRounds) {
    return 'Final'
  }
  
  // Si es la penúltima ronda, es semifinal
  if (roundIndex === totalRounds - 1) {
    return 'Semifinales'
  }
  
  // Si es la antepenúltima ronda, son cuartos
  if (roundIndex === totalRounds - 2) {
    return 'Cuartos de Final'
  }
  
  // Para rondas anteriores, usar nombres tradicionales
  if (roundIndex === totalRounds - 3) {
    return 'Octavos de Final'
  }
  
  // Si es la primera ronda y hay múltiples rondas, podría ser clasificatoria
  if (roundIndex === 1 && totalRounds > 3) {
    return 'Ronda Clasificatoria'
  }
  
  return `Ronda ${round}`
}

// Función para determinar si un competidor tiene bye
const hasCompetitorBye = (categoryId, competitorId) => {
  const firstRoundMatches = matches.value.filter(m => 
    m.categoryId === parseInt(categoryId) && m.round === 1
  )
  
  // Si el competidor no está en ningún match de primera ronda, tiene bye
  const isInFirstRound = firstRoundMatches.some(m => 
    m.competitor1Id === competitorId || m.competitor2Id === competitorId
  )
  
  return !isInFirstRound
}

// Función para obtener competidores con bye
const getCompetitorsWithBye = (categoryId) => {
  // Esta función requeriría acceso a todos los competidores registrados
  // Por ahora retornamos un array vacío, pero se puede implementar
  return []
}

const getWinnerName = (match) => {
  if (!match.winnerId) return 'N/A'
  if (match.winnerId === match.competitor1Id) {
    return `${match.competitor1?.firstName} ${match.competitor1?.lastName}`
  }
  if (match.winnerId === match.competitor2Id) {
    return `${match.competitor2?.firstName} ${match.competitor2?.lastName}`
  }
  return 'N/A'
}

const selectMatch = (match) => {
  selectedMatch.value = match
}

const startMatch = async (match) => {
  if (!match.competitor1Id || !match.competitor2Id) {
    alert('No se puede iniciar el combate: faltan competidores')
    return
  }
  
  selectedMatch.value = match
  openCombatView()
}

const openCombatView = () => {
  if (!selectedMatch.value) {
    alert('Selecciona un combate primero')
    return
  }
  
  // Navegar al combate del torneo en la misma ventana
  const combatUrl = `/tournament-combat/${tournamentId.value}/${selectedMatch.value.id}?tournamentId=${tournamentId.value}&categoryId=${selectedMatch.value.categoryId}`
  router.push(combatUrl)
}

const regenerateBrackets = async () => {
  if (!confirm('¿Regenerar todos los brackets? Esto eliminará los combates existentes.')) return

  try {
    const response = await fetch(`${API_BASE}/api/registrations/tournament/${tournamentId.value}/generate-brackets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ regenerate: true })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al regenerar brackets')
    }

    const result = await response.json()
    alert(`Brackets regenerados exitosamente para ${result.data.categories.length} categorías`)
    await loadMatches()
    
  } catch (err) {
    console.error('Error regenerating brackets:', err)
    alert(err.message || 'Error al regenerar brackets')
  }
}

const getBracketRounds = (categoryId) => {
  const categoryMatches = matches.value.filter(m => m.categoryId === parseInt(categoryId))
  const roundsMap = {}
  
  categoryMatches.forEach(match => {
    if (!roundsMap[match.round]) {
      roundsMap[match.round] = { round: match.round, matches: [] }
    }
    roundsMap[match.round].matches.push(match)
  })
  
  return Object.values(roundsMap).sort((a, b) => b.round - a.round) // Orden descendente (final primero)
}

// New functions for improved bracket visualization
const getMatchesByRound = (categoryId, round) => {
  console.log(`Filtering by categoryId: ${categoryId} (type: ${typeof categoryId}), round: ${round}`)
  console.log(`Available matches:`, matches.value.map(m => ({ id: m.id, categoryId: m.categoryId, round: m.round })))
  
  const filtered = matches.value.filter(m => m.categoryId === parseInt(categoryId) && m.round === round)
    .sort((a, b) => a.matchNumber - b.matchNumber)
  
  console.log(`Getting matches for category ${categoryId}, round ${round}:`, filtered)
  return filtered
}

const getWinnerFromPreviousMatch = (competitorId) => {
  if (!competitorId) return 'TBD'
  const competitor = matches.value.find(m => 
    (m.competitor1Id === competitorId || m.competitor2Id === competitorId) && m.winnerId === competitorId
  )
  if (competitor) {
    const winnerComp = competitor.competitor1Id === competitorId ? competitor.competitor1 : competitor.competitor2
    return `${winnerComp?.firstName || ''} ${winnerComp?.lastName || ''}`.trim()
  }
  return 'TBD'
}

// Función para obtener el campeón de una categoría
const getCategoryChampion = (categoryId) => {
  const categoryMatches = matches.value.filter(m => m.categoryId === parseInt(categoryId))
  if (categoryMatches.length === 0) return null
  
  // Encontrar la ronda más alta (final)
  const maxRound = Math.max(...categoryMatches.map(m => m.round))
  const finalMatch = categoryMatches.find(m => m.round === maxRound && m.status === 'COMPLETED' && m.winnerId)
  
  if (finalMatch) {
    return finalMatch.winnerId === finalMatch.competitor1Id ? finalMatch.competitor1 : finalMatch.competitor2
  }
  
  return null
}

// Función para verificar si una categoría está completa
const isCategoryComplete = (categoryId) => {
  const champion = getCategoryChampion(categoryId)
  return champion !== null
}

const viewMatchDetails = (match) => {
  selectedMatch.value = match
  // Aquí podrías abrir un modal con detalles del combate
  alert(`Detalles del combate ${match.id}: ${match.competitor1?.firstName} vs ${match.competitor2?.firstName || 'TBD'}`)
}

const editMatch = (match) => {
  selectedMatch.value = match
  // Aquí podrías abrir un modal para editar el combate
  alert(`Editar combate ${match.id}`)
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

const loadMatches = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/api/tournament-matches/${tournamentId.value}/matches`)
    if (response.ok) {
      const data = await response.json()
      matches.value = data.data
      console.log('Loaded matches:', data.data)
    }
  } catch (err) {
    console.error('Error loading matches:', err)
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

// Lifecycle
onMounted(async () => {
  // Cargar datos
  await Promise.all([
    loadTournament(),
    loadMatches(),
    loadCategories()
  ])
  
  // Aplicar filtros desde query parameters
  const query = route.query
  if (query.view) {
    viewMode.value = query.view
  }
  if (query.category) {
    selectedCategory.value = query.category
  }
  
  // Si hay un parámetro 'updated', recargar matches para mostrar cambios recientes
  if (query.updated) {
    await loadMatches()
  }
})
</script>

<style scoped>
/* Tournament Bracket Styles */
.bracket-container {
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  min-height: 500px;
  padding: 2rem;
  overflow-x: auto;
}

.bracket-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
}

/* Centering logic for different rounds */
.bracket-round:nth-child(1) {
  align-items: flex-start;
}

.bracket-round:nth-child(2) {
  transform: translateY(4rem); /* Centrar respecto a ronda 1 */
}

.bracket-round:nth-child(3) {
  transform: translateY(8rem); /* Centrar respecto a ronda 2 */
}

.round-title {
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1rem;
}

.matches-column {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  justify-content: center;
}

/* Specific spacing for different rounds */
.bracket-round:nth-child(1) .matches-column {
  gap: 2rem;
}

.bracket-round:nth-child(2) .matches-column {
  gap: 8rem; /* Espacio entre semifinales para alinearse con cuartos */
}

.bracket-round:nth-child(3) .matches-column {
  gap: 0; /* Solo un match final */
}

.bracket-match {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.bracket-match:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bracket-match.selected {
  border-color: #805ad5;
  background: #f7fafc;
  box-shadow: 0 0 0 3px rgba(128, 90, 213, 0.1);
}

.bracket-match.final-match {
  border-color: #d69e2e;
  background: linear-gradient(135deg, #fef5e7 0%, #f7fafc 100%);
}

.bracket-match.final-match:hover {
  border-color: #b7791f;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.match-number {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.875rem;
}

.match-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
}

.competitors {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.competitor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.competitor.winner {
  background: #f0fff4;
  border-color: #68d391;
  font-weight: 600;
}

.competitor.champion {
  background: linear-gradient(135deg, #fef5e7 0%, #f0fff4 100%);
  border-color: #d69e2e;
  box-shadow: 0 2px 8px rgba(214, 158, 46, 0.2);
}

.competitor-name {
  font-size: 0.875rem;
  color: #2d3748;
  flex: 1;
}

.score {
  font-weight: 700;
  color: #2d3748;
  background: #edf2f7;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  min-width: 2rem;
  text-align: center;
}

.winner .score {
  background: #68d391;
  color: white;
}

.bracket-connections {
  position: absolute;
  right: -3rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.connection-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Status colors */
.match-status.bg-yellow-100 {
  background-color: #fef5e7;
  color: #b7791f;
}

.match-status.bg-blue-100 {
  background-color: #ebf8ff;
  color: #2b6cb0;
}

.match-status.bg-green-100 {
  background-color: #f0fff4;
  color: #276749;
}

.match-status.bg-red-100 {
  background-color: #fed7d7;
  color: #c53030;
}

/* Responsive design */
@media (max-width: 768px) {
  .bracket-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .matches-column {
    min-width: 200px;
  }
  
  .bracket-connections {
    display: none;
  }
}

/* Champion card styles */
.champion-card {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border: 3px solid #d69e2e;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
  animation: glow 2s ease-in-out infinite alternate;
  min-width: 250px;
}

.champion-header {
  text-align: center;
  margin-bottom: 1rem;
}

.champion-title {
  font-weight: 800;
  font-size: 1.1rem;
  color: #744210;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 2px solid #d69e2e;
}

.champion-info {
  text-align: center;
}

.champion-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #744210;
  margin-bottom: 0.5rem;
}

.champion-club {
  font-size: 0.9rem;
  color: #975a16;
  font-weight: 500;
}

@keyframes glow {
  from {
    box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
  }
  to {
    box-shadow: 0 8px 35px rgba(214, 158, 46, 0.5);
  }
}
</style>