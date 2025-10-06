<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4">
    <!-- Header -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h1 class="text-2xl font-bold text-white flex items-center gap-2">
        🥋 Sistema WT - World Taekwondo Scoring
      </h1>
      <p class="text-blue-100 mt-2">
        Sistema oficial de puntuación con consenso de jueces
      </p>
    </div>

    <!-- Match Selection -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Seleccionar Combate</h2>
      <div class="flex gap-4">
        <select 
          v-model="selectedMatchId" 
          class="bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30"
          @change="loadMatch"
        >
          <option value="">Seleccionar combate...</option>
          <option v-for="match in matches" :key="match.id" :value="match.id">
            Combate {{ match.id }} - {{ match.blueCompetitor?.name || 'Azul' }} vs {{ match.redCompetitor?.name || 'Rojo' }}
          </option>
        </select>
        
        <button 
          @click="startMonitoring"
          :disabled="!selectedMatchId || isMonitoring"
          class="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium"
        >
          {{ isMonitoring ? 'Monitoreando...' : 'Iniciar Monitoreo' }}
        </button>
        
        <button 
          @click="stopMonitoring"
          :disabled="!isMonitoring"
          class="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium"
        >
          Detener Monitoreo
        </button>
      </div>
    </div>

    <!-- Current Match Display -->
    <div v-if="currentMatch" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Blue Competitor -->
      <div class="bg-blue-600/80 backdrop-blur-sm rounded-lg p-6">
        <h3 class="text-2xl font-bold text-white mb-4 text-center">
          🔵 {{ currentMatch.blueCompetitor?.name || 'AZUL' }}
        </h3>
        <div class="text-center">
          <div class="text-6xl font-bold text-white mb-2">{{ scores.blue }}</div>
          <div class="text-blue-100">Puntos</div>
        </div>
        
        <!-- Blue Penalties -->
        <div class="mt-4">
          <h4 class="text-white font-semibold mb-2">Gam-jeom (Penalizaciones)</h4>
          <div class="flex gap-1">
            <div 
              v-for="penalty in penalties.blue" 
              :key="penalty.id"
              class="w-4 h-4 bg-yellow-400 rounded-full"
              :title="penalty.reason"
            ></div>
          </div>
        </div>
      </div>

      <!-- Red Competitor -->
      <div class="bg-red-600/80 backdrop-blur-sm rounded-lg p-6">
        <h3 class="text-2xl font-bold text-white mb-4 text-center">
          🔴 {{ currentMatch.redCompetitor?.name || 'ROJO' }}
        </h3>
        <div class="text-center">
          <div class="text-6xl font-bold text-white mb-2">{{ scores.red }}</div>
          <div class="text-red-100">Puntos</div>
        </div>
        
        <!-- Red Penalties -->
        <div class="mt-4">
          <h4 class="text-white font-semibold mb-2">Gam-jeom (Penalizaciones)</h4>
          <div class="flex gap-1">
            <div 
              v-for="penalty in penalties.red" 
              :key="penalty.id"
              class="w-4 h-4 bg-yellow-400 rounded-full"
              :title="penalty.reason"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Judge Buttons Panel -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">Panel de Jueces</h3>
      
      <!-- Judge 1 -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-3">Juez 1</h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-blue-100 text-sm mb-2">AZUL</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x11')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x12')"
                class="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
          <div>
            <p class="text-red-100 text-sm mb-2">ROJO</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x13')"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x14')"
                class="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Judge 2 -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-3">Juez 2</h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-blue-100 text-sm mb-2">AZUL</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x21')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x22')"
                class="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
          <div>
            <p class="text-red-100 text-sm mb-2">ROJO</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x23')"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x24')"
                class="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Judge 3 -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-3">Juez 3</h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-blue-100 text-sm mb-2">AZUL</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x31')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x32')"
                class="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
          <div>
            <p class="text-red-100 text-sm mb-2">ROJO</p>
            <div class="flex gap-2">
              <button 
                @click="simulateButtonPress('0x33')"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
              >
                Cabeza (3pts)
              </button>
              <button 
                @click="simulateButtonPress('0x34')"
                class="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded font-medium"
              >
                Cuerpo (2pts)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Penalty Panel -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">Panel de Penalizaciones</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h4 class="text-blue-100 mb-3">Penalización para AZUL</h4>
          <div class="flex gap-2">
            <select v-model="penaltyReason" class="bg-white/20 text-white rounded px-3 py-2 border border-white/30">
              <option value="stepping_out">Salir del área</option>
              <option value="illegal_technique">Técnica ilegal</option>
              <option value="excessive_contact">Contacto excesivo</option>
              <option value="unsporting_conduct">Conducta antideportiva</option>
            </select>
            <button 
              @click="addPenalty('BLUE')"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium"
            >
              Gam-jeom
            </button>
          </div>
        </div>
        <div>
          <h4 class="text-red-100 mb-3">Penalización para ROJO</h4>
          <div class="flex gap-2">
            <select v-model="penaltyReason" class="bg-white/20 text-white rounded px-3 py-2 border border-white/30">
              <option value="stepping_out">Salir del área</option>
              <option value="illegal_technique">Técnica ilegal</option>
              <option value="excessive_contact">Contacto excesivo</option>
              <option value="unsporting_conduct">Conducta antideportiva</option>
            </select>
            <button 
              @click="addPenalty('RED')"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium"
            >
              Gam-jeom
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Log -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-4">Log de Actividad</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div 
          v-for="event in recentEvents" 
          :key="event.id"
          class="bg-white/10 rounded px-3 py-2 text-sm text-white"
        >
          <span class="text-gray-300">{{ formatTime(event.timestamp) }}</span>
          - {{ event.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

export default {
  name: 'WTScoringSystem',
  setup() {
    // Reactive data
    const socket = ref(null)
    const matches = ref([])
    const selectedMatchId = ref('')
    const currentMatch = ref(null)
    const isMonitoring = ref(false)
    const scores = ref({ blue: 0, red: 0 })
    const penalties = ref({ blue: [], red: [] })
    const recentEvents = ref([])
    const penaltyReason = ref('stepping_out')

    // API Base URL
    const API_BASE = 'http://localhost:3000/api'

    // Initialize socket connection
    const initSocket = () => {
      socket.value = io('http://localhost:3000')
      
      // Listen for WT events
      socket.value.on('judgeButtonPress', (data) => {
        addEvent(`Juez presionó botón: ${data.hexValue} - ${data.competitor} ${data.technique}`)
      })
      
      socket.value.on('consensusReached', (data) => {
        addEvent(`¡CONSENSO! ${data.competitor} - ${data.technique} (${data.points} puntos)`)
        updateScore(data.competitor, data.points)
      })
      
      socket.value.on('penaltyAdded', (data) => {
        addEvent(`Gam-jeom para ${data.competitor}: ${data.reason}`)
        addPenaltyToList(data.competitor, data)
      })
      
      socket.value.on('consensusAnnulled', (data) => {
        addEvent(`Consenso anulado: ${data.competitor} (${data.points} puntos)`)
      })
    }

    // Load matches
    const loadMatches = async () => {
      try {
        const response = await fetch(`${API_BASE}/matches`)
        const data = await response.json()
        matches.value = data.matches || []
      } catch (error) {
        console.error('Error loading matches:', error)
      }
    }

    // Load specific match
    const loadMatch = async () => {
      if (!selectedMatchId.value) return
      
      try {
        const response = await fetch(`${API_BASE}/matches/${selectedMatchId.value}`)
        const data = await response.json()
        currentMatch.value = data
        
        // Reset scores and penalties
        scores.value = { blue: 0, red: 0 }
        penalties.value = { blue: [], red: [] }
        
        // Load statistics
        loadMatchStatistics()
      } catch (error) {
        console.error('Error loading match:', error)
      }
    }

    // Load match statistics
    const loadMatchStatistics = async () => {
      if (!selectedMatchId.value) return
      
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${selectedMatchId.value}/statistics`)
        const data = await response.json()
        
        if (data.success) {
          // Update scores and penalties from statistics
          const stats = data.data
          scores.value = {
            blue: stats.totalScore?.BLUE || 0,
            red: stats.totalScore?.RED || 0
          }
          
          penalties.value = {
            blue: stats.penalties?.filter(p => p.competitor === 'BLUE') || [],
            red: stats.penalties?.filter(p => p.competitor === 'RED') || []
          }
        }
      } catch (error) {
        console.error('Error loading statistics:', error)
      }
    }

    // Start monitoring
    const startMonitoring = async () => {
      if (!selectedMatchId.value) return
      
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${selectedMatchId.value}/start-monitoring`, {
          method: 'POST'
        })
        const data = await response.json()
        
        if (data.success) {
          isMonitoring.value = true
          addEvent('Monitoreo de consenso iniciado')
        }
      } catch (error) {
        console.error('Error starting monitoring:', error)
      }
    }

    // Stop monitoring
    const stopMonitoring = async () => {
      if (!selectedMatchId.value) return
      
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${selectedMatchId.value}/stop-monitoring`, {
          method: 'POST'
        })
        const data = await response.json()
        
        if (data.success) {
          isMonitoring.value = false
          addEvent('Monitoreo de consenso detenido')
        }
      } catch (error) {
        console.error('Error stopping monitoring:', error)
      }
    }

    // Simulate button press
    const simulateButtonPress = async (hexValue) => {
      if (!selectedMatchId.value || !isMonitoring.value) return
      
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${selectedMatchId.value}/button-press`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hexValue })
        })
        
        const data = await response.json()
        if (data.success) {
          addEvent(`Botón simulado: ${hexValue}`)
        }
      } catch (error) {
        console.error('Error simulating button press:', error)
      }
    }

    // Add penalty
    const addPenalty = async (competitor) => {
      if (!selectedMatchId.value) return
      
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${selectedMatchId.value}/penalty`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            competitor,
            reason: penaltyReason.value,
            awardedBy: 'referee'
          })
        })
        
        const data = await response.json()
        if (data.success) {
          addEvent(`Gam-jeom agregado para ${competitor}`)
          // Award point to opponent
          const opponent = competitor === 'BLUE' ? 'red' : 'blue'
          scores.value[opponent]++
        }
      } catch (error) {
        console.error('Error adding penalty:', error)
      }
    }

    // Helper functions
    const addEvent = (message) => {
      recentEvents.value.unshift({
        id: Date.now(),
        message,
        timestamp: new Date()
      })
      
      // Keep only last 50 events
      if (recentEvents.value.length > 50) {
        recentEvents.value = recentEvents.value.slice(0, 50)
      }
    }

    const updateScore = (competitor, points) => {
      const color = competitor === 'BLUE' ? 'blue' : 'red'
      scores.value[color] += points
    }

    const addPenaltyToList = (competitor, penalty) => {
      const color = competitor === 'BLUE' ? 'blue' : 'red'
      penalties.value[color].push(penalty)
      
      // Award point to opponent
      const opponent = color === 'blue' ? 'red' : 'blue'
      scores.value[opponent]++
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString()
    }

    // Lifecycle
    onMounted(() => {
      initSocket()
      loadMatches()
    })

    onUnmounted(() => {
      if (socket.value) {
        socket.value.disconnect()
      }
    })

    return {
      matches,
      selectedMatchId,
      currentMatch,
      isMonitoring,
      scores,
      penalties,
      recentEvents,
      penaltyReason,
      loadMatch,
      startMonitoring,
      stopMonitoring,
      simulateButtonPress,
      addPenalty,
      formatTime
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for activity log */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>