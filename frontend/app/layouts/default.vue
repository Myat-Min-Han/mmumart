<script setup>

const { token, user, setAuth, setUser, clearAuth } = useAuth();

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
    clearAuth()
  }
})

const items = [
  { label: 'Home', to: '/', icon: "home"  },
  { label: 'Discover', to: '/items', icon: 'search'},
  { label: 'Add Item', to: '/items/create' , icon: 'circle-fading-plus'},
  { label: 'Mycart', to: '/mycart', icon: 'shopping-cart'},
  { label: 'Profile', to: '/profile', icon: 'circle-user'},
]

</script>

<template>
  <main class="flex">
   <aside
      class=" w-52 h-screen sticky top-0 bg-gray-50"
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
          <NuxtLink :to="token ? '/cart' : '/auth/login'">
           <UIcon name="i-lucide-shopping-cart" class="size-5"/>
          </NuxtLink>
          <template v-if="!token">
            <NuxtLink to="/auth/login">Login</NuxtLink>
            <NuxtLink to="/auth/register">Register</NuxtLink>
          </template>
          <UAvatar color="primary" :alt="user?.name || 'User'" :text="user?.name?.charAt(0).toUpperCase()"  v-else />
        </div>
      </nav>
      <slot />
    </div>
  </main>
</template>
