<script setup>

const { token, user, setUser, clearAuth } = useAuth();

const fetchProfile = async () => {
  if (token.value && !user.value) {
    try {
      const data = await $fetch('http://localhost:5002/users/profile', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      setUser(data)
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      if (err.status === 401) {
        clearAuth()
      }
    }
  }
}

onMounted(fetchProfile)

watch(token, (newToken) => {
  if (newToken) {
    fetchProfile()
  } else {
    setUser(null)
  }
})

const items = [
  { label: 'Home', to: '/', icon: "home"  },
  { label: 'Discover', to: '/items', icon: 'search'},
  { label: 'Add Item', to: '/items/create' , icon: 'circle-fading-plus'},
  { label: 'History', to: '/history', icon: 'history'},
  { label: 'Profile', to: '/profile', icon: 'circle-user'},
]

</script>

<template>
  <main class="flex">
   <aside
      class=" w-52 h-full bg-gray-50"
    >
      <div class="p-5 font-bold text-xl text-primary">MMUMART</div>
      <nav class="flex flex-col gap-4 p-5">
        <NuxtLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="px-3 py-2 rounded-lg flex gap-2 transition-colors
           text-gray-700 hover:bg-gray-100
           [.router-link-exact-active]:bg-primary [.router-link-exact-active]:text-white"
        >
          <UIcon :name="`i-lucide-${item.icon}`" class="size-5" />
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>
    <div class="flex-1">
      <nav class="flex justify-end items-center p-5 bg-white shadow">
        <div class="flex items-center gap-4">
          <!-- Cart button -->
          <NuxtLink :to="token ? '/cart' : '/auth/login'">
            <svg class="w-7 h-7 text-gray-500 hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.658-6.214A1.125 1.125 0 0016.61 6.75H5.906M7.5 14.25L6.106 5.272M7.5 14.25l-1.5 1.5m12.75-1.5a3 3 0 00-3 3" />
            </svg>
          </NuxtLink>
          <template v-if="!token">
            <NuxtLink to="/auth/login">Login</NuxtLink>
            <NuxtLink to="/auth/register">Register</NuxtLink>
          </template>
          <UAvatar color="primary" :alt="user?.name || 'User'" v-else />
        </div>
      </nav>
      <slot />
    </div>
  </main>
</template>
