<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
    <div class="text-center mb-8">
      <h3 class="text-3xl font-bold text-gray-900 mb-2">Acciones Rápidas</h3>
      <p class="text-gray-600">Operaciones frecuentes de un solo clic</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <!-- Nuevo Competidor -->
      <div 
        @click="quickAction('new-competitor')" 
        class="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-blue-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-blue-800">Nuevo Competidor</span>
        </div>
      </div>

      <!-- Configurar Jueces -->
      <div 
        @click="quickAction('configure-judges')" 
        class="bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-emerald-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-emerald-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-emerald-800">Configurar Jueces</span>
        </div>
      </div>

      <!-- Monitor Hardware -->
      <div 
        @click="quickAction('hardware-monitor')" 
        class="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-purple-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-purple-800">Monitor Hardware</span>
        </div>
      </div>

      <!-- Crear Torneo -->
      <div 
        @click="quickAction('new-tournament')" 
        class="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-orange-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-orange-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-orange-800">Crear Torneo</span>
        </div>
      </div>

      <!-- Combate Rápido -->
      <div 
        @click="quickAction('quick-match')" 
        class="bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-red-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-red-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-red-800">Combate Rápido</span>
        </div>
      </div>

      <!-- API Docs -->
      <div 
        @click="quickAction('api-docs')" 
        class="bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 border border-indigo-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      >
        <div class="text-center">
          <div class="bg-indigo-500 p-3 rounded-xl mx-auto w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-indigo-600 transition-colors">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <span class="text-sm font-semibold text-indigo-800">Documentación API</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const quickAction = (action) => {
  switch (action) {
    case 'new-competitor':
      // Navegar a la gestión de competidores con modal de creación
      router.push('/competitors?action=create')
      break
    
    case 'configure-judges':
      // Navegar a configuración de jueces
      router.push('/judges')
      break
    
    case 'hardware-monitor':
      // Navegar al monitor de hardware
      router.push('/hardware')
      break
    
    case 'new-tournament':
      // Navegar a crear torneo
      router.push('/tournaments?action=create')
      break
    
    case 'quick-match':
      // Navegar a combate DAEDO
      router.push('/combat')
      break
    
    case 'api-docs':
      // Abrir documentación de API en nueva pestaña
      window.open('http://localhost:3000/api-docs', '_blank')
      break
    
    default:
      console.log('Acción no implementada:', action)
  }
}
</script>

<style scoped>
/* Animaciones adicionales si es necesario */
.group:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>