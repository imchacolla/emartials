<template>
  <div style="width: 100%; height: 100vh; background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); padding: 2rem; overflow-y: auto;">
    <!-- Header -->
    <header style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.2);">
      <div style="padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 0.75rem;">
              <GitBranch style="width: 2rem; height: 2rem; color: white;" />
            </div>
            <div>
              <h1 style="font-size: 2rem; font-weight: bold; color: white; margin: 0 0 0.5rem 0;">Brackets y Llaves</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 0;">Sorteos, llaves de eliminación y gestión de combates</p>
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <select v-model="selectedTournament" @change="loadTournamentBracket" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;">
              <option value="">Seleccionar Torneo</option>
              <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">
                {{ tournament.name }}
              </option>
            </select>
            <button @click="showCreateBracketModal = true" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
              <Plus style="width: 1.25rem; height: 1.25rem;" />
              Nuevo Bracket
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Información del Torneo Seleccionado -->
    <div v-if="currentTournament" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2); margin-bottom: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center;">
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">{{ currentTournament.name }}</div>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Torneo</p>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: #22c55e; margin-bottom: 0.5rem;">{{ getTotalParticipants() }}</div>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Participantes</p>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: #60a5fa; margin-bottom: 0.5rem;">{{ currentTournament.categories.length }}</div>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Categorías</p>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: #f59e0b; margin-bottom: 0.5rem;">{{ getCompletedMatches() }}</div>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Combates Realizados</p>
        </div>
      </div>
    </div>

    <!-- Categorías y Brackets -->
    <div v-if="currentTournament" style="display: grid; gap: 2rem;">
      <div v-for="category in currentTournament.categories" :key="category" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.2);">
        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">{{ category }}</h3>
            <div style="display: flex; gap: 1rem;">
              <button @click="testBracketGeneration(category)" style="background: rgba(245,158,11,0.2); color: #f59e0b; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                🧪 Test
              </button>
              <button @click="generateDraw(category)" style="background: rgba(34,197,94,0.2); color: #22c55e; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                <Shuffle style="width: 1rem; height: 1rem;" />
                Sortear
              </button>
              <button @click="viewBracket(category)" style="background: rgba(37,99,235,0.2); color: #60a5fa; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                <Eye style="width: 1rem; height: 1rem;" />
                Ver Bracket
              </button>
            </div>
          </div>
        </div>
        
        <!-- Lista de Participantes -->
        <div style="padding: 1.5rem;">
          <h4 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 1rem 0;">Participantes ({{ getParticipantsByCategory(category).length }})</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
            <div v-for="participant in getParticipantsByCategory(category)" :key="participant.id" style="background: rgba(255,255,255,0.05); border-radius: 0.5rem; padding: 1rem; display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                {{ participant.name.charAt(0) }}
              </div>
              <div style="flex: 1;">
                <div style="color: white; font-weight: 600;">{{ participant.name }}</div>
                <div style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">{{ participant.club }}</div>
              </div>
              <div style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">{{ participant.weight }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bracket Viewer -->
    <div v-if="showBracketViewer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 1rem; width: 95%; height: 95%; overflow-y: auto; border: 1px solid rgba(255,255,255,0.2); position: relative;">
        <div style="padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
          <h2 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0;">Bracket - {{ currentCategory }}</h2>
          <button @click="closeBracketViewer" style="background: rgba(220,38,38,0.2); color: #f87171; border: none; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer;">
            <X style="width: 1.25rem; height: 1.25rem;" />
          </button>
        </div>
        
        <div style="padding: 2rem;">
          <!-- Mensaje de debugging -->
          <div style="background: rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem; margin-bottom: 2rem; color: white;">
            <h4>🔍 Debug Info</h4>
            <p>Categoría: {{ currentCategory }}</p>
            <p>Bracket disponible: {{ !!currentBracket && currentBracket.length > 0 ? 'Sí' : 'No' }}</p>
            <p>Número de rondas: {{ currentBracket?.length || 0 }}</p>
          </div>
          
          <!-- Contenido del bracket -->
          <div v-if="currentBracket && currentBracket.length > 0">
            <h3 style="color: white; margin-bottom: 2rem;">🥋 Bracket de {{ currentCategory }}</h3>
            
            <div v-for="(round, roundIndex) in currentBracket" :key="roundIndex" style="margin-bottom: 3rem;">
              <h4 style="color: #60a5fa; margin-bottom: 1rem;">{{ getRoundName(roundIndex, currentBracket.length) }}</h4>
              
              <div style="display: grid; gap: 1rem;">
                <div v-for="(match, matchIndex) in round" :key="matchIndex" style="background: rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem;">
                  <div style="text-align: center; color: white; margin-bottom: 1rem;">
                    <strong>{{ match.id }}</strong>
                  </div>
                  
                  <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
                    <div style="background: rgba(220,38,38,0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: white;">
                      {{ match.competitor1 || 'TBD' }}
                      <div v-if="match.score1 !== null" style="font-weight: bold; margin-top: 0.5rem;">{{ match.score1 }}</div>
                    </div>
                    
                    <div style="color: white; font-weight: bold;">VS</div>
                    
                    <div style="background: rgba(37,99,235,0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: white;">
                      {{ match.competitor2 || 'TBD' }}
                      <div v-if="match.score2 !== null" style="font-weight: bold; margin-top: 0.5rem;">{{ match.score2 }}</div>
                    </div>
                  </div>
                  
                  <div v-if="match.winner" style="text-align: center; margin-top: 1rem; color: #22c55e; font-weight: bold;">
                    🏆 {{ match.winner === 'competitor1' ? match.competitor1 : match.competitor2 }} GANA
                  </div>
                  
                  <div v-if="match.competitor1 && match.competitor2 && !match.winner" style="text-align: center; margin-top: 1rem;">
                    <button @click="simulateMatch(match)" style="background: #dc2626; color: white; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer;">
                      Simular
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else style="text-align: center; color: white; padding: 4rem;">
            <h3>No hay bracket generado</h3>
            <p style="color: rgba(255,255,255,0.6);">Usa "Sortear" o "Test" primero</p>
          </div>
        </div>
            <!-- SVG para conectores -->
            <svg class="bracket-connectors" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
              <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <!-- Conectores dinámicos -->
              <g v-for="(round, roundIndex) in currentBracket" :key="`connectors-${roundIndex}`">
                <template v-if="roundIndex < currentBracket.length - 1">
                  <path v-for="(match, matchIndex) in round" 
                        :key="`connector-${roundIndex}-${matchIndex}`"
                        :d="generateConnectorPath(roundIndex, matchIndex)"
                        stroke="url(#connectorGradient)"
                        stroke-width="2"
                        fill="none"
                        filter="url(#glow)"
                        :class="{ 'connector-active': match.winner }"
                  />
                </template>
              </g>
            </svg>
            
            <!-- Rondas del Bracket -->
            <div v-for="(round, roundIndex) in currentBracket" :key="roundIndex" class="bracket-round" :style="`--round-index: ${roundIndex}; --total-rounds: ${currentBracket.length};`">
              <h3 class="round-title">
                <span class="round-number">{{ roundIndex + 1 }}</span>
                {{ getRoundName(roundIndex, currentBracket.length) }}
                <span class="round-matches-count">({{ round.length }} combates)</span>
              </h3>
              <div class="round-matches">
                <div v-for="(match, matchIndex) in round" :key="matchIndex" class="match-container" 
                     :style="`--match-index: ${matchIndex}; --matches-in-round: ${round.length};`"
                     :id="`match-${roundIndex}-${matchIndex}`">
                  <div class="match-card" :class="{ 'match-completed': match.winner, 'match-scheduled': match.scheduledTime && !match.winner }">
                    <div class="match-header">
                      <span class="match-id">Combate {{ match.id }}</span>
                      <span v-if="match.winner" class="match-status completed">
                        <Trophy style="width: 1rem; height: 1rem;" />
                        COMPLETADO
                      </span>
                      <span v-else-if="match.competitor1 && match.competitor2 && match.scheduledTime" class="match-status scheduled">
                        <Calendar style="width: 1rem; height: 1rem;" />
                        PROGRAMADO
                      </span>
                      <span v-else-if="match.competitor1 && match.competitor2" class="match-status ready">
                        <Play style="width: 1rem; height: 1rem;" />
                        LISTO
                      </span>
                      <span v-else class="match-status pending">PENDIENTE</span>
                    </div>
                    
                    <!-- Competidor 1 -->
                    <div class="competitor red" :class="{ winner: match.winner === 'competitor1', loser: match.winner === 'competitor2' }">
                      <div class="competitor-flag">🥋</div>
                      <div class="competitor-info">
                        <div class="competitor-name">{{ match.competitor1 || 'Por definir' }}</div>
                        <div v-if="match.competitor1 && match.competitor1 !== 'Por definir'" class="competitor-details">
                          <span class="competitor-seed">Semilla #{{ getCompetitorSeed(match.competitor1) }}</span>
                          <span class="competitor-record">{{ getCompetitorRecord(match.competitor1) }}</span>
                        </div>
                      </div>
                      <div class="competitor-score">
                        <span v-if="match.winner === 'competitor1'" class="winner-badge">🏆</span>
                        <span v-else-if="match.score1 !== undefined" class="score">{{ match.score1 }}</span>
                        <span v-else class="no-score">-</span>
                      </div>
                    </div>
                    
                    <!-- Separador VS -->
                    <div class="vs-separator">
                      <span class="vs-text">VS</span>
                      <div class="vs-line"></div>
                    </div>
                    
                    <!-- Competidor 2 -->
                    <div class="competitor blue" :class="{ winner: match.winner === 'competitor2', loser: match.winner === 'competitor1' }">
                      <div class="competitor-flag">🥋</div>
                      <div class="competitor-info">
                        <div class="competitor-name">{{ match.competitor2 || 'Por definir' }}</div>
                        <div v-if="match.competitor2 && match.competitor2 !== 'Por definir'" class="competitor-details">
                          <span class="competitor-seed">Semilla #{{ getCompetitorSeed(match.competitor2) }}</span>
                          <span class="competitor-record">{{ getCompetitorRecord(match.competitor2) }}</span>
                        </div>
                      </div>
                      <div class="competitor-score">
                        <span v-if="match.winner === 'competitor2'" class="winner-badge">🏆</span>
                        <span v-else-if="match.score2 !== undefined" class="score">{{ match.score2 }}</span>
                        <span v-else class="no-score">-</span>
                      </div>
                    </div>
                    
                    <!-- Información del resultado -->
                    <div v-if="match.winner" class="match-result">
                      <div class="result-summary">
                        <span class="winner-text">🎉 {{ match.winner === 'competitor1' ? match.competitor1 : match.competitor2 }} gana</span>
                        <span class="score-summary">{{ match.score1 }} - {{ match.score2 }}</span>
                      </div>
                    </div>
                    
                    <!-- Botones de Acción -->
                    <div v-if="match.competitor1 && match.competitor2 && !match.winner" class="match-actions">
                      <button @click="simulateMatch(match)" class="action-btn simulate">
                        <Play style="width: 1rem; height: 1rem;" />
                        Simular
                      </button>
                      <button @click="scheduleMatch(match)" class="action-btn schedule">
                        <Calendar style="width: 1rem; height: 1rem;" />
                        Programar
                      </button>
                    </div>
                    
                    <!-- Información adicional del combate -->
                    <div v-if="match.scheduledTime" class="match-info">
                      <div class="scheduled-info">
                        <Calendar style="width: 1rem; height: 1rem;" />
                        <span>{{ formatMatchTime(match.scheduledTime) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else style="text-align: center; padding: 4rem; color: rgba(255,255,255,0.6);">
            <p>No hay bracket generado para esta categoría. Haz clic en "Sortear" para generar las llaves.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear Bracket -->
    <div v-if="showCreateBracketModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 1rem; padding: 2rem; width: 500px; max-height: 80vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0 0 1.5rem 0;">Crear Nuevo Bracket</h3>
        
        <form @submit.prevent="createBracket" style="display: grid; gap: 1rem;">
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Nombre del Torneo</label>
            <input v-model="bracketForm.tournamentName" type="text" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
          </div>
          
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Categorías</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
              <label v-for="category in availableCategories" :key="category" style="display: flex; align-items: center; gap: 0.5rem; color: white; font-size: 0.875rem;">
                <input type="checkbox" :value="category" v-model="bracketForm.categories" style="accent-color: #dc2626;" />
                {{ category }}
              </label>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" style="flex: 1; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              Crear Bracket
            </button>
            <button type="button" @click="closeCreateBracketModal" style="flex: 1; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Estado Vacío -->
    <div v-if="!currentTournament" style="text-align: center; padding: 4rem; color: rgba(255,255,255,0.6);">
      <GitBranch style="width: 4rem; height: 4rem; margin: 0 auto 2rem auto;" />
      <h2 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0 0 1rem 0;">Selecciona un Torneo</h2>
      <p style="margin: 0 0 2rem 0;">Elige un torneo existente o crea uno nuevo para generar los brackets</p>
      <button @click="showCreateBracketModal = true" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 0.75rem; padding: 1rem 2rem; font-weight: 600; cursor: pointer;">
        Crear Nuevo Torneo
      </button>
    </div>
  </div>
</template>

<script setup>
import { GitBranch, Plus, Shuffle, Eye, X, Play, Calendar, Trophy } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'

const selectedTournament = ref('TOUR001') // Pre-seleccionar el primer torneo
const showBracketViewer = ref(false)
const showCreateBracketModal = ref(false)
const currentCategory = ref('')
const currentBracket = ref([])

const bracketForm = ref({
  tournamentName: '',
  categories: []
})

const availableCategories = [
  'Infantil -30kg', 'Infantil -35kg', 'Infantil -40kg',
  'Cadete -45kg', 'Cadete -50kg', 'Cadete -55kg',
  'Junior -60kg', 'Junior -65kg', 'Junior -70kg',
  'Senior -68kg', 'Senior -74kg', 'Senior +74kg'
]

// Datos de ejemplo
const tournaments = ref([
  {
    id: 'TOUR001',
    name: 'Campeonato Nacional DAEDO 2024',
    categories: ['Senior -68kg', 'Senior -74kg', 'Junior -60kg'],
    participants: [
      { id: 1, name: 'Kim Tae-Hyun', club: 'Seoul Tigers', category: 'Senior -68kg', weight: '-68kg' },
      { id: 2, name: 'Park Min-Jun', club: 'Busan Dragons', category: 'Senior -68kg', weight: '-68kg' },
      { id: 3, name: 'Lee So-Young', club: 'Incheon Warriors', category: 'Junior -60kg', weight: '-60kg' },
      { id: 4, name: 'Choi Jin-Woo', club: 'Daegu Lions', category: 'Senior -74kg', weight: '-74kg' },
      { id: 5, name: 'Jung Hye-Jin', club: 'Gwangju Eagles', category: 'Senior -68kg', weight: '-68kg' },
      { id: 6, name: 'Yoon Seung-Ho', club: 'Seoul Tigers', category: 'Senior -74kg', weight: '-74kg' },
      { id: 7, name: 'Han Mi-Ra', club: 'Busan Dragons', category: 'Junior -60kg', weight: '-60kg' },
      { id: 8, name: 'Lim Dong-Su', club: 'Incheon Warriors', category: 'Senior -68kg', weight: '-68kg' },
      { id: 9, name: 'Song Min-Ho', club: 'Daegu Lions', category: 'Senior -68kg', weight: '-68kg' },
      { id: 10, name: 'Kang Ji-Won', club: 'Gwangju Eagles', category: 'Senior -68kg', weight: '-68kg' },
      { id: 11, name: 'Oh Seo-Jun', club: 'Seoul Tigers', category: 'Senior -74kg', weight: '-74kg' },
      { id: 12, name: 'Jeon Yu-Ri', club: 'Busan Dragons', category: 'Junior -60kg', weight: '-60kg' }
    ],
    brackets: {}
  }
])

const currentTournament = computed(() => {
  return tournaments.value.find(t => t.id === selectedTournament.value)
})

const loadTournamentBracket = () => {
  console.log('Cargando torneo:', selectedTournament.value)
  console.log('Torneo actual:', currentTournament.value)
  
  // Si no hay torneo seleccionado, seleccionar el primero disponible
  if (!selectedTournament.value && tournaments.value.length > 0) {
    selectedTournament.value = tournaments.value[0].id
  }
}

const getParticipantsByCategory = (category) => {
  if (!currentTournament.value) return []
  return currentTournament.value.participants.filter(p => p.category === category)
}

const getTotalParticipants = () => {
  if (!currentTournament.value) return 0
  return currentTournament.value.participants.length
}

const getCompletedMatches = () => {
  if (!currentTournament.value) return 0
  let completed = 0
  Object.values(currentTournament.value.brackets).forEach(bracket => {
    bracket.forEach(round => {
      round.forEach(match => {
        if (match.winner) completed++
      })
    })
  })
  return completed
}

const generateDraw = (category) => {
  console.log('=== INICIANDO SORTEO ===');
  console.log('Categoría:', category);
  console.log('Torneo actual:', currentTournament.value);
  
  const participants = getParticipantsByCategory(category)
  console.log('Participantes encontrados:', participants);
  
  if (participants.length < 2) {
    alert('Se necesitan al menos 2 participantes para generar un bracket')
    return
  }
  
  // Shuffle participants
  const shuffled = [...participants].sort(() => Math.random() - 0.5)
  console.log('Participantes mezclados:', shuffled);
  
  // Calculate number of rounds needed
  const totalRounds = Math.ceil(Math.log2(shuffled.length))
  console.log('Total de rondas necesarias:', totalRounds);
  const bracket = []
  
  // First round
  const firstRound = []
  for (let i = 0; i < shuffled.length; i += 2) {
    const match = {
      id: `${category}-R1-M${Math.floor(i/2) + 1}`,
      competitor1: shuffled[i]?.name,
      competitor2: shuffled[i + 1]?.name || null, // Handle odd number of participants
      winner: null,
      score1: null,
      score2: null
    }
    firstRound.push(match)
  }
  bracket.push(firstRound)
  console.log('Primera ronda creada:', firstRound);
  
  // Generate subsequent rounds
  for (let round = 1; round < totalRounds; round++) {
    const currentRound = []
    const matchesInRound = Math.ceil(bracket[round - 1].length / 2)
    
    for (let i = 0; i < matchesInRound; i++) {
      const match = {
        id: `${category}-R${round + 1}-M${i + 1}`,
        competitor1: null,
        competitor2: null,
        winner: null,
        score1: null,
        score2: null
      }
      currentRound.push(match)
    }
    bracket.push(currentRound)
  }
  
  console.log('Bracket completo generado:', bracket);
  
  // Save bracket
  if (!currentTournament.value.brackets) {
    currentTournament.value.brackets = {}
  }
  currentTournament.value.brackets[category] = bracket
  
  // Guardar en localStorage
  saveData();
  
  console.log('Bracket guardado en torneo:', currentTournament.value.brackets);
  console.log(`Bracket generado para ${category}:`, bracket)
  alert(`Bracket generado exitosamente para ${category}!\nSe generaron ${bracket.length} rondas con ${bracket[0].length} combates en la primera ronda.`)
}

const viewBracket = (category) => {
  console.log('Intentando ver bracket para:', category);
  console.log('Torneo actual:', currentTournament.value);
  console.log('Brackets disponibles:', currentTournament.value?.brackets);
  
  if (!currentTournament.value) {
    alert('No hay torneo seleccionado');
    return;
  }
  
  if (!currentTournament.value.brackets || !currentTournament.value.brackets[category]) {
    alert('No hay bracket generado para esta categoría. Genera el sorteo primero.');
    return;
  }
  
  currentCategory.value = category;
  currentBracket.value = currentTournament.value.brackets[category];
  showBracketViewer.value = true;
  
  console.log('Bracket cargado:', currentBracket.value);
  console.log('Categoría:', currentCategory.value);
  console.log('Mostrar viewer:', showBracketViewer.value);
}

// Función de prueba para diagnosticar problemas
const testBracketGeneration = (category) => {
  console.log('🧪 === TEST DE BRACKET ===');
  console.log('Categoría seleccionada:', category);
  console.log('Torneo actual disponible:', !!currentTournament.value);
  console.log('Participantes:', getParticipantsByCategory(category));
  console.log('Brackets existentes:', currentTournament.value?.brackets);
  console.log('selectedTournament:', selectedTournament.value);
  console.log('showBracketViewer:', showBracketViewer.value);
  
  // Test manual del bracket
  if (currentTournament.value) {
    const testBracket = [
      [
        { id: 'TEST-1', competitor1: 'Competidor A', competitor2: 'Competidor B', winner: null, score1: null, score2: null },
        { id: 'TEST-2', competitor1: 'Competidor C', competitor2: 'Competidor D', winner: null, score1: null, score2: null }
      ],
      [
        { id: 'TEST-FINAL', competitor1: null, competitor2: null, winner: null, score1: null, score2: null }
      ]
    ];
    
    currentTournament.value.brackets = currentTournament.value.brackets || {};
    currentTournament.value.brackets[category] = testBracket;
    
    console.log('Bracket de prueba creado:', testBracket);
    alert('🧪 Bracket de prueba creado. Ahora intenta "Ver Bracket"');
  }
}

const closeBracketViewer = () => {
  showBracketViewer.value = false
  currentCategory.value = ''
  currentBracket.value = []
}

const getRoundName = (roundIndex, totalRounds) => {
  const roundsFromEnd = totalRounds - roundIndex
  switch (roundsFromEnd) {
    case 1:
      return 'Final'
    case 2:
      return 'Semifinal'
    case 3:
      return 'Cuartos de Final'
    default:
      return `Ronda ${roundIndex + 1}`
  }
}

const simulateMatch = (match) => {
  // Simulate match result
  const score1 = Math.floor(Math.random() * 15) + 5
  const score2 = Math.floor(Math.random() * 15) + 5
  
  match.score1 = score1
  match.score2 = score2
  match.winner = score1 > score2 ? 'competitor1' : 'competitor2'
  
  // Advance winner to next round
  advanceWinner(match)
  
  // Guardar cambios
  saveData();
  
  console.log(`Resultado simulado: ${match.competitor1} ${score1} - ${score2} ${match.competitor2}`)
  
  // Mostrar resultado
  const winner = match.winner === 'competitor1' ? match.competitor1 : match.competitor2;
  alert(`¡Combate completado!\n${winner} gana ${score1} - ${score2}`);
}

const scheduleMatch = (match) => {
  // Programar combate para una hora futura aleatoria
  const now = new Date();
  const futureTime = new Date(now.getTime() + Math.random() * 24 * 60 * 60 * 1000);
  match.scheduledTime = futureTime.toISOString();
  saveData();
  console.log('Combate programado para:', formatMatchTime(match.scheduledTime));
}

// Nuevos métodos para la visualización mejorada
const getCompetitorSeed = (competitorName) => {
  const competitor = competitors.value.find(c => c.name === competitorName);
  return competitor ? competitor.id : '?';
};

const formatMatchTime = (time) => {
  if (!time) return '';
  return new Date(time).toLocaleString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Función para guardar datos en localStorage
const saveData = () => {
  localStorage.setItem('tournaments', JSON.stringify(tournaments.value));
};

// Funciones para la visualización mejorada
const generateConnectorPath = (roundIndex, matchIndex) => {
  // Calcular posiciones básicas para los conectores SVG
  const roundWidth = 320; // ancho de cada ronda + gap
  const matchHeight = 200; // altura aproximada de cada match
  const startX = (roundIndex + 1) * roundWidth - 60;
  const endX = (roundIndex + 1) * roundWidth + 60;
  const startY = (matchIndex * matchHeight) + 100;
  const endY = Math.floor(matchIndex / 2) * matchHeight + 100;
  
  // Crear path SVG con curvas suaves
  return `M ${startX} ${startY} Q ${startX + 30} ${startY} ${startX + 60} ${(startY + endY) / 2} Q ${endX - 30} ${endY} ${endX} ${endY}`;
};

const getCompetitorRecord = (competitorName) => {
  // Simular récord de victorias/derrotas
  const wins = Math.floor(Math.random() * 20) + 5;
  const losses = Math.floor(Math.random() * 10);
  return `${wins}W-${losses}L`;
};

const advanceWinner = (match) => {
  const bracket = currentBracket.value
  const currentRoundIndex = bracket.findIndex(round => round.includes(match))
  
  if (currentRoundIndex < bracket.length - 1) {
    const nextRound = bracket[currentRoundIndex + 1]
    const matchIndex = bracket[currentRoundIndex].indexOf(match)
    const nextMatchIndex = Math.floor(matchIndex / 2)
    const nextMatch = nextRound[nextMatchIndex]
    
    if (nextMatch) {
      const winner = match.winner === 'competitor1' ? match.competitor1 : match.competitor2
      
      if (matchIndex % 2 === 0) {
        nextMatch.competitor1 = winner
      } else {
        nextMatch.competitor2 = winner
      }
      
      console.log(`${winner} avanza a la siguiente ronda`);
    }
  } else {
    // Es la final
    const winner = match.winner === 'competitor1' ? match.competitor1 : match.competitor2;
    console.log(`🏆 ¡${winner} es el campeón del torneo!`);
  }
  
  // Guardar cambios
  saveData();
}

const createBracket = () => {
  const newTournament = {
    id: `TOUR${tournaments.value.length + 1}`.padStart(6, '0'),
    name: bracketForm.value.tournamentName,
    categories: [...bracketForm.value.categories],
    participants: [],
    brackets: {}
  }
  
  tournaments.value.push(newTournament)
  selectedTournament.value = newTournament.id
  
  // Guardar en localStorage
  saveData();
  
  closeCreateBracketModal()
  
  console.log('Torneo creado:', newTournament);
}

const closeCreateBracketModal = () => {
  showCreateBracketModal.value = false
  bracketForm.value = {
    tournamentName: '',
    categories: []
  }
}

// Cargar datos desde localStorage
const loadData = () => {
  const saved = localStorage.getItem('tournaments');
  if (saved) {
    tournaments.value = JSON.parse(saved);
  }
};

onMounted(() => {
  // Cargar datos guardados
  loadData();
  
  console.log('Componente montado - Torneos disponibles:', tournaments.value);
  
  // Auto-select first tournament if available
  if (tournaments.value.length > 0) {
    selectedTournament.value = tournaments.value[0].id
    console.log('Torneo seleccionado:', selectedTournament.value);
  }
  
  // Log del estado inicial
  console.log('Estado inicial del componente:');
  console.log('- selectedTournament:', selectedTournament.value);
  console.log('- currentTournament:', currentTournament.value);
})
</script>

<style scoped>
/* Estilos mejorados para la visualización del bracket */
.tournament-bracket {
  position: relative;
  display: flex;
  gap: 4rem;
  min-width: max-content;
  padding: 2rem;
  align-items: start;
}

.bracket-round {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 280px;
  position: relative;
  z-index: 2;
}

.round-title {
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.round-number {
  font-size: 2rem;
  font-weight: 900;
  opacity: 0.3;
}

.round-matches-count {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  font-weight: normal;
}

.round-matches {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.match-container {
  position: relative;
  animation: slideInFromLeft 0.5s ease-out;
  animation-delay: calc(var(--round-index) * 0.1s);
  animation-fill-mode: both;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.match-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.match-card.match-completed {
  border-color: rgba(34,197,94,0.5);
  box-shadow: 0 0 20px rgba(34,197,94,0.2);
}

.match-card.match-scheduled {
  border-color: rgba(59,130,246,0.5);
  box-shadow: 0 0 20px rgba(59,130,246,0.2);
}

.match-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #dc2626 0%, #2563eb 100%);
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  border-color: rgba(255,255,255,0.4);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.match-id {
  color: rgba(255,255,255,0.6);
  font-size: 0.875rem;
  font-weight: 600;
}

.match-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.match-status.completed {
  background: rgba(34,197,94,0.2);
  color: #22c55e;
}

.match-status.scheduled {
  background: rgba(59,130,246,0.2);
  color: #3b82f6;
}

.match-status.ready {
  background: rgba(245,158,11,0.2);
  color: #f59e0b;
}

.match-status.pending {
  background: rgba(156,163,175,0.2);
  color: #9ca3af;
}

.competitor {
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.competitor.loser {
  opacity: 0.6;
  filter: grayscale(0.3);
}

.competitor-flag {
  font-size: 1.5rem;
  min-width: 2rem;
  text-align: center;
}

.competitor-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.competitor-record {
  color: rgba(255,255,255,0.5);
  font-size: 0.7rem;
}

.competitor::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s ease;
}

.competitor:hover::before {
  left: 100%;
}

.competitor.red {
  background: linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.1) 100%);
  border: 1px solid rgba(220,38,38,0.3);
}

.competitor.blue {
  background: linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.1) 100%);
  border: 1px solid rgba(37,99,235,0.3);
}

.competitor.winner {
  background: linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0.1) 100%);
  border: 1px solid rgba(34,197,94,0.5);
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(34,197,94,0.3);
}

.competitor-info {
  flex: 1;
}

.competitor-name {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.competitor-seed {
  color: rgba(255,255,255,0.6);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.competitor-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.winner-badge {
  font-size: 1.25rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.score {
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
}

.no-score {
  color: rgba(255,255,255,0.4);
  font-size: 1.125rem;
}

.vs-separator {
  text-align: center;
  color: rgba(255,255,255,0.6);
  font-size: 0.875rem;
  margin: 0.5rem 0;
  font-weight: 600;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  background: rgba(0,0,0,0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  z-index: 2;
}

.vs-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
}

.match-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.action-btn {
  flex: 1;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.action-btn.simulate {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
}

.action-btn.simulate:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220,38,38,0.4);
}

.action-btn.schedule {
  background: rgba(37,99,235,0.2);
  color: #60a5fa;
  border: 1px solid rgba(37,99,235,0.3);
}

.action-btn.schedule:hover {
  background: rgba(37,99,235,0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);
}

.match-info {
  margin-top: 0.75rem;
  text-align: center;
  padding: 0.5rem;
  background: rgba(0,0,0,0.2);
  border-radius: 0.5rem;
}

.scheduled-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.6);
}

.match-result {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.3);
  border-radius: 0.75rem;
  text-align: center;
}

.result-summary {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.winner-text {
  color: #22c55e;
  font-weight: 600;
  font-size: 0.95rem;
}

.score-summary {
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Conectores SVG */
.bracket-connectors {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.connector-active {
  stroke-width: 3;
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px currentColor);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .tournament-bracket {
    flex-direction: column;
    gap: 2rem;
  }
  
  .bracket-round {
    min-width: 100%;
  }
  
  .match-card {
    padding: 1rem;
  }
  
  .competitor {
    padding: 0.75rem;
  }
  
  .action-btn {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}

/* Efectos adicionales para el hover del bracket completo */
.tournament-bracket:hover .match-card {
  opacity: 0.7;
}

.tournament-bracket .match-card:hover {
  opacity: 1;
  z-index: 10;
}
</style>