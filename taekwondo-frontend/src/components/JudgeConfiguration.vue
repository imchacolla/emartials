<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
        Configuración de Jueces
      </CardTitle>
      <CardDescription>
        Asigna nombres y configura los 3 jueces para el sistema DAEDO
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-6">
        <!-- Estado Actual -->
        <div v-if="currentConfig" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 class="font-semibold text-blue-900 mb-2">Configuración Actual</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div><strong>Juez 1:</strong> {{ currentConfig.judge1Name }}</div>
            <div><strong>Juez 2:</strong> {{ currentConfig.judge2Name }}</div>
            <div><strong>Juez 3:</strong> {{ currentConfig.judge3Name }}</div>
          </div>
          <div class="mt-2 text-xs text-blue-700">
            <div><strong>Torneo:</strong> {{ currentConfig.tournament }}</div>
            <div><strong>Categoría:</strong> {{ currentConfig.category }}</div>
          </div>
        </div>

        <!-- Formulario de Configuración -->
        <form @submit.prevent="saveConfiguration" class="space-y-4">
          <!-- Información del Evento -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Torneo
              </label>
              <input 
                v-model="form.tournament" 
                type="text" 
                placeholder="Ej: Campeonato Nacional 2025"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <input 
                v-model="form.category" 
                type="text" 
                placeholder="Ej: Senior Masculino -80kg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
                  required
                >
                  <option value="">Seleccionar juez</option>
                  <option v-for="judge in availableJudges" :key="judge.id" :value="judge.id">
                    {{ judge.name }} - {{ judge.level }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Posición
                </label>
                <select 
                  v-model="judgeConfig.judge1.position" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>

              <div class="bg-blue-100 p-2 rounded text-xs">
                <strong>Responsabilidad:</strong> Técnicas de pierna y cabeza lado izquierdo
              </div>
            </div>
          </div>

          <!-- Juez 2 -->
          <div class="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-gray-900">Control Juez 2</h3>
              <span class="text-xs text-gray-500">Rango: 209-219</span>
            </div>
            
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Juez
                </label>
                <select 
                  v-model="judgeConfig.judge2.judgeId" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Seleccionar juez</option>
                  <option v-for="judge in availableJudges" :key="judge.id" :value="judge.id">
                    {{ judge.name }} - {{ judge.level }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Posición
                </label>
                <select 
                  v-model="judgeConfig.judge2.position" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>

              <div class="bg-green-100 p-2 rounded text-xs">
                <strong>Responsabilidad:</strong> Técnicas centrales y giros
              </div>
            </div>
          </div>

          <!-- Juez 3 -->
          <div class="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-violet-50">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-gray-900">Control Juez 3</h3>
              <span class="text-xs text-gray-500">Rango: 225-235</span>
            </div>
            
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Juez
                </label>
                <select 
                  v-model="judgeConfig.judge3.judgeId" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Seleccionar juez</option>
                  <option v-for="judge in availableJudges" :key="judge.id" :value="judge.id">
                    {{ judge.name }} - {{ judge.level }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Posición
                </label>
                <select 
                  v-model="judgeConfig.judge3.position" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>

              <div class="bg-purple-100 p-2 rounded text-xs">
                <strong>Responsabilidad:</strong> Técnicas de pierna y cabeza lado derecho
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración Adicional -->
        <div class="border-t pt-6">
          <h4 class="font-semibold text-gray-900 mb-4">Configuración del Combate</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Modalidad de Puntuación
              </label>
              <select 
                v-model="judgeConfig.scoringMode" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="unanimous">Unánime (3 jueces)</option>
                <option value="majority">Mayoría (2 de 3)</option>
                <option value="weighted">Ponderado</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Competencia
              </label>
              <select 
                v-model="judgeConfig.competitionLevel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="local">Local</option>
                <option value="regional">Regional</option>
                <option value="national">Nacional</option>
                <option value="international">Internacional</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-between items-center pt-6 border-t">
          <div class="flex items-center gap-2">
            <div :class="['w-3 h-3 rounded-full', isConfigurationValid ? 'bg-green-500' : 'bg-red-500']"></div>
            <span class="text-sm text-gray-600">
              {{ isConfigurationValid ? 'Configuración válida' : 'Faltan datos' }}
            </span>
          </div>
          
          <div class="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              @click="loadPresetConfiguration"
            >
              Cargar Preset
            </Button>
            <Button 
              type="submit" 
              :disabled="!isConfigurationValid"
              class="bg-blue-600 hover:bg-blue-700"
            >
              Guardar Configuración
            </Button>
          </div>
        </div>

        <!-- Vista Previa de Asignación -->
        <div v-if="isConfigurationValid" class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 mb-3">Vista Previa de Asignación</h4>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(config, index) in [judgeConfig.judge1, judgeConfig.judge2, judgeConfig.judge3]" 
                 :key="index" 
                 class="text-center">
              <div class="text-sm font-medium text-gray-900">
                {{ getJudgeName(config.judgeId) }}
              </div>
              <div class="text-xs text-gray-500">
                Control {{ index + 1 }} - {{ config.position }}
              </div>
            </div>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Props
const props = defineProps({
  onConfigurationSaved: Function
})

// State
const availableJudges = ref([
  { id: 1, name: 'Juan Carlos Pérez', level: 'Nacional', certification: 'A1' },
  { id: 2, name: 'María González López', level: 'Internacional', certification: 'A2' },
  { id: 3, name: 'Carlos Alberto Martín', level: 'Regional', certification: 'B1' },
  { id: 4, name: 'Ana Isabel Rodríguez', level: 'Nacional', certification: 'A1' },
  { id: 5, name: 'Luis Fernando Torres', level: 'Internacional', certification: 'A2' },
  { id: 6, name: 'Carmen Rosa Silva', level: 'Regional', certification: 'B1' }
])

const judgeConfig = ref({
  judge1: {
    judgeId: '',
    position: 'left',
    controlRange: [193, 203]
  },
  judge2: {
    judgeId: '',
    position: 'center',
    controlRange: [209, 219]
  },
  judge3: {
    judgeId: '',
    position: 'right',
    controlRange: [225, 235]
  },
  scoringMode: 'majority',
  competitionLevel: 'local'
})

// Computed
const isConfigurationValid = computed(() => {
  return judgeConfig.value.judge1.judgeId && 
         judgeConfig.value.judge2.judgeId && 
         judgeConfig.value.judge3.judgeId &&
         // Verificar que no se repitan jueces
         new Set([
           judgeConfig.value.judge1.judgeId,
           judgeConfig.value.judge2.judgeId,
           judgeConfig.value.judge3.judgeId
         ]).size === 3
})

// Methods
const getJudgeName = (judgeId) => {
  const judge = availableJudges.value.find(j => j.id === parseInt(judgeId))
  return judge ? judge.name : 'No asignado'
}

const saveJudgeConfiguration = async () => {
  try {
    const configData = {
      ...judgeConfig.value,
      timestamp: new Date().toISOString(),
      configuredBy: 'current_user' // TODO: obtener del contexto de autenticación
    }

    const response = await fetch('http://localhost:3000/api/combat/judges/configure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(configData)
    })

    const result = await response.json()
    
    if (result.success) {
      alert('✅ Configuración de jueces guardada exitosamente')
      if (props.onConfigurationSaved) {
        props.onConfigurationSaved(configData)
      }
    } else {
      alert('❌ Error al guardar configuración: ' + result.message)
    }
  } catch (error) {
    console.error('Error saving judge configuration:', error)
    alert('❌ Error de conexión al guardar configuración')
  }
}

const loadPresetConfiguration = () => {
  // Configuración predeterminada para pruebas rápidas
  judgeConfig.value = {
    judge1: {
      judgeId: '1',
      position: 'left',
      controlRange: [193, 203]
    },
    judge2: {
      judgeId: '2',
      position: 'center',
      controlRange: [209, 219]
    },
    judge3: {
      judgeId: '3',
      position: 'right',
      controlRange: [225, 235]
    },
    scoringMode: 'majority',
    competitionLevel: 'local'
  }
}

// Lifecycle
onMounted(() => {
  // Cargar configuración guardada si existe
  loadSavedConfiguration()
})

const loadSavedConfiguration = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/combat/judges/configuration')
    const result = await response.json()
    
    if (result.success && result.data) {
      judgeConfig.value = result.data
    }
  } catch (error) {
    console.log('No se encontró configuración previa, usando valores por defecto')
  }
}
</script>