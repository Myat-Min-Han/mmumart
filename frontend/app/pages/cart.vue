<template>
  <div class="min-h-screen bg-gray-50 pb-36">

    <!-- Header -->
    <div class="bg-white px-5 py-4 flex items-center border-b border-gray-100">
      <h1 class="text-lg font-semibold text-primary">My Cart</h1>
      <span class="ml-2 text-sm text-gray-400">({{ cartItems.length }} items)</span>
    </div>

    <!-- Empty Cart -->
    <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center mt-32 px-6">
      <svg class="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.658-6.214A1.125 1.125 0 0016.61 6.75H5.906M7.5 14.25L6.106 5.272M7.5 14.25l-1.5 1.5m12.75-1.5a3 3 0 00-3 3" />
      </svg>
      <p class="text-gray-400 text-sm">Your cart is empty</p>
      <NuxtLink to="/" class="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
        Browse Products
      </NuxtLink>
    </div>

    <!-- Cart Items -->
    <div v-else class="mx-4 mt-4 flex flex-col gap-3">

      <!-- Select All -->
      <div class="flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-4 py-3">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            :checked="isAllSelected"
            @change="toggleSelectAll"
            class="w-4 h-4 accent-primary rounded" />
          <span class="text-sm font-medium text-primary">Select All</span>
        </label>
        <button
          v-if="selectedIds.length > 0"
          @click="deleteSelected"
          class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
          Delete ({{ selectedIds.length }})
        </button>
      </div>

      <!-- Item Card -->
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center gap-3">

        <!-- Checkbox -->
        <input
          type="checkbox"
          :value="item.id"
          v-model="selectedIds"
          class="w-4 h-4 accent-primary rounded shrink-0" />

        <!-- Product Image -->
        <div class="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
          <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
            </svg>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ item.variant }}</p>
          <p class="text-sm font-semibold text-secondary mt-1">RM {{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="decreaseQty(item)"
            class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span class="text-sm font-medium text-primary w-5 text-center">{{ item.quantity }}</span>
          <button
            @click="item.quantity++"
            class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Bottom Checkout Bar -->
    <div v-if="cartItems.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-400">Total ({{ selectedIds.length }} selected)</p>
        <p class="text-lg font-semibold text-primary">RM {{ selectedTotal.toFixed(2) }}</p>
      </div>
      <button
        :disabled="selectedIds.length === 0"
        class="px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        Checkout ({{ selectedIds.length }})
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Placeholder cart data
const cartItems = ref([
  { id: 1, name: 'Wireless Earbuds Pro', variant: 'Black', price: 89.90, quantity: 1, image: null },
  { id: 2, name: 'Phone Case iPhone 15', variant: 'Clear', price: 15.00, quantity: 2, image: null },
  { id: 3, name: 'USB-C Charging Cable', variant: '1m / White', price: 12.50, quantity: 1, image: null },
])

const selectedIds = ref([])

const isAllSelected = computed(() =>
  cartItems.value.length > 0 && selectedIds.value.length === cartItems.value.length
)

const selectedTotal = computed(() =>
  cartItems.value
    .filter(item => selectedIds.value.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = cartItems.value.map(item => item.id)
  }
}

const decreaseQty = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const deleteSelected = () => {
  cartItems.value = cartItems.value.filter(item => !selectedIds.value.includes(item.id))
  selectedIds.value = []
}
</script>