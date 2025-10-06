<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Sistema de Combate DAEDO</h1>
          <p class="text-gray-600 mt-2">Gestión profesional con sistema de 3 jueces integrado</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div :class="['w-3 h-3 rounded-full', isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></div>
            <span class="text-sm text-gray-600">
              {{ isConnected ? 'Conectado' : 'Desconectado' }}
            </span>
          </div>
          <Button @click="showJudgeConfig = !showJudgeConfig" variant="outline" size="sm">
            ⚙️ Configurar Jueces
          </Button>
          <Button @click="$router.push('/')" variant="outline">
            ← Volver al Menú
          </Button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
      <!-- Panel de Configuración de Jueces (Condicional) -->
      <div v-if="showJudgeConfig" class="xl:col-span-4 mb-6">
        <JudgeConfigurationNew @configuration-saved="onJudgeConfigSaved" />
      </div>

      <!-- Panel Principal de Combate - Columna 1-2 -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Configuración de Jueces (solo si no hay combate activo) -->
        <JudgeConfiguration 
          v-if="!currentMatch" 
          :onConfigurationSaved="onJudgeConfigurationSaved"
        />

        <!-- Configuración de Combate -->
        <Card v-if="!currentMatch">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              Nuevo Combate
            </CardTitle>
            <CardDescription>Configurar y iniciar un nuevo combate</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="startMatch" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Competidor Azul
                </label>
                <select 
                  v-model="matchConfig.blueCompetitorId" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar competidor</option>
                  <option v-for="competitor in competitors" :key="competitor.id" :value="competitor.id">
                    {{ competitor.firstName }} {{ competitor.lastName }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Competidor Rojo
                </label>
                <select 
                  v-model="matchConfig.redCompetitorId" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar competidor</option>
                  <option v-for="competitor in competitors" :key="competitor.id" :value="competitor.id">
                    {{ competitor.firstName }} {{ competitor.lastName }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Duración del Round (segundos)
                </label>
                <input 
                  v-model="matchConfig.roundDuration" 
                  type="number" 
                  min="60" 
                  max="600" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Número de Rounds
                </label>
                <select 
                  v-model="matchConfig.numberOfRounds" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 Round</option>
                  <option value="2">2 Rounds</option>
                  <option value="3">3 Rounds</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <Button type="submit" class="w-full" :disabled="!canStartMatch">
                  🥋 Iniciar Combate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <!-- Combate Activo -->
        <Card v-if="currentMatch">
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Combate en Curso - ID: {{ currentMatch.id }}
              </div>
              <div class="flex gap-2">
                <Button 
                  @click="pauseMatch" 
                  variant="outline" 
                  size="sm"
                  :disabled="currentMatch.status !== 'IN_PROGRESS'"
                >
                  {{ currentMatch.status === 'PAUSED' ? '▶️ Reanudar' : '⏸️ Pausar' }}
                </Button>
                <Button @click="endMatch" variant="destructive" size="sm">
                  🛑 Finalizar
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <!-- Información del Combate -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Competidor Azul -->
              <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h3 class="text-lg font-semibold text-blue-900 mb-2">Competidor AZUL</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">{{ currentMatch.blueScore }} pts</div>
                <div class="text-sm text-blue-700 space-y-1">
                  <div>Golpes: {{ currentMatch.blueHits }}</div>
                  <div>Penalizaciones: {{ currentMatch.bluePenalties }}</div>
                  <div>Última técnica: {{ currentMatch.lastBlueTechnique || 'N/A' }}</div>
                </div>
              </div>

              <!-- Competidor Rojo -->
              <div class="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <h3 class="text-lg font-semibold text-red-900 mb-2">Competidor ROJO</h3>
                <div class="text-4xl font-bold text-red-600 mb-2">{{ currentMatch.redScore }} pts</div>
                <div class="text-sm text-red-700 space-y-1">
                  <div>Golpes: {{ currentMatch.redHits }}</div>
                  <div>Penalizaciones: {{ currentMatch.redPenalties }}</div>
                  <div>Última técnica: {{ currentMatch.lastRedTechnique || 'N/A' }}</div>
                </div>
              </div>
            </div>

            <!-- Información del Round -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-gray-900">{{ currentMatch.currentRound }}</div>
                  <div class="text-sm text-gray-600">Round</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900">{{ formatTime(currentMatch.timeRemaining) }}</div>
                  <div class="text-sm text-gray-600">Tiempo</div>
                </div>
                <div>
                  <div class="text-lg font-bold text-gray-900">{{ currentMatch.status }}</div>
                  <div class="text-sm text-gray-600">Estado</div>
                </div>
                <div>
                  <div class="text-lg font-bold text-purple-600">{{ stats.controlEvents }}</div>
                  <div class="text-sm text-gray-600">Eventos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Panel de Jueces - Columna 3-4 -->
      <div class="xl:col-span-2">
        <JudgeControlPanel :socket="socket" ref="judgePanel" />
      </div>

      <!-- Panel de Eventos y Estado - Columna completa -->
      <div class="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Estado del Hardware -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              Estado del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Conexión WebSocket</span>
                <span :class="['text-sm font-medium', isConnected ? 'text-green-600' : 'text-red-600']">
                  {{ isConnected ? 'Conectado' : 'Desconectado' }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Eventos procesados</span>
                <span class="text-sm font-medium text-blue-600">{{ stats.controlEvents }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Protocolo</span>
                <span class="text-sm font-medium text-purple-600">DAEDO</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Jueces activos</span>
                <span class="text-sm font-medium text-amber-600">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Eventos Recientes -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              Eventos Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div 
                v-for="event in recentEvents" 
                :key="event.id"
                class="flex justify-between items-start p-2 rounded border-l-4"
                :class="getEventColor(event.type)"
              >
                <div class="flex-1">
                  <div class="text-sm">{{ event.message }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ formatTime(event.timestamp) }}</div>
                </div>
              </div>
              <div v-if="recentEvents.length === 0" class="text-sm text-gray-500 text-center py-8">
                No hay eventos registrados
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import JudgeControlPanel from './JudgeControlPanel.vue'
import JudgeConfigurationNew from './JudgeConfigurationNew.vue'
import { useSocket } from '@/composables/useSocket'

// Socket connection
const { socket, isConnected, emit, on, off } = useSocket()

// State
const currentMatch = ref(null)
const showJudgeConfig = ref(false)
const competitors = ref([
  { id: 1, firstName: 'Juan', lastName: 'Pérez' },
  { id: 2, firstName: 'María', lastName: 'González' },
  { id: 3, firstName: 'Carlos', lastName: 'López' },
  { id: 4, firstName: 'Ana', lastName: 'Martín' }
])
const recentEvents = ref([])
const judgePanel = ref(null)
const judgeConfiguration = ref(null)
const stats = ref({
  matchesToday: 0,
  controlEvents: 0,
  uptime: '0h 0m'
})

const matchConfig = ref({
  blueCompetitorId: '',
  redCompetitorId: '',
  operatorUserId: 1,
  roundDuration: 180,
  numberOfRounds: 3,
  scoringMode: 'ELECTRONIC',
  deviceMode: 'DAEDO_PROTOCOL'
})

// Computed
const canStartMatch = computed(() => {
  return matchConfig.value.blueCompetitorId && 
         matchConfig.value.redCompetitorId && 
         matchConfig.value.blueCompetitorId !== matchConfig.value.redCompetitorId
})

// Methods
const startMatch = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/combat/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(matchConfig.value)
    })

    const result = await response.json()
    
    if (result.success) {
      currentMatch.value = result.data
      addEvent('✅ Combate iniciado exitosamente', 'success')
    } else {
      addEvent('❌ Error al iniciar combate: ' + result.message, 'error')
    }
  } catch (error) {
    console.error('Error starting match:', error)
    addEvent('❌ Error de conexión al iniciar combate', 'error')
  }
}

const pauseMatch = async () => {
  if (!currentMatch.value) return

  try {
    const action = currentMatch.value.status === 'PAUSED' ? 'resume' : 'pause'
    const response = await fetch(`http://localhost:3000/api/combat/${currentMatch.value.id}/${action}`, {
      method: 'POST'
    })

    const result = await response.json()
    
    if (result.success) {
      addEvent(`✅ Combate ${action === 'pause' ? 'pausado' : 'reanudado'}`, 'info')
    }
  } catch (error) {
    console.error('Error pausing/resuming match:', error)
    addEvent('❌ Error al cambiar estado del combate', 'error')
  }
}

const endMatch = async () => {
  if (!currentMatch.value || !confirm('¿Estás seguro de finalizar el combate?')) return

  try {
    const response = await fetch(`http://localhost:3000/api/combat/${currentMatch.value.id}/end`, {
      method: 'POST'
    })

    const result = await response.json()
    
    if (result.success) {
      addEvent('🏆 Combate finalizado', 'success')
      currentMatch.value = null
    }
  } catch (error) {
    console.error('Error ending match:', error)
    addEvent('❌ Error al finalizar combate', 'error')
  }
}

const loadActiveMatches = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/combat/active')
    const result = await response.json()
    
    if (result.success && result.data.length > 0) {
      currentMatch.value = result.data[0]
    }
  } catch (error) {
    console.error('Error loading active matches:', error)
  }
}

const addEvent = (message, type = 'info') => {
  const event = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date()
  }
  
  recentEvents.value.unshift(event)
  
  if (recentEvents.value.length > 20) {
    recentEvents.value = recentEvents.value.slice(0, 20)
  }
}

const formatTime = (seconds) => {
  if (seconds instanceof Date) {
    return seconds.toLocaleTimeString()
  }
  
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const getEventColor = (type) => {
  switch(type) {
    case 'success': return 'border-green-400 bg-green-50'
    case 'error': return 'border-red-400 bg-red-50'
    case 'control': return 'border-blue-400 bg-blue-50'
    case 'hardware': return 'border-purple-400 bg-purple-50'
    default: return 'border-gray-400 bg-gray-50'
  }
}

// Socket event handlers
const handleMatchUpdated = (data) => {
  if (data.match) {
    currentMatch.value = data.match
  }
  addEvent(`🔄 ${data.message || 'Estado del combate actualizado'}`, 'info')
}

const handleControlEvent = (data) => {
  const { judgeId, competitor, technique, points, controlValue } = data
  addEvent(
    `🥋 Juez ${judgeId}: ${competitor.toUpperCase()} - ${technique.toUpperCase()} (${points}pts)`, 
    'control'
  )
  stats.value.controlEvents++
}

const handleMatchStarted = (data) => {
  currentMatch.value = data.match
  if (judgePanel.value) {
    judgePanel.value.resetStats()
  }
  addEvent('🥋 Combate iniciado - Sistema de jueces activado', 'success')
}

const handleMatchEnded = (data) => {
  currentMatch.value = null
  addEvent(`🏆 Combate finalizado - Ganador: ${data.winner || 'Por determinar'}`, 'success')
}

const handleHardwareEvent = (data) => {
  addEvent(`🔧 Hardware: ${data.message}`, 'hardware')
}

const onJudgeConfigSaved = (config) => {
  addEvent(`⚙️ Configuración de jueces actualizada: ${config.judge1Name}, ${config.judge2Name}, ${config.judge3Name}`, 'success')
  showJudgeConfig.value = false
}

const onJudgeConfigurationSaved = (config) => {
  judgeConfiguration.value = config
  addEvent('👨‍⚖️ Configuración de jueces guardada', 'success')
}

// Lifecycle
onMounted(async () => {
  await loadActiveMatches()
  
  on('matchUpdated', handleMatchUpdated)
  on('matchStarted', handleMatchStarted)
  on('matchEnded', handleMatchEnded)
  on('matchPaused', handleMatchUpdated)
  on('matchResumed', handleMatchUpdated)
  on('controlEvent', handleControlEvent)
  on('hardwareEvent', handleHardwareEvent)
  
  addEvent('🚀 Sistema de combate DAEDO inicializado', 'success')
})

onUnmounted(() => {
  off('matchUpdated', handleMatchUpdated)
  off('matchStarted', handleMatchStarted)
  off('matchEnded', handleMatchEnded)
  off('matchPaused', handleMatchUpdated)
  off('matchResumed', handleMatchUpdated)
  off('controlEvent', handleControlEvent)
  off('hardwareEvent', handleHardwareEvent)
})
</script>

<style scoped>
/* Custom animations and styles */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>