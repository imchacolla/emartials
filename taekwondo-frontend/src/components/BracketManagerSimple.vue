<template>
  <div style="width: 100%; padding: 2rem; overflow-y: auto;">
    <!-- Header -->
    <header style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
      <div style="padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 0.75rem;">
              <GitBranch style="width: 2rem; height: 2rem; color: white;" />
            </div>
            <div>
              <h1 style="color: white; font-size: 1.875rem; font-weight: bold; margin: 0;">Gestión de Brackets</h1>
              <p style="color: rgba(255,255,255,0.6); margin: 0;">Sistema de llaves y eliminatorias</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Selector de Torneo -->
    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2); margin-bottom: 2rem;">
      <h2 style="color: white; margin-bottom: 1rem;">Seleccionar Torneo:</h2>
      <select v-model="selectedTournament" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; min-width: 300px;">
        <option value="">Seleccionar torneo...</option>
        <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">
          {{ tournament.name }}
        </option>
      </select>
    </div>

    <!-- Información del Torneo -->
    <div v-if="currentTournament" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2); margin-bottom: 2rem;">
      <h2 style="color: white; margin-bottom: 1rem;">{{ currentTournament.name }}</h2>
      <p style="color: rgba(255,255,255,0.6);">{{ currentTournament.participants.length }} participantes en {{ currentTournament.categories.length }} categorías</p>
    </div>

    <!-- Categorías -->
    <div v-if="currentTournament">
      <div v-for="category in currentTournament.categories" :key="category" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.2); margin-bottom: 2rem;">
        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">{{ category }}</h3>
            <div style="display: flex; gap: 1rem;">
              <button @click="testBracket(category)" style="background: rgba(245,158,11,0.2); color: #f59e0b; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600;">
                🧪 Test
              </button>
              <button @click="generateDraw(category)" style="background: rgba(34,197,94,0.2); color: #22c55e; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600;">
                Sortear
              </button>
              <button @click="viewBracket(category)" style="background: rgba(37,99,235,0.2); color: #60a5fa; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600;">
                Ver Bracket
              </button>
            </div>
          </div>
        </div>
        
        <!-- Participantes -->
        <div style="padding: 1.5rem;">
          <h4 style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Participantes ({{ getParticipantsByCategory(category).length }})</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div v-for="participant in getParticipantsByCategory(category)" :key="participant.id" style="background: rgba(255,255,255,0.05); border-radius: 0.5rem; padding: 1rem; color: white;">
              <strong>{{ participant.name }}</strong>
              <div style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">{{ participant.club }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado Vacío -->
    <div v-if="!currentTournament" style="text-align: center; padding: 4rem; color: rgba(255,255,255,0.6);">
      <GitBranch style="width: 4rem; height: 4rem; margin: 0 auto 2rem auto;" />
      <h2 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0 0 1rem 0;">Selecciona un Torneo</h2>
      <p>Elige un torneo para gestionar sus brackets y eliminatorias</p>
    </div>

    <!-- Modal Bracket Viewer -->
    <div v-if="showBracketViewer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 1rem; width: 95%; height: 95%; overflow-y: auto; border: 1px solid rgba(255,255,255,0.2); position: relative;">
        <div style="padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
          <h2 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0;">Bracket - {{ currentCategory }}</h2>
          <button @click="closeBracketViewer" style="background: rgba(220,38,38,0.2); color: #f87171; border: none; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer;">
            <X style="width: 1.25rem; height: 1.25rem;" />
          </button>
        </div>
        
        <div style="padding: 2rem;">
          <!-- Debug Info -->
          <div style="background: rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem; margin-bottom: 2rem; color: white;">
            <h4>🔍 Info de Debug</h4>
            <p>Categoría: {{ currentCategory }}</p>
            <p>Bracket disponible: {{ !!currentBracket && currentBracket.length > 0 ? 'Sí' : 'No' }}</p>
            <p>Número de rondas: {{ currentBracket?.length || 0 }}</p>
          </div>
          
          <!-- Bracket Content -->
          <div v-if="currentBracket && currentBracket.length > 0">
            <h3 style="color: white; margin-bottom: 2rem;">🥋 Bracket de {{ currentCategory }}</h3>
            
            <div v-for="(round, roundIndex) in currentBracket" :key="roundIndex" style="margin-bottom: 3rem;">
              <h4 style="color: #60a5fa; margin-bottom: 1rem; font-size: 1.25rem;">{{ getRoundName(roundIndex, currentBracket.length) }}</h4>
              
              <div style="display: grid; gap: 1rem;">
                <div v-for="(match, matchIndex) in round" :key="matchIndex" style="background: rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem;">
                  <div style="text-align: center; color: white; margin-bottom: 1rem; font-weight: bold;">
                    {{ match.id }}
                  </div>
                  
                  <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
                    <div style="background: rgba(220,38,38,0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: white;">
                      <div style="font-weight: 600;">{{ match.competitor1 || 'TBD' }}</div>
                      <div v-if="match.score1 !== null" style="font-weight: bold; margin-top: 0.5rem; color: #22c55e; font-size: 1.25rem;">{{ match.score1 }}</div>
                    </div>
                    
                    <div style="color: white; font-weight: bold; text-align: center;">VS</div>
                    
                    <div style="background: rgba(37,99,235,0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: white;">
                      <div style="font-weight: 600;">{{ match.competitor2 || 'TBD' }}</div>
                      <div v-if="match.score2 !== null" style="font-weight: bold; margin-top: 0.5rem; color: #22c55e; font-size: 1.25rem;">{{ match.score2 }}</div>
                    </div>
                  </div>
                  
                  <div v-if="match.winner" style="text-align: center; margin-top: 1rem; color: #22c55e; font-weight: bold; font-size: 1.125rem;">
                    🏆 {{ match.winner === 'competitor1' ? match.competitor1 : match.competitor2 }} GANA
                  </div>
                  
                  <div v-if="match.competitor1 && match.competitor2 && !match.winner" style="text-align: center; margin-top: 1rem;">
                    <button @click="simulateMatch(match)" style="background: #dc2626; color: white; border: none; border-radius: 0.5rem; padding: 0.75rem 1.5rem; cursor: pointer; font-weight: 600;">
                      Simular Combate
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GitBranch, X } from 'lucide-vue-next'

// Variables reactivas
const selectedTournament = ref('TOUR001')
const showBracketViewer = ref(false)
const currentCategory = ref('')
const currentBracket = ref([])

// Datos de ejemplo
const tournaments = ref([
  {
    id: 'TOUR001',
    name: 'Campeonato Nacional DAEDO 2024',
    categories: ['Senior -68kg', 'Senior -74kg', 'Junior -60kg'],
    participants: [
      { id: 1, name: 'Kim Tae-Hyun', club: 'Seoul Tigers', category: 'Senior -68kg' },
      { id: 2, name: 'Park Min-Jun', club: 'Busan Dragons', category: 'Senior -68kg' },
      { id: 3, name: 'Lee So-Young', club: 'Incheon Warriors', category: 'Junior -60kg' },
      { id: 4, name: 'Choi Jin-Woo', club: 'Daegu Lions', category: 'Senior -74kg' },
      { id: 5, name: 'Jung Hye-Jin', club: 'Gwangju Eagles', category: 'Senior -68kg' },
      { id: 6, name: 'Yoon Seung-Ho', club: 'Seoul Tigers', category: 'Senior -74kg' },
      { id: 7, name: 'Han Mi-Ra', club: 'Busan Dragons', category: 'Junior -60kg' },
      { id: 8, name: 'Lim Dong-Su', club: 'Incheon Warriors', category: 'Senior -68kg' },
      { id: 9, name: 'Song Min-Ho', club: 'Daegu Lions', category: 'Senior -68kg' },
      { id: 10, name: 'Kang Ji-Won', club: 'Gwangju Eagles', category: 'Senior -68kg' }
    ],
    brackets: {}
  }
])

// Computed
const currentTournament = computed(() => {
  return tournaments.value.find(t => t.id === selectedTournament.value)
})

// Métodos
const getParticipantsByCategory = (category) => {
  if (!currentTournament.value) return []
  return currentTournament.value.participants.filter(p => p.category === category)
}

const testBracket = (category) => {
  console.log('🧪 TEST - Creando bracket de prueba para:', category)
  
  const testBracket = [
    [
      { id: 'TEST-1', competitor1: 'Kim Tae-Hyun', competitor2: 'Park Min-Jun', winner: null, score1: null, score2: null },
      { id: 'TEST-2', competitor1: 'Jung Hye-Jin', competitor2: 'Lim Dong-Su', winner: null, score1: null, score2: null }
    ],
    [
      { id: 'TEST-FINAL', competitor1: null, competitor2: null, winner: null, score1: null, score2: null }
    ]
  ]
  
  if (!currentTournament.value.brackets) {
    currentTournament.value.brackets = {}
  }
  currentTournament.value.brackets[category] = testBracket
  
  console.log('✅ Bracket de prueba creado:', testBracket)
  alert('🧪 Bracket de prueba creado. Ahora haz clic en "Ver Bracket"')
}

const generateDraw = (category) => {
  console.log('🎲 Generando sorteo para:', category)
  
  const participants = getParticipantsByCategory(category)
  if (participants.length < 2) {
    alert('Se necesitan al menos 2 participantes para generar un bracket')
    return
  }
  
  // Shuffle participants
  const shuffled = [...participants].sort(() => Math.random() - 0.5)
  
  // Calculate number of rounds needed
  const totalRounds = Math.ceil(Math.log2(shuffled.length))
  const bracket = []
  
  // First round
  const firstRound = []
  for (let i = 0; i < shuffled.length; i += 2) {
    const match = {
      id: `${category}-R1-M${Math.floor(i/2) + 1}`,
      competitor1: shuffled[i]?.name,
      competitor2: shuffled[i + 1]?.name || null,
      winner: null,
      score1: null,
      score2: null
    }
    firstRound.push(match)
  }
  bracket.push(firstRound)
  
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
  
  // Save bracket
  if (!currentTournament.value.brackets) {
    currentTournament.value.brackets = {}
  }
  currentTournament.value.brackets[category] = bracket
  
  console.log('✅ Bracket generado:', bracket)
  alert(`✅ Bracket generado exitosamente para ${category}!\nSe generaron ${bracket.length} rondas.`)
}

const viewBracket = (category) => {
  console.log('👁️ Intentando ver bracket para:', category)
  console.log('Torneo actual:', currentTournament.value)
  console.log('Brackets disponibles:', currentTournament.value?.brackets)
  
  if (!currentTournament.value) {
    alert('No hay torneo seleccionado')
    return
  }
  
  if (!currentTournament.value.brackets || !currentTournament.value.brackets[category]) {
    alert('No hay bracket generado para esta categoría. Usa "Sortear" o "Test" primero.')
    return
  }
  
  currentCategory.value = category
  currentBracket.value = currentTournament.value.brackets[category]
  showBracketViewer.value = true
  
  console.log('✅ Bracket viewer abierto')
  console.log('Bracket cargado:', currentBracket.value)
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
  console.log('⚔️ Simulando combate:', match.id)
  
  const score1 = Math.floor(Math.random() * 15) + 5
  const score2 = Math.floor(Math.random() * 15) + 5
  
  match.score1 = score1
  match.score2 = score2
  match.winner = score1 > score2 ? 'competitor1' : 'competitor2'
  
  const winner = match.winner === 'competitor1' ? match.competitor1 : match.competitor2
  console.log(`🏆 Resultado: ${winner} gana ${score1} - ${score2}`)
  
  alert(`🏆 ¡Combate completado!\n${winner} gana ${score1} - ${score2}`)
  
  // Advance winner to next round if possible
  advanceWinner(match)
}

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
      
      console.log(`➡️ ${winner} avanza a la siguiente ronda`)
    }
  } else {
    const winner = match.winner === 'competitor1' ? match.competitor1 : match.competitor2
    console.log(`🎉 ¡${winner} es el CAMPEÓN!`)
  }
}

onMounted(() => {
  console.log('🏁 BracketManager montado')
  console.log('Torneos disponibles:', tournaments.value)
  console.log('Torneo seleccionado inicial:', selectedTournament.value)
})
</script>

<style scoped>
/* Estilos básicos para el componente */
select {
  background: rgba(255,255,255,0.1) !important;
  color: white !important;
}

select option {
  background: #1e40af;
  color: white;
}

button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}
</style>