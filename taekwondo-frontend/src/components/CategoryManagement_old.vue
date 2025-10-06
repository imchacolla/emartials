<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
    <!-- Header -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="bg-white/10 p-3 rounded-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Gestión de Categorías</h1>
            <p class="text-blue-100">Administra categorías de competencia</p>
          </div>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nueva Categoría
        </button>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-white">{{ categories.length }}</div>
          <div class="text-blue-100 text-sm">Total</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-400">{{ activeCount }}</div>
          <div class="text-blue-100 text-sm">Activas</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-400">{{ inactiveCount }}</div>
          <div class="text-blue-100 text-sm">Inactivas</div>
        </div>
        <div class="bg-white/10 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-400">{{ filteredCategories.length }}</div>
          <div class="text-blue-100 text-sm">Filtradas</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-white text-sm font-medium mb-2">Buscar</label>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Nombre..."
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Torneo</label>
          <select 
            v-model="selectedTournament"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los torneos</option>
            <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Género</label>
          <select 
            v-model="selectedGender"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="MIXED">Mixto</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Estilo</label>
          <select 
            v-model="selectedStyle"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="KYORUGI">Kyorugi (Combate)</option>
            <option value="POOMSAE">Poomsae (Formas)</option>
            <option value="BREAKING">Breaking (Rompimiento)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white text-sm font-medium mb-2">Estado</label>
          <select 
            v-model="selectedStatus"
            class="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="true">Activas</option>
            <option value="false">Inactivas</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white/10">
            <tr>
              <th class="px-6 py-4 text-left text-white font-medium">ID</th>
              <th class="px-6 py-4 text-left text-white font-medium">Nombre</th>
              <th class="px-6 py-4 text-left text-white font-medium">Torneo</th>
              <th class="px-6 py-4 text-left text-white font-medium">Edad</th>
              <th class="px-6 py-4 text-left text-white font-medium">Peso</th>
              <th class="px-6 py-4 text-left text-white font-medium">Género</th>
              <th class="px-6 py-4 text-left text-white font-medium">Estilo</th>
              <th class="px-6 py-4 text-left text-white font-medium">Participantes</th>
              <th class="px-6 py-4 text-left text-white font-medium">Estado</th>
              <th class="px-6 py-4 text-left text-white font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="loading" class="text-white">
              <td colspan="10" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <span class="ml-3">Cargando categorías...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredCategories.length === 0" class="text-white">
              <td colspan="10" class="px-6 py-8 text-center">
                <div class="text-gray-300">
                  <p>No se encontraron categorías</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="category in paginatedCategories" :key="category.id" class="text-white hover:bg-white/5">
              <td class="px-6 py-4">{{ category.id }}</td>
              <td class="px-6 py-4">
                <div class="font-medium">{{ category.name }}</div>
                <div class="text-gray-300 text-sm" v-if="category.belt">{{ category.belt }}</div>
              </td>
              <td class="px-6 py-4">{{ category.tournament?.name || 'Sin torneo' }}</td>
              <td class="px-6 py-4">{{ category.minAge }} - {{ category.maxAge }} años</td>
              <td class="px-6 py-4">{{ category.minWeight }}kg - {{ category.maxWeight }}kg</td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getGenderColor(category.gender)">
                  {{ getGenderText(category.gender) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStyleColor(category.style)">
                  {{ getStyleText(category.style) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-center">
                  <div class="font-medium">{{ category._count?.competitors || 0 }}</div>
                  <div class="text-gray-300 text-sm" v-if="category.maxParticipants">
                    / {{ category.maxParticipants }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ category.isActive ? 'Activa' : 'Inactiva' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button 
                    @click="viewCategory(category)"
                    class="text-blue-400 hover:text-blue-300 p-1"
                    title="Ver detalles"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="editCategory(category)"
                    class="text-yellow-400 hover:text-yellow-300 p-1"
                    title="Editar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteCategory(category)"
                    class="text-red-400 hover:text-red-300 p-1"
                    title="Eliminar"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-white/10">
        <div class="text-white text-sm">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }} de {{ filteredCategories.length }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50"
          >
            Anterior
          </button>
          <span class="px-3 py-1 bg-blue-600 text-white rounded">{{ currentPage }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">
            {{ editingCategory ? 'Editar Categoría' : 'Nueva Categoría' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-white text-sm font-medium mb-2">Nombre *</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Juvenil Masculino -55kg"
            >
          </div>

          <div>
            <label class="block text-white text-sm font-medium mb-2">Torneo *</label>
            <select 
              v-model="form.tournamentId"
              required
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar torneo</option>
              <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">{{ tournament.name }}</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Edad Mínima *</label>
              <input 
                v-model.number="form.minAge"
                type="number" 
                min="0"
                max="100"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Edad Máxima *</label>
              <input 
                v-model.number="form.maxAge"
                type="number" 
                min="0"
                max="100"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Peso Mínimo (kg) *</label>
              <input 
                v-model.number="form.minWeight"
                type="number" 
                step="0.1"
                min="0"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Peso Máximo (kg) *</label>
              <input 
                v-model.number="form.maxWeight"
                type="number" 
                step="0.1"
                min="0"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Género *</label>
              <select 
                v-model="form.gender"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar género</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Femenino</option>
                <option value="MIXED">Mixto</option>
              </select>
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Estilo *</label>
              <select 
                v-model="form.style"
                required
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar estilo</option>
                <option value="KYORUGI">Kyorugi (Combate)</option>
                <option value="POOMSAE">Poomsae (Formas)</option>
                <option value="BREAKING">Breaking (Rompimiento)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-white text-sm font-medium mb-2">Cinturón/Grado</label>
            <input 
              v-model="form.belt"
              type="text" 
              class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Cinturón Negro, 1er Dan, etc."
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-sm font-medium mb-2">Máximo Participantes</label>
              <input 
                v-model.number="form.maxParticipants"
                type="number" 
                min="1"
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">Cuota de Inscripción</label>
              <input 
                v-model.number="form.registrationFee"
                type="number" 
                step="0.01"
                min="0"
                class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="flex items-center space-x-2">
              <input 
                v-model="form.isActive"
                type="checkbox" 
                class="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
              >
              <span class="text-white text-sm">Categoría activa</span>
            </label>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button 
              type="submit"
              :disabled="saving"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {{ saving ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear') }}
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal && selectedCategory" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeViewModal">
      <div class="bg-gray-800 rounded-lg p-8 max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">Detalles de la Categoría</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Información General</h4>
            <div class="space-y-3">
              <div>
                <span class="text-gray-300 text-sm">Nombre:</span>
                <p class="text-white font-medium">{{ selectedCategory.name }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Torneo:</span>
                <p class="text-white">{{ selectedCategory.tournament?.name || 'Sin torneo' }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Edad:</span>
                <p class="text-white">{{ selectedCategory.minAge }} - {{ selectedCategory.maxAge }} años</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Peso:</span>
                <p class="text-white">{{ selectedCategory.minWeight }}kg - {{ selectedCategory.maxWeight }}kg</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Género:</span>
                <p class="text-white">{{ getGenderText(selectedCategory.gender) }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Estilo:</span>
                <p class="text-white">{{ getStyleText(selectedCategory.style) }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Detalles Adicionales</h4>
            <div class="space-y-3">
              <div v-if="selectedCategory.belt">
                <span class="text-gray-300 text-sm">Cinturón/Grado:</span>
                <p class="text-white">{{ selectedCategory.belt }}</p>
              </div>
              <div v-if="selectedCategory.maxParticipants">
                <span class="text-gray-300 text-sm">Máximo Participantes:</span>
                <p class="text-white">{{ selectedCategory.maxParticipants }}</p>
              </div>
              <div v-if="selectedCategory.registrationFee">
                <span class="text-gray-300 text-sm">Cuota de Inscripción:</span>
                <p class="text-white">${{ selectedCategory.registrationFee }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Competidores Inscritos:</span>
                <p class="text-white">{{ selectedCategory._count?.competitors || 0 }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Registraciones:</span>
                <p class="text-white">{{ selectedCategory._count?.registrations || 0 }}</p>
              </div>
              <div>
                <span class="text-gray-300 text-sm">Estado:</span>
                <span :class="selectedCategory.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ selectedCategory.isActive ? 'Activa' : 'Inactiva' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-700">
          <div class="flex space-x-4">
            <button 
              @click="editCategory(selectedCategory); closeViewModal()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Editar
            </button>
            <button 
              @click="closeViewModal"
              class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      </div>
    </header>

    <!-- Error Message -->
    <div v-if="error" style="background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); border-radius: 0.75rem; padding: 1rem; margin-bottom: 2rem; color: #f87171;">
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" style="text-align: center; padding: 2rem; color: white;">
      <div style="display: inline-block; width: 2rem; height: 2rem; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s ease-in-out infinite;"></div>
      <p style="margin-top: 1rem;">Cargando categorías...</p>
    </div>

    <!-- Categories Grid -->
    <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
      <div v-for="category in categories" :key="category.id" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
        <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
          <div style="flex: 1;">
            <h3 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem 0;">{{ category.name }}</h3>
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.875rem;">{{ category.description }}</p>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-left: 1rem;">
            <button @click="editCategory(category)" style="background: rgba(59,130,246,0.2); color: #60a5fa; border: none; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer;">
              <Edit style="width: 1rem; height: 1rem;" />
            </button>
            <button @click="deleteCategory(category.id)" style="background: rgba(220,38,38,0.2); color: #f87171; border: none; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer;">
              <Trash2 style="width: 1rem; height: 1rem;" />
            </button>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase;">Edad Mínima</span>
            <p style="color: white; font-weight: 600; margin: 0.25rem 0 0 0;">{{ category.minAge }} años</p>
          </div>
          <div>
            <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase;">Edad Máxima</span>
            <p style="color: white; font-weight: 600; margin: 0.25rem 0 0 0;">{{ category.maxAge }} años</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase;">Peso Mínimo</span>
            <p style="color: white; font-weight: 600; margin: 0.25rem 0 0 0;">{{ category.minWeight }}kg</p>
          </div>
          <div>
            <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase;">Peso Máximo</span>
            <p style="color: white; font-weight: 600; margin: 0.25rem 0 0 0;">{{ category.maxWeight }}kg</p>
          </div>
        </div>

        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase;">Género</span>
          <div style="margin-top: 0.5rem;">
            <span :style="getGenderStyle(category.gender)" style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
              {{ getGenderText(category.gender) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear/Editar Categoría -->
    <div v-if="showCreateModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border-radius: 1rem; padding: 2rem; width: 500px; max-height: 80vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.2);">
        <h3 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0 0 1.5rem 0;">
          {{ editingCategory ? 'Editar Categoría' : 'Crear Nueva Categoría' }}
        </h3>
        
        <form @submit.prevent="saveCategory" style="display: grid; gap: 1rem;">
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Nombre</label>
            <input v-model="categoryForm.name" type="text" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
          </div>
          
          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Descripción</label>
            <textarea v-model="categoryForm.description" rows="2" style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none; resize: vertical;"></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Edad Mínima</label>
              <input v-model="categoryForm.minAge" type="number" min="5" max="100" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
            </div>
            
            <div>
              <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Edad Máxima</label>
              <input v-model="categoryForm.maxAge" type="number" min="5" max="100" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Peso Mínimo (kg)</label>
              <input v-model="categoryForm.minWeight" type="number" min="20" max="150" step="0.1" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
            </div>
            
            <div>
              <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Peso Máximo (kg)</label>
              <input v-model="categoryForm.maxWeight" type="number" min="20" max="150" step="0.1" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;" />
            </div>
          </div>

          <div>
            <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem;">Género</label>
            <select v-model="categoryForm.gender" required style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; outline: none;">
              <option value="">Seleccionar género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="MIXED">Mixto</option>
            </select>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" style="flex: 1; background: rgba(34,197,94,0.2); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              {{ editingCategory ? 'Actualizar' : 'Crear' }}
            </button>
            <button type="button" @click="closeModal" style="flex: 1; background: rgba(156,163,175,0.2); color: #9ca3af; border: 1px solid rgba(156,163,175,0.3); border-radius: 0.5rem; padding: 0.75rem; font-weight: 600; cursor: pointer;">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Target, Plus, Edit, Trash2 } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi.js'

const { categories: categoriesApi, loading, error } = useApi()

const categories = ref([])
const showCreateModal = ref(false)
const editingCategory = ref(null)

const categoryForm = ref({
  name: '',
  description: '',
  minAge: 5,
  maxAge: 18,
  minWeight: 30,
  maxWeight: 40,
  gender: ''
})

const fetchCategories = async () => {
  try {
    const response = await categoriesApi.getAll()
    categories.value = response.categories || []
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

const saveCategory = async () => {
  try {
    if (editingCategory.value) {
      await categoriesApi.update(editingCategory.value.id, categoryForm.value)
    } else {
      await categoriesApi.create(categoryForm.value)
    }
    await fetchCategories()
    closeModal()
  } catch (err) {
    console.error('Error saving category:', err)
  }
}

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = { ...category }
  showCreateModal.value = true
}

const deleteCategory = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
    try {
      await categoriesApi.delete(id)
      await fetchCategories()
    } catch (err) {
      console.error('Error deleting category:', err)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    description: '',
    minAge: 5,
    maxAge: 18,
    minWeight: 30,
    maxWeight: 40,
    gender: ''
  }
}

const getGenderStyle = (gender) => {
  switch (gender) {
    case 'M':
      return 'background: rgba(59,130,246,0.2); color: #60a5fa;'
    case 'F':
      return 'background: rgba(236,72,153,0.2); color: #ec4899;'
    case 'MIXED':
      return 'background: rgba(34,197,94,0.2); color: #22c55e;'
    default:
      return 'background: rgba(156,163,175,0.2); color: #9ca3af;'
  }
}

const getGenderText = (gender) => {
  switch (gender) {
    case 'M': return 'Masculino'
    case 'F': return 'Femenino'
    case 'MIXED': return 'Mixto'
    default: return 'No especificado'
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>