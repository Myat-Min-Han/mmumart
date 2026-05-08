<template>
  <UApp>
      <nav class="flex justify-between items-center p-5">
        <div class="text-xl font-bold text-primary">MMUMART</div>

        <div class="relative border rounded-md px-3">
          <UIcon name="i-lucide-search" size="md"/>
          <input placeholder="Search the product" class="pr-10 pl-2 py-2 focus:outline-none"/>
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
