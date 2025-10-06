<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-900 p-4">
    <!-- Header -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h1 class="text-2xl font-bold text-white flex items-center gap-2">
        ⚙️ Configuración WT - Hardware Mapping
      </h1>
      <p class="text-green-100 mt-2">
        Configuración del mapeo de hardware para controles DAEDO
      </p>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Gestión de Puerto Serie</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <!-- Serial Port Selection -->
        <div class="bg-white/10 rounded-lg p-4">
          <h3 class="text-white font-medium mb-3">📡 Conexión de Puerto</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Puerto Disponible</label>
              <select 
                v-model="selectedPort"
                @change="onPortSelect"
                class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
                :disabled="isConnecting"
              >
                <option value="">Seleccionar puerto...</option>
                <option 
                  v-for="port in availablePorts" 
                  :key="port.path"
                  :value="port.path"
                >
                  {{ port.friendlyName }}
                </option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-white text-sm font-medium mb-1">Baud Rate</label>
                <select 
                  v-model="serialConfig.baudRate"
                  class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
                >
                  <option :value="9600">9600</option>
                  <option :value="19200">19200</option>
                  <option :value="38400">38400</option>
                  <option :value="57600">57600</option>
                  <option :value="115200">115200</option>
                </select>
              </div>
              <div>
                <label class="block text-white text-sm font-medium mb-1">Data Bits</label>
                <select 
                  v-model="serialConfig.dataBits"
                  class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
                >
                  <option :value="8">8</option>
                  <option :value="7">7</option>
                  <option :value="6">6</option>
                  <option :value="5">5</option>
                </select>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button 
                @click="refreshPorts"
                :disabled="isConnecting"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                🔄 Actualizar Puertos
              </button>
              
              <button 
                v-if="!serialStatus.connected"
                @click="connectToPort"
                :disabled="!selectedPort || isConnecting"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {{ isConnecting ? 'Conectando...' : '🔌 Conectar' }}
              </button>
              
              <button 
                v-else
                @click="disconnectFromPort"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                🔌 Desconectar
              </button>
            </div>
          </div>
        </div>

        <!-- Connection Status -->
        <div class="bg-white/10 rounded-lg p-4">
          <h3 class="text-white font-medium mb-3">📊 Estado de Conexión</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-white/70">Estado:</span>
              <span 
                :class="serialStatus.connected ? 'text-green-300' : 'text-red-300'"
                class="font-semibold"
              >
                {{ serialStatus.connected ? '✅ Conectado' : '❌ Desconectado' }}
              </span>
            </div>
            
            <div v-if="serialStatus.connected" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-white/70">Puerto:</span>
                <span class="text-white font-mono">{{ serialStatus.port }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-white/70">Baud Rate:</span>
                <span class="text-white">{{ serialStatus.baudRate }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-white/70">Bytes Recibidos:</span>
                <span class="text-white">{{ serialStatus.bytesReceived }}</span>
              </div>
              
              <div v-if="serialStatus.lastActivity" class="flex items-center justify-between">
                <span class="text-white/70">Última Actividad:</span>
                <span class="text-white text-sm">{{ formatTime(serialStatus.lastActivity) }}</span>
              </div>
            </div>
            
            <div v-if="serialStatus.error" class="bg-red-500/20 border border-red-500/50 rounded p-2">
              <span class="text-red-300 text-sm">❌ {{ serialStatus.error }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hardware Mapping Actions -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Acciones de Hardware</h2>
      <div class="flex gap-4">
        <button 
          @click="initializeDefaultMapping"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          🔧 Inicializar Mapeo por Defecto
        </button>
        
        <button 
          @click="loadCurrentMapping"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          🔄 Recargar Configuración
        </button>
        
        <button 
          @click="testAllButtons"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          🧪 Probar Todos los Botones
        </button>
      </div>
    </div>

    <!-- Hardware Mapping Table -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Mapeo Actual de Hardware</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-white">
          <thead>
            <tr class="border-b border-white/30">
              <th class="text-left py-3 px-4">Valor Hex</th>
              <th class="text-left py-3 px-4">Juez</th>
              <th class="text-left py-3 px-4">Competidor</th>
              <th class="text-left py-3 px-4">Técnica</th>
              <th class="text-left py-3 px-4">Puntos</th>
              <th class="text-left py-3 px-4">Descripción</th>
              <th class="text-left py-3 px-4">Estado</th>
              <th class="text-left py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="mapping in hardwareMappings" 
              :key="mapping.hexValue"
              class="border-b border-white/20 hover:bg-white/10"
            >
              <td class="py-3 px-4 font-mono">{{ mapping.hexValue }}</td>
              <td class="py-3 px-4">{{ mapping.judgeId }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="mapping.competitor === 'BLUE' ? 'text-blue-300' : 'text-red-300'"
                  class="font-semibold"
                >
                  {{ mapping.competitor }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatTechnique(mapping.technique) }}</td>
              <td class="py-3 px-4 font-bold">{{ mapping.points }}</td>
              <td class="py-3 px-4 text-sm">{{ mapping.description }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="mapping.isActive ? 'text-green-300' : 'text-red-300'"
                  class="text-sm font-medium"
                >
                  {{ mapping.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <button 
                    @click="testButton(mapping.hexValue)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Probar
                  </button>
                  <button 
                    @click="editMapping(mapping)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button 
                    @click="toggleMapping(mapping)"
                    :class="mapping.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                    class="text-white px-2 py-1 rounded text-sm"
                  >
                    {{ mapping.isActive ? 'Desactivar' : 'Activar' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Mapping Form -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">
        {{ editingMapping ? 'Editar Mapeo' : 'Agregar Nuevo Mapeo' }}
      </h2>
      
      <form @submit.prevent="saveMapping" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-white text-sm font-medium mb-2">Valor Hex</label>
          <input 
            v-model="mappingForm.hexValue"
            type="text"
            placeholder="0x11"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30 placeholder-white/50"
            required
          />
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Juez</label>
          <select 
            v-model="mappingForm.judgeId"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="1">Juez 1</option>
            <option value="2">Juez 2</option>
            <option value="3">Juez 3</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Competidor</label>
          <select 
            v-model="mappingForm.competitor"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="BLUE">AZUL</option>
            <option value="RED">ROJO</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Técnica</label>
          <select 
            v-model="mappingForm.technique"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="PUNCH_BODY">Golpe al Cuerpo</option>
            <option value="KICK_BODY">Patada al Cuerpo</option>
            <option value="KICK_HEAD">Patada a la Cabeza</option>
            <option value="KICK_BODY_TURN">Patada Giratoria al Cuerpo</option>
            <option value="KICK_HEAD_TURN">Patada Giratoria a la Cabeza</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Puntos</label>
          <input 
            v-model.number="mappingForm.points"
            type="number"
            min="1"
            max="5"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
            required
          />
        </div>
        
        <div class="lg:col-span-2">
          <label class="block text-white text-sm font-medium mb-2">Descripción</label>
          <input 
            v-model="mappingForm.description"
            type="text"
            placeholder="Descripción opcional"
            class="w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30 placeholder-white/50"
          />
        </div>
        
        <div class="flex gap-2">
          <button 
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            {{ editingMapping ? 'Actualizar' : 'Agregar' }}
          </button>
          
          <button 
            v-if="editingMapping"
            type="button"
            @click="cancelEdit"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Test Results -->
    <div v-if="testResults.length > 0" class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 class="text-lg font-semibold text-white mb-4">Resultados de Pruebas</h2>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div 
          v-for="result in testResults" 
          :key="result.id"
          class="bg-white/10 rounded px-3 py-2 text-sm text-white"
        >
          <span class="text-gray-300">{{ formatTime(result.timestamp) }}</span>
          - <span :class="result.success ? 'text-green-300' : 'text-red-300'">
            {{ result.message }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'WTHardwareConfig',
  setup() {
    // Reactive data
    const hardwareMappings = ref([])
    const mappingForm = ref({
      hexValue: '',
      judgeId: '',
      competitor: '',
      technique: '',
      points: 1,
      description: ''
    })
    const editingMapping = ref(null)
    const testResults = ref([])

    // Serial port management
    const availablePorts = ref([])
    const selectedPort = ref('')
    const isConnecting = ref(false)
    const serialStatus = ref({
      connected: false,
      port: null,
      baudRate: null,
      lastActivity: null,
      bytesReceived: 0,
      error: null
    })
    const serialConfig = ref({
      baudRate: 19200,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    })

    // API Base URL
    const API_BASE = 'http://localhost:3000/api'

    // Serial Port Management Functions
    const refreshPorts = async () => {
      try {
        addTestResult('Escaneando puertos disponibles...', true)
        
        const response = await fetch(`${API_BASE}/hardware/serial-ports`)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.success && data.data) {
          availablePorts.value = data.data
          addTestResult(`✅ ${data.data.length} puertos encontrados`, true)
          
          // Mostrar detalles de puertos encontrados
          data.data.forEach(port => {
            addTestResult(`   📱 ${port.friendlyName}`, true)
          })
        } else {
          addTestResult('❌ Error: ' + (data.message || 'No se pudieron obtener los puertos'), false)
          availablePorts.value = []
        }
      } catch (error) {
        console.error('Error refreshing ports:', error)
        addTestResult(`❌ Error de conexión: ${error.message}`, false)
        availablePorts.value = []
      }
    }

    const getSerialStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/hardware/serial-status`)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.success && data.data) {
          serialStatus.value = data.data
          
          // Si está conectado, actualizar el puerto seleccionado
          if (data.data.connected && data.data.port) {
            selectedPort.value = data.data.port
            addTestResult(`🔗 Conectado a: ${data.data.port}`, true)
          } else {
            addTestResult('📱 Sin conexión activa', true)
          }
        }
      } catch (error) {
        console.error('Error getting serial status:', error)
        addTestResult(`❌ Error obteniendo estado: ${error.message}`, false)
        // Resetear estado en caso de error
        serialStatus.value = {
          connected: false,
          port: null,
          baudRate: null,
          lastActivity: null,
          bytesReceived: 0,
          error: 'Error de comunicación'
        }
      }
    }

    const onPortSelect = () => {
      if (selectedPort.value) {
        const port = availablePorts.value.find(p => p.path === selectedPort.value)
        if (port) {
          addTestResult(`Puerto seleccionado: ${port.friendlyName}`, true)
        }
      }
    }

    const connectToPort = async () => {
      if (!selectedPort.value) {
        addTestResult('Por favor selecciona un puerto', false)
        return
      }

      isConnecting.value = true
      try {
        addTestResult(`Conectando a ${selectedPort.value}...`, true)
        
        const response = await fetch(`${API_BASE}/hardware/serial-connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            path: selectedPort.value,
            baudRate: serialConfig.value.baudRate,
            dataBits: serialConfig.value.dataBits,
            parity: serialConfig.value.parity,
            stopBits: serialConfig.value.stopBits
          })
        })
        
        const data = await response.json()
        
        if (data.success) {
          addTestResult(`✅ Conectado exitosamente`, true)
          await getSerialStatus()
        } else {
          addTestResult(`❌ Error de conexión: ${data.message}`, false)
        }
      } catch (error) {
        console.error('Error connecting:', error)
        addTestResult('❌ Error conectando al puerto', false)
      } finally {
        isConnecting.value = false
      }
    }

    const disconnectFromPort = async () => {
      try {
        addTestResult('Desconectando...', true)
        
        const response = await fetch(`${API_BASE}/hardware/serial-disconnect`, {
          method: 'POST'
        })
        
        const data = await response.json()
        
        if (data.success) {
          addTestResult('✅ Desconectado exitosamente', true)
          selectedPort.value = ''
          await getSerialStatus()
        } else {
          addTestResult(`❌ Error desconectando: ${data.message}`, false)
        }
      } catch (error) {
        console.error('Error disconnecting:', error)
        addTestResult('❌ Error desconectando', false)
      }
    }

    // Load current hardware mapping
    const loadCurrentMapping = async () => {
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/hardware-mapping`)
        const data = await response.json()
        
        if (data.success) {
          hardwareMappings.value = data.data
          addTestResult('Configuración cargada exitosamente', true)
        }
      } catch (error) {
        console.error('Error loading hardware mapping:', error)
        addTestResult('Error cargando configuración', false)
      }
    }

    // Initialize default mapping
    const initializeDefaultMapping = async () => {
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/initialize`, {
          method: 'POST'
        })
        const data = await response.json()
        
        if (data.success) {
          addTestResult('Mapeo por defecto inicializado', true)
          await loadCurrentMapping()
        }
      } catch (error) {
        console.error('Error initializing mapping:', error)
        addTestResult('Error inicializando mapeo por defecto', false)
      }
    }

    // Save mapping (add or update)
    const saveMapping = async () => {
      try {
        const response = await fetch(`${API_BASE}/wt-scoring/hardware-mapping`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mappingForm.value)
        })
        
        const data = await response.json()
        
        if (data.success) {
          addTestResult(
            editingMapping.value ? 'Mapeo actualizado' : 'Mapeo agregado', 
            true
          )
          resetForm()
          await loadCurrentMapping()
        }
      } catch (error) {
        console.error('Error saving mapping:', error)
        addTestResult('Error guardando mapeo', false)
      }
    }

    // Edit mapping
    const editMapping = (mapping) => {
      editingMapping.value = mapping
      mappingForm.value = { ...mapping }
    }

    // Cancel edit
    const cancelEdit = () => {
      editingMapping.value = null
      resetForm()
    }

    // Reset form
    const resetForm = () => {
      mappingForm.value = {
        hexValue: '',
        judgeId: '',
        competitor: '',
        technique: '',
        points: 1,
        description: ''
      }
      editingMapping.value = null
    }

    // Toggle mapping active state
    const toggleMapping = async (mapping) => {
      try {
        if (mapping.isActive) {
          // Deactivate
          const response = await fetch(`${API_BASE}/wt-scoring/hardware-mapping/${mapping.hexValue}`, {
            method: 'DELETE'
          })
          const data = await response.json()
          
          if (data.success) {
            addTestResult(`Mapeo ${mapping.hexValue} desactivado`, true)
            await loadCurrentMapping()
          }
        } else {
          // Reactivate by updating
          const response = await fetch(`${API_BASE}/wt-scoring/hardware-mapping`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...mapping, isActive: true })
          })
          
          const data = await response.json()
          
          if (data.success) {
            addTestResult(`Mapeo ${mapping.hexValue} activado`, true)
            await loadCurrentMapping()
          }
        }
      } catch (error) {
        console.error('Error toggling mapping:', error)
        addTestResult('Error cambiando estado del mapeo', false)
      }
    }

    // Test single button
    const testButton = async (hexValue) => {
      // For testing, we'll create a temporary match
      try {
        addTestResult(`Probando botón ${hexValue}...`, true)
        
        // Simulate button press (this would normally come from hardware)
        const testMatchId = 1 // Demo match ID
        const response = await fetch(`${API_BASE}/wt-scoring/matches/${testMatchId}/button-press`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hexValue })
        })
        
        const data = await response.json()
        
        if (data.success) {
          addTestResult(`✅ Botón ${hexValue} funcionando`, true)
        } else {
          addTestResult(`❌ Error probando botón ${hexValue}`, false)
        }
      } catch (error) {
        console.error('Error testing button:', error)
        addTestResult(`❌ Error probando botón ${hexValue}`, false)
      }
    }

    // Test all buttons
    const testAllButtons = async () => {
      addTestResult('Iniciando prueba de todos los botones...', true)
      
      for (const mapping of hardwareMappings.value) {
        if (mapping.isActive) {
          await testButton(mapping.hexValue)
          // Small delay between tests
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
      
      addTestResult('Prueba de todos los botones completada', true)
    }

    // Helper functions
    const formatTechnique = (technique) => {
      const techniques = {
        'PUNCH_BODY': 'Golpe al Cuerpo',
        'KICK_BODY': 'Patada al Cuerpo',
        'KICK_HEAD': 'Patada a la Cabeza',
        'KICK_BODY_TURN': 'Patada Giratoria al Cuerpo',
        'KICK_HEAD_TURN': 'Patada Giratoria a la Cabeza'
      }
      return techniques[technique] || technique
    }

    const addTestResult = (message, success) => {
      testResults.value.unshift({
        id: Date.now(),
        message,
        success,
        timestamp: new Date()
      })
      
      // Keep only last 50 results
      if (testResults.value.length > 50) {
        testResults.value = testResults.value.slice(0, 50)
      }
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString()
    }

    // Lifecycle
    onMounted(async () => {
      addTestResult('🚀 Iniciando configuración de hardware...', true)
      
      try {
        // Primero verificar conexión con el backend
        addTestResult('📡 Conectando con el backend...', true)
        
        // Cargar datos en paralelo pero con manejo de errores individual
        const results = await Promise.allSettled([
          loadCurrentMapping(),
          refreshPorts(),
          getSerialStatus()
        ])
        
        // Reportar resultados
        if (results[0].status === 'fulfilled') {
          addTestResult('✅ Configuración de mapeo cargada', true)
        } else {
          addTestResult('⚠️ Error cargando mapeo', false)
        }
        
        if (results[1].status === 'fulfilled') {
          addTestResult('✅ Escaneo de puertos completado', true)
        } else {
          addTestResult('⚠️ Error escaneando puertos', false)
        }
        
        if (results[2].status === 'fulfilled') {
          addTestResult('✅ Estado de conexión verificado', true)
        } else {
          addTestResult('⚠️ Error verificando estado', false)
        }
        
        addTestResult('🎯 Configuración inicial completada', true)
        
      } catch (error) {
        addTestResult(`❌ Error en inicialización: ${error.message}`, false)
      }
      
      // Actualizar estado cada 10 segundos (menos agresivo)
      setInterval(async () => {
        try {
          await getSerialStatus()
        } catch (error) {
          console.error('Error in status interval:', error)
        }
      }, 10000) // Cambiado de 5000 a 10000ms
    })

    return {
      // Hardware mapping
      hardwareMappings,
      mappingForm,
      editingMapping,
      testResults,
      loadCurrentMapping,
      initializeDefaultMapping,
      saveMapping,
      editMapping,
      cancelEdit,
      resetForm,
      toggleMapping,
      testButton,
      testAllButtons,
      formatTechnique,
      formatTime,
      
      // Serial port management
      availablePorts,
      selectedPort,
      isConnecting,
      serialStatus,
      serialConfig,
      refreshPorts,
      getSerialStatus,
      onPortSelect,
      connectToPort,
      disconnectFromPort
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for test results */
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