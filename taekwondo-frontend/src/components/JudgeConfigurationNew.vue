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
        <div v-if="currentConfig && currentConfig.isActive" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 class="font-semibold text-blue-900 mb-2">✅ Configuración Actual Activa</h3>
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

          <!-- Configuración de Jueces -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900">Asignación de Jueces</h3>
            
            <!-- Juez 1 -->
            <div class="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Juez 1</h4>
                  <div class="text-xs text-gray-600">Rango de control: 193-203</div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Juez *
                </label>
                <input 
                  v-model="form.judge1Name" 
                  type="text" 
                  required
                  placeholder="Ej: Juan Pérez"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Juez 2 -->
            <div class="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Juez 2</h4>
                  <div class="text-xs text-gray-600">Rango de control: 209-219</div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Juez *
                </label>
                <input 
                  v-model="form.judge2Name" 
                  type="text" 
                  required
                  placeholder="Ej: María González"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <!-- Juez 3 -->
            <div class="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-violet-50">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Juez 3</h4>
                  <div class="text-xs text-gray-600">Rango de control: 225-235</div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Juez *
                </label>
                <input 
                  v-model="form.judge3Name" 
                  type="text" 
                  required
                  placeholder="Ej: Carlos López"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 pt-4">
            <Button 
              type="submit" 
              :disabled="!canSave || loading"
              class="flex-1"
            >
              {{ loading ? 'Guardando...' : '💾 Guardar Configuración' }}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              @click="resetForm"
              :disabled="loading"
            >
              🔄 Limpiar
            </Button>
          </div>
        </form>

        <!-- Validación -->
        <div v-if="errors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 class="font-semibold text-red-900 mb-2">Errores de validación:</h4>
          <ul class="list-disc list-inside text-sm text-red-700">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <!-- Presets Rápidos -->
        <div class="border-t pt-4">
          <h4 class="font-semibold text-gray-900 mb-3">⚡ Configuraciones Rápidas</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              @click="loadPreset('demo')"
              class="text-left"
            >
              🎯 Demo - Jueces de Prueba
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              @click="loadPreset('official')"
              class="text-left"
            >
              🏆 Oficial - Torneo Nacional
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Props
const props = defineProps({
  onConfigurationSaved: Function
})

// Reactive data
const currentConfig = ref(null)
const loading = ref(false)
const errors = ref([])

const form = ref({
  tournament: '',
  category: '',
  judge1Name: '',
  judge2Name: '',
  judge3Name: ''
})

// Computed
const canSave = computed(() => {
  return form.value.judge1Name.trim() && 
         form.value.judge2Name.trim() && 
         form.value.judge3Name.trim()
})

// Methods
const loadCurrentConfiguration = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/judges/current-config')
    const result = await response.json()
    
    if (result.success && result.data) {
      currentConfig.value = result.data
      
      // Pre-cargar el formulario si hay configuración activa
      if (result.data.isActive) {
        form.value = {
          tournament: result.data.tournament || '',
          category: result.data.category || '',
          judge1Name: result.data.judge1Name || '',
          judge2Name: result.data.judge2Name || '',
          judge3Name: result.data.judge3Name || ''
        }
      }
    }
  } catch (error) {
    console.error('Error loading judge configuration:', error)
  }
}

const saveConfiguration = async () => {
  try {
    loading.value = true
    errors.value = []

    const response = await fetch('http://localhost:3000/api/judges/set-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()
    
    if (result.success) {
      currentConfig.value = result.data
      
      // Notificar al componente padre
      if (props.onConfigurationSaved) {
        props.onConfigurationSaved(result.data)
      }
      
      // Mostrar mensaje de éxito
      alert('✅ Configuración de jueces guardada exitosamente!')
      
      // Recargar configuración
      await loadCurrentConfiguration()
    } else {
      if (result.errors) {
        errors.value = result.errors
      } else {
        errors.value = [result.message || 'Error al guardar configuración']
      }
    }
  } catch (error) {
    console.error('Error saving judge configuration:', error)
    errors.value = ['Error de conexión al guardar configuración']
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    tournament: '',
    category: '',
    judge1Name: '',
    judge2Name: '',
    judge3Name: ''
  }
  errors.value = []
}

const loadPreset = (type) => {
  if (type === 'demo') {
    form.value = {
      tournament: 'Torneo de Demostración',
      category: 'Categoría de Prueba',
      judge1Name: 'Juez Demo 1',
      judge2Name: 'Juez Demo 2',
      judge3Name: 'Juez Demo 3'
    }
  } else if (type === 'official') {
    form.value = {
      tournament: 'Campeonato Nacional 2025',
      category: 'Senior Masculino',
      judge1Name: 'Maestro Juan Pérez',
      judge2Name: 'Maestra María González',
      judge3Name: 'Maestro Carlos López'
    }
  }
  errors.value = []
}

// Lifecycle
onMounted(() => {
  loadCurrentConfiguration()
})

// Expose methods
defineExpose({
  loadCurrentConfiguration,
  resetForm
})
</script>