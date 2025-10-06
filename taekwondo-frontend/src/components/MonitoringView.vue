<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-6 lg:p-8 overflow-y-auto" 
       style="width: 100% !important;">
    
    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl mb-8 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-xl">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-black text-white">Monitoreo Tiempo Real</h1>
            <p class="text-blue-200">Dashboard de supervisión completa del sistema DAEDO</p>
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

    <!-- Grid Principal de Métricas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <!-- Combates Activos -->
      <Card class="bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/30">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-200 text-sm font-medium">Combates Activos</p>
              <p class="text-3xl font-bold text-white">{{ stats.activeFights }}</p>
            </div>
            <div class="bg-red-500/20 p-3 rounded-xl">
              <svg class="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Hardware Conectado -->
      <Card class="bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/30">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-200 text-sm font-medium">Hardware Conectado</p>
              <p class="text-3xl font-bold text-white">{{ stats.connectedDevices }}/8</p>
            </div>
            <div class="bg-green-500/20 p-3 rounded-xl">
              <svg class="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Usuarios Online -->
      <Card class="bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-500/30">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-200 text-sm font-medium">Usuarios Online</p>
              <p class="text-3xl font-bold text-white">{{ stats.onlineUsers }}</p>
            </div>
            <div class="bg-blue-500/20 p-3 rounded-xl">
              <svg class="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Tiempo Activo -->
      <Card class="bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-200 text-sm font-medium">Tiempo Activo</p>
              <p class="text-3xl font-bold text-white">{{ stats.uptime }}</p>
            </div>
            <div class="bg-purple-500/20 p-3 rounded-xl">
              <svg class="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Dashboard de Eventos y Controles -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      
      <!-- Monitor de Eventos en Tiempo Real -->
      <Card class="bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white">Eventos en Tiempo Real</h3>
            <div class="flex items-center space-x-2">
              <div :class="['w-3 h-3 rounded-full', isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></div>
              <span :class="['text-sm font-medium', isConnected ? 'text-green-400' : 'text-red-400']">
                {{ isConnected ? 'Conectado' : 'Desconectado' }}
              </span>
            </div>
          </div>
          
          <div class="bg-black/40 rounded-xl p-4 h-80 overflow-y-auto">
            <div v-if="recentEvents.length === 0" class="text-white/60 text-center py-16">
              <svg class="h-12 w-12 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <p>Esperando eventos...</p>
              <p class="text-sm">Los eventos del sistema aparecerán aquí</p>
            </div>
            
            <div v-else class="space-y-2">
              <div
                v-for="event in recentEvents.slice(0, 15)"
                :key="event.id"
                :class="[
                  'p-3 rounded-lg border-l-4 text-sm transition-all duration-300',
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

      <!-- Estado de Controles DAEDO -->
      <Card class="bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent class="p-6">
          <h3 class="text-xl font-bold text-white mb-6">Estado de Controles DAEDO</h3>
          
          <div class="space-y-4">
            <!-- Control Rojo -->
            <div class="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span class="text-red-300 font-semibold">COMPETIDOR ROJO</span>
                </div>
                <span class="text-green-400 text-sm font-medium">ACTIVO</span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Última actividad</div>
                  <div class="text-white font-mono">{{ formatTime(lastActivity.red) }}</div>
                </div>
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Golpes detectados</div>
                  <div class="text-white font-mono">{{ stats.redHits }}</div>
                </div>
              </div>
            </div>

            <!-- Control Azul -->
            <div class="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-blue-300 font-semibold">COMPETIDOR AZUL</span>
                </div>
                <span class="text-green-400 text-sm font-medium">ACTIVO</span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Última actividad</div>
                  <div class="text-white font-mono">{{ formatTime(lastActivity.blue) }}</div>
                </div>
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Golpes detectados</div>
                  <div class="text-white font-mono">{{ stats.blueHits }}</div>
                </div>
              </div>
            </div>

            <!-- Control Neutro -->
            <div class="bg-gray-500/20 rounded-xl p-4 border border-gray-500/30">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span class="text-gray-300 font-semibold">CONTROL GENERAL</span>
                </div>
                <span class="text-green-400 text-sm font-medium">ACTIVO</span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Última actividad</div>
                  <div class="text-white font-mono">{{ formatTime(lastActivity.general) }}</div>
                </div>
                <div class="bg-white/10 rounded p-2">
                  <div class="text-white/70">Comandos enviados</div>
                  <div class="text-white font-mono">{{ stats.commands }}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Controles Rápidos -->
    <Card class="bg-white/10 backdrop-blur-md border border-white/20">
      <CardContent class="p-6">
        <h3 class="text-xl font-bold text-white mb-6">Controles de Monitoreo</h3>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button @click="refreshStats" 
                  class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Actualizar
          </Button>
          
          <Button @click="clearEvents" 
                  class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Limpiar Log
          </Button>
          
          <Button @click="exportData" 
                  class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Exportar
          </Button>
          
          <Button @click="openHardwareMonitor" 
                  class="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
            Hardware
          </Button>
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

// Estadísticas del sistema
const stats = ref({
  activeFights: 2,
  connectedDevices: 8,
  onlineUsers: 12,
  uptime: '24h 15m',
  redHits: 0,
  blueHits: 0,
  commands: 0
})

// Última actividad por control
const lastActivity = ref({
  red: new Date(),
  blue: new Date(),
  general: new Date()
})

// Eventos recientes
const recentEvents = ref([])

// Funciones de navegación
const goBack = () => {
  router.push('/')
}

const openHardwareMonitor = () => {
  router.push('/hardware')
}

// Función para agregar eventos
const addEvent = (message, type = 'info') => {
  recentEvents.value.unshift({
    id: Date.now(),
    timestamp: new Date(),
    message,
    type
  })
  
  // Mantener solo los últimos 50 eventos
  if (recentEvents.value.length > 50) {
    recentEvents.value = recentEvents.value.slice(0, 50)
  }
}

// Función para formatear tiempo
const formatTime = (date) => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Funciones de control
const refreshStats = () => {
  addEvent('📊 Estadísticas actualizadas', 'info')
  // Aquí podrías hacer una petición al backend para obtener stats reales
}

const clearEvents = () => {
  recentEvents.value = []
  addEvent('🧹 Log de eventos limpiado', 'info')
}

const exportData = () => {
  const data = {
    timestamp: new Date().toISOString(),
    stats: stats.value,
    events: recentEvents.value
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `monitoring-export-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  addEvent('📁 Datos exportados exitosamente', 'success')
}

// Configurar WebSocket listeners
onMounted(() => {
  connect()
  addEvent('🚀 Monitor de tiempo real iniciado', 'success')
  
  // Escuchar eventos del sistema
  on('hardware_connected', (data) => {
    stats.value.connectedDevices = Math.min(8, stats.value.connectedDevices + 1)
    addEvent(`🔌 ${data.message}`, 'success')
  })
  
  on('hardware_disconnected', (data) => {
    stats.value.connectedDevices = Math.max(0, stats.value.connectedDevices - 1)
    addEvent(`🔌 ${data.message}`, 'warning')
  })
  
  on('control_event', (data) => {
    // Actualizar estadísticas según el control
    if (data.control.includes('Control 1')) {
      stats.value.redHits++
      lastActivity.value.red = new Date()
      addEvent(`🥋 Golpe ROJO detectado: ${data.value}`, 'control')
    } else if (data.control.includes('Control 2')) {
      stats.value.blueHits++
      lastActivity.value.blue = new Date()
      addEvent(`🥋 Golpe AZUL detectado: ${data.value}`, 'control')
    } else {
      lastActivity.value.general = new Date()
      addEvent(`🎮 ${data.control}: ${data.action}`, 'hardware')
    }
  })
  
  on('hardware_event', (data) => {
    addEvent(`🔧 ${data.message}`, 'hardware')
  })
  
  // Simular actualizaciones de tiempo activo
  setInterval(() => {
    const now = new Date()
    const start = new Date(now.getTime() - (24 * 60 * 60 * 1000) - (15 * 60 * 1000)) // 24h 15m ago
    const diff = now.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    stats.value.uptime = `${hours}h ${minutes}m`
  }, 60000) // Actualizar cada minuto
})

onUnmounted(() => {
  disconnect()
})
</script>