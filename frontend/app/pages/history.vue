<script setup>
const { token } = useAuth()
const history = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

const fetchHistory = async () => {
  if (!token?.value) {
    errorMessage.value = 'Please log in to view your purchase history.'
    history.value = []
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    const data = await $fetch('http://localhost:5002/api/users/history', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    history.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Failed to fetch history:', err)
    history.value = []
    errorMessage.value = err?.data?.message || err?.message || 'Unable to load purchase history.'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (value) => {
  if (!value) return 'Date unavailable'
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return value
  }
}

watch(token, (newToken) => {
  if (newToken) {
    fetchHistory()
  } else {
    history.value = []
    errorMessage.value = 'Please log in to view your purchase history.'
  }
})

onMounted(fetchHistory)
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-primary font-semibold">History</p>
        <h1 class="text-3xl font-bold mt-2">Purchase timeline</h1>
      </div>
      <div class="text-sm text-gray-500">Latest orders are shown first.</div>
    </div>

    <div v-if="isLoading" class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <p class="text-gray-500">Fetching your order history...</p>
    </div>

    <div v-else-if="errorMessage" class="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
      <p class="font-semibold mb-2">Oops — something went wrong</p>
      <p class="text-sm leading-6">{{ errorMessage }}</p>
      <button @click="fetchHistory" class="mt-4 inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100">
        Retry
      </button>
    </div>

    <div v-else-if="!token" class="rounded-3xl border border-gray-200 bg-white p-8 text-gray-600">
      <p class="font-medium">Sign in to unlock your purchase history.</p>
      <p class="mt-2 text-sm text-gray-500">Your orders are stored securely and shown here once you log in.</p>
    </div>

    <div v-else-if="history.length === 0" class="rounded-3xl border border-gray-200 bg-white p-8 text-gray-600">
      <p class="font-medium">No purchases yet.</p>
      <p class="mt-2 text-sm text-gray-500">Browse items and make your first purchase to see it appear here.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in history" :key="item.id" class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-base font-semibold text-slate-900">{{ item.name || 'Unknown item' }}</p>
            <p class="text-sm text-gray-500">{{ item.description || 'No description available' }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">{{ formatDate(item.date) }}</p>
            <p class="text-sm font-semibold text-slate-900">${{ item.total?.toFixed(2) ?? item.price?.toFixed(2) ?? '0.00' }}</p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600 sm:grid-cols-4">
          <div>
            <p class="font-medium text-slate-900">Quantity</p>
            <p>{{ item.quantity }}</p>
          </div>
          <div>
            <p class="font-medium text-slate-900">Price</p>
            <p>${{ item.price?.toFixed(2) ?? '0.00' }}</p>
          </div>
          <div>
            <p class="font-medium text-slate-900">Status</p>
            <p>{{ item.status || 'Purchased' }}</p>
          </div>
          <div>
            <p class="font-medium text-slate-900">Order</p>
            <p>#{{ item.cart_id }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
