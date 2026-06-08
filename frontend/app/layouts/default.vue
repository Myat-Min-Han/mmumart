<script setup>
const { token, clearAuth } = useAuth();
const logout = () => clearAuth();
</script>

<template>
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
      <div class="flex items-center gap-4">
        <NuxtLink to="/feedback">
          Feedback
        </NuxtLink>
        <template v-if="!token">
          <NuxtLink to="/auth/login">
            Login
          </NuxtLink>
          <NuxtLink to="/auth/register">
              Register
          </NuxtLink>
        </template>
        <button
            v-else
            @click="logout"
          >
            Logout
        </button>
      </div>
    </nav>
    <slot />
</template>