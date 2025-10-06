import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import CompetitorManagement from '@/components/CompetitorManagement.vue'
import TournamentManagement from '@/components/TournamentManagement.vue'
import CategoryManagement from '@/components/CategoryManagement.vue'
import ConfigurationManagement from '@/components/ConfigurationManagement.vue'
import BracketManagerSimple from '@/components/BracketManagerSimple.vue'
import HardwareMonitor from '@/components/HardwareMonitor.vue'
import MonitoringView from '@/components/MonitoringView.vue'
import CombatSystem from '@/components/CombatSystem.vue'
import CombatSystemDAEDO from '@/components/CombatSystemDAEDO.vue'
import CombatManagement from '@/components/CombatManagement.vue'
import CombatSystemEnhanced from '@/components/CombatSystemEnhanced.vue'
import WTScoringSystem from '@/components/WTScoringSystem.vue'
import WTHardwareConfig from '@/components/WTHardwareConfig.vue'
import TournamentRegistrations from '@/components/TournamentRegistrations.vue'
import TournamentMatches from '@/components/TournamentMatches.vue'
import TournamentCombat from '@/components/TournamentCombat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainMenu,
  },
  {
    path: '/competitors',
    name: 'Competitors',
    component: CompetitorManagement,
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: TournamentManagement,
  },
  {
    path: '/brackets',
    name: 'Brackets',
    component: BracketManagerSimple,
  },
  {
    path: '/combat',
    name: 'Combat',
    component: CombatSystemDAEDO,
  },
  {
    path: '/combat-management',
    name: 'CombatManagement',
    component: CombatManagement,
  },
  {
    path: '/combat-enhanced',
    name: 'CombatEnhanced',
    component: CombatSystemEnhanced,
  },
  {
    path: '/wt-scoring',
    name: 'WTScoring',
    component: WTScoringSystem,
  },
  {
    path: '/wt-hardware',
    name: 'WTHardware',
    component: WTHardwareConfig,
  },
  {
    path: '/combat-daedo',
    name: 'CombatDAEDO',
    component: CombatSystemDAEDO,
  },
  {
    path: '/combat-classic',
    name: 'CombatClassic',
    component: CombatSystem,
  },
  {
    path: '/stream',
    name: 'Stream',
    component: () => import('@/components/MainMenu.vue'), // Temporal
  },
  {
    path: '/hardware',
    name: 'Hardware',
    component: HardwareMonitor,
  },
  {
    path: '/hardware-monitor',
    name: 'HardwareMonitor',
    component: HardwareMonitor,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoryManagement,
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: () => import('@/components/MainMenu.vue'), // Temporal
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: MonitoringView,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: ConfigurationManagement,
  },
  {
    path: '/tournament-registrations/:id',
    name: 'TournamentRegistrations',
    component: TournamentRegistrations,
  },
  {
    path: '/tournament-matches/:id',
    name: 'TournamentMatches',
    component: TournamentMatches,
  },
  {
    path: '/tournament-combat/:tournamentId/:matchId',
    name: 'TournamentCombat',
    component: TournamentCombat,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
