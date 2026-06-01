<template>
  <div class="min-h-screen bg-gray-50 pb-8">

    <!-- Header -->
    <div class="bg-primary h-28 rounded-b-3xl relative">
      <div class="absolute -bottom-9 left-1/2 -translate-x-1/2">
        <div class="relative">
          <div class="w-18 h-18 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-primary text-xl font-semibold tracking-wide">
            LM
          </div>
          <div class="absolute bottom-0.5 right-0.5 w-5 h-5 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div class="text-center mt-12 px-6">
      <h2 class="text-lg font-semibold text-primary">undefined</h2>
      <p class="text-xs text-gray-400 mt-1">Member · ID: </p>
    </div>

    <!-- Stats -->
    <div class="mx-5 mt-5 bg-white rounded-2xl border border-gray-100 flex overflow-hidden">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="flex-1 text-center py-3.5"
        :class="{ 'border-r border-gray-100': index < stats.length - 1 }"
      >
        <p class="text-base font-semibold text-primary">{{ stat.value }}</p>
        <p class="text-[11px] text-gray-400 mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <!-- My Account -->
    <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 mt-5 mb-2">
      My Account
    </p>
    <div class="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        v-for="item in mainMenuItems"
        :key="item.title"
        class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
        @click="$router.push(item.route)"
      >
        <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-secondary">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary">{{ item.title }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
        </div>
        <span v-if="item.badge" class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-secondary shrink-0">
          {{ item.badge }}
        </span>
        <svg class="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Settings -->
    <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 mt-5 mb-2">
      Settings
    </p>
    <div class="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        v-for="item in otherMenuItems"
        :key="item.title"
        class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
        @click="$router.push(item.route)"
      >
        <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-secondary">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-primary">{{ item.title }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
        </div>
        <svg class="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Edit Profile -->
    <div class="mx-4 mt-3">
      <button
        class="w-full py-3 rounded-2xl border border-gray-200 text-sm font-medium text-primary bg-white hover:bg-blue-50 active:scale-[0.98] transition-all"
        @click="$router.push('/edit-profile')"
      >
        Edit Profile
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { value: '12',     label: 'Orders'     },
  { value: '5',      label: 'Favourites' },
  { value: 'RM 238', label: 'Profit'     },
])

const mainMenuItems = ref([
  {
    title:    'My Profit',
    subtitle: 'View earnings and withdrawals',
    badge:    'RM 238',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    route:    '/my-profit',     
  },
  {
    title:    'My Things',
    subtitle: 'Manage your listed items',
    badge:    null,
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    route:    '/my-things',  
  },
  {
    title:    'My Favourites',
    subtitle: 'Items you have saved',
    badge:    null,
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    route:    '/my-favourites', 
  },
])

const otherMenuItems = ref([
  {
    title:    'Shipping Address',
    subtitle: 'Manage saved addresses',
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    route:    '/address',
  },
  {
    title:    'Settings',
    subtitle: 'Account and privacy',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    route:    '/settings',
  },
])
</script>
