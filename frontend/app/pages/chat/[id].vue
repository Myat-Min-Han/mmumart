<script setup>
const route = useRoute()
const { token, user } = useAuth()

const conversationId = computed(() => Number(route.params.id))
const conversation = ref(null)
const messages = ref([])
const draft = ref('')
const pending = ref(false)
const sending = ref(false)
const errorMessage = ref('')

const otherPerson = computed(() => {
  if (!conversation.value || !user.value) return null
  return conversation.value.buyerId === user.value.id ? conversation.value.seller : conversation.value.buyer
})

const loadConversation = async () => {
  if (!token.value || Number.isNaN(conversationId.value)) return

  pending.value = true
  errorMessage.value = ''

  try {
    const [conversationData, messageData] = await Promise.all([
      $fetch(`http://localhost:5002/api/chats/conversations/${conversationId.value}`, {
        headers: { Authorization: `Bearer ${token.value}` },
      }),
      $fetch(`http://localhost:5002/api/chats/conversations/${conversationId.value}/messages`, {
        headers: { Authorization: `Bearer ${token.value}` },
      }),
    ])

    conversation.value = conversationData
    messages.value = Array.isArray(messageData) ? messageData : []
  } catch (err) {
    errorMessage.value = err?.data?.message || err?.data?.error || err.message || 'Unable to load chat'
  } finally {
    pending.value = false
  }
}

const { connected, socketError, connect, disconnect, sendMessage } = useChatSocket(token, {
  new_message: (payload) => {
    if (Number(payload.conversationId) !== conversationId.value) return
    if (messages.value.some(message => message.id === payload.message.id)) return
    messages.value.push(payload.message)
  },
  error: (payload) => {
    errorMessage.value = payload.message || 'Chat error'
  },
})

const submitMessage = () => {
  const text = draft.value.trim()
  if (!text || sending.value) return

  sending.value = true
  errorMessage.value = ''

  const sent = sendMessage(conversationId.value, text)
  if (sent) {
    draft.value = ''
  } else {
    errorMessage.value = 'Chat is not connected yet. Please try again.'
  }

  sending.value = false
}

onMounted(() => {
  loadConversation()
  connect()
})

onBeforeUnmount(disconnect)
</script>

<template>
  <main class="mx-auto flex h-[calc(100vh-5rem)] max-w-5xl flex-col px-4 py-6">
    <div class="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
      <div>
        <NuxtLink to="/chat" class="text-sm text-primary hover:underline">Back to chats</NuxtLink>
        <h1 class="mt-2 text-xl font-bold text-gray-900">{{ otherPerson?.name || 'Chat' }}</h1>
        <p class="text-sm text-gray-500">{{ conversation?.item?.title || 'Item conversation' }}</p>
      </div>
      <span class="rounded-full px-3 py-1 text-xs font-medium" :class="connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'">
        {{ connected ? 'Online' : 'Connecting' }}
      </span>
    </div>

    <div v-if="!token" class="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <p class="text-gray-600">Please log in to use chat.</p>
      <NuxtLink to="/auth/login" class="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
        Login
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="flex-1 text-center text-gray-500">Loading chat...</div>
    <div v-else class="flex min-h-0 flex-1 flex-col">
      <div v-if="errorMessage || socketError" class="mb-3 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
        {{ errorMessage || socketError }}
      </div>

      <div class="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-xl bg-gray-50 p-4">
        <div v-if="messages.length === 0" class="pt-16 text-center text-sm text-gray-500">
          Start the conversation.
        </div>

        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.senderId === user?.id ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[75%] rounded-2xl px-4 py-2 text-sm"
            :class="message.senderId === user?.id ? 'bg-primary text-white' : 'bg-white text-gray-800 border border-gray-100'"
          >
            <p>{{ message.message }}</p>
            <p class="mt-1 text-[11px]" :class="message.senderId === user?.id ? 'text-white/70' : 'text-gray-400'">
              {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>
      </div>

      <form class="mt-4 flex gap-3" @submit.prevent="submitMessage">
        <input
          v-model="draft"
          type="text"
          placeholder="Type a message"
          class="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
        <button
          type="submit"
          :disabled="!draft.trim() || sending || !connected"
          class="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  </main>
</template>
