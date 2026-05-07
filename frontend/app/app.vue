<script setup>
  import { ref } from 'vue'

  const navLinks = ref(['Textbooks', 'Electronics', 'Services', 'Campus Gear'])

</script>

<template>
  <UApp>
      <nav class="flex justify-between items-center p-5">
        <div class="text-xl font-bold text-primary">MMUMART</div>

        <div class="flex gap-4">
          <a
            v-for="link in navLinks"
            :key="link"
            class="text-gray-500 hover:text-primary cursor-pointer"
          >
            {{ link }}
          </a>
        </div>

        <div>
          <a href="/login">
            Login
          </a>
          <a 
          class="ml-3 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium "
          href="/register"
          >
            Register
          </a>
        </div>
      </nav>
      <NuxtPage />
  </UApp>
</template>
