<script setup>
const token = useCookie('jwt')

const logout = () => {
  token.value = null
  navigateTo('/login')
}
</script>

<template>
  <div>
    <nav class="flex justify-between items-center p-5">
      
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold text-primary">
        MMUMART
      </NuxtLink>

      <!-- Search -->
      <div class="relative border rounded-md px-3 flex items-center">
        <UIcon name="i-lucide-search" size="md" />
        <input
          placeholder="Search the product"
          class="pr-10 pl-2 py-2 focus:outline-none"
        />
      </div>

      <!-- Right side -->
      <div class="flex items-center">
        <NuxtLink
          to="/feedback"
          class="mr-4"
        >
          Feedback
        </NuxtLink>

        <div v-if="!token" class="flex items-center">
          <NuxtLink to="/auth/login">
            Login
          </NuxtLink>

          <NuxtLink
            class="ml-3 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/auth/register"
          >
            Register
          </NuxtLink>
        </div>

        <div v-else>
          <button
            @click="logout"
            class="ml-3 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>

    <slot />
  </div>
</template>