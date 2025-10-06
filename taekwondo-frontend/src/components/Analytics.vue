<template>
  <div style="width: 100%; padding: 2rem; overflow-y: auto;">
    <!-- Header -->
    <header style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
      <div style="padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 0.75rem;">
              <BarChart style="width: 2rem; height: 2rem; color: white;" />
            </div>
            <div>
              <h1 style="font-size: 2rem; font-weight: bold; color: white; margin: 0 0 0.5rem 0;">Analytics y Estadísticas</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 0;">Análisis detallado de rendimiento y métricas</p>
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <select v-model="selectedPeriod" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;">
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Año</option>
            </select>
            <button style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 0.5rem; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
              <Download style="width: 1.25rem; height: 1.25rem;" />
              Exportar
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Métricas Principales -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <div style="background: rgba(34,197,94,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <Users style="width: 1.5rem; height: 1.5rem; color: #22c55e;" />
          </div>
        </div>
        <div style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">247</div>
        <h3 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 0.25rem 0;">Competidores</h3>
        <p style="color: #22c55e; font-size: 0.875rem; margin: 0;">+12% vs mes anterior</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <div style="background: rgba(37,99,235,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <Trophy style="width: 1.5rem; height: 1.5rem; color: #60a5fa;" />
          </div>
        </div>
        <div style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">18</div>
        <h3 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 0.25rem 0;">Torneos</h3>
        <p style="color: #60a5fa; font-size: 0.875rem; margin: 0;">+3 este mes</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <div style="background: rgba(220,38,38,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <Target style="width: 1.5rem; height: 1.5rem; color: #f87171;" />
          </div>
        </div>
        <div style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">1,243</div>
        <h3 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 0.25rem 0;">Combates</h3>
        <p style="color: #f87171; font-size: 0.875rem; margin: 0;">+156 esta semana</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <div style="background: rgba(245,158,11,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <Clock style="width: 1.5rem; height: 1.5rem; color: #fbbf24;" />
          </div>
        </div>
        <div style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">2:43</div>
        <h3 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 0.25rem 0;">Duración Promedio</h3>
        <p style="color: #fbbf24; font-size: 0.875rem; margin: 0;">Por combate</p>
      </div>
    </div>

    <!-- Gráficos y Análisis -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
      <!-- Gráfico de Participación -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">Participación en Torneos</h3>
        <div style="height: 300px; background: rgba(255,255,255,0.05); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; position: relative;">
          <!-- Simulación de gráfico de barras -->
          <div style="display: flex; align-items: end; gap: 1rem; height: 200px;">
            <div v-for="(data, index) in chartData" :key="index" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
              <div :style="`width: 40px; background: linear-gradient(135deg, ${data.color1} 0%, ${data.color2} 100%); border-radius: 0.25rem; height: ${data.height}px;`"></div>
              <span style="color: rgba(255,255,255,0.8); font-size: 0.75rem; font-weight: 600;">{{ data.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Competidores -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">Top Competidores</h3>
        <div style="display: grid; gap: 1rem;">
          <div v-for="(competitor, index) in topCompetitors" :key="index" style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem; padding: 1rem;">
            <div style="width: 2rem; height: 2rem; background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.875rem;">
              {{ index + 1 }}
            </div>
            <div style="flex: 1;">
              <div style="color: white; font-weight: 600; font-size: 0.875rem;">{{ competitor.name }}</div>
              <div style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">{{ competitor.wins }} victorias</div>
            </div>
            <div style="color: #22c55e; font-weight: bold; font-size: 0.875rem;">{{ competitor.winRate }}%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categorías más Populares -->
    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2); margin-bottom: 2rem;">
      <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">Categorías más Populares</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
        <div v-for="category in popularCategories" :key="category.name" style="background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">{{ category.participants }}</div>
          <h4 style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0 0 0.5rem 0;">{{ category.name }}</h4>
          <div style="background: rgba(37,99,235,0.2); color: #93c5fd; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; display: inline-block;">
            {{ category.growth }}% crecimiento
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas Detalladas -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <!-- Técnicas más Utilizadas -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">Técnicas más Utilizadas</h3>
        <div style="display: grid; gap: 1rem;">
          <div v-for="technique in techniques" :key="technique.name" style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: white; font-weight: 600;">{{ technique.name }}</span>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 100px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div :style="`width: ${technique.percentage}%; height: 100%; background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);`"></div>
              </div>
              <span style="color: rgba(255,255,255,0.8); font-size: 0.875rem; min-width: 40px; text-align: right;">{{ technique.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rendimiento por Horario -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">Actividad por Horario</h3>
        <div style="display: grid; gap: 1rem;">
          <div v-for="time in timeStats" :key="time.hour" style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: white; font-weight: 600;">{{ time.hour }}</span>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 100px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div :style="`width: ${time.activity}%; height: 100%; background: linear-gradient(135deg, #22c55e 0%, #f59e0b 100%);`"></div>
              </div>
              <span style="color: rgba(255,255,255,0.8); font-size: 0.875rem; min-width: 60px; text-align: right;">{{ time.matches }} combates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BarChart, Users, Trophy, Target, Clock, Download } from 'lucide-vue-next'
import { ref } from 'vue'

const selectedPeriod = ref('month')

const chartData = ref([
  { label: 'Ene', height: 120, color1: '#dc2626', color2: '#b91c1c' },
  { label: 'Feb', height: 180, color1: '#2563eb', color2: '#1d4ed8' },
  { label: 'Mar', height: 160, color1: '#dc2626', color2: '#b91c1c' },
  { label: 'Abr', height: 200, color1: '#2563eb', color2: '#1d4ed8' },
  { label: 'May', height: 140, color1: '#dc2626', color2: '#b91c1c' },
  { label: 'Jun', height: 190, color1: '#2563eb', color2: '#1d4ed8' }
])

const topCompetitors = ref([
  { name: 'Kim Tae-Hyun', wins: 24, winRate: 89 },
  { name: 'Park Min-Jun', wins: 22, winRate: 85 },
  { name: 'Lee So-Young', wins: 19, winRate: 82 },
  { name: 'Choi Jin-Woo', wins: 18, winRate: 78 },
  { name: 'Jung Hye-Jin', wins: 16, winRate: 76 }
])

const popularCategories = ref([
  { name: 'Senior -68kg', participants: 45, growth: 15 },
  { name: 'Junior -60kg', participants: 38, growth: 12 },
  { name: 'Cadete -55kg', participants: 32, growth: 8 },
  { name: 'Senior -74kg', participants: 28, growth: 10 }
])

const techniques = ref([
  { name: 'Dollyo Chagi', percentage: 35 },
  { name: 'Ap Chagi', percentage: 28 },
  { name: 'Yeop Chagi', percentage: 22 },
  { name: 'Dwit Chagi', percentage: 18 },
  { name: 'Naeryo Chagi', percentage: 15 },
  { name: 'Miro Chagi', percentage: 12 }
])

const timeStats = ref([
  { hour: '09:00-11:00', activity: 45, matches: 23 },
  { hour: '11:00-13:00', activity: 78, matches: 42 },
  { hour: '13:00-15:00', activity: 35, matches: 18 },
  { hour: '15:00-17:00', activity: 92, matches: 51 },
  { hour: '17:00-19:00', activity: 100, matches: 56 },
  { hour: '19:00-21:00', activity: 68, matches: 34 }
])
</script>