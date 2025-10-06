<template>
  <div style="width: 100%; padding: 2rem; overflow-y: auto;">
    <!-- Header -->
    <header style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
      <div style="padding: 2rem;">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <Play style="width: 2rem; height: 2rem; color: white;" />
          </div>
          <div>
            <h1 style="font-size: 2rem; font-weight: bold; color: white; margin: 0 0 0.5rem 0;">Transmisión en Vivo</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 0;">Sistema de streaming para competencias de Taekwondo</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido Principal -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; max-width: 90rem; margin: 0 auto;">
      
      <!-- Video Principal -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
        <div style="position: relative; background: #000; border-radius: 0.5rem; overflow: hidden; aspect-ratio: 16/9; margin-bottom: 1.5rem;">
          <!-- Simulación de video -->
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #1e40af, #dc2626);">
            <div style="text-align: center; color: white;">
              <Play style="width: 4rem; height: 4rem; margin: 0 auto 1rem auto;" />
              <h3 style="font-size: 1.5rem; font-weight: bold; margin: 0 0 0.5rem 0;">Stream en Vivo</h3>
              <p style="color: rgba(255,255,255,0.8); margin: 0;">Competencia Nacional de Taekwondo</p>
            </div>
          </div>
          
          <!-- Controles de video -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.5rem; border-radius: 0.25rem; cursor: pointer;">
                <Play style="width: 1.25rem; height: 1.25rem;" />
              </button>
              <div style="flex: 1; background: rgba(255,255,255,0.3); height: 0.25rem; border-radius: 9999px;">
                <div style="background: #dc2626; height: 100%; width: 30%; border-radius: 9999px;"></div>
              </div>
              <span style="color: white; font-size: 0.875rem;">01:23 / 04:56</span>
            </div>
          </div>
        </div>

        <!-- Información del Stream -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin: 0;">Semifinal - División Senior</h2>
          <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(220,38,38,0.2); color: #fca5a5; padding: 0.5rem 1rem; border-radius: 9999px;">
            <div style="width: 0.5rem; height: 0.5rem; background: #dc2626; border-radius: 50%;"></div>
            <span style="font-size: 0.875rem; font-weight: 600;">EN VIVO</span>
          </div>
        </div>

        <p style="color: rgba(255,255,255,0.8); margin: 0 0 1.5rem 0; line-height: 1.6;">
          Combate eliminatorio entre los mejores competidores de la división senior masculina. 
          Categoría de peso: -80kg. Round actual: 2 de 3.
        </p>

        <!-- Estadísticas del combate -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
          <div style="background: rgba(220,38,38,0.2); border-radius: 0.5rem; padding: 1.5rem; text-align: center;">
            <h4 style="color: #fca5a5; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">COMPETIDOR ROJO</h4>
            <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 0.5rem 0;">Kim Tae-Hyun</h3>
            <div style="font-size: 2rem; font-weight: bold; color: #dc2626; margin: 0;">12</div>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin: 0;">puntos</p>
          </div>
          
          <div style="background: rgba(37,99,235,0.2); border-radius: 0.5rem; padding: 1.5rem; text-align: center;">
            <h4 style="color: #93c5fd; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">COMPETIDOR AZUL</h4>
            <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 0.5rem 0;">Park Min-Jun</h3>
            <div style="font-size: 2rem; font-weight: bold; color: #2563eb; margin: 0;">8</div>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin: 0;">puntos</p>
          </div>
        </div>
      </div>

      <!-- Panel Lateral -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Chat en Vivo -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); flex: 1;">
          <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1rem 0;">Chat en Vivo</h3>
          
          <div style="background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 1rem; height: 200px; overflow-y: auto; margin-bottom: 1rem;">
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #93c5fd; font-weight: 600; font-size: 0.875rem;">Juez_Oficial:</span>
              <span style="color: rgba(255,255,255,0.9); font-size: 0.875rem; margin-left: 0.5rem;">Excelente técnica de patada</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #fca5a5; font-weight: 600; font-size: 0.875rem;">Espectador_01:</span>
              <span style="color: rgba(255,255,255,0.9); font-size: 0.875rem; margin-left: 0.5rem;">¡Qué combate tan emocionante!</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #86efac; font-weight: 600; font-size: 0.875rem;">Coach_Master:</span>
              <span style="color: rgba(255,255,255,0.9); font-size: 0.875rem; margin-left: 0.5rem;">Kim está dominando este round</span>
            </div>
          </div>
          
          <div style="display: flex; gap: 0.5rem;">
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; padding: 0.75rem; color: white; font-size: 0.875rem;"
            />
            <button style="background: #dc2626; color: white; border: none; border-radius: 0.5rem; padding: 0.75rem 1rem; cursor: pointer; font-weight: 600;">
              Enviar
            </button>
          </div>
        </div>

        <!-- Próximos Combates -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);">
          <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1rem 0;">Próximos Combates</h3>
          
          <div style="space-y: 0.75rem;">
            <div style="background: rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="color: white; font-weight: 600; font-size: 0.875rem;">Final -68kg</span>
                <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">15:30</span>
              </div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.75rem; margin: 0;">Lee vs. Choi</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="color: white; font-weight: 600; font-size: 0.875rem;">Semi -58kg</span>
                <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">16:00</span>
              </div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.75rem; margin: 0;">Garcia vs. Kim</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="color: white; font-weight: 600; font-size: 0.875rem;">Final -74kg</span>
                <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">16:30</span>
              </div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.75rem; margin: 0;">Martinez vs. Wang</p>
            </div>
          </div>
        </div>

        <!-- Configuración de Stream -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);">
          <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0 0 1rem 0;">Configuración</h3>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button style="background: rgba(220,38,38,0.2); color: #fca5a5; border: 1px solid rgba(220,38,38,0.3); border-radius: 0.5rem; padding: 0.75rem; cursor: pointer; font-weight: 600; width: 100%;">
              Cambiar Calidad
            </button>
            <button style="background: rgba(37,99,235,0.2); color: #93c5fd; border: 1px solid rgba(37,99,235,0.3); border-radius: 0.5rem; padding: 0.75rem; cursor: pointer; font-weight: 600; width: 100%;">
              Pantalla Completa
            </button>
            <button style="background: rgba(75,85,99,0.2); color: #d1d5db; border: 1px solid rgba(75,85,99,0.3); border-radius: 0.5rem; padding: 0.75rem; cursor: pointer; font-weight: 600; width: 100%;">
              Grabar Combate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Play } from 'lucide-vue-next'

// Aquí iría la lógica del streaming
console.log('Componente de Stream cargado')
</script>