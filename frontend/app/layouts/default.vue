<script setup>
  import Cookies from 'js-cookie';
  import { ref } from 'vue';
  // get the token from backend
  const backendToken = "some-code";
  Cookies.set('jwt', backendToken, { expires: 7 });

  const token = ref(Cookies.get('jwt'))

</script>

<template>
  <div>
    <nav class="flex justify-between items-center p-5">
      <div class="text-xl font-bold text-primary">MMUMART</div>

      <div class="relative border rounded-md px-3">
        <UIcon name="i-lucide-search" size="md"/>
        <input placeholder="Search the product" class="pr-10 pl-2 py-2 focus:outline-none"/>
      </div>

      <div v-if="!token">
        <NuxtLink to="/login">
          Login
        </NuxtLink>
        <NuxtLink 
          class="ml-3 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/register"
        >
          Register
        </NuxtLink>
      </div>
      <div v-else>
        <a
          class="ml-3 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/logout"
        >
          Logout
        </a>
      </div>
    </nav>
    <slot />
  </div>
</template>
