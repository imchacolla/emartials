import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

export function useSocket() {
  const socket = ref(null)
  const isConnected = ref(false)

  const connect = () => {
    // Conectar al servidor backend (puerto 3000 donde está el backend)
    socket.value = io('http://localhost:3000', {
      transports: ['websocket'],
    })

    socket.value.on('connect', () => {
      isConnected.value = true
      console.log('Conectado al servidor WebSocket')

      // Debug: escuchar TODOS los eventos
      socket.value.onAny((eventName, ...args) => {
        console.log(`🔥 Evento recibido: ${eventName}`, args)
      })
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
      console.log('Desconectado del servidor WebSocket')
    })

    socket.value.on('connect_error', (error) => {
      isConnected.value = false
      console.error('Error de conexión:', error)
    })
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect()
      socket.value = null
      isConnected.value = false
    }
  }

  const emit = (event, data) => {
    if (socket.value && isConnected.value) {
      socket.value.emit(event, data)
    }
  }

  const on = (event, callback) => {
    if (socket.value) {
      socket.value.on(event, callback)
    }
  }

  const off = (event, callback) => {
    if (socket.value) {
      socket.value.off(event, callback)
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    socket,
    isConnected,
    connect,
    disconnect,
    emit,
    on,
    off,
  }
}
