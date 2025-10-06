<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8 overflow-y-auto" 
       style="width: 100% !important;">
    
    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl mb-8 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-3 rounded-xl">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-black text-white">Monitor de Hardware</h1>
            <p class="text-blue-200">Estado en tiempo real de sensores y equipamiento DAEDO</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-green-400">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span class="font-medium">Sistema Activo</span>
          </div>
          <Button @click="goBack" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300">
            ← Volver al Menú
          </Button>
        </div>
      </div>
    </div>

    <!-- Estado General del Sistema -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card class="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent class="p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">8/8</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Sensores</h3>
          <p class="text-gray-600 text-sm">Activos</p>
        </CardContent>
      </Card>
      
      <Card class="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent class="p-6 text-center">
          <div class="text-4xl font-bold text-blue-600 mb-2">2.4</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">GHz</h3>
          <p class="text-gray-600 text-sm">Frecuencia</p>
        </CardContent>
      </Card>
      
      <Card class="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent class="p-6 text-center">
          <div class="text-4xl font-bold text-emerald-600 mb-2">98%</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Batería</h3>
          <p class="text-gray-600 text-sm">Promedio</p>
        </CardContent>
      </Card>
      
      <Card class="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent class="p-6 text-center">
          <div class="text-4xl font-bold text-purple-600 mb-2">12ms</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Latencia</h3>
          <p class="text-gray-600 text-sm">Promedio</p>
        </CardContent>
      </Card>
    </div>

    <!-- Estado de Sensores -->
    <Card class="bg-white/10 backdrop-blur-md border border-white/20 mb-8">
      <CardContent class="p-8">
        <h2 class="text-white text-2xl font-bold mb-6">Estado de Sensores DAEDO</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Competidor Rojo -->
          <Card class="bg-red-500/20 border border-red-500/30 rounded-xl">
            <CardContent class="p-6">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                <h3 class="text-red-300 font-bold text-lg">COMPETIDOR ROJO</h3>
              </div>
              
              <div class="space-y-4">
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Peto Electrónico</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 95%</span>
                      <span>Señal: -45dBm</span>
                      <span>ID: RED_CHEST_01</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Casco Electrónico</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 89%</span>
                      <span>Señal: -42dBm</span>
                      <span>ID: RED_HEAD_01</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Sensor Pie Izquierdo</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 92%</span>
                      <span>Señal: -38dBm</span>
                      <span>ID: RED_FOOT_L</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Sensor Pie Derecho</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 88%</span>
                      <span>Señal: -41dBm</span>
                      <span>ID: RED_FOOT_R</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <!-- Competidor Azul -->
          <Card class="bg-blue-500/20 border border-blue-500/30 rounded-xl">
            <CardContent class="p-6">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-4 h-4 bg-blue-600 rounded-full"></div>
                <h3 class="text-blue-300 font-bold text-lg">COMPETIDOR AZUL</h3>
              </div>
              
              <div class="space-y-4">
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Peto Electrónico</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 97%</span>
                      <span>Señal: -43dBm</span>
                      <span>ID: BLU_CHEST_01</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Casco Electrónico</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 91%</span>
                      <span>Señal: -40dBm</span>
                      <span>ID: BLU_HEAD_01</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Sensor Pie Izquierdo</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 94%</span>
                      <span>Señal: -37dBm</span>
                      <span>ID: BLU_FOOT_L</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card class="bg-white/10 border-0">
                  <CardContent class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-white font-semibold text-sm">Sensor Pie Derecho</span>
                      <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span class="text-green-400 text-xs font-semibold">ACTIVO</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs text-white/80">
                      <span>Batería: 90%</span>
                      <span>Señal: -39dBm</span>
                      <span>ID: BLU_FOOT_R</span>
                      <span>Firmware: v2.1.4</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>

    <!-- Panel de Control -->
    <Card class="bg-white/10 backdrop-blur-md border border-white/20 mb-8">
      <CardContent class="p-8">
        <h2 class="text-white text-2xl font-bold mb-6">Panel de Control</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button @click="sendCommand('reset')" 
                  class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl transition-all duration-300">
            Reset Sistema
          </Button>
          
          <Button @click="sendCommand('calibrate')" 
                  class="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-4 rounded-xl transition-all duration-300">
            Calibrar Sensores
          </Button>
          
          <Button @click="clearEvents" 
                  class="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-300">
            Limpiar Log
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Log de Eventos en Tiempo Real -->
    <Card class="bg-white/10 backdrop-blur-md border border-white/20">
      <CardContent class="p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-white text-2xl font-bold">Log de Eventos en Tiempo Real</h2>
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div :class="['w-3 h-3 rounded-full mr-2', isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></div>
              <span :class="['text-sm font-medium', isConnected ? 'text-green-400' : 'text-red-400']">
                {{ isConnected ? 'WebSocket Conectado' : 'WebSocket Desconectado' }}
              </span>
            </div>
            <div class="text-white/60 text-sm">
              {{ recentEvents.length }} eventos
            </div>
          </div>
        </div>
        
        <div class="bg-black/40 rounded-xl p-4 max-h-96 overflow-y-auto">
          <div v-if="recentEvents.length === 0" class="text-white/60 text-center py-8">
            <svg class="h-12 w-12 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p>No hay eventos registrados</p>
            <p class="text-sm">Conecta los controles DAEDO para ver datos en tiempo real</p>
          </div>
          
          <div v-else class="space-y-2">
            <div
              v-for="event in recentEvents"
              :key="event.id"
              :class="[
                'p-3 rounded-lg border-l-4 text-sm',
                {
                  'bg-blue-500/20 border-blue-500 text-blue-200': event.type === 'info',
                  'bg-green-500/20 border-green-500 text-green-200': event.type === 'success',
                  'bg-yellow-500/20 border-yellow-500 text-yellow-200': event.type === 'warning',
                  'bg-red-500/20 border-red-500 text-red-200': event.type === 'error',
                  'bg-purple-500/20 border-purple-500 text-purple-200': event.type === 'command',
                  'bg-orange-500/20 border-orange-500 text-orange-200': event.type === 'control',
                  'bg-cyan-500/20 border-cyan-500 text-cyan-200': event.type === 'hardware'
                }
              ]"
            >
              <div class="flex justify-between items-start">
                <span class="font-mono">{{ event.message }}</span>
                <span class="text-xs text-white/50 ml-4 whitespace-nowrap">
                  {{ formatTime(event.timestamp) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSocket } from '@/composables/useSocket'

const router = useRouter()
const { socket, isConnected, connect, disconnect, on, emit } = useSocket()

// Estado del sistema
const hardwareStatus = ref({
  connected: false,
  lastUpdate: null,
  controlsConnected: 8,
  batteryAverage: 98,
  latency: 12,
  frequency: 2.4
})

// Datos de sensores en tiempo real
const sensorData = ref({
  red: {
    chest: { active: true, battery: 95, signal: -45, id: 'RED_CHEST_01' },
    head: { active: true, battery: 89, signal: -42, id: 'RED_HEAD_01' },
    footLeft: { active: true, battery: 92, signal: -38, id: 'RED_FOOT_L' },
    footRight: { active: true, battery: 88, signal: -41, id: 'RED_FOOT_R' }
  },
  blue: {
    chest: { active: true, battery: 97, signal: -43, id: 'BLU_CHEST_01' },
    head: { active: true, battery: 91, signal: -40, id: 'BLU_HEAD_01' },
    footLeft: { active: true, battery: 94, signal: -37, id: 'BLU_FOOT_L' },
    footRight: { active: true, battery: 90, signal: -39, id: 'BLU_FOOT_R' }
  }
})

// Eventos recientes de controles
const recentEvents = ref([])

// Función para volver al menú
const goBack = () => {
  router.push('/')
}

// Función para agregar eventos
const addEvent = (message, type = 'info') => {
  recentEvents.value.unshift({
    id: Date.now(),
    timestamp: new Date(),
    message,
    type
  })
  
  // Mantener solo los últimos 20 eventos
  if (recentEvents.value.length > 20) {
    recentEvents.value = recentEvents.value.slice(0, 20)
  }
}

// Funciones del panel de control
const sendCommand = (command) => {
  console.log(`Comando enviado: ${command}`)
  emit('hardware_command', { command, timestamp: new Date() })
  addEvent(`Comando enviado: ${command}`, 'command')
}

const clearEvents = () => {
  recentEvents.value = []
  addEvent('Log de eventos limpiado', 'info')
}

// Función para formatear tiempo
const formatTime = (date) => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Configurar listeners de WebSocket al montar el componente
onMounted(() => {
  // Conectar WebSocket
  connect()
  
  addEvent('Monitor de hardware iniciado', 'info')
  
  // Escuchar eventos de hardware del backend
  on('hardware_connected', (data) => {
    hardwareStatus.value.connected = true
    hardwareStatus.value.lastUpdate = new Date()
    addEvent(`🔌 ${data.message}`, 'success')
  })
  
  on('hardware_disconnected', (data) => {
    hardwareStatus.value.connected = false
    addEvent(`🔌 ${data.message}`, 'warning')
  })
  
  on('hardware_error', (data) => {
    addEvent(`❌ ${data.message}: ${data.error}`, 'error')
  })
  
  // Escuchar eventos de controles DAEDO
  on('control_event', (data) => {
    console.log('🥋 Control event received:', data)
    addEvent(`🥋 ${data.control}: ${data.action} (${data.value})`, 'control')
    hardwareStatus.value.lastUpdate = new Date()
  })
  
  on('hardware_event', (data) => {
    console.log('🔥 Hardware event received:', data)
    addEvent(`🔥 ${data.message}`, 'hardware')
  })
})

onUnmounted(() => {
  // Desconectar WebSocket al desmontar
  disconnect()
})
</script>