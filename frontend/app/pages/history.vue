<script setup>
    const { token } = useAuth()
    const history = ref([])
    const isLoading = ref(false)

const fetchHistory = async () => {
  if (!token.value) return
  isLoading.value = true
  try {
    const data = await $fetch('http://localhost:5002/users/history', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    history.value = data 
  } catch (err) {
    console.error('Failed to fetch history:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHistory)
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Purchase History</h1>
    <div v-if="isLoading" class="text-gray-500">Loading your purchases...</div>
    
    <div v-else-if="history.length === 0" class="text-gray-500">
      You haven’t bought anything yet.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in history"
        :key="item.id"
        class="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
      >
        <div>
          <p class="font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-sm text-gray-500">
            Bought on {{ item.date }} • Price: ${{ item.price }}
          </p>
        </div>
        <UIcon name="i-lucide-shopping-bag" class="size-5 text-gray-400" />
      </div>
    </div>
  </div>
</template>
