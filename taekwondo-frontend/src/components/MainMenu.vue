<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    <!-- Background Patterns -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div class="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>

    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border-b border-white/10 py-6">
      <div class="w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-3 rounded-xl">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-black text-white">TKBATTLE</h1>
              <p class="text-blue-200">Sistema de Combates Taekwondo</p>
            </div>
          </div>
          <div class="flex items-center text-green-400">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span class="font-medium">ONLINE</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
      <div class="w-full">
        
        

        <!-- Sección de Módulos Principales -->
        <div class="bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
          <div class="text-center mb-8">
            <h3 class="text-3xl font-bold text-lime-600 mb-2">Módulos Principales</h3>
            <p class="text-gray-100">Acceso directo a las funciones centrales del sistema</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- Competidores -->
            <div 
              @click="navigateTo('competitors')" 
              class="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-blue-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-blue-800 mb-2">COMPETIDORES</h4>
                <div class="text-2xl font-bold text-blue-600 mb-1">{{ stats.competitors }}</div>
                <div class="text-sm text-blue-700">Atletas</div>
              </div>
            </div>

            <!-- Torneos -->
            <div 
              @click="navigateTo('tournaments')" 
              class="bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-emerald-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-emerald-800 mb-2">TORNEOS</h4>
                <div class="text-2xl font-bold text-emerald-600 mb-1">{{ stats.tournaments }}</div>
                <div class="text-sm text-emerald-700">Eventos</div>
              </div>
            </div>

            <!-- Combates -->
            <div 
              @click="navigateTo('combat')" 
              class="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-purple-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-purple-800 mb-2">COMBATE RAPIDO</h4>
                
              </div>
            </div>

            <!-- Categorías -->
            <div 
              @click="navigateTo('categories')" 
              class="bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-red-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-red-800 mb-2">CATEGORÍAS</h4>
                <div class="text-2xl font-bold text-red-600 mb-1">{{ stats.categories }}</div>
                <div class="text-sm text-red-700">División</div>
              </div>
            </div>

            <!-- Clubes -->
            <div 
              @click="navigateTo('clubs')" 
              class="bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 border border-cyan-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-cyan-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-cyan-800 mb-2">CLUBES</h4>
                <div class="text-2xl font-bold text-cyan-600 mb-1">{{ stats.clubs }}</div>
                <div class="text-sm text-cyan-700">Academias</div>
              </div>
            </div>

            <!-- Hardware Monitor -->
            <div 
              @click="navigateTo('wt-hardware')" 
              class="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-orange-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-orange-800 mb-2">HARDWARE</h4>
                <div class="text-2xl font-bold text-orange-600 mb-1">{{ hardwareStatus }}</div>
                <div class="text-sm text-orange-700">Estado</div>
              </div>
            </div>

            <!-- Combates de Torneo -->
            <div 
              @click="showTournamentSelector = true" 
              class="bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 border border-pink-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <div class="text-center">
                <div class="bg-pink-500 p-4 rounded-xl mx-auto w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6"/>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-pink-800 mb-2">COMBATES TORNEO</h4>
                <div class="text-2xl font-bold text-pink-600 mb-1">{{ stats.tournamentMatches || 0 }}</div>
                <div class="text-sm text-pink-700">Programados</div>
              </div>
            </div>
          </div>
        </div>

       
        

        <!-- Footer -->
        <div class="text-center mt-12">
          
          <p class="text-white/70 text-sm">
            © 2025 TKBATTLE  • Versión 1.0.0
          </p>
        </div>
      </div>
    </div>

    <!-- Modal de Selección de Torneo -->
    <div v-if="showTournamentSelector" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeTournamentSelector">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Seleccionar Torneo</h3>
          <button @click="closeTournamentSelector" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3 mb-6">
          <div v-if="loadingTournaments" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
            <p class="text-gray-600 mt-2">Cargando torneos...</p>
          </div>
          
          <div v-else-if="tournaments.length === 0" class="text-center py-4">
            <p class="text-gray-600">No hay torneos disponibles</p>
            <button 
              @click="navigateTo('tournaments')" 
              class="mt-3 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Crear Torneo
            </button>
          </div>
          
          <div v-else class="max-h-64 overflow-y-auto space-y-2">
            <div 
              v-for="tournament in tournaments" 
              :key="tournament.id"
              @click="goToTournamentMatches(tournament.id)"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-semibold text-gray-800">{{ tournament.name }}</h4>
                  <p class="text-sm text-gray-600">{{ formatDate(tournament.startDate) }}</p>
                </div>
                <div class="text-right">
                  <span class="text-sm font-medium text-pink-600">{{ tournament._count?.matches || 0 }} combates</span>
                  <p class="text-xs text-gray-500">{{ getStatusText(tournament.status) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="closeTournamentSelector" 
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estadísticas reactivas
const stats = ref({
  competitors: 0,
  tournaments: 0,
  matches: 0,
  categories: 0,
  clubs: 0,
  hardware: 0,
  activeMatches: 0,
  totalEvents: 0,
  onlineUsers: 0,
  systemUptime: '24h',
  tournamentMatches: 0
})

// Variables para el modal de torneos
const showTournamentSelector = ref(false)
const tournaments = ref([])
const loadingTournaments = ref(false)

// API Base URL
const API_BASE = 'http://localhost:3000'

// Computed para el estado del hardware
const hardwareStatus = computed(() => {
  return stats.value.hardware > 0 ? 'ONLINE' : 'OFFLINE'
})

// Función de navegación
const navigateTo = (route) => {
  router.push(`/${route}`)
}

// Funciones de acciones rápidas
const quickAction = (action) => {
  switch(action) {
    case 'new-competitor':
      router.push('/competitors/new')
      break
    case 'configure-judges':
      router.push('/hardware')
      break
    case 'quick-match':
      router.push('/combat')
      break
    case 'new-tournament':
      router.push('/tournaments/new')
      break
    case 'system-admin':
      router.push('/settings')
      break
    case 'api-docs':
      window.open('http://localhost:3000/api-docs', '_blank')
      break
    case 'wt-system':
      router.push('/wt-scoring')
      break
    case 'wt-hardware':
      router.push('/wt-hardware')
      break
    default:
      console.log('Acción no reconocida:', action)
  }
}

// Métodos para el modal de torneos
const closeTournamentSelector = () => {
  showTournamentSelector.value = false
}

const loadTournaments = async () => {
  try {
    loadingTournaments.value = true
    const response = await fetch(`${API_BASE}/api/tournaments?limit=20`)
    if (response.ok) {
      const data = await response.json()
      tournaments.value = data.data.tournaments.filter(t => 
        t.status === 'IN_PROGRESS' || t.status === 'OPEN_REGISTRATION' || t.status === 'REGISTRATION_CLOSED'
      )
    }
  } catch (err) {
    console.error('Error loading tournaments:', err)
  } finally {
    loadingTournaments.value = false
  }
}

const goToTournamentMatches = (tournamentId) => {
  router.push(`/tournament-matches/${tournamentId}`)
  closeTournamentSelector()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  })
}

const getStatusText = (status) => {
  const texts = {
    'DRAFT': 'Borrador',
    'OPEN_REGISTRATION': 'Registro Abierto', 
    'REGISTRATION_CLOSED': 'Registro Cerrado',
    'IN_PROGRESS': 'En Progreso',
    'COMPLETED': 'Completado',
    'CANCELLED': 'Cancelado'
  }
  return texts[status] || status
}

// Watch para cargar torneos cuando se abre el modal
const watchTournamentSelector = () => {
  if (showTournamentSelector.value) {
    loadTournaments()
  }
}

// Animación de números al cargar
const animateStats = () => {
  const targets = {
    competitors: 156,
    tournaments: 12,
    matches: 89,
    categories: 24,
    clubs: 18,
    hardware: 8,
    activeMatches: 3,
    totalEvents: 45,
    onlineUsers: 12
  }
  
  Object.keys(targets).forEach(key => {
    let current = 0
    const target = targets[key]
    const increment = target / 30
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stats.value[key] = target
        clearInterval(timer)
      } else {
        stats.value[key] = Math.floor(current)
      }
    }, 50)
  })
}

onMounted(() => {
  animateStats()
})

// Watcher para cargar torneos cuando se abre el modal
watch(showTournamentSelector, (newValue) => {
  if (newValue) {
    loadTournaments()
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out both;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>