<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div 
      class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-700"
      @click.stop
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">⚙️ Configuración del Combate</h2>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-4 mb-6 border-b border-gray-700">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-4 font-semibold transition-colors',
            activeTab === tab.id 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-white'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- General Tab -->
      <div v-if="activeTab === 'general'" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white font-semibold mb-2">Duración del Round (segundos)</label>
            <input 
              v-model.number="settings.roundDuration"
              type="number"
              min="60"
              max="300"
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
          </div>
          <div>
            <label class="block text-white font-semibold mb-2">Número de Rounds</label>
            <input 
              v-model.number="settings.totalRounds"
              type="number"
              min="1"
              max="5"
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white font-semibold mb-2">Tiempo de descanso (segundos)</label>
            <input 
              v-model.number="settings.restTime"
              type="number"
              min="30"
              max="120"
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
          </div>
          <div>
            <label class="block text-white font-semibold mb-2">Puntos para ganar</label>
            <input 
              v-model.number="settings.pointsToWin"
              type="number"
              min="10"
              max="50"
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
          </div>
        </div>
      </div>

      <!-- Competidores Tab -->
      <div v-if="activeTab === 'competitors'" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <!-- Competidor Azul -->
          <div class="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
            <h3 class="text-lg font-bold text-blue-300 mb-4">🔵 Competidor Azul</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-white font-semibold mb-2">Nombre</label>
                <input 
                  v-model="settings.blueCompetitor.name"
                  type="text"
                  placeholder="Ingresa el nombre"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Club/Escuela</label>
                <input 
                  v-model="settings.blueCompetitor.club"
                  type="text"
                  placeholder="Nombre del club"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Categoría</label>
                <select 
                  v-model="settings.blueCompetitor.category"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="infantil">Infantil</option>
                  <option value="cadete">Cadete</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Competidor Rojo -->
          <div class="bg-red-500/20 rounded-xl p-4 border border-red-400/30">
            <h3 class="text-lg font-bold text-red-300 mb-4">🔴 Competidor Rojo</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-white font-semibold mb-2">Nombre</label>
                <input 
                  v-model="settings.redCompetitor.name"
                  type="text"
                  placeholder="Ingresa el nombre"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Club/Escuela</label>
                <input 
                  v-model="settings.redCompetitor.club"
                  type="text"
                  placeholder="Nombre del club"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Categoría</label>
                <select 
                  v-model="settings.redCompetitor.category"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="infantil">Infantil</option>
                  <option value="cadete">Cadete</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Puntuación Tab -->
      <div v-if="activeTab === 'scoring'" class="space-y-6">
        <div class="bg-gray-800/50 rounded-xl p-4">
          <h3 class="text-lg font-bold text-white mb-4">Sistema de Puntuación</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white font-semibold mb-2">Puntos por golpe básico</label>
              <input 
                v-model.number="settings.scoring.basicHit"
                type="number"
                min="1"
                max="5"
                class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
            </div>
            <div>
              <label class="block text-white font-semibold mb-2">Puntos por patada al cuerpo</label>
              <input 
                v-model.number="settings.scoring.bodyKick"
                type="number"
                min="1"
                max="5"
                class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
            </div>
            <div>
              <label class="block text-white font-semibold mb-2">Puntos por patada a la cabeza</label>
              <input 
                v-model.number="settings.scoring.headKick"
                type="number"
                min="1"
                max="10"
                class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
            </div>
            <div>
              <label class="block text-white font-semibold mb-2">Puntos por técnica girada</label>
              <input 
                v-model.number="settings.scoring.turningKick"
                type="number"
                min="1"
                max="10"
                class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-4">
          <h3 class="text-lg font-bold text-white mb-4">Configuración de Faltas</h3>
          <div class="space-y-3">
            <label class="flex items-center text-white">
              <input 
                v-model="settings.penalties.autoDeductPoints"
                type="checkbox"
                class="mr-2"
              >
              Descontar puntos automáticamente por faltas
            </label>
            <label class="flex items-center text-white">
              <input 
                v-model="settings.penalties.maxPenalties"
                type="number"
                min="5"
                max="20"
                class="w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 mr-2"
              >
              Número máximo de faltas antes de descalificación
            </label>
          </div>
        </div>
      </div>

      <!-- Hardware Tab -->
      <div v-if="activeTab === 'hardware'" class="space-y-6">
        <div class="bg-gray-800/50 rounded-xl p-4">
          <h3 class="text-lg font-bold text-white mb-4">Configuración de Hardware</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-white font-semibold mb-2">Puerto Serie</label>
              <select 
                v-model="settings.hardware.serialPort"
                class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Seleccionar puerto</option>
                <option value="/dev/tty.usbserial-14430">USB Serial 14430</option>
                <option value="/dev/tty.usbserial-14431">USB Serial 14431</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-white font-semibold mb-2">Baud Rate</label>
                <select 
                  v-model.number="settings.hardware.baudRate"
                  class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="9600">9600</option>
                  <option value="19200">19200</option>
                  <option value="38400">38400</option>
                  <option value="57600">57600</option>
                </select>
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Sensibilidad</label>
                <input 
                  v-model.number="settings.hardware.sensitivity"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full"
                >
                <div class="text-center text-gray-400 text-sm">{{ settings.hardware.sensitivity }}/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-between mt-8">
        <button 
          @click="resetToDefaults"
          class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
        >
          Restaurar Defaults
        </button>
        
        <div class="flex gap-3">
          <button 
            @click="closeModal"
            class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
          >
            Cancelar
          </button>
          <button 
            @click="saveSettings"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  initialSettings: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save'])

const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'competitors', label: 'Competidores' },
  { id: 'scoring', label: 'Puntuación' },
  { id: 'hardware', label: 'Hardware' }
]

// Configuración por defecto
const defaultSettings = {
  roundDuration: 180,
  totalRounds: 3,
  restTime: 60,
  pointsToWin: 20,
  blueCompetitor: {
    name: '',
    club: '',
    category: ''
  },
  redCompetitor: {
    name: '',
    club: '',
    category: ''
  },
  scoring: {
    basicHit: 1,
    bodyKick: 2,
    headKick: 3,
    turningKick: 4
  },
  penalties: {
    autoDeductPoints: true,
    maxPenalties: 10
  },
  hardware: {
    serialPort: '/dev/tty.usbserial-14430',
    baudRate: 19200,
    sensitivity: 5
  }
}

const settings = ref({ ...defaultSettings, ...props.initialSettings })

const closeModal = () => {
  emit('close')
}

const saveSettings = () => {
  emit('save', { ...settings.value })
  closeModal()
}

const resetToDefaults = () => {
  settings.value = { ...defaultSettings }
}

watch(() => props.initialSettings, (newSettings) => {
  settings.value = { ...defaultSettings, ...newSettings }
}, { deep: true })
</script>