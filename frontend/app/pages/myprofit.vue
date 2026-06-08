<template>
  <div class="min-h-screen bg-gray-50 pb-8">

    <!-- Header -->
    <div class="bg-primary px-4 pt-12 pb-5 rounded-b-3xl flex items-center gap-3">
      <button @click="$router.back()" class="text-white">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-white text-base font-semibold">My Profit</h1>
    </div>

    <!-- Summary Cards -->
    <div class="mx-4 mt-5 grid grid-cols-2 gap-3">
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <p class="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Total Earnings</p>
        <p class="text-2xl font-bold text-primary mt-1">RM {{ totalEarnings }}</p>
        <p class="text-xs text-gray-400 mt-1">All time</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <p class="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Available</p>
        <p class="text-2xl font-bold text-secondary mt-1">RM {{ available }}</p>
        <p class="text-xs text-gray-400 mt-1">Ready to withdraw</p>
      </div>
    </div>

    <!-- Transaction History -->
    <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 mt-6 mb-2">
      Transaction History
    </p>

    <!-- Empty State -->
    <div v-if="transactions.length === 0" class="flex flex-col items-center justify-center mt-16 px-8 text-center">
      <svg class="w-14 h-14 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
      <p class="text-sm font-medium text-gray-400">No transactions yet</p>
    </div>

    <!-- Transaction List -->
    <div v-else class="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div
        v-for="(tx, index) in transactions"
        :key="tx.id"
        class="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0"
      >
        <!-- Icon -->
        <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-secondary">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary truncate">{{ tx.item }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ tx.date }}</p>
        </div>

        <!-- Amount -->
        <p class="text-sm font-semibold shrink-0" :class="tx.amount > 0 ? 'text-green-500' : 'text-red-400'">
          {{ tx.amount > 0 ? '+' : '' }}RM {{ Math.abs(tx.amount).toFixed(2) }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// change to API after this
const transactions = ref([
  { id: 1, item: 'Mechanical Keyboard',  date: '2 Jun 2025', amount: 180.00 },
  { id: 2, item: 'Wireless Mouse',       date: '28 May 2025', amount: 52.00 },
  { id: 3, item: 'Shipping Fee Deduct',  date: '28 May 2025', amount: -8.00 },
  { id: 4, item: 'Desk Lamp',            date: '20 May 2025', amount: 40.00 },
  { id: 5, item: 'Platform Fee Deduct',  date: '20 May 2025', amount: -6.00 },
])

const totalEarnings = computed(() =>
  transactions.value
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2)
)

const available = computed(() =>
  transactions.value
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2)
)
</script>