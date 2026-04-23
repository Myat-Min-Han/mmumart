<script setup>
  import { ref } from 'vue'

  const navLinks = ref(['Textbooks', 'Electronics', 'Services', 'Campus Gear'])
  const searchText = ref('')

  const featuredTitle = ref('Featured Picks')
  const products = ref([
    { name: 'Calculator', price: 'RM 145.00' },
    { name: 'Keyboard', price: 'RM 210.00' },
    { name: 'Notebook', price: 'RM 45.00' }
  ])

  const ctaTitle = ref('Your unused gear could help others')
  const ctaText = ref('Turn materials into funds.')
  const ctaButton = ref('Post Your First Listing')
</script>

<template>
  <div class="max-w-300 mx-auto px-4">

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

    <!-- Products -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">{{ featuredTitle }}</h2>

      <div class="flex gap-4">
        <div
          v-for="item in products"
          :key="item.name"
          class="bg-white p-4 rounded-lg shadow w-48"
        >
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-gray-600">{{ item.price }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-2">{{ ctaTitle }}</h2>
      <p class="text-gray-600 mb-4">{{ ctaText }}</p>

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ ctaButton }}
      </button>
    </div>

  </div>
</template>

