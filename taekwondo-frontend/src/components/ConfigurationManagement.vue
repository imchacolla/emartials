<template>
  <div style="width: 100%; padding: 2rem; overflow-y: auto;">
    <!-- Header -->
    <header style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
      <div style="padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 0.75rem;">
              <Settings style="width: 2rem; height: 2rem; color: white;" />
            </div>
            <div>
              <h1 style="font-size: 2rem; font-weight: bold; color: white; margin: 0 0 0.5rem 0;">Configuración del Sistema</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 0;">Administra la configuración global del sistema DAEDO</p>
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <button @click="saveAllConfigurations" :disabled="loading" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; opacity: loading ? 0.5 : 1;">
              <Save style="width: 1.25rem; height: 1.25rem;" />
              Guardar Todo
            </button>
            <button @click="showCreateModal = true" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.75rem; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
              <Plus style="width: 1.25rem; height: 1.25rem;" />
              Nueva Configuración
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Error Message -->
    <div v-if="error" style="background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); border-radius: 0.75rem; padding: 1rem; margin-bottom: 2rem; color: #f87171;">
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 0.75rem; padding: 1rem; margin-bottom: 2rem; color: #22c55e;">
      <strong>Éxito:</strong> {{ successMessage }}
    </div>

    <!-- Loading -->
    <div v-if="loading" style="text-align: center; padding: 2rem; color: white;">
      <div style="display: inline-block; width: 2rem; height: 2rem; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s ease-in-out infinite;"></div>
      <p style="margin-top: 1rem;">Cargando configuraciones...</p>
    </div>

    <!-- Configuration Sections -->
    <div v-else style="display: grid; gap: 2rem;">
      <!-- System Settings -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <Monitor style="width: 1.25rem; height: 1.25rem;" />
          Configuración del Sistema
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <div v-for="config in systemConfigs" :key="config.key">
            <label style="color: rgba(255,255,255,0.9); font-weight: 600; display: block; margin-bottom: 0.5rem;">{{ config.key }}</label>
            <p v-if="config.description" style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 0.5rem;">{{ config.description }}</p>
            
            <!-- String Input -->
            <input 
              v-if="config.type === 'STRING'" 
              v-model="config.value" 
              type="text" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Integer Input -->
            <input 
              v-else-if="config.type === 'INTEGER'" 
              v-model.number="config.value" 
              type="number" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Boolean Input -->
            <label v-else-if="config.type === 'BOOLEAN'" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input 
                v-model="config.value" 
                type="checkbox" 
                @change="markAsModified(config)"
                style="width: 1.25rem; height: 1.25rem;" 
              />
              <span style="color: white;">{{ config.value ? 'Habilitado' : 'Deshabilitado' }}</span>
            </label>
            
            <!-- JSON Input -->
            <textarea 
              v-else-if="config.type === 'JSON'" 
              v-model="config.valueDisplay" 
              @change="updateJsonValue(config)"
              rows="3"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; font-family: monospace; resize: vertical;" 
            ></textarea>

            <div v-if="config.modified" style="margin-top: 0.5rem;">
              <span style="background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">Modificado</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Combat Settings -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <Shield style="width: 1.25rem; height: 1.25rem;" />
          Configuración de Combate
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <div v-for="config in combatConfigs" :key="config.key">
            <label style="color: rgba(255,255,255,0.9); font-weight: 600; display: block; margin-bottom: 0.5rem;">{{ config.key }}</label>
            <p v-if="config.description" style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 0.5rem;">{{ config.description }}</p>
            
            <!-- String Input -->
            <input 
              v-if="config.type === 'STRING'" 
              v-model="config.value" 
              type="text" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Integer Input -->
            <input 
              v-else-if="config.type === 'INTEGER'" 
              v-model.number="config.value" 
              type="number" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Boolean Input -->
            <label v-else-if="config.type === 'BOOLEAN'" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input 
                v-model="config.value" 
                type="checkbox" 
                @change="markAsModified(config)"
                style="width: 1.25rem; height: 1.25rem;" 
              />
              <span style="color: white;">{{ config.value ? 'Habilitado' : 'Deshabilitado' }}</span>
            </label>
            
            <!-- JSON Input -->
            <textarea 
              v-else-if="config.type === 'JSON'" 
              v-model="config.valueDisplay" 
              @change="updateJsonValue(config)"
              rows="3"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; font-family: monospace; resize: vertical;" 
            ></textarea>

            <div v-if="config.modified" style="margin-top: 0.5rem;">
              <span style="background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">Modificado</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hardware Settings -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <Cpu style="width: 1.25rem; height: 1.25rem;" />
          Configuración de Hardware
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <div v-for="config in hardwareConfigs" :key="config.key">
            <label style="color: rgba(255,255,255,0.9); font-weight: 600; display: block; margin-bottom: 0.5rem;">{{ config.key }}</label>
            <p v-if="config.description" style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 0.5rem;">{{ config.description }}</p>
            
            <!-- String Input -->
            <input 
              v-if="config.type === 'STRING'" 
              v-model="config.value" 
              type="text" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Integer Input -->
            <input 
              v-else-if="config.type === 'INTEGER'" 
              v-model.number="config.value" 
              type="number" 
              @change="markAsModified(config)"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" 
            />
            
            <!-- Boolean Input -->
            <label v-else-if="config.type === 'BOOLEAN'" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input 
                v-model="config.value" 
                type="checkbox" 
                @change="markAsModified(config)"
                style="width: 1.25rem; height: 1.25rem;" 
              />
              <span style="color: white;">{{ config.value ? 'Habilitado' : 'Deshabilitado' }}</span>
            </label>
            
            <!-- JSON Input -->
            <textarea 
              v-else-if="config.type === 'JSON'" 
              v-model="config.valueDisplay" 
              @change="updateJsonValue(config)"
              rows="3"
              style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; font-family: monospace; resize: vertical;" 
            ></textarea>

            <div v-if="config.modified" style="margin-top: 0.5rem;">
              <span style="background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">Modificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear Configuración -->
    <div v-if="showCreateModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 1rem; padding: 2rem; width: 500px; max-height: 80vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0 0 1.5rem 0;">Nueva Configuración</h3>
        
        <form @submit.prevent="createConfiguration" style="display: grid; gap: 1rem;">
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Clave</label>
            <input v-model="configForm.key" type="text" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
          </div>
          
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Descripción</label>
            <textarea v-model="configForm.description" rows="2" style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; resize: vertical;"></textarea>
          </div>

          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Tipo</label>
            <select v-model="configForm.type" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;">
              <option value="">Seleccionar tipo</option>
              <option value="STRING">Texto</option>
              <option value="INTEGER">Número entero</option>
              <option value="BOOLEAN">Verdadero/Falso</option>
              <option value="JSON">JSON</option>
            </select>
          </div>

          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Valor inicial</label>
            <input v-model="configForm.value" type="text" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
          </div>

          <div>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input v-model="configForm.isPublic" type="checkbox" style="width: 1.25rem; height: 1.25rem;" />
              <span style="color: white;">Configuración pública</span>
            </label>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" style="flex: 1; background: rgba(34,197,94,0.2); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              Crear
            </button>
            <button type="button" @click="closeCreateModal" style="flex: 1; background: rgba(156,163,175,0.2); color: #9ca3af; border: 1px solid rgba(156,163,175,0.3); border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Settings, Plus, Save, Monitor, Shield, Cpu } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi.js'

const { configuration: configApi, loading, error } = useApi()

const configurations = ref([])
const showCreateModal = ref(false)
const successMessage = ref('')

const configForm = ref({
  key: '',
  description: '',
  type: '',
  value: '',
  isPublic: false
})

const systemConfigs = computed(() => 
  configurations.value.filter(config => 
    config.key.toLowerCase().includes('system') || 
    config.key.toLowerCase().includes('general') ||
    config.key.toLowerCase().includes('app')
  )
)

const combatConfigs = computed(() => 
  configurations.value.filter(config => 
    config.key.toLowerCase().includes('combat') || 
    config.key.toLowerCase().includes('match') ||
    config.key.toLowerCase().includes('round') ||
    config.key.toLowerCase().includes('score')
  )
)

const hardwareConfigs = computed(() => 
  configurations.value.filter(config => 
    config.key.toLowerCase().includes('hardware') || 
    config.key.toLowerCase().includes('serial') ||
    config.key.toLowerCase().includes('daedo') ||
    config.key.toLowerCase().includes('judge')
  )
)

const fetchConfigurations = async () => {
  try {
    const response = await configApi.getAll()
    configurations.value = (response.configurations || []).map(config => ({
      ...config,
      modified: false,
      valueDisplay: config.type === 'JSON' ? JSON.stringify(config.value, null, 2) : config.value
    }))
  } catch (err) {
    console.error('Error fetching configurations:', err)
  }
}

const markAsModified = (config) => {
  config.modified = true
}

const updateJsonValue = (config) => {
  try {
    config.value = JSON.parse(config.valueDisplay)
    markAsModified(config)
  } catch (err) {
    console.error('Invalid JSON:', err)
  }
}

const saveAllConfigurations = async () => {
  try {
    const modifiedConfigs = configurations.value
      .filter(config => config.modified)
      .map(config => ({
        key: config.key,
        value: config.value,
        type: config.type,
        description: config.description,
        isPublic: config.isPublic
      }))

    if (modifiedConfigs.length === 0) {
      successMessage.value = 'No hay cambios para guardar'
      setTimeout(() => successMessage.value = '', 3000)
      return
    }

    await configApi.bulkUpdate(modifiedConfigs)
    
    // Mark all as unmodified
    configurations.value.forEach(config => {
      config.modified = false
    })
    
    successMessage.value = `${modifiedConfigs.length} configuraciones guardadas exitosamente`
    setTimeout(() => successMessage.value = '', 5000)
  } catch (err) {
    console.error('Error saving configurations:', err)
  }
}

const createConfiguration = async () => {
  try {
    let value = configForm.value.value
    
    // Parse value based on type
    if (configForm.value.type === 'INTEGER') {
      value = parseInt(value)
    } else if (configForm.value.type === 'BOOLEAN') {
      value = value.toLowerCase() === 'true' || value === '1'
    } else if (configForm.value.type === 'JSON') {
      value = JSON.parse(value)
    }

    await configApi.set(configForm.value.key, {
      value,
      type: configForm.value.type,
      description: configForm.value.description,
      isPublic: configForm.value.isPublic
    })
    
    await fetchConfigurations()
    closeCreateModal()
    successMessage.value = 'Configuración creada exitosamente'
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    console.error('Error creating configuration:', err)
  }
}

const closeCreateModal = () => {
  showCreateModal.value = false
  configForm.value = {
    key: '',
    description: '',
    type: '',
    value: '',
    isPublic: false
  }
}

onMounted(() => {
  fetchConfigurations()
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>