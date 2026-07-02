<template>
  <div class="min-h-screen bg-gray-50 pb-8">

    <!-- Header -->
    <div class="bg-primary h-16 flex items-center px-6">
      <h1 class="text-white text-lg font-semibold">My Things</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center mt-20">
      <svg class="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>

    <!-- Empty -->
    <div v-else-if="myItems.length === 0" class="flex flex-col items-center justify-center mt-32 px-6">
      <svg class="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p class="text-gray-400 text-sm">You have no listed items yet</p>
      <NuxtLink to="/items/create" class="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
        Add Item
      </NuxtLink>
    </div>

    <!-- Items List -->
    <div v-else class="mx-4 mt-5 flex flex-col gap-3">
      <div
        v-for="item in myItems"
        :key="item.id"
        class="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
      >
        <!-- Placeholder image -->
        <div class="w-16 h-16 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
          </svg>
        </div>

        <!-- Item Info -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-400 mt-0.5 truncate">{{ item.description }}</p>
          <p class="text-sm font-semibold text-secondary mt-1">RM {{ item.price.toFixed(2) }}</p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-2 shrink-0">
          <NuxtLink
            :to="`/items/${item.id}`"
            class="text-xs px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-blue-50 transition-colors text-center">
            View
          </NuxtLink>
          <button
            @click="deleteItem(item.id)"
            class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item FAB -->
    <NuxtLink
      to="/items/create"
      class="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </NuxtLink>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { token, user } = useAuth()

const myItems = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const allItems = await $fetch('http://localhost:5000/items')
    // Filter items that belong to the current logged in user
    myItems.value = allItems.filter(item => item.user_id === user.value?.id)
  } catch (err) {
    console.error('Failed to fetch items:', err)
  } finally {
    loading.value = false
  }
})

const deleteItem = async (id) => {
  try {
    await $fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' })
    myItems.value = myItems.value.filter(item => item.id !== id)
  } catch (err) {
    console.error('Failed to delete item:', err)
  }
}
</script>
