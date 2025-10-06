<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
        Panel de Jueces DAEDO
      </CardTitle>
      <CardDescription>
        Monitoreo en tiempo real de los 3 jueces y sus controles
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Juez 1 -->
        <div class="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-900">Juez 1</h3>
            <div class="flex items-center gap-2">
              <div :class="['w-2 h-2 rounded-full', judge1Status ? 'bg-green-500' : 'bg-gray-400']"></div>
              <span class="text-xs text-gray-600">{{ judge1Status ? 'Activo' : 'Inactivo' }}</span>
            </div>
          </div>
          
          <div class="text-xs text-gray-600 mb-2">Rango: 193-203</div>
          
          <!-- Botones Azul -->
          <div class="mb-3">
            <div class="text-sm font-medium text-blue-700 mb-1">Competidor AZUL</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.blue.cabeza ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.blue.giro ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.blue.puno ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>

          <!-- Botones Rojo -->
          <div>
            <div class="text-sm font-medium text-red-700 mb-1">Competidor ROJO</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.red.cabeza ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.red.giro ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge1.red.puno ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>
        </div>

        <!-- Juez 2 -->
        <div class="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-900">Juez 2</h3>
            <div class="flex items-center gap-2">
              <div :class="['w-2 h-2 rounded-full', judge2Status ? 'bg-green-500' : 'bg-gray-400']"></div>
              <span class="text-xs text-gray-600">{{ judge2Status ? 'Activo' : 'Inactivo' }}</span>
            </div>
          </div>
          
          <div class="text-xs text-gray-600 mb-2">Rango: 209-219</div>
          
          <!-- Botones Azul -->
          <div class="mb-3">
            <div class="text-sm font-medium text-blue-700 mb-1">Competidor AZUL</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.blue.cabeza ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.blue.giro ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.blue.puno ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>

          <!-- Botones Rojo -->
          <div>
            <div class="text-sm font-medium text-red-700 mb-1">Competidor ROJO</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.red.cabeza ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.red.giro ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge2.red.puno ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>
        </div>

        <!-- Juez 3 -->
        <div class="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-violet-50">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-900">Juez 3</h3>
            <div class="flex items-center gap-2">
              <div :class="['w-2 h-2 rounded-full', judge3Status ? 'bg-green-500' : 'bg-gray-400']"></div>
              <span class="text-xs text-gray-600">{{ judge3Status ? 'Activo' : 'Inactivo' }}</span>
            </div>
          </div>
          
          <div class="text-xs text-gray-600 mb-2">Rango: 225-235</div>
          
          <!-- Botones Azul -->
          <div class="mb-3">
            <div class="text-sm font-medium text-blue-700 mb-1">Competidor AZUL</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.blue.cabeza ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.blue.giro ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.blue.puno ? 'bg-blue-600' : 'bg-blue-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>

          <!-- Botones Rojo -->
          <div>
            <div class="text-sm font-medium text-red-700 mb-1">Competidor ROJO</div>
            <div class="grid grid-cols-3 gap-1">
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.red.cabeza ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Cabeza (3pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.red.giro ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Giro (4pts)
              </button>
              <button 
                :class="['px-2 py-1 text-xs rounded text-white font-medium', 
                        judge3.red.puno ? 'bg-red-600' : 'bg-red-300']"
                disabled
              >
                Puño (1pt)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas de Actividad -->
      <div class="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 class="font-semibold text-gray-900 mb-3">Actividad de Jueces</h4>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-blue-600">{{ judge1ActivityCount }}</div>
            <div class="text-sm text-gray-600">Juez 1 - Acciones</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">{{ judge2ActivityCount }}</div>
            <div class="text-sm text-gray-600">Juez 2 - Acciones</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-purple-600">{{ judge3ActivityCount }}</div>
            <div class="text-sm text-gray-600">Juez 3 - Acciones</div>
          </div>
        </div>
      </div>

      <!-- Últimas Acciones -->
      <div class="mt-4">
        <h4 class="font-semibold text-gray-900 mb-3">Últimas Acciones</h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div 
            v-for="action in recentActions" 
            :key="action.id"
            class="text-sm p-2 rounded border-l-4"
            :class="getActionColor(action.judgeId)"
          >
            <div class="flex justify-between items-center">
              <span>{{ action.description }}</span>
              <span class="text-xs text-gray-500">{{ formatTime(action.timestamp) }}</span>
            </div>
          </div>
          <div v-if="recentActions.length === 0" class="text-sm text-gray-500 text-center py-4">
            No hay acciones registradas
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

// Props
const props = defineProps({
  socket: Object
})

// Reactive data
const judge1 = ref({
  blue: { cabeza: false, giro: false, puno: false },
  red: { cabeza: false, giro: false, puno: false }
})

const judge2 = ref({
  blue: { cabeza: false, giro: false, puno: false },
  red: { cabeza: false, giro: false, puno: false }
})

const judge3 = ref({
  blue: { cabeza: false, giro: false, puno: false },
  red: { cabeza: false, giro: false, puno: false }
})

const judge1ActivityCount = ref(0)
const judge2ActivityCount = ref(0)
const judge3ActivityCount = ref(0)

const recentActions = ref([])

// Computed
const judge1Status = computed(() => {
  return Object.values(judge1.value.blue).some(v => v) || 
         Object.values(judge1.value.red).some(v => v)
})

const judge2Status = computed(() => {
  return Object.values(judge2.value.blue).some(v => v) || 
         Object.values(judge2.value.red).some(v => v)
})

const judge3Status = computed(() => {
  return Object.values(judge3.value.blue).some(v => v) || 
         Object.values(judge3.value.red).some(v => v)
})

// Methods
const getActionColor = (judgeId) => {
  switch(judgeId) {
    case 1: return 'border-blue-400 bg-blue-50'
    case 2: return 'border-green-400 bg-green-50'
    case 3: return 'border-purple-400 bg-purple-50'
    default: return 'border-gray-400 bg-gray-50'
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

const addAction = (judgeId, competitor, technique, points) => {
  const action = {
    id: Date.now(),
    judgeId,
    description: `Juez ${judgeId}: ${competitor} - ${technique} (${points}pts)`,
    timestamp: new Date()
  }
  
  recentActions.value.unshift(action)
  if (recentActions.value.length > 10) {
    recentActions.value.pop()
  }

  // Incrementar contador de actividad
  switch(judgeId) {
    case 1: judge1ActivityCount.value++; break
    case 2: judge2ActivityCount.value++; break
    case 3: judge3ActivityCount.value++; break
  }
}

const resetJudgeButtons = () => {
  setTimeout(() => {
    judge1.value = {
      blue: { cabeza: false, giro: false, puno: false },
      red: { cabeza: false, giro: false, puno: false }
    }
    judge2.value = {
      blue: { cabeza: false, giro: false, puno: false },
      red: { cabeza: false, giro: false, puno: false }
    }
    judge3.value = {
      blue: { cabeza: false, giro: false, puno: false },
      red: { cabeza: false, giro: false, puno: false }
    }
  }, 1000) // Reset después de 1 segundo
}

// Socket event handlers
const handleControlEvent = (data) => {
  const { judgeId, competitor, technique, points, controlValue } = data
  
  // Activar el botón correspondiente
  if (judgeId === 1) {
    judge1.value[competitor][technique] = true
  } else if (judgeId === 2) {
    judge2.value[competitor][technique] = true
  } else if (judgeId === 3) {
    judge3.value[competitor][technique] = true
  }

  // Agregar acción
  addAction(judgeId, competitor.toUpperCase(), technique.toUpperCase(), points)
  
  // Reset visual después de un tiempo
  resetJudgeButtons()
}

const resetStats = () => {
  judge1ActivityCount.value = 0
  judge2ActivityCount.value = 0
  judge3ActivityCount.value = 0
  recentActions.value = []
}

// Lifecycle
onMounted(() => {
  if (props.socket) {
    props.socket.on('controlEvent', handleControlEvent)
    props.socket.on('matchStarted', resetStats)
    props.socket.on('matchEnded', resetStats)
  }
})

onUnmounted(() => {
  if (props.socket) {
    props.socket.off('controlEvent', handleControlEvent)
    props.socket.off('matchStarted', resetStats)
    props.socket.off('matchEnded', resetStats)
  }
})

// Expose methods
defineExpose({
  resetStats
})
</script>