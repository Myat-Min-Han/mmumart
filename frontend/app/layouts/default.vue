<script setup>
const { token, clearAuth } = useAuth();
const logout = () => clearAuth();
</script>

<template>
  <div>
    <nav class="flex justify-between items-center p-5">
      <NuxtLink to="/" class="text-xl font-bold text-primary">
        MMUMART
      </NuxtLink>
      <div class="relative border rounded-md px-3 flex items-center">
        <UIcon name="i-lucide-search" size="md" />
        <input
          placeholder="Search the product"
          class="pr-10 pl-2 py-2 focus:outline-none" />
      </div>

      <NuxtLink :to="token ? '/profile' : '/auth/login'" class="-mr-1">
        <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
          <svg class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </NuxtLink>
    </nav>
    <slot />
  </div>
</template>