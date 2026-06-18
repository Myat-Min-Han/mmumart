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

</script>

<template>
    <nav class="flex justify-between items-center p-5">
      <NuxtLink to="/" class="text-xl font-bold text-primary">
        MMUMART
      </NuxtLink>
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
        <UAvatar color="primary" :alt="user?.name || 'User'" v-else />
      </div>
    </nav>
    <slot />
</template>