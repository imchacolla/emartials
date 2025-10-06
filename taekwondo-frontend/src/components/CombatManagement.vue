<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Sistema de Combate DAEDO</h1>
          <p class="text-gray-600 mt-2">Gestión profesional de combates con hardware integrado</p>
        </div>
        <Button @click="$router.push('/')" variant="outline">
          ← Volver al Menú
        </Button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Panel de Control Principal -->
      <div class="lg:col-span-2 space-y-6">
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
                <div class="text-3xl font-bold text-blue-600 mb-2">{{ currentMatch.blueScore }} puntos</div>
                <div class="text-sm text-blue-700">
                  <div>Golpes: {{ currentMatch.blueHits }}</div>
                  <div>Penalizaciones: {{ currentMatch.bluePenalties }}</div>
                </div>
              </div>

              <!-- Competidor Rojo -->
              <div class="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <h3 class="text-lg font-semibold text-red-900 mb-2">Competidor ROJO</h3>
                <div class="text-3xl font-bold text-red-600 mb-2">{{ currentMatch.redScore }} puntos</div>
                <div class="text-sm text-red-700">
                  <div>Golpes: {{ currentMatch.redHits }}</div>
                  <div>Penalizaciones: {{ currentMatch.redPenalties }}</div>
                </div>
              </div>
            </div>

            <!-- Información del Round -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-gray-900">{{ currentMatch.currentRound }}</div>
                  <div class="text-sm text-gray-600">Round Actual</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900">{{ formatTime(currentMatch.timeRemaining) }}</div>
                  <div class="text-sm text-gray-600">Tiempo Restante</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900">{{ currentMatch.status }}</div>
                  <div class="text-sm text-gray-600">Estado</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Panel de Jueces DAEDO -->
        <JudgeControlPanel :socket="socket" ref="judgePanel" />
      </div>

      <!-- Panel de Monitoreo -->
      <div class="space-y-6">
        <!-- Estado del Hardware -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              Estado del Hardware
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Puerto Serie</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  Conectado
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Protocolo DAEDO</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  Activo
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">WebSocket</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  Conectado
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Eventos Recientes -->
        <Card>
          <CardHeader>
            <CardTitle>Eventos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div 
                v-for="event in recentEvents" 
                :key="event.id"
                class="p-2 bg-gray-50 rounded text-sm"
              >
                <div class="font-medium">{{ event.message }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(event.timestamp) }}</div>
              </div>
              <div v-if="recentEvents.length === 0" class="text-center text-gray-500 py-4">
                No hay eventos recientes
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Estadísticas Rápidas -->
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Combates Hoy</span>
                <span class="font-semibold">{{ stats.matchesToday }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Eventos de Control</span>
                <span class="font-semibold">{{ stats.controlEvents }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Tiempo Activo</span>
                <span class="font-semibold">{{ stats.uptime }}</span>
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
import { useSocket } from '@/composables/useSocket'

// Socket connection
const { socket, isConnected, emit, on, off } = useSocket()

// State
const currentMatch = ref(null)
const competitors = ref([])
const recentEvents = ref([])
const judgePanel = ref(null)
const stats = ref({
  matchesToday: 0,
  controlEvents: 0,
  uptime: '0h 0m'
})

const matchConfig = ref({
  blueCompetitorId: '',
  redCompetitorId: '',
  operatorUserId: 1, // TODO: Get from auth
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
    const response = await fetch('/api/combat/start', {
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
    const response = await fetch(`/api/combat/${currentMatch.value.id}/${action}`, {
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
    const response = await fetch(`/api/combat/${currentMatch.value.id}/end`, {
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
    const response = await fetch('/api/combat/active')
    const result = await response.json()
    
    if (result.success && result.data.length > 0) {
      currentMatch.value = result.data[0] // Take first active match
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
  
  // Keep only last 10 events
  if (recentEvents.value.length > 10) {
    recentEvents.value = recentEvents.value.slice(0, 10)
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

// Socket event handlers
const handleMatchUpdated = (data) => {
  if (data.match) {
    currentMatch.value = data.match
  }
  addEvent(`🔄 ${data.message || 'Estado del combate actualizado'}`, 'info')
}

const handleControlEvent = (data) => {
  // Información del evento de control con detalles del juez
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

// Lifecycle
onMounted(async () => {
  await loadActiveMatches()
  
  // Socket listeners para el nuevo sistema de jueces
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
  // Clean up socket listeners
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
/* Additional custom styles if needed */
</style>