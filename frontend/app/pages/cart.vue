<script setup>
import { ref, computed } from 'vue'

const auth = useAuth()
const { data: cartItems, pending, error, refresh } = useAsyncData(
  "cart",
  async () => {
    if (!auth.token.value) return []

    return await $fetch("http://localhost:5002/api/items/cart", {
      headers: {
        "Authorization": `Bearer ${auth.token.value}`
      },
    })
  },
  {
    watch: [() => auth.token.value],
  }
)

const selectedIds = ref([])
const checkoutPending = ref(false)
const checkoutMessage = ref(null)
const checkoutError = ref(null)
const selectedCount = computed(() => Array.isArray(selectedIds.value) ? selectedIds.value.length : 0)
const cartItemsSafe = computed(() => Array.isArray(cartItems.value) ? cartItems.value : [])

const isAllSelected = computed(() =>
  cartItemsSafe.value.length > 0 && selectedCount.value === cartItemsSafe.value.length
)

const selectedTotal = computed(() =>
  cartItemsSafe.value
    .filter(item => selectedIds.value.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = cartItemsSafe.value.map(item => item.id)
  }
}

const updateCartItem = async (item, newQty) => {
  if (newQty < 1) return
  item._pending = true
  item._error = null
  try {
    await $fetch(`http://localhost:5002/api/items/cart/${item.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${auth.token.value}` },
      body: { quantity: newQty }
    })
    item.quantity = newQty
  } catch (err) {
    item._error = err?.data?.message || err.message || 'Update failed'
  } finally {
    item._pending = false
  }
}

const decreaseQty = (item) => {
  if (item._pending) return
  if (item.quantity > 1) {
    updateCartItem(item, item.quantity - 1)
  }
}

const increaseQty = (item) => {
  if (item._pending) return
  updateCartItem(item, item.quantity + 1)
}

const deleteSelected = async () => {
  const toDelete = [...selectedIds.value]
  const items = cartItemsSafe.value
  for (const id of toDelete) {
    const item = items.find(i => i.id === id)
    if (!item) continue
    item._pending = true
    item._error = null
    try {
      await $fetch(`http://localhost:5002/api/items/cart/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.token.value}` },
      })
      if (Array.isArray(cartItems.value)) {
        const idx = cartItems.value.findIndex(i => i.id === id)
        if (idx !== -1) cartItems.value.splice(idx, 1)
      }
    } catch (err) {
      item._error = err?.data?.message || err.message || 'Delete failed'
    } finally {
      item._pending = false
    }
  }
  selectedIds.value = []
}

const checkoutSelected = async () => {
  if (selectedCount.value === 0 || checkoutPending.value) return

  checkoutPending.value = true
  checkoutMessage.value = null
  checkoutError.value = null

  const checkedOutIds = [...selectedIds.value]

  try {
    await $fetch('http://localhost:5002/api/items/history', {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token.value}` },
      body: { cartItemIds: checkedOutIds },
    })

    if (Array.isArray(cartItems.value)) {
      cartItems.value = cartItems.value.filter(item => !checkedOutIds.includes(item.id))
    }

    selectedIds.value = []
    checkoutMessage.value = 'Checkout completed. Your purchase was added to history.'

    if (import.meta.client) {
      window.dispatchEvent(new CustomEvent('cart:refresh'))
    }
  } catch (err) {
    checkoutError.value = err?.data?.message || err?.data?.error || err.message || 'Checkout failed'
  } finally {
    checkoutPending.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-36">
    <div class="bg-white px-5 py-4 flex items-center border-b border-gray-100">
      <h1 class="text-lg font-semibold text-primary">My Cart</h1>
      <span class="ml-2 text-sm text-gray-400">({{ cartItemsSafe.length }} items)</span>
    </div>

    <div v-if="!auth.token.value" class="flex flex-col items-center justify-center mt-32 px-6">
      <UIcon name="i-lucide-shopping-cart" class="mb-3 size-8 text-gray-400"/>
      <p class="text-gray-400 text-sm">Please log in to view your cart</p>
      <NuxtLink to="/auth/login" class="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
        Login
      </NuxtLink>
    </div>

    <div v-else-if="cartItemsSafe.length === 0" class="flex flex-col items-center justify-center mt-32 px-6">
      <UIcon name="i-lucide-shopping-cart"/>
      <p class="text-gray-400 text-sm">Your cart is empty</p>
      <NuxtLink to="/items" class="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
        Browse Products
      </NuxtLink>
    </div>

    <div v-else class="mx-4 mt-4 flex flex-col gap-3">
      <div v-if="checkoutMessage" class="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
        {{ checkoutMessage }}
      </div>
      <div v-if="checkoutError" class="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ checkoutError }}
      </div>

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
          v-if="selectedCount > 0"
          @click="deleteSelected"
          class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
          Delete ({{ selectedCount }})
        </button>
      </div>

      <div
        v-for="item in cartItemsSafe"
        :key="item.id"
        class="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center gap-3">

        <!-- Checkbox -->
        <input
          type="checkbox"
          :value="item.id"
          v-model="selectedIds"
          class="w-4 h-4 accent-primary rounded shrink-0" />

        <div class="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
          <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
            </svg>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ item.variant }}</p>
          <p class="text-sm font-semibold text-secondary mt-1">RM {{ (item.price * item.quantity).toFixed(2) }}</p>
          <p v-if="item._error" class="text-xs text-red-500 mt-1">{{ item._error }}</p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="decreaseQty(item)"
            :disabled="item._pending"
            class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span class="text-sm font-medium text-primary w-5 text-center">{{ item.quantity }}</span>
          <button
            @click="increaseQty(item)"
            :disabled="item._pending"
            class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <div v-if="cartItemsSafe.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-400">Total ({{ selectedCount }} selected)</p>
        <p class="text-lg font-semibold text-primary">RM {{ selectedTotal.toFixed(2) }}</p>
      </div>
      <button
        @click="checkoutSelected"
        :disabled="selectedCount === 0 || checkoutPending || cartItemsSafe.some(i => i._pending)"
        class="px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        {{ checkoutPending ? 'Checking out...' : `Checkout (${selectedCount})` }}
      </button>
    </div>

  </div>
</template>
