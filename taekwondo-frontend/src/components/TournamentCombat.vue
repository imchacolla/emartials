<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8">
    
    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6 mb-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <!-- Botón de retorno -->
          <button 
            @click="goBack"
            class="bg-gray-100/20 hover:bg-gray-100/30 text-white p-3 rounded-xl transition-colors duration-200 flex items-center gap-2 border border-white/20"
            title="Volver a combates del torneo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:block">Combates</span>
          </button>
          
          <div class="bg-gradient-to-r from-red-500 to-orange-600 p-3 rounded-xl">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Combate de Torneo</h1>
            <p class="text-white/70">{{ matchInfo?.tournament?.name || 'Torneo' }} - {{ matchInfo?.category?.name || 'Categoría' }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-2xl font-bold text-white">{{ formatTime(matchTime) }}</div>
            <div class="text-sm text-white/70">Round {{ currentRound }}/{{ totalRounds }}</div>
          </div>
          
          <!-- Indicador de Hardware -->
          <div class="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
            <div :class="[
              'w-3 h-3 rounded-full',
              isConnected ? 'bg-green-500' : 'bg-red-500'
            ]"></div>
            <span class="text-sm text-white/70">{{ isConnected ? 'Hardware Conectado' : 'Hardware Desconectado' }}</span>
          </div>
          
          <button 
            @click="toggleTimer"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              isTimerRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            ]"
          >
            {{ isTimerRunning ? '⏸️ Pausar' : '▶️ Iniciar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Marcador Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Competidor Rojo (IZQUIERDA) -->
      <div class="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-300/30">
        <div class="text-center">
          <div class="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">🔴</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">
            {{ redCompetitor?.firstName && redCompetitor?.lastName 
                ? `${redCompetitor.firstName} ${redCompetitor.lastName}` 
                : 'Competidor Rojo' }}
          </h2>
          <div class="text-sm text-white/70 mb-2">{{ redCompetitor?.club?.name || 'Club no asignado' }}</div>
          <div class="text-5xl font-bold text-red-300 mb-4">{{ redScore.total }}</div>
          
          <!-- Controles Rojo -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button @click="addPoints('red', 1)" class="bg-red-600/70 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +1
            </button>
            <button @click="addPoints('red', 2)" class="bg-red-600/70 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +2
            </button>
            <button @click="addPoints('red', 3)" class="bg-red-600/70 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +3
            </button>
            <button @click="addPoints('red', 4)" class="bg-red-600/70 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +4
            </button>
          </div>
          
          <!-- Penalizaciones Rojo -->
          <div class="mb-4">
            <button @click="addPenalty('red')" class="bg-yellow-600/70 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200 mr-2">
              +Penalty
            </button>
            <button @click="removePenalty('red')" class="bg-gray-600/70 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200">
              -Penalty
            </button>
          </div>
          
          <!-- Faltas Rojo -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="text-white/70 text-sm mb-2">FALTAS</div>
            <div class="flex justify-center gap-1 mb-2">
              <div 
                v-for="n in 10" 
                :key="n"
                :class="[
                  'w-3 h-3 rounded-full border',
                  n <= redPenalties.length 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="text-red-300 text-lg font-bold">{{ redPenalties.length }}</div>
          </div>
        </div>
      </div>

      <!-- Panel Central -->
      <div class="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div class="text-center">
          <div class="text-4xl font-bold text-white mb-4">VS</div>
          
          <!-- Controles de Match -->
          <div class="space-y-4">
            <button 
              @click="resetRound"
              class="w-full bg-yellow-500/80 hover:bg-yellow-500 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200"
            >
              🔄 Reset Round
            </button>
            
            <button 
              @click="nextRound"
              class="w-full bg-blue-500/80 hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200"
              :disabled="currentRound >= totalRounds"
            >
              ➡️ Siguiente Round
            </button>
            
            <button 
              @click="undoLastAction"
              class="w-full bg-purple-500/80 hover:bg-purple-500 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200"
            >
              ↩️ Deshacer
            </button>
            
            <button 
              @click="endMatch"
              class="w-full bg-orange-500/80 hover:bg-orange-500 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200"
            >
              🏁 Finalizar Combate
            </button>
          </div>
          
          <!-- Winner Display -->
          <div v-if="winner" class="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-300/30">
            <div class="text-yellow-300 font-bold text-lg">🏆 GANADOR</div>
            <div class="text-white text-xl font-bold">{{ winner.name }}</div>
          </div>
        </div>
      </div>

      <!-- Competidor Azul (DERECHA) -->
      <div class="bg-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-300/30">
        <div class="text-center">
          <div class="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">🔵</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">
            {{ blueCompetitor?.firstName && blueCompetitor?.lastName 
                ? `${blueCompetitor.firstName} ${blueCompetitor.lastName}` 
                : 'Competidor Azul' }}
          </h2>
          <div class="text-sm text-white/70 mb-2">{{ blueCompetitor?.club?.name || 'Club no asignado' }}</div>
          <div class="text-5xl font-bold text-blue-300 mb-4">{{ blueScore.total }}</div>
          
          <!-- Controles Azul -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button @click="addPoints('blue', 1)" class="bg-blue-600/70 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +1
            </button>
            <button @click="addPoints('blue', 2)" class="bg-blue-600/70 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +2
            </button>
            <button @click="addPoints('blue', 3)" class="bg-blue-600/70 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +3
            </button>
            <button @click="addPoints('blue', 4)" class="bg-blue-600/70 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200">
              +4
            </button>
          </div>
          
          <!-- Penalizaciones Azul -->
          <div class="mb-4">
            <button @click="addPenalty('blue')" class="bg-yellow-600/70 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200 mr-2">
              +Penalty
            </button>
            <button @click="removePenalty('blue')" class="bg-gray-600/70 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200">
              -Penalty
            </button>
          </div>
          
          <!-- Faltas Azul -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="text-white/70 text-sm mb-2">FALTAS</div>
            <div class="flex justify-center gap-1 mb-2">
              <div 
                v-for="n in 10" 
                :key="n"
                :class="[
                  'w-3 h-3 rounded-full border',
                  n <= bluePenalties.length 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="text-blue-300 text-lg font-bold">{{ bluePenalties.length }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de Información -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Historial -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">📝 Historial del Combate</h3>
          
          <!-- Último evento de hardware -->
          <div v-if="lastButtonPress" class="bg-blue-500/20 rounded-lg p-3 mb-3 border border-blue-300/30">
            <div class="text-blue-300 text-sm font-semibold mb-1">🎯 Último Hardware:</div>
            <div class="text-white text-sm">{{ lastButtonPress }}</div>
          </div>
          
          <div class="bg-black/30 rounded-lg p-4 h-32 overflow-y-auto">
            <div v-for="(event, index) in matchHistory" :key="index" class="text-white/80 text-sm mb-1">
              {{ event }}
            </div>
          </div>
        </div>
        
        <!-- Estadísticas -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">📊 Estadísticas</h3>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-red-500/20 rounded-lg p-3 text-center">
              <div class="text-red-300 font-bold">
                {{ redCompetitor?.firstName && redCompetitor?.lastName 
                    ? `${redCompetitor.firstName} ${redCompetitor.lastName}` 
                    : 'Competidor Rojo' }}
              </div>
              <div class="text-white text-2xl font-bold">{{ redScore.total }}</div>
              <div class="text-white/70 text-sm">{{ redPenalties.length }} faltas</div>
            </div>
            <div class="bg-blue-500/20 rounded-lg p-3 text-center">
              <div class="text-blue-300 font-bold">
                {{ blueCompetitor?.firstName && blueCompetitor?.lastName 
                    ? `${blueCompetitor.firstName} ${blueCompetitor.lastName}` 
                    : 'Competidor Azul' }}
              </div>
              <div class="text-white text-2xl font-bold">{{ blueScore.total }}</div>
              <div class="text-white/70 text-sm">{{ bluePenalties.length }} faltas</div>
            </div>
          </div>
          
          <!-- Estado de Jueces (Debug) -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="text-white/70 text-sm mb-2">Estado de Jueces:</div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div class="text-red-300 font-bold mb-1">ROJO:</div>
                <div v-for="technique in redTechniques" :key="'red-' + technique.name" class="mb-1">
                  <span class="text-white/60">{{ technique.name }}:</span>
                  <span v-for="judge in technique.judges" :key="judge.judgeNumber" 
                        :class="['ml-1 w-2 h-2 inline-block rounded-full', judge.pressed ? 'bg-green-400' : 'bg-gray-600']">
                  </span>
                </div>
              </div>
              <div>
                <div class="text-blue-300 font-bold mb-1">AZUL:</div>
                <div v-for="technique in blueTechniques" :key="'blue-' + technique.name" class="mb-1">
                  <span class="text-white/60">{{ technique.name }}:</span>
                  <span v-for="judge in technique.judges" :key="judge.judgeNumber" 
                        :class="['ml-1 w-2 h-2 inline-block rounded-full', judge.pressed ? 'bg-green-400' : 'bg-gray-600']">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Finalización -->
    <div v-if="showEndModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">🏁 Finalizar Combate</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Tipo de Victoria:</label>
          <select v-model="victoryType" class="w-full border rounded-lg px-3 py-2">
            <option value="points">Por Puntos</option>
            <option value="knockout">Por Knockout</option>
            <option value="technical">Técnica</option>
            <option value="disqualification">Por Descalificación</option>
          </select>
        </div>
        
        <div class="flex gap-3">
          <button @click="showEndModal = false" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button @click="saveMatchResult" class="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg">
            Guardar Resultado
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { io } from 'socket.io-client'

export default {
  name: 'TournamentCombat',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    // Datos del match
    const matchId = ref(route.params.id)
    const matchInfo = ref(null)
    const redCompetitor = ref(null)
    const blueCompetitor = ref(null)
    
    // Estado del combate
    const isTimerRunning = ref(false)
    const matchTime = ref(120) // 2 minutos
    const currentRound = ref(1)
    const totalRounds = ref(3)
    
    // Puntuaciones
    const redScore = ref({ total: 0, round: 0 })
    const blueScore = ref({ total: 0, round: 0 })
    const redPenalties = ref([])
    const bluePenalties = ref([])
    
    // Historial y controles
    const matchHistory = ref([])
    const actionHistory = ref([])
    const showEndModal = ref(false)
    const victoryType = ref('points')
    
    // Hardware y Socket
    const isConnected = ref(false)
    const lastButtonPress = ref('')
    let socket = null
    
    // Sistema de técnicas para consenso de jueces (2 de 3)
    const blueTechniques = ref([
      { 
        name: 'cabeza', 
        points: 3, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'giro', 
        points: 4, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'puno', 
        points: 1, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'cuerpo', 
        points: 2, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      }
    ])
    
    const redTechniques = ref([
      { 
        name: 'cabeza', 
        points: 3, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'giro', 
        points: 4, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'puno', 
        points: 1, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      },
      { 
        name: 'cuerpo', 
        points: 2, 
        judges: [
          { judgeNumber: 1, pressed: false },
          { judgeNumber: 2, pressed: false },
          { judgeNumber: 3, pressed: false }
        ]
      }
    ])
    
    // Timer
    let timerInterval = null
    
    // Computed
    const winner = computed(() => {
      if (redScore.value.total > blueScore.value.total) {
        return { name: `${redCompetitor.value?.firstName} ${redCompetitor.value?.lastName}`, color: 'red' }
      } else if (blueScore.value.total > redScore.value.total) {
        return { name: `${blueCompetitor.value?.firstName} ${blueCompetitor.value?.lastName}`, color: 'blue' }
      }
      return null
    })
    
    // Métodos
    const loadMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tournament-matches/${matchId.value}`)
        if (!response.ok) throw new Error('Error al cargar datos del match')
        
        const data = await response.json()
        console.log('Match data loaded:', data) // Debug log
        
        matchInfo.value = data
        
        // Asignar competidores con fallback a registraciones
        redCompetitor.value = data.redCompetitor || data.redRegistration?.competitor || null
        blueCompetitor.value = data.blueCompetitor || data.blueRegistration?.competitor || null
        
        console.log('Red competitor:', redCompetitor.value) // Debug log
        console.log('Blue competitor:', blueCompetitor.value) // Debug log
        
        addToHistory(`Combate iniciado: ${redCompetitor.value?.firstName || 'Rojo'} vs ${blueCompetitor.value?.firstName || 'Azul'}`)
      } catch (error) {
        console.error('Error:', error)
        addToHistory('Error al cargar datos del combate')
      }
    }
    
    const toggleTimer = () => {
      if (isTimerRunning.value) {
        clearInterval(timerInterval)
        addToHistory('Timer pausado')
      } else {
        timerInterval = setInterval(() => {
          if (matchTime.value > 0) {
            matchTime.value--
          } else {
            clearInterval(timerInterval)
            isTimerRunning.value = false
            addToHistory('Tiempo agotado')
            nextRound()
          }
        }, 1000)
        addToHistory('Timer iniciado')
      }
      isTimerRunning.value = !isTimerRunning.value
    }
    
    const addPoints = (competitor, points) => {
      const action = {
        type: 'score',
        competitor,
        points,
        round: currentRound.value,
        timestamp: Date.now()
      }
      
      if (competitor === 'red') {
        redScore.value.total += points
        redScore.value.round += points
      } else {
        blueScore.value.total += points
        blueScore.value.round += points
      }
      
      actionHistory.value.push(action)
      addToHistory(`${competitor === 'red' ? 'Rojo' : 'Azul'} +${points} punto${points > 1 ? 's' : ''}`)
    }
    
    const addPenalty = (competitor) => {
      const action = {
        type: 'penalty',
        competitor,
        round: currentRound.value,
        timestamp: Date.now()
      }
      
      if (competitor === 'red') {
        redPenalties.value.push(Date.now())
      } else {
        bluePenalties.value.push(Date.now())
      }
      
      actionHistory.value.push(action)
      addToHistory(`${competitor === 'red' ? 'Rojo' : 'Azul'} recibe penalización`)
    }
    
    const removePenalty = (competitor) => {
      if (competitor === 'red' && redPenalties.value.length > 0) {
        redPenalties.value.pop()
        addToHistory(`Penalización removida - Rojo`)
      } else if (competitor === 'blue' && bluePenalties.value.length > 0) {
        bluePenalties.value.pop()
        addToHistory(`Penalización removida - Azul`)
      }
    }
    
    const resetRound = () => {
      matchTime.value = 120
      redScore.value.round = 0
      blueScore.value.round = 0
      isTimerRunning.value = false
      clearInterval(timerInterval)
      
      // Reset estado de técnicas de todos los jueces
      blueTechniques.value.forEach(technique => {
        technique.judges.forEach(judge => judge.pressed = false)
      })
      redTechniques.value.forEach(technique => {
        technique.judges.forEach(judge => judge.pressed = false)
      })
      
      addToHistory(`Round ${currentRound.value} reiniciado`)
    }
    
    const nextRound = () => {
      if (currentRound.value < totalRounds.value) {
        currentRound.value++
        resetRound()
        addToHistory(`Iniciando Round ${currentRound.value}`)
      }
    }
    
    const undoLastAction = () => {
      if (actionHistory.value.length === 0) return
      
      const lastAction = actionHistory.value.pop()
      
      if (lastAction.type === 'score') {
        if (lastAction.competitor === 'red') {
          redScore.value.total -= lastAction.points
          redScore.value.round -= lastAction.points
        } else {
          blueScore.value.total -= lastAction.points
          blueScore.value.round -= lastAction.points
        }
      } else if (lastAction.type === 'penalty') {
        if (lastAction.competitor === 'red') {
          redPenalties.value.pop()
        } else {
          bluePenalties.value.pop()
        }
      }
      
      addToHistory('Última acción deshecha')
    }
    
    const endMatch = () => {
      showEndModal.value = true
    }
    
    const saveMatchResult = async () => {
      try {
        const winnerData = winner.value ? {
          winnerId: winner.value.color === 'red' ? redCompetitor.value?.id : blueCompetitor.value?.id,
          victorType: victoryType.value
        } : null
        
        const matchResult = {
          redScore: redScore.value.total,
          blueScore: blueScore.value.total,
          redPenalties: redPenalties.value.length,
          bluePenalties: bluePenalties.value.length,
          duration: currentRound.value,
          ...winnerData
        }
        
        const response = await fetch(`http://localhost:3001/api/tournament-matches/${matchId.value}/finish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(matchResult)
        })
        
        if (!response.ok) {
          throw new Error('Error al guardar el resultado del combate')
        }
        
        addToHistory('Combate finalizado y guardado')
        showEndModal.value = false
        
        // Esperar un momento y luego volver
        setTimeout(() => {
          goBack()
        }, 2000)
        
      } catch (error) {
        console.error('Error al guardar resultado:', error)
        alert('Error al guardar el resultado del combate')
      }
    }
    
    const goBack = () => {
      const categoryId = route.query.categoryId
      const view = route.query.view || 'bracket'
      
      if (categoryId) {
        router.push({
          path: `/tournament-matches/${route.query.tournamentId || '1'}`,
          query: { categoryId, view }
        })
      } else {
        router.push(`/tournament-matches/${route.query.tournamentId || '1'}`)
      }
    }
    
    const addToHistory = (event) => {
      const timestamp = new Date().toLocaleTimeString()
      matchHistory.value.unshift(`[${timestamp}] ${event}`)
      if (matchHistory.value.length > 50) {
        matchHistory.value.pop()
      }
    }
    
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
    
    // Sistema de Hardware USB - Mapeo de botones del sistema DAEDO (valores reales)
    const buttonMap = {
      // Juez 1 (193-207) - Competidor Azul
      199: { competitor: 'blue', points: 3, technique: 'cabeza', judgeNumber: 1, value: 199, hex: '0xC7' },
      195: { competitor: 'blue', points: 4, technique: 'giro', judgeNumber: 1, value: 195, hex: '0xC3' },
      207: { competitor: 'blue', points: 1, technique: 'puno', judgeNumber: 1, value: 207, hex: '0xCF' },
      203: { competitor: 'blue', points: 2, technique: 'cuerpo', judgeNumber: 1, value: 203, hex: '0xCB' },
      
      // Juez 1 (193-207) - Competidor Rojo
      197: { competitor: 'red', points: 3, technique: 'cabeza', judgeNumber: 1, value: 197, hex: '0xC5' },
      193: { competitor: 'red', points: 4, technique: 'giro', judgeNumber: 1, value: 193, hex: '0xC1' },
      201: { competitor: 'red', points: 1, technique: 'puno', judgeNumber: 1, value: 201, hex: '0xC9' },
      205: { competitor: 'red', points: 2, technique: 'cuerpo', judgeNumber: 1, value: 205, hex: '0xCD' },
      
      // Juez 2 (209-223) - Competidor Azul
      215: { competitor: 'blue', points: 3, technique: 'cabeza', judgeNumber: 2, value: 215, hex: '0xD7' },
      211: { competitor: 'blue', points: 4, technique: 'giro', judgeNumber: 2, value: 211, hex: '0xD3' },
      223: { competitor: 'blue', points: 1, technique: 'puno', judgeNumber: 2, value: 223, hex: '0xDF' },
      219: { competitor: 'blue', points: 2, technique: 'cuerpo', judgeNumber: 2, value: 219, hex: '0xDB' },
      
      // Juez 2 (209-223) - Competidor Rojo
      213: { competitor: 'red', points: 3, technique: 'cabeza', judgeNumber: 2, value: 213, hex: '0xD5' },
      209: { competitor: 'red', points: 4, technique: 'giro', judgeNumber: 2, value: 209, hex: '0xD1' },
      217: { competitor: 'red', points: 1, technique: 'puno', judgeNumber: 2, value: 217, hex: '0xD9' },
      221: { competitor: 'red', points: 2, technique: 'cuerpo', judgeNumber: 2, value: 221, hex: '0xDD' },
      
      // Juez 3 (225-235) - Competidor Azul
      231: { competitor: 'blue', points: 3, technique: 'cabeza', judgeNumber: 3, value: 231, hex: '0xE7' },
      227: { competitor: 'blue', points: 4, technique: 'giro', judgeNumber: 3, value: 227, hex: '0xE3' },
      235: { competitor: 'blue', points: 1, technique: 'puno', judgeNumber: 3, value: 235, hex: '0xEB' },
      239: { competitor: 'blue', points: 2, technique: 'cuerpo', judgeNumber: 3, value: 239, hex: '0xEF' },
      
      // Juez 3 (225-235) - Competidor Rojo
      229: { competitor: 'red', points: 3, technique: 'cabeza', judgeNumber: 3, value: 229, hex: '0xE5' },
      225: { competitor: 'red', points: 4, technique: 'giro', judgeNumber: 3, value: 225, hex: '0xE1' },
      233: { competitor: 'red', points: 1, technique: 'puno', judgeNumber: 3, value: 233, hex: '0xE9' },
      237: { competitor: 'red', points: 2, technique: 'cuerpo', judgeNumber: 3, value: 237, hex: '0xED' }
    }
    
    const findButtonByValue = (value) => {
      return buttonMap[value] || null
    }
    
    const processButtonEvent = (value) => {
      const button = findButtonByValue(value)
      if (!button) {
        console.warn('Botón no encontrado para valor:', value)
        addToHistory(`❌ Botón desconocido: ${value}`)
        return
      }
      
      // Registrar el evento del botón
      lastButtonPress.value = `Juez ${button.judgeNumber} - ${button.competitor.toUpperCase()} ${button.technique} (${button.points}pts)`
      
      // Actualizar estado de técnica para consenso de jueces
      const techniques = button.competitor === 'blue' ? blueTechniques.value : redTechniques.value
      const technique = techniques.find(t => t.name === button.technique)
      
      if (technique) {
        const judge = technique.judges.find(j => j.judgeNumber === button.judgeNumber)
        if (judge) {
          judge.pressed = true
          
          // Reset después de 2 segundos si no hay consenso
          setTimeout(() => {
            judge.pressed = false
          }, 2000)
        }
        
        // Verificar si la mayoría de jueces han presionado (2 de 3)
        const pressedJudges = technique.judges.filter(j => j.pressed).length
        
        if (pressedJudges >= 2) {
          // Otorgar puntos cuando hay consenso
          addPoints(button.competitor, button.points)
          
          addToHistory(`� ${button.competitor.toUpperCase()} ${button.technique} - ${button.points} puntos otorgados (${pressedJudges}/3 jueces)`)
          
          // Reset todos los jueces para esta técnica
          technique.judges.forEach(j => j.pressed = false)
        } else {
          // Solo registrar el voto individual
          addToHistory(`🎯 Juez ${button.judgeNumber}: ${button.competitor.toUpperCase()} ${button.technique} (${pressedJudges}/3 jueces)`)
        }
      }
      
      console.log('Evento de hardware procesado:', button)
    }
    
    // Conexión WebSocket
    const connectSocket = () => {
      try {
        socket = io('http://localhost:3000', {
          transports: ['websocket', 'polling']
        })
        
        socket.on('connect', () => {
          isConnected.value = true
          addToHistory('🔌 Hardware conectado')
          console.log('Socket.IO conectado')
        })
        
        socket.on('disconnect', () => {
          isConnected.value = false
          addToHistory('🔌 Hardware desconectado')
          console.log('Socket.IO desconectado')
        })
        
        socket.on('hardware_event', (data) => {
          console.log('Evento de hardware recibido:', data)
          if (data && data.value) {
            processButtonEvent(data.value)
          }
        })
        
        socket.on('connect_error', (error) => {
          console.error('Error de conexión Socket.IO:', error)
          isConnected.value = false
          addToHistory('❌ Error de conexión hardware')
        })
        
      } catch (error) {
        console.error('Error inicializando Socket.IO:', error)
        isConnected.value = false
        addToHistory('❌ Error al inicializar hardware')
      }
    }
    
    // Lifecycle
    onMounted(() => {
      loadMatchData()
      connectSocket()
      addToHistory('🚀 Sistema de combate de torneo iniciado')
    })
    
    onUnmounted(() => {
      if (socket) {
        socket.disconnect()
      }
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    })
    
    return {
      matchInfo,
      redCompetitor,
      blueCompetitor,
      isTimerRunning,
      matchTime,
      currentRound,
      totalRounds,
      redScore,
      blueScore,
      redPenalties,
      bluePenalties,
      matchHistory,
      showEndModal,
      victoryType,
      winner,
      isConnected,
      lastButtonPress,
      blueTechniques,
      redTechniques,
      toggleTimer,
      addPoints,
      addPenalty,
      removePenalty,
      resetRound,
      nextRound,
      undoLastAction,
      endMatch,
      saveMatchResult,
      goBack,
      formatTime
    }
  }
}
</script>