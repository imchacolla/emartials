<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8 overflow-y-auto" 
       style="width: 100% !important;">
    
    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6 mb-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Sistema de Combate</h1>
            <p class="text-white/70">World Taekwondo Federation</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-2xl font-bold text-white">{{ formatTime(matchTime) }}</div>
            <div class="text-sm text-white/70">Round {{ currentRound }}/{{ totalRounds }}</div>
          </div>
          
          <Button 
            @click="toggleTimer"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              isTimerRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            ]"
          >
            {{ isTimerRunning ? '⏸️ Pausar' : '▶️ Iniciar' }}
          </Button>

          <Button @click="goBack" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300">
            ← Volver al Menú
          </Button>
        </div>
      </div>
    </div>

    <!-- Marcador Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Competidor Azul -->
      <div class="bg-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-300/30">
        <div class="text-center">
          <div class="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">🔵</span>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ blueCompetitor.name || 'Competidor Azul' }}</h2>
          <div class="text-6xl font-bold text-blue-300 mb-4">{{ blueCompetitor.points }}</div>
          
          <!-- Controles Azul -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button 
              @click="addPoints('blue', 1)"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +1
            </button>
            <button 
              @click="addPoints('blue', 2)"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +2
            </button>
            <button 
              @click="addPoints('blue', 3)"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +3
            </button>
            <button 
              @click="addPoints('blue', 4)"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +4
            </button>
          </div>
          
          <!-- Faltas Azul -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="text-white/70 text-sm mb-1">FALTAS</div>
            <div class="flex justify-center gap-1">
              <div 
                v-for="n in 10" 
                :key="n"
                :class="[
                  'w-4 h-4 rounded-full border-2',
                  n <= blueCompetitor.penalties 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="mt-2 flex gap-2">
              <button 
                @click="addPenalty('blue')"
                class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                +Falta
              </button>
              <button 
                @click="removePenalty('blue')"
                class="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm"
              >
                -Falta
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel Central -->
      <div class="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div class="text-center text-white space-y-6">
          <!-- Tiempo -->
          <div class="bg-black/50 rounded-xl p-6">
            <div class="text-4xl font-bold mb-2">{{ formatTime(matchTime) }}</div>
            <div class="text-lg">Round {{ currentRound }}/{{ totalRounds }}</div>
          </div>
          
          <!-- Controles Principales -->
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="resetMatch"
              class="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-semibold"
            >
              🔄 Reset
            </button>
            <button 
              @click="nextRound"
              class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold"
            >
              ⏭️ Round
            </button>
            <button 
              @click="openSettings"
              class="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold"
            >
              ⚙️ Config
            </button>
            <button 
              @click="endMatch"
              class="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold"
            >
              🏁 Fin
            </button>
          </div>
          
          <!-- Estado del Hardware -->
          <div class="bg-black/50 rounded-lg p-3">
            <div class="flex items-center justify-center gap-2 mb-2">
              <div 
                :class="[
                  'w-3 h-3 rounded-full',
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                ]"
              ></div>
              <span class="text-sm">{{ isConnected ? 'Hardware Conectado' : 'Hardware Desconectado' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Competidor Rojo -->
      <div class="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-300/30">
        <div class="text-center">
          <div class="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">🔴</span>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ redCompetitor.name || 'Competidor Rojo' }}</h2>
          <div class="text-6xl font-bold text-red-300 mb-4">{{ redCompetitor.points }}</div>
          
          <!-- Controles Rojo -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button 
              @click="addPoints('red', 1)"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +1
            </button>
            <button 
              @click="addPoints('red', 2)"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +2
            </button>
            <button 
              @click="addPoints('red', 3)"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +3
            </button>
            <button 
              @click="addPoints('red', 4)"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              +4
            </button>
          </div>
          
          <!-- Faltas Rojo -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="text-white/70 text-sm mb-1">FALTAS</div>
            <div class="flex justify-center gap-1">
              <div 
                v-for="n in 10" 
                :key="n"
                :class="[
                  'w-4 h-4 rounded-full border-2',
                  n <= redCompetitor.penalties 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="mt-2 flex gap-2">
              <button 
                @click="addPenalty('red')"
                class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                +Falta
              </button>
              <button 
                @click="removePenalty('red')"
                class="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm"
              >
                -Falta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de Eventos -->
    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-4">📋 Registro de Eventos</h3>
      <div class="max-h-32 overflow-y-auto space-y-2">
        <div 
          v-for="(event, index) in matchEvents" 
          :key="index"
          class="bg-black/30 rounded-lg p-3 text-white"
        >
          <div class="flex justify-between items-center">
            <span class="text-sm">{{ event.message }}</span>
            <span class="text-xs text-white/70">{{ formatTime(event.time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Configuración -->
    <MatchSettings 
      :isOpen="showSettingsModal"
      :initialSettings="settings"
      @close="showSettingsModal = false"
      @save="handleSettingsSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSocket } from '../composables/useSocket'
import { Button } from '@/components/ui/button'
import MatchSettings from './MatchSettings.vue'

const router = useRouter()
const { isConnected, emit, on, off } = useSocket()

// Función para volver al menú
const goBack = () => {
  router.push('/')
}

// Estado del combate
const matchTime = ref(180) // 3 minutos en segundos
const currentRound = ref(1)
const totalRounds = ref(3)
const isTimerRunning = ref(false)
const timerInterval = ref(null)

// Competidores
const blueCompetitor = ref({
  name: '',
  points: 0,
  penalties: 0
})

const redCompetitor = ref({
  name: '',
  points: 0,
  penalties: 0
})

// Eventos del combate
const matchEvents = ref([])

// Métodos
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const toggleTimer = () => {
  if (isTimerRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

const startTimer = () => {
  isTimerRunning.value = true
  timerInterval.value = setInterval(() => {
    if (matchTime.value > 0) {
      matchTime.value--
    } else {
      pauseTimer()
      addEvent('⏰ Tiempo terminado - Round ' + currentRound.value)
    }
  }, 1000)
  
  addEvent('▶️ Timer iniciado')
  emit('match:timer_started', { round: currentRound.value })
}

const pauseTimer = () => {
  isTimerRunning.value = false
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  
  addEvent('⏸️ Timer pausado')
  emit('match:timer_paused', { round: currentRound.value, time: matchTime.value })
}

const addPoints = (competitor, points) => {
  if (competitor === 'blue') {
    blueCompetitor.value.points += points
    addEvent(`🔵 +${points} puntos para ${blueCompetitor.value.name || 'Azul'}`)
  } else {
    redCompetitor.value.points += points
    addEvent(`🔴 +${points} puntos para ${redCompetitor.value.name || 'Rojo'}`)
  }
  
  emit('match:score_updated', {
    blue: blueCompetitor.value.points,
    red: redCompetitor.value.points,
    competitor,
    points
  })
}

const addPenalty = (competitor) => {
  if (competitor === 'blue') {
    blueCompetitor.value.penalties++
    addEvent(`🔵 Falta para ${blueCompetitor.value.name || 'Azul'}`)
  } else {
    redCompetitor.value.penalties++
    addEvent(`🔴 Falta para ${redCompetitor.value.name || 'Rojo'}`)
  }
  
  emit('match:penalty_added', {
    competitor,
    penalties: competitor === 'blue' ? blueCompetitor.value.penalties : redCompetitor.value.penalties
  })
}

const removePenalty = (competitor) => {
  if (competitor === 'blue' && blueCompetitor.value.penalties > 0) {
    blueCompetitor.value.penalties--
    addEvent(`🔵 Falta removida de ${blueCompetitor.value.name || 'Azul'}`)
  } else if (competitor === 'red' && redCompetitor.value.penalties > 0) {
    redCompetitor.value.penalties--
    addEvent(`🔴 Falta removida de ${redCompetitor.value.name || 'Rojo'}`)
  }
}

const resetMatch = () => {
  pauseTimer()
  matchTime.value = 180
  currentRound.value = 1
  blueCompetitor.value.points = 0
  blueCompetitor.value.penalties = 0
  redCompetitor.value.points = 0
  redCompetitor.value.penalties = 0
  matchEvents.value = []
  
  addEvent('🔄 Combate reiniciado')
  emit('match:reset')
}

const nextRound = () => {
  if (currentRound.value < totalRounds.value) {
    pauseTimer()
    currentRound.value++
    matchTime.value = 180
    addEvent(`⏭️ Iniciando Round ${currentRound.value}`)
    emit('match:next_round', { round: currentRound.value })
  }
}

const endMatch = () => {
  pauseTimer()
  addEvent('🏁 Combate finalizado')
  emit('match:ended', {
    blue: blueCompetitor.value,
    red: redCompetitor.value,
    round: currentRound.value
  })
}

const openSettings = () => {
  showSettingsModal.value = true
  addEvent('⚙️ Configuración abierta')
}

const showSettingsModal = ref(false)

const handleSettingsSave = (newSettings) => {
  // Actualizar configuración local
  Object.assign(settings.value, newSettings)
  
  // Aplicar nuevas configuraciones
  matchTime.value = newSettings.roundDuration
  totalRounds.value = newSettings.totalRounds
  blueCompetitor.value.name = newSettings.blueCompetitor.name
  redCompetitor.value.name = newSettings.redCompetitor.name
  
  addEvent('⚙️ Configuración actualizada')
  showSettingsModal.value = false
}

// Props
const props = defineProps({
  settings: {
    type: Object,
    default: () => ({
      roundDuration: 180,
      totalRounds: 3,
      blueCompetitor: { name: '' },
      redCompetitor: { name: '' }
    })
  }
})

const settings = ref({ ...props.settings })

const addEvent = (message) => {
  matchEvents.value.unshift({
    message,
    time: 180 - matchTime.value,
    timestamp: new Date()
  })
  
  // Mantener solo los últimos 20 eventos
  if (matchEvents.value.length > 20) {
    matchEvents.value = matchEvents.value.slice(0, 20)
  }
}

// Manejar eventos de hardware
const handleControlEvent = (event) => {
  // Mapear controles a competidores
  if (event.control === 'Control 1') {
    addPoints('blue', 1)
  } else if (event.control === 'Control 2') {
    addPoints('red', 1)
  }
}

onMounted(() => {
  on('control_event', handleControlEvent)
  addEvent('🥋 Sistema de combate iniciado')
})

onUnmounted(() => {
  pauseTimer()
  off('control_event', handleControlEvent)
})
</script>

<style scoped>
/* Animaciones adicionales si son necesarias */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>