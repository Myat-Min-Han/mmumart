<script setup>

definePageMeta({
  layout: false
})

const formData = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const toast = useToast()

const { setAuth } = useAuth();

const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('http://localhost:5002/api/users/login', {
      method: 'POST',
      body: formData.value
    });

    // set the cookie 
   setAuth(response.token, response.user)
    
    toast.add({
      title: 'Success',
      description: response.message,
      color: 'green'
    })
    
    navigateTo('/')
  } catch (err) {
    toast.add({
      title: 'Error',
      description: err.data?.error || 'Failed to login',
      color: 'red'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
    <main class="grid grid-cols-2 h-screen">
    <section class="p-10 bg-primary text-white">
      <NuxtLink to="/" class="text-xl font-medium" >
      MMUMART
      </NuxtLink>
      <div class="mt-20">
        <h1 class="font-bold w-140 text-4xl mb-4">Welcome back to the heart of MMU Commerce</h1>
        <p class="opacity-45 mb-10">
          The curated marketplace for Multimedia University students and staff. Buy, sell, and trade with your academic community.
        </p>
      </div>
    </section>
    <section class="flex pt-20 justify-center">
      <div class="w-100">
        <h1 class="text-2xl font-semibold mb-2">Member Log in</h1>
        <p class="opacity-70 mb-5">Enter your credentials to access the marketplace</p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-5 mb-2">
          <div>
            <label class="block text-sm font-medium mb-1">MMU Email</label>
            <div class="relative border border-gray-700 rounded-lg px-3 flex items-center">
              <UIcon name="i-lucide-at-sign" size="md"/>
              <input v-model="formData.email" type="email" required class="pr-10 pl-2 py-2 focus:outline-none w-full">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <div class="relative border border-gray-700  rounded-lg px-3 flex items-center">
              <UIcon name="i-lucide-lock" size="md"/>
              <input v-model="formData.password" type="password" required class="pr-10 pl-2 py-2 focus:outline-none w-full">
            </div>
          </div>
          <button :disabled="isLoading" type="submit" class="w-100 px-3 py-2 text-white bg-primary rounded-lg cursor-pointer disabled:opacity-50">
            {{ isLoading ? 'Logging in...' : 'Log in' }}
          </button>
        </form>
        <div class="text-center text-sm">
          New to MMUMART?
          <NuxtLink to="/auth/register" class="font-semibold">Create an Account</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>