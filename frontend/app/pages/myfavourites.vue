<template>
  <div class="min-h-screen bg-gray-50 pb-8">

    <!-- Header -->
    <div class="bg-primary px-4 pt-12 pb-5 rounded-b-3xl flex items-center gap-3">
      <button @click="$router.back()" class="text-white">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-white text-base font-semibold">My Favourites</h1>
      <span class="ml-auto text-xs text-white/60">{{ favourites.length }} items</span>
    </div>

    <!-- Empty State -->
    <div v-if="favourites.length === 0" class="flex flex-col items-center justify-center mt-24 px-8 text-center">
      <svg class="w-16 h-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <p class="text-sm font-medium text-gray-400">No favourites yet</p>
      <p class="text-xs text-gray-300 mt-1">Items you save will appear here</p>
    </div>

    <!-- Favourites List -->
    <div v-else class="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div
        v-for="(item, index) in favourites"
        :key="item.id"
        class="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0"
      >
        <!-- Product Image -->
        <img
          :src="item.image"
          :alt="item.name"
          class="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
        />

        <!-- Product Info -->
        <div class="flex-1 min-w-0" @click="$router.push('/product/' + item.id)">
          <p class="text-sm font-medium text-primary truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-400 mt-0.5 truncate">{{ item.category }}</p>
          <p class="text-sm font-semibold text-secondary mt-1">RM {{ item.price }}</p>
        </div>

        <!-- Remove Button -->
        <button
          @click="removeFavourite(item.id)"
          class="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-100 transition-colors"
        >
          <svg class="w-4 h-4 text-gray-300 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// !!! API data here
const favourites = ref([
  {
    id: 1,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: '199.00',
    image: 'https://placehold.co/64x64?text=KB',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: '59.90',
    image: 'https://placehold.co/64x64?text=Mouse',
  },
  {
    id: 3,
    name: 'Desk Lamp',
    category: 'Home & Living',
    price: '45.00',
    image: 'https://placehold.co/64x64?text=Lamp',
  },
])

function removeFavourite(id) {
  favourites.value = favourites.value.filter(item => item.id !== id)
}
</script>