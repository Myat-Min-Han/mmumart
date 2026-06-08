<template>
  <div class="min-h-screen bg-gray-50 pb-8">

    <!-- Header -->
    <div class="bg-primary h-28 rounded-b-3xl relative">
      <div class="absolute -bottom-9 left-1/2 -translate-x-1/2">
        <div class="relative">
          <div class="w-18 h-18 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-primary text-xl font-semibold tracking-wide">
            <!-- USER avatar -->
            <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <!-- Login authentication display -->
          <div v-if="token" class="absolute bottom-0.5 right-0.5 w-5 h-5 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div v-if="token" class="text-center mt-12 px-6">
      <h2 class="text-lg font-semibold text-primary">Li Xiaoming</h2>
      <p class="text-xs text-gray-400 mt-1">Member · ID: 8812345</p>
    </div>

    <!-- Login/Register -->
    <div v-else class="text-center mt-12 px-6">
      <p class="text-sm text-gray-400 mb-4">Please login to access your profile</p>
      <div class="flex justify-center gap-3">
        <NuxtLink
          to="/auth/login"
          class="px-5 py-2 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-blue-50 transition-colors">
          Login
        </NuxtLink>
        <NuxtLink
          to="/auth/register"
          class="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Register
        </NuxtLink>
      </div>
    </div>

    <!-- Stats -->
    <div v-if="token" class="mx-5 mt-5 bg-white rounded-2xl border border-gray-100 flex overflow-hidden">
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
      <NuxtLink
        v-for="item in mainMenuItems"
        :key="item.title"
        :to="token ? item.route : '/auth/login'"
        class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
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
      </NuxtLink>
    </div>

    <!-- Settings -->
    <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 mt-5 mb-2">
      Settings
    </p>
    <div class="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <NuxtLink
        v-for="item in otherMenuItems"
        :key="item.title"
        :to="token ? item.route : '/auth/login'"
        class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
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
      </NuxtLink>
    </div>

    <!-- Edit Profile / Logout -->
    <div v-if="token" class="mx-4 mt-3 flex flex-col gap-2">
      <NuxtLink
        to="/edit-profile"
        class="w-full py-3 rounded-2xl border border-gray-200 text-sm font-medium text-primary bg-white hover:bg-blue-50 active:scale-[0.98] transition-all text-center">
        Edit Profile
      </NuxtLink>
      <button
        class="w-full py-3 rounded-2xl border border-red-200 text-sm font-medium text-red-500 bg-white hover:bg-red-50 active:scale-[0.98] transition-all"
        @click="logout">
        Logout
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const { token, clearAuth } = useAuth()

const logout = () => {
  clearAuth()
  navigateTo('/auth/login')
}

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
    title:    'Feedback',
    subtitle: 'Share your thoughts with us',
    iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    route:    '/feedback',
  },
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