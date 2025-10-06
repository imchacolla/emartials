<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8">
    <!-- Header con información del torneo -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Botón de retorno -->
          <button 
            @click="goBack"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Volver a combates del torneo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:block">Combates</span>
          </button>
          
          <div class="bg-red-100 p-3 rounded-lg">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Combate de Torneo</h1>
            <p class="text-gray-600">{{ matchInfo?.tournament?.name || 'Torneo' }}</p>
          </div>
        </div>
        
        <!-- Información del combate -->
        <div class="text-right">
          <div class="text-sm text-gray-600">{{ matchInfo?.category?.name || 'Categoría' }}</div>
          <div class="text-lg font-semibold text-gray-800">{{ matchInfo?.phase || 'Fase' }}</div>
          <div class="text-sm text-gray-500">{{ matchInfo?.round || 'Round' }}</div>
        </div>
      </div>
      
      <!-- Información de competidores -->
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-center">
            <div class="text-lg font-semibold text-blue-800">{{ blueCompetitor?.firstName }} {{ blueCompetitor?.lastName }}</div>
            <div class="text-sm text-blue-600">{{ blueCompetitor?.club?.name || 'Club' }}</div>
            <div class="text-xs text-blue-500">{{ blueCompetitor?.country || 'País' }}</div>
          </div>
        </div>
        
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="text-center">
            <div class="text-lg font-semibold text-red-800">{{ redCompetitor?.firstName }} {{ redCompetitor?.lastName }}</div>
            <div class="text-sm text-red-600">{{ redCompetitor?.club?.name || 'Club' }}</div>
            <div class="text-xs text-red-500">{{ redCompetitor?.country || 'País' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sistema de Combate -->
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <!-- Marcador Principal -->
      <div class="xl:col-span-3">
        <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          
          <!-- Timer y Round -->
          <div class="text-center mb-6">
            <div class="text-6xl font-mono font-bold text-gray-800 mb-2">{{ formatTime(matchTime) }}</div>
            <div class="text-xl text-gray-600 mb-4">Round {{ currentRound }}/{{ totalRounds }}</div>
            
            <div class="flex justify-center gap-4">
              <button 
                @click="toggleTimer"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-300',
                  isTimerRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                ]"
              >
                {{ isTimerRunning ? '⏸️ Pausar' : '▶️ Iniciar' }}
              </button>
              
              <button 
                @click="resetRound"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                🔄 Reset Round
              </button>
              
              <button 
                @click="nextRound"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                :disabled="currentRound >= totalRounds"
              >
                ➡️ Siguiente Round
              </button>
            </div>
          </div>

          <!-- Marcadores -->
          <div class="grid grid-cols-2 gap-8 mb-6">
            <!-- Competidor Azul -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div class="text-center mb-4">
                <div class="text-2xl font-bold text-blue-800 mb-2">CHONG (Azul)</div>
                <div class="text-4xl font-mono font-bold text-blue-600">{{ blueScore.total }}</div>
              </div>
              
              <!-- Botones de puntuación -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <button @click="addScore('blue', 1)" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold">
                  +1 Punto
                </button>
                <button @click="addScore('blue', 2)" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
                  +2 Patada Cuerpo
                </button>
                <button @click="addScore('blue', 3)" class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold">
                  +3 Patada Cabeza
                </button>
                <button @click="addScore('blue', 4)" class="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded font-semibold">
                  +4 Giro Cabeza
                </button>
              </div>
              
              <!-- Penalizaciones -->
              <div class="grid grid-cols-2 gap-2">
                <button @click="addPenalty('blue', 'gam-jeom')" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm">
                  Gam-jeom
                </button>
                <button @click="addPenalty('blue', 'warning')" class="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-sm">
                  Advertencia
                </button>
              </div>
              
              <!-- Detalles -->
              <div class="mt-4 text-sm">
                <div class="flex justify-between">
                  <span>Penalizaciones:</span>
                  <span class="font-semibold">{{ bluePenalties.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Puntos Round:</span>
                  <span class="font-semibold">{{ blueScore.round }}</span>
                </div>
              </div>
            </div>

            <!-- Competidor Rojo -->
            <div class="bg-red-50 border border-red-200 rounded-lg p-6">
              <div class="text-center mb-4">
                <div class="text-2xl font-bold text-red-800 mb-2">HONG (Rojo)</div>
                <div class="text-4xl font-mono font-bold text-red-600">{{ redScore.total }}</div>
              </div>
              
              <!-- Botones de puntuación -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <button @click="addScore('red', 1)" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-semibold">
                  +1 Punto
                </button>
                <button @click="addScore('red', 2)" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold">
                  +2 Patada Cuerpo
                </button>
                <button @click="addScore('red', 3)" class="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded font-semibold">
                  +3 Patada Cabeza
                </button>
                <button @click="addScore('red', 4)" class="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded font-semibold">
                  +4 Giro Cabeza
                </button>
              </div>
              
              <!-- Penalizaciones -->
              <div class="grid grid-cols-2 gap-2">
                <button @click="addPenalty('red', 'gam-jeom')" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm">
                  Gam-jeom
                </button>
                <button @click="addPenalty('red', 'warning')" class="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-sm">
                  Advertencia
                </button>
              </div>
              
              <!-- Detalles -->
              <div class="mt-4 text-sm">
                <div class="flex justify-between">
                  <span>Penalizaciones:</span>
                  <span class="font-semibold">{{ redPenalties.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Puntos Round:</span>
                  <span class="font-semibold">{{ redScore.round }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones del Combate -->
          <div class="flex justify-center gap-4">
            <button 
              @click="endMatch"
              class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              🏁 Finalizar Combate
            </button>
            
            <button 
              @click="saveMatch"
              class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              💾 Guardar
            </button>
          </div>
        </div>
      </div>

      <!-- Panel de Control y Estadísticas -->
      <div class="space-y-6">
        <!-- Historial de Acciones -->
        <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Historial</h3>
          <div class="max-h-60 overflow-y-auto space-y-2">
            <div v-for="(action, index) in matchHistory" :key="index" class="text-sm p-2 bg-gray-50 rounded border">
              <div class="font-medium">{{ action.type }}</div>
              <div class="text-gray-600">{{ action.competitor }} - Round {{ action.round }}</div>
              <div class="text-xs text-gray-500">{{ formatTimestamp(action.timestamp) }}</div>
            </div>
          </div>
        </div>

        <!-- Información del Bracket -->
        <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Información del Bracket</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Fase:</span>
              <span class="font-semibold">{{ matchInfo?.phase || 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Combate:</span>
              <span class="font-semibold">{{ matchInfo?.matchNumber || 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Siguiente:</span>
              <span class="font-semibold">{{ matchInfo?.nextMatch || 'Final' }}</span>
            </div>
          </div>
        </div>

        <!-- Acciones Rápidas -->
        <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
          <div class="space-y-2">
            <button @click="undoLastAction" class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded font-semibold">
              ↶ Deshacer
            </button>
            <button @click="requestVideo" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold">
              📹 Video Review
            </button>
            <button @click="medicalTimeout" class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-semibold">
              🏥 Time Out Médico
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Finalización -->
    <div v-if="showEndModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white shadow-xl border border-gray-200 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Finalizar Combate</h3>
        
        <div class="mb-6">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-lg font-semibold mb-2">Resultado Final</div>
            <div class="text-3xl font-bold">
              <span class="text-blue-600">{{ blueScore.total }}</span>
              <span class="text-gray-400 mx-2">-</span>
              <span class="text-red-600">{{ redScore.total }}</span>
            </div>
            <div class="text-sm text-gray-600 mt-2">
              Ganador: <span class="font-semibold">{{ winner }}</span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de Victoria</label>
          <select v-model="victoryType" class="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="points">Por Puntos</option>
            <option value="superiority">Superioridad</option>
            <option value="knockout">Knockout</option>
            <option value="disqualification">Descalificación</option>
            <option value="withdrawal">Retiro</option>
          </select>
        </div>
        
        <div class="flex space-x-4">
          <button 
            @click="confirmEndMatch"
            class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Confirmar
          </button>
          <button 
            @click="showEndModal = false"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Props y router
const route = useRoute()
const router = useRouter()

// State del combate
const matchId = ref(route.params.matchId)
const matchInfo = ref(null)
const blueCompetitor = ref(null)
const redCompetitor = ref(null)

// Timer
const matchTime = ref(180) // 3 minutos por round
const isTimerRunning = ref(false)
const currentRound = ref(1)
const totalRounds = ref(3)
const timerInterval = ref(null)

// Puntuaciones
const blueScore = ref({ total: 0, round: 0 })
const redScore = ref({ total: 0, round: 0 })
const bluePenalties = ref([])
const redPenalties = ref([])

// Historial y estado
const matchHistory = ref([])
const showEndModal = ref(false)
const victoryType = ref('points')

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed
const winner = computed(() => {
  if (blueScore.value.total > redScore.value.total) {
    return `${blueCompetitor.value?.firstName} ${blueCompetitor.value?.lastName} (Azul)`
  } else if (redScore.value.total > blueScore.value.total) {
    return `${redCompetitor.value?.firstName} ${redCompetitor.value?.lastName} (Rojo)`
  } else {
    return 'Empate'
  }
})

// Methods
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const toggleTimer = () => {
  if (isTimerRunning.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  } else {
    timerInterval.value = setInterval(() => {
      if (matchTime.value > 0) {
        matchTime.value--
      } else {
        // Tiempo terminado, pausar automáticamente
        toggleTimer()
        addToHistory('TIME_EXPIRED', 'Sistema', 'Tiempo del round terminado')
      }
    }, 1000)
  }
  isTimerRunning.value = !isTimerRunning.value
}

const resetRound = () => {
  matchTime.value = 180
  isTimerRunning.value = false
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  blueScore.value.round = 0
  redScore.value.round = 0
  addToHistory('ROUND_RESET', 'Sistema', `Round ${currentRound.value} reiniciado`)
}

const nextRound = () => {
  if (currentRound.value < totalRounds.value) {
    currentRound.value++
    resetRound()
    addToHistory('NEXT_ROUND', 'Sistema', `Iniciando Round ${currentRound.value}`)
  }
}

const addScore = (competitor, points) => {
  const competitorName = competitor === 'blue' 
    ? `${blueCompetitor.value?.firstName} ${blueCompetitor.value?.lastName}` 
    : `${redCompetitor.value?.firstName} ${redCompetitor.value?.lastName}`
  
  if (competitor === 'blue') {
    blueScore.value.total += points
    blueScore.value.round += points
  } else {
    redScore.value.total += points
    redScore.value.round += points
  }
  
  addToHistory('SCORE_ADDED', competitorName, `+${points} puntos`)
}

const addPenalty = (competitor, type) => {
  const competitorName = competitor === 'blue' 
    ? `${blueCompetitor.value?.firstName} ${blueCompetitor.value?.lastName}` 
    : `${redCompetitor.value?.firstName} ${redCompetitor.value?.lastName}`
  
  const penalty = {
    type,
    round: currentRound.value,
    timestamp: Date.now()
  }
  
  if (competitor === 'blue') {
    bluePenalties.value.push(penalty)
    if (type === 'gam-jeom') {
      // Gam-jeom da punto al oponente
      redScore.value.total += 1
      redScore.value.round += 1
    }
  } else {
    redPenalties.value.push(penalty)
    if (type === 'gam-jeom') {
      // Gam-jeom da punto al oponente
      blueScore.value.total += 1
      blueScore.value.round += 1
    }
  }
  
  addToHistory('PENALTY_ADDED', competitorName, type)
}

const addToHistory = (type, competitor, description) => {
  matchHistory.value.unshift({
    type,
    competitor,
    description,
    round: currentRound.value,
    timestamp: Date.now()
  })
}

const undoLastAction = () => {
  if (matchHistory.value.length > 0) {
    const lastAction = matchHistory.value.shift()
    addToHistory('UNDO', 'Sistema', `Deshecho: ${lastAction.description}`)
  }
}

const requestVideo = () => {
  addToHistory('VIDEO_REVIEW', 'Árbitro', 'Solicitud de revisión de video')
}

const medicalTimeout = () => {
  if (isTimerRunning.value) {
    toggleTimer()
  }
  addToHistory('MEDICAL_TIMEOUT', 'Árbitro', 'Time out médico solicitado')
}

const endMatch = () => {
  if (isTimerRunning.value) {
    toggleTimer()
  }
  showEndModal.value = true
}

const confirmEndMatch = async () => {
  try {
    // Determinar ganador
    let winnerId = null
    if (blueScore.value.total > redScore.value.total) {
      winnerId = blueCompetitor.value?.id
    } else if (redScore.value.total > blueScore.value.total) {
      winnerId = redCompetitor.value?.id
    }
    
    // Guardar resultado del match
    const matchResult = {
      blueScore: blueScore.value.total,
      redScore: redScore.value.total,
      winnerId,
      victoryType: victoryType.value,
      rounds: currentRound.value,
      bluePenalties: bluePenalties.value.length,
      redPenalties: redPenalties.value.length,
      history: matchHistory.value,
      status: 'COMPLETED'
    }
    
    await saveMatchResult(matchResult)
    
    // Regresar al sistema de gestión de partidas preservando filtros
    router.push({
      path: `/tournament-matches/${matchInfo.value?.tournamentId}`,
      query: {
        view: 'brackets',
        category: matchInfo.value?.categoryId,
        updated: Date.now() // Para forzar recarga
      }
    })
    
  } catch (error) {
    console.error('Error al finalizar combate:', error)
    alert('Error al guardar el resultado del combate')
  }
}

const saveMatch = async () => {
  try {
    const matchData = {
      blueScore: blueScore.value.total,
      redScore: redScore.value.total,
      currentRound: currentRound.value,
      matchTime: matchTime.value,
      history: matchHistory.value,
      status: 'IN_PROGRESS'
    }
    
    const response = await fetch(`${API_BASE}/api/matches/${matchId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    })
    
    if (response.ok) {
      addToHistory('MATCH_SAVED', 'Sistema', 'Combate guardado exitosamente')
    }
    
  } catch (error) {
    console.error('Error al guardar combate:', error)
    addToHistory('SAVE_ERROR', 'Sistema', 'Error al guardar combate')
  }
}

const saveMatchResult = async (result) => {
  // Mapear los datos al formato que espera el backend
  const payload = {
    winnerId: result.winnerId,
    score1: result.blueScore,
    score2: result.redScore,
    matchData: {
      rounds: [{
        score1: result.blueScore,
        score2: result.redScore,
        duration: 180 - matchTime.value, // tiempo transcurrido
        penalties1: bluePenalties.value || [],
        penalties2: redPenalties.value || []
      }],
      totalDuration: 180 - matchTime.value,
      endReason: result.victoryType || 'DECISION'
    }
  }

  const response = await fetch(`${API_BASE}/api/tournament-matches/${matchId.value}/finish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al guardar resultado')
  }
}

const loadMatchData = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/tournament-matches/${matchId.value}`)
    if (response.ok) {
      const data = await response.json()
      matchInfo.value = data.data
      
      // Los datos del backend vienen con competitor1 y competitor2
      blueCompetitor.value = data.data.competitor1
      redCompetitor.value = data.data.competitor2
      
      // Si el match no está en progreso, iniciarlo automáticamente
      if (data.data.status === 'SCHEDULED') {
        await startMatch()
      }
      
      // Cargar estado guardado si existe
      if (data.data.score1 !== undefined) {
        blueScore.value.total = data.data.score1 || 0
        redScore.value.total = data.data.score2 || 0
        
        // Si el match está en progreso, cargar datos de matchData si existe
        if (data.data.matchData) {
          const matchData = data.data.matchData
          if (matchData.rounds && matchData.rounds.length > 0) {
            const lastRound = matchData.rounds[matchData.rounds.length - 1]
            currentRound.value = matchData.rounds.length
            matchTime.value = 180 - (matchData.totalDuration || 0)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al cargar datos del combate:', error)
  }
}

const startMatch = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/tournament-matches/${matchId.value}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al iniciar el combate')
    }
  } catch (error) {
    console.error('Error al iniciar combate:', error)
    alert('Error al iniciar el combate: ' + error.message)
  }
}

const goBack = () => {
  if (isTimerRunning.value) {
    toggleTimer()
  }
  
  // Obtener parámetros de query de la URL actual para preservar filtros
  const queryParams = route.query
  const categoryId = queryParams.categoryId || matchInfo.value?.categoryId
  
  // Construir la URL de retorno con filtros preservados
  const returnUrl = `/tournament-matches/${matchInfo.value?.tournamentId}`
  const queryString = new URLSearchParams({
    ...(categoryId && { category: categoryId }),
    ...(queryParams.view && { view: queryParams.view }),
    ...(queryParams.status && { status: queryParams.status }),
    ...(queryParams.round && { round: queryParams.round }),
    updated: 'true' // Indicar que se actualizó algo
  }).toString()
  
  router.push(`${returnUrl}?${queryString}`)
}

// Lifecycle
onMounted(() => {
  loadMatchData()
})

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})

// Atajos de teclado
onMounted(() => {
  const handleKeyPress = (event) => {
    if (showEndModal.value) return
    
    switch(event.key.toLowerCase()) {
      case 'q':
        addScore('blue', 1)
        break
      case 'w':
        addScore('blue', 2)
        break
      case 'e':
        addScore('blue', 3)
        break
      case 'r':
        addScore('blue', 4)
        break
      case 'u':
        addScore('red', 1)
        break
      case 'i':
        addScore('red', 2)
        break
      case 'o':
        addScore('red', 3)
        break
      case 'p':
        addScore('red', 4)
        break
      case ' ':
        event.preventDefault()
        toggleTimer()
        break
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})
</script>