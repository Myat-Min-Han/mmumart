export const useChatSocket = (token, handlers = {}) => {
  const socket = ref(null)
  const connected = ref(false)
  const socketError = ref(null)

  const connect = () => {
    if (!import.meta.client || !token?.value || socket.value) return

    const ws = new WebSocket(`ws://localhost:5002/ws/chat?token=${encodeURIComponent(token.value)}`)
    socket.value = ws

    ws.onopen = () => {
      connected.value = true
      socketError.value = null
    }

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        handlers[payload.type]?.(payload)
      } catch {
        socketError.value = 'Invalid chat event received'
      }
    }

    ws.onerror = () => {
      socketError.value = 'Chat connection failed'
    }

    ws.onclose = () => {
      connected.value = false
      socket.value = null
    }
  }

  const disconnect = () => {
    socket.value?.close()
    socket.value = null
    connected.value = false
  }

  const sendMessage = (conversationId, message) => {
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) return false

    socket.value.send(JSON.stringify({
      type: 'send_message',
      conversationId,
      message,
    }))

    return true
  }

  return {
    socket,
    connected,
    socketError,
    connect,
    disconnect,
    sendMessage,
  }
}
