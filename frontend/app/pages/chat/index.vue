<script setup>
const { token, user } = useAuth()
const conversations = ref([])
const pending = ref(false)
const errorMessage = ref('')

const fetchConversations = async () => {
  if (!token.value) {
    conversations.value = []
    return
  }

  pending.value = true
  errorMessage.value = ''

  try {
    const data = await $fetch('http://localhost:5002/api/chats', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    conversations.value = Array.isArray(data) ? data : []
  } catch (err) {
    errorMessage.value = err?.data?.message || err?.data?.error || err.message || 'Unable to load chats'
  } finally {
    pending.value = false
  }
}

const otherPerson = (conversation) => {
  if (!user.value) return conversation.seller || conversation.buyer
  return conversation.buyerId === user.value.id ? conversation.seller : conversation.buyer
}

const lastMessage = (conversation) => conversation.messages?.[0]?.message || 'No messages yet'

onMounted(fetchConversations)

watch(token, fetchConversations)
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-primary">Chats</h1>
      <p class="mt-1 text-sm text-gray-500">Messages between buyers and sellers.</p>
    </div>

    <div v-if="!token" class="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <p class="text-gray-600">Please log in to view your chats.</p>
      <NuxtLink to="/auth/login" class="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
        Login
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="text-center text-gray-500">Loading chats...</div>
    <div v-else-if="errorMessage" class="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
      {{ errorMessage }}
    </div>
    <div v-else-if="conversations.length === 0" class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
      No chats yet.
    </div>

    <div v-else class="space-y-3">
      <NuxtLink
        v-for="conversation in conversations"
        :key="conversation.id"
        :to="`/chat/${conversation.id}`"
        class="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary/30 hover:shadow-sm"
      >
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            v-if="conversation.item?.imageUrl"
            :src="conversation.item.imageUrl"
            :alt="conversation.item.title"
            class="h-full w-full object-cover"
          >
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-3">
            <p class="truncate text-sm font-semibold text-gray-900">{{ otherPerson(conversation)?.name || 'User' }}</p>
            <p class="shrink-0 text-xs text-gray-400">{{ new Date(conversation.updatedAt).toLocaleDateString() }}</p>
          </div>
          <p class="truncate text-xs text-primary">{{ conversation.item?.title || 'Item' }}</p>
          <p class="mt-1 truncate text-sm text-gray-500">{{ lastMessage(conversation) }}</p>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>
