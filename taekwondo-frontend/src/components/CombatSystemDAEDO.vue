<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8">
    
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
            <h1 class="text-3xl font-bold text-white">Sistema de Combate DAEDO</h1>
            <p class="text-white/70">Sistema de 3 Jueces - 6 Botones por Control</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-2xl font-bold text-white">{{ formatTime(matchTime) }}</div>
            <div class="text-sm text-white/70">Round {{ currentRound }}/{{ totalRounds }}</div>
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

          <button @click="goBack" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300">
            ← Volver al Menú
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
          <h2 class="text-xl font-bold text-white mb-2">{{ redCompetitor.name || 'Competidor Rojo' }}</h2>
          <div class="text-5xl font-bold text-red-300 mb-4">{{ redCompetitor.points }}</div>
          
          <!-- Técnicas Rojo -->
          <div class="grid grid-cols-1 gap-2 mb-4">
            <div 
              v-for="technique in redTechniques" 
              :key="technique.name"
              class="bg-red-600/50 rounded-lg p-3 border border-red-400/30"
            >
              <div class="text-white font-semibold text-sm mb-2">{{ technique.name.toUpperCase() }}</div>
              <div class="text-red-200 text-xs mb-2">{{ technique.points }} pts</div>
              <div class="flex gap-1 justify-center">
                <div 
                  v-for="(judge, index) in technique.judges" 
                  :key="index"
                  :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                    judge.pressed 
                      ? 'bg-red-400 border-red-400 text-white' 
                      : 'border-red-400/50 text-red-300'
                  ]"
                >
                  {{ judge.judgeNumber }}
                </div>
              </div>
            </div>
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
                  n <= redCompetitor.penalties 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="text-red-300 text-lg font-bold">{{ redCompetitor.penalties }}</div>
          </div>
        </div>
      </div>

      <!-- Panel Central -->
      <div class="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div class="text-center text-white space-y-4">
          <!-- Tiempo -->
          <div class="bg-black/50 rounded-xl p-4">
            <div class="text-3xl font-bold mb-2">{{ formatTime(matchTime) }}</div>
            <div class="text-lg">Round {{ currentRound }}/{{ totalRounds }}</div>
          </div>
          
          <!-- Controles Principales -->
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="resetMatch"
              class="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg font-semibold text-sm"
            >
              🔄 Reset
            </button>
            <button 
              @click="nextRound"
              class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg font-semibold text-sm"
            >
              ⏭️ Round
            </button>
            <button 
              @click="openSettings"
              class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg font-semibold text-sm"
            >
              ⚙️ Config
            </button>
            <button 
              @click="endMatch"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-semibold text-sm"
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
            <div class="text-xs text-white/60">3 Controles DAEDO Activos</div>
          </div>

          <!-- Eventos Recientes -->
          <div class="bg-black/50 rounded-lg p-3 max-h-32 overflow-y-auto">
            <div class="text-sm font-semibold mb-2">Eventos Recientes</div>
            <div class="space-y-1">
              <div 
                v-for="(event, index) in recentEvents.slice(-3)" 
                :key="index"
                class="text-xs text-white/70"
              >
                {{ event }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Competidor Azul (DERECHA) -->
      <div class="bg-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-300/30">
        <div class="text-center">
          <div class="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">🔵</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">{{ blueCompetitor.name || 'Competidor Azul' }}</h2>
          <div class="text-5xl font-bold text-blue-300 mb-4">{{ blueCompetitor.points }}</div>
          
          <!-- Técnicas Azul -->
          <div class="grid grid-cols-1 gap-2 mb-4">
            <div 
              v-for="technique in blueTechniques" 
              :key="technique.name"
              class="bg-blue-600/50 rounded-lg p-3 border border-blue-400/30"
            >
              <div class="text-white font-semibold text-sm mb-2">{{ technique.name.toUpperCase() }}</div>
              <div class="text-blue-200 text-xs mb-2">{{ technique.points }} pts</div>
              <div class="flex gap-1 justify-center">
                <div 
                  v-for="(judge, index) in technique.judges" 
                  :key="index"
                  :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                    judge.pressed 
                      ? 'bg-blue-400 border-blue-400 text-white' 
                      : 'border-blue-400/50 text-blue-300'
                  ]"
                >
                  {{ judge.judgeNumber }}
                </div>
              </div>
            </div>
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
                  n <= blueCompetitor.penalties 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-white/30'
                ]"
              ></div>
            </div>
            <div class="text-red-300 text-lg font-bold">{{ blueCompetitor.penalties }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de Controles DAEDO -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6 mb-6">
      <h3 class="text-2xl font-bold text-white mb-6 text-center">Controles DAEDO - Sistema de 3 Jueces</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Control Juez 1 -->
        <div class="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-green-400/30">
          <div class="text-center mb-4">
            <h4 class="text-xl font-bold text-white">JUEZ 1</h4>
            <div class="text-green-300 text-sm">Rango: 193-207</div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <!-- ROJO - IZQUIERDA -->
            <div class="text-center">
              <div class="text-red-300 font-semibold mb-2">ROJO</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge1RedButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-red-600 hover:bg-red-700 text-white border border-red-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
            
            <!-- AZUL - DERECHA -->
            <div class="text-center">
              <div class="text-blue-300 font-semibold mb-2">AZUL</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge1BlueButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Control Juez 2 -->
        <div class="bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl p-6 border border-purple-400/30">
          <div class="text-center mb-4">
            <h4 class="text-xl font-bold text-white">JUEZ 2</h4>
            <div class="text-purple-300 text-sm">Rango: 209-223</div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <!-- ROJO - IZQUIERDA -->
            <div class="text-center">
              <div class="text-red-300 font-semibold mb-2">ROJO</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge2RedButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-red-600 hover:bg-red-700 text-white border border-red-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
            
            <!-- AZUL - DERECHA -->
            <div class="text-center">
              <div class="text-blue-300 font-semibold mb-2">AZUL</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge2BlueButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Control Juez 3 -->
        <div class="bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-2xl p-6 border border-orange-400/30">
          <div class="text-center mb-4">
            <h4 class="text-xl font-bold text-white">JUEZ 3</h4>
            <div class="text-orange-300 text-sm">Rango: 225-235</div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <!-- ROJO - IZQUIERDA -->
            <div class="text-center">
              <div class="text-red-300 font-semibold mb-2">ROJO</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge3RedButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-red-600 hover:bg-red-700 text-white border border-red-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
            
            <!-- AZUL - DERECHA -->
            <div class="text-center">
              <div class="text-blue-300 font-semibold mb-2">AZUL</div>
              <div class="space-y-2">
                <button 
                  v-for="button in judge3BlueButtons" 
                  :key="button.value"
                  @click="simulateButtonPress(button)"
                  :class="[
                    'w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                    'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                  ]"
                >
                  <div>{{ button.technique.toUpperCase() }}</div>
                  <div class="text-xs">{{ button.points }}pts • {{ button.value }}/{{ button.hex }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Debug Info -->
      <div class="mt-6 bg-black/30 rounded-lg p-4">
        <div class="text-white text-sm font-semibold mb-2">Debug - Último evento:</div>
        <div class="text-green-300 text-xs font-mono">{{ lastButtonPress || 'Ningún botón presionado' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

const router = useRouter()

// Estado del combate
const isTimerRunning = ref(false)
const matchTime = ref(180) // 3 minutos
const currentRound = ref(1)
const totalRounds = ref(3)
const timerInterval = ref(null)
const isConnected = ref(false)
const recentEvents = ref([])
const lastButtonPress = ref('')

// Competidores
const blueCompetitor = reactive({
  name: 'Competidor Azul',
  points: 0,
  penalties: 0
})

const redCompetitor = reactive({
  name: 'Competidor Rojo',
  points: 0,
  penalties: 0
})

// Configuración de botones según ControlMappingService del backend
// Juez 1 (193-207)
const judge1BlueButtons = ref([
  { value: 199, hex: '0xC7', technique: 'cabeza', points: 3, judgeNumber: 1, competitor: 'blue' },
  { value: 195, hex: '0xC3', technique: 'giro', points: 4, judgeNumber: 1, competitor: 'blue' },
  { value: 207, hex: '0xCF', technique: 'puno', points: 1, judgeNumber: 1, competitor: 'blue' }
])

const judge1RedButtons = ref([
  { value: 197, hex: '0xC5', technique: 'cabeza', points: 3, judgeNumber: 1, competitor: 'red' },
  { value: 193, hex: '0xC1', technique: 'giro', points: 4, judgeNumber: 1, competitor: 'red' },
  { value: 201, hex: '0xC9', technique: 'puno', points: 1, judgeNumber: 1, competitor: 'red' }
])

// Juez 2 (209-223)
const judge2BlueButtons = ref([
  { value: 215, hex: '0xD7', technique: 'cabeza', points: 3, judgeNumber: 2, competitor: 'blue' },
  { value: 211, hex: '0xD3', technique: 'giro', points: 4, judgeNumber: 2, competitor: 'blue' },
  { value: 223, hex: '0xDF', technique: 'puno', points: 1, judgeNumber: 2, competitor: 'blue' }
])

const judge2RedButtons = ref([
  { value: 213, hex: '0xD5', technique: 'cabeza', points: 3, judgeNumber: 2, competitor: 'red' },
  { value: 209, hex: '0xD1', technique: 'giro', points: 4, judgeNumber: 2, competitor: 'red' },
  { value: 217, hex: '0xD9', technique: 'puno', points: 1, judgeNumber: 2, competitor: 'red' }
])

// Juez 3 (225-235)
const judge3BlueButtons = ref([
  { value: 231, hex: '0xE7', technique: 'cabeza', points: 3, judgeNumber: 3, competitor: 'blue' },
  { value: 227, hex: '0xE3', technique: 'giro', points: 4, judgeNumber: 3, competitor: 'blue' },
  { value: 235, hex: '0xEB', technique: 'puno', points: 1, judgeNumber: 3, competitor: 'blue' }
])

const judge3RedButtons = ref([
  { value: 229, hex: '0xE5', technique: 'cabeza', points: 3, judgeNumber: 3, competitor: 'red' },
  { value: 225, hex: '0xE1', technique: 'giro', points: 4, judgeNumber: 3, competitor: 'red' },
  { value: 233, hex: '0xE9', technique: 'puno', points: 1, judgeNumber: 3, competitor: 'red' }
])

// Técnicas para mostrar en el marcador
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
  }
])

// Socket.IO para comunicación con el backend
let socket = null

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
}

const pauseTimer = () => {
  isTimerRunning.value = false
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  
  addEvent('⏸️ Timer pausado')
}

const simulateButtonPress = (button) => {
  processButtonEvent(button.value)
}

const processButtonEvent = (value) => {
  const button = findButtonByValue(value)
  if (!button) {
    console.warn('Botón no encontrado para valor:', value)
    return
  }
  
  // Registrar evento de botón
  lastButtonPress.value = `Juez ${button.judgeNumber} - ${button.competitor.toUpperCase()} ${button.technique} (${button.points}pts) - Valor: ${button.value}/${button.hex}`
  
  // Actualizar estado de técnica
  const techniques = button.competitor === 'blue' ? blueTechniques.value : redTechniques.value
  const technique = techniques.find(t => t.name === button.technique)
  if (technique) {
    const judge = technique.judges.find(j => j.judgeNumber === button.judgeNumber)
    if (judge) {
      judge.pressed = true
      
      // Reset después de 2 segundos
      setTimeout(() => {
        judge.pressed = false
      }, 2000)
    }
    
    // Verificar si la mayoría de jueces han presionado (2 de 3)
    const pressedJudges = technique.judges.filter(j => j.pressed).length
    if (pressedJudges >= 2) {
      // Otorgar puntos
      if (button.competitor === 'blue') {
        blueCompetitor.points += button.points
      } else {
        redCompetitor.points += button.points
      }
      
      addEvent(`🏆 ${button.competitor.toUpperCase()} ${button.technique} - ${button.points} puntos otorgados`)
      
      // Reset todos los jueces para esta técnica
      technique.judges.forEach(j => j.pressed = false)
    }
  }
  
  addEvent(`🎯 ${lastButtonPress.value}`)
}

const addEvent = (event) => {
  const timestamp = new Date().toLocaleTimeString()
  recentEvents.value.push(`${timestamp}: ${event}`)
  if (recentEvents.value.length > 10) {
    recentEvents.value.shift()
  }
  console.log('Evento:', event)
}

const resetMatch = () => {
  pauseTimer()
  matchTime.value = 180
  currentRound.value = 1
  blueCompetitor.points = 0
  blueCompetitor.penalties = 0
  redCompetitor.points = 0
  redCompetitor.penalties = 0
  recentEvents.value = []
  lastButtonPress.value = ''
  
  // Reset estado de técnicas
  blueTechniques.value.forEach(technique => {
    technique.judges.forEach(judge => judge.pressed = false)
  })
  redTechniques.value.forEach(technique => {
    technique.judges.forEach(judge => judge.pressed = false)
  })
  
  addEvent('🔄 Combate reiniciado')
}

const nextRound = () => {
  if (currentRound.value < totalRounds.value) {
    pauseTimer()
    currentRound.value++
    matchTime.value = 180
    addEvent(`⏭️ Iniciando Round ${currentRound.value}`)
  }
}

const endMatch = () => {
  pauseTimer()
  addEvent('🏁 Combate finalizado')
}

const openSettings = () => {
  addEvent('⚙️ Configuración abierta')
}

const goBack = () => {
  router.push('/')
}

const findButtonByValue = (value) => {
  const allButtons = [
    ...judge1BlueButtons.value,
    ...judge1RedButtons.value,
    ...judge2BlueButtons.value,
    ...judge2RedButtons.value,
    ...judge3BlueButtons.value,
    ...judge3RedButtons.value
  ]
  
  return allButtons.find(button => button.value === value)
}

const connectSocket = () => {
  try {
    socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    })
    
    socket.on('connect', () => {
      isConnected.value = true
      addEvent('🔌 Conectado al servidor DAEDO')
      console.log('Socket.IO conectado')
    })
    
    socket.on('disconnect', () => {
      isConnected.value = false
      addEvent('🔌 Desconectado del servidor')
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
    })
    
  } catch (error) {
    console.error('Error inicializando Socket.IO:', error)
    isConnected.value = false
  }
}

onMounted(() => {
  connectSocket()
  addEvent('🚀 Sistema DAEDO iniciado')
})

onUnmounted(() => {
  if (socket) {
    socket.disconnect()
  }
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<style scoped>
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