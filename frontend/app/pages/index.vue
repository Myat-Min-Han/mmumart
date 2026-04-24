<script setup>
  import { ref } from 'vue'

  const navLinks = ref(['Textbooks', 'Electronics', 'Services', 'Campus Gear'])
  const searchText = ref('')
</script>

<template>
  <div class="max-w-300 mx-auto px-4 mb-10">

    <!-- Navbar -->
    <div class="flex justify-between items-center py-4">
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

      <input
        v-model="searchText"
        type="text"
        placeholder="Search..."
        class="border rounded px-3 py-1 outline-none focus:ring-1 focus:ring-primary"
      />
    </div>

    <!-- Hero -->
    <div class="bg-primary text-white p-10 rounded-xl mt-4">
      <h1 class="text-4xl font-bold mb-2">Discover Quality Campus Essentials.</h1>
      <p class="mb-4 text-gray-500">Buy, sell, and trade academic materials.</p>

      <button class="bg-white text-primary px-4 py-2 rounded-md mr-2 text-sm font-medium">
        Start Exploring
      </button>

      <button class="bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
        Become a Seller
      </button>
    </div>

    <!-- Categories -->
    <div class="mt-8">
      <section class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-xl font-semibold text-primary">Academic Categories</h2>
          <p class=" text-gray-500 text-sm">Browse collections by campus department.</p>
        </div>
        <div>
          <a href="/categories" class="font-medium hover:text-primary text-sm hover:underline">View All Categories</a>
        </div>
      </section>
      <section class="grid grid-cols-2 gap-2 ">
        <div class="relative h-100">
          <img src="/img/textbooks.png" alt="textbooks" class="h-full w-full rounded-lg">
          <div class="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div class="absolute bottom-0 w-full text-white p-5 rounded-b-lg">
            <h1 class="text-2xl font-semibold">Textbooks</h1>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="relative h-50">
              <img src="/img/electronics.png" alt="electronics" class="h-full w-full  rounded-lg">
              <div class="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div class="absolute bottom-0 w-full text-white p-2 rounded-b-lg">
                <h1 class="text-lg font-semibold">Electronics</h1>
              </div>
            </div>
            <div class="relative h-50">
              <img src="/img/stationary.png" alt="stationary" class="h-full w-full rounded-lg">
              <div class="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div class="absolute bottom-0 w-full text-white p-2 rounded-b-lg">
                <h1 class="text-lg font-semibold">Stationary</h1>
              </div>
            </div>
            <div class="relative col-span-2 h-48">
              <img src="/img/campus_gear.png" alt="camppus_gear" class="h-full w-full object-cover rounded-lg">
              <div class="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div class="absolute bottom-0 w-full text-white p-2 rounded-b-lg">
                <h1 class="text-lg font-semibold">Campus Gear</h1>
              </div>
            </div>
        </div>
      </section>
    </div>

    <!-- CTA -->
    <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow grid grid-cols-2">
     <div>
        <h1 class="text-3xl font-semibold mb-2 text-primary">Your unused gear could be another student's breakthrough.</h1>
        <p class="text-gray-600 mb-4">Turn your materials into funds.</p>

        <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
          Post your Item
        </button>
     </div>
     <div class="grid grid-cols-2 gap-6">
        <div class="h-50">
          <img src="/img/campus_gear_2.png" alt="campus_gear_2" class="w-full h-full object-cover rounded-lg rotate-6">
        </div>
        <div class="h-50">
          <img src="/img/electronics_2.png" alt="electronics_2" class="w-full h-full object-cover rounded-lg -rotate-4">
        </div>
     </div>
    </div>

  </div>
</template>

